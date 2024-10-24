import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { LoginInputs, Message, Select } from "../../../Components/UsedInputs";
import Uploader from "../../../Components/Uploader";
import { CategoriesData } from "../../../Data/CategoriesData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { movieValidation } from "../../../Components/Validation/MovieValidation";
import toast from "react-hot-toast";
import { InlineError } from "../../../Components/Notifications/Error";
import { Imagepreview } from "../../../Components/Imagepreview";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createMoviesAction } from "../../../Redux/Actions/MoviesAction";
import VideoUploader from "../../../Components/VideoUploader";

const AddMovies = () => {
  const [imageWithoutTitle, setImageWithoutTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //USE-SELECTORS
  const { categories } = useSelector((state) => state.categoryGetAll);

  //CREATE MOVIE
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.createMovie
  );

  // validate movie
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(movieValidation) });

  // on submit
  const onSubmit = (data) => {
    dispatch(createMoviesAction({  
      ...data,
      image: imageWithoutTitle,
      cardImage: imageTitle,
      video: videoUrl,
    }));
 
  };

  //useEffect
  useEffect(() => {
    if (isSuccess) {
      reset({
        name: "",
        time: 0,
        language: "",
        year: "",
        category: "",
        desc: "",
      });
      setImageTitle("");
      setImageWithoutTitle("");
      setVideoUrl("");
      dispatch({ type: "CREATE_MOVIE_RESET" });
      navigate("/add-movie");
    }

    //if error than show error
    if (isError) {
      console.log(isError)
      // toast.error("Something went wrong");
      dispatch({ type: "CREATE_MOVIE_RESET" });
    }
  }, [isSuccess, isError, navigate, dispatch, reset]);

  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <h2 className="font-semibold text-x">Add Movie</h2>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            {/* Movie name input box */}
            <LoginInputs
              label="Movie Title"
              placeholder="Peaky Blinders"
              type="text"
              name="name"
              register={register("name")}
              bg={true}
            />

            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          <div className="w-full">
            {/* Duration input box */}
            <LoginInputs
              label="Duration"
              placeholder="2hr"
              type="number"
              name="time"
              register={register("time")}
              bg={true}
            />

            {errors.time && <InlineError text={errors.time.message} />}
          </div>
        </div>

        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            {/* Language input box */}
            <LoginInputs
              label="Language"
              placeholder="English"
              type="text"
              name="language"
              register={register("language")}
              bg={true}
            />

            {errors.language && <InlineError text={errors.language.message} />}
          </div>
          <div className="w-full">
            {/* Date of release input box */}
            <LoginInputs
              label="Date of Release"
              placeholder="2024"
              type="text"
              name="year"
              register={register("year")}
              bg={true}
            />

            {errors.year && <InlineError text={errors.year.message} />}
          </div>
        </div>

        {/* IMAGES */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* {Image without title} */}
          <div className="flex flex-col gap-2">
            <p className="text-white font-semibold text-sm">
              Background Image
            </p>
            <Uploader setImageUrl={setImageWithoutTitle} />
            <Imagepreview image={imageWithoutTitle} name="imageWithoutTitle" />
          </div>

          {/* {Image with title} */}
          <div className="flex flex-col gap-2">
            <p className="text-white font-semibold text-sm">Card Image</p>
            <Uploader setImageUrl={setImageTitle} />
            <Imagepreview image={imageTitle} name="imageTitle" />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="w-full">
          <Message
            label="Movie Description"
            placeholder="Make it short and sweet"
            name="desc"
            register={{ ...register("desc") }}
          />
          {errors.desc && <InlineError text={errors.desc.message} />}
        </div>

        {/* CATEGORY */}
        <div className="w-full text-sm">
          <Select
            label="Movie Category"
            options={categories?.length > 0 ? categories : []}
            name="category"
            register={{ ...register("category") }}
          />
          {errors.category && <InlineError text={errors.category.message} />}
        </div>

        {/* FULL MOVIE VIDEO */}
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm text-white font-semibold">
            Movie video
          </label>
          <div className={`w-full grid ${videoUrl && "md:grid-cols-2"} gap-6`}>
            {videoUrl && (
              <div className="w-full bg-main text-sm text-subMain py-4 border border-border rounded flex-colo">
                Video Uploaded!!!
              </div>
            )}
          </div>
          <VideoUploader setImageUrl={setVideoUrl} />
        </div>

        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            disabled={
              isLoading
            }
            onClick={handleSubmit(onSubmit)}
            className="bg-subMain transitions hover:bg-main border border-subMain text-white py-[11px] px-6 rounded-md w-full sm:w-auto"
          >
            {isLoading ? "Please wait..." : <>Publish Movie</>}
          </button>
        </div>
      </div>
    </Sidebar>
  );
};

export default AddMovies;
