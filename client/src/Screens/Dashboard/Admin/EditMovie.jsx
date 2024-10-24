import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { LoginInputs, Message, Select } from "../../../Components/UsedInputs";
import Uploader from "../../../Components/Uploader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { movieValidation } from "../../../Components/Validation/MovieValidation";
import { InlineError } from "../../../Components/Notifications/Error";
import { Imagepreview } from "../../../Components/Imagepreview";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  createMoviesAction,
  getMovieByIdAction,
  updateMoviesAction,
} from "../../../Redux/Actions/MoviesAction";
import toast from "react-hot-toast";
import Loader from "../../../Components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import VideoUploader from "../../../Components/VideoUploader";

const EditMovie = () => {
  const [imageWithoutTitle, setImageWithoutTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const sameClass = "w-full gap-6 flex-colo min-h-screen";

  //USE-SELECTORS
  const { categories } = useSelector((state) => state.categoryGetAll);

  //CREATE MOVIE
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );

  //UPDATE MOVIE
  const {
    isLoading: editLoading,
    isError: editError,
    isSuccess,
  } = useSelector((state) => state.updateMovie);

  // validate movie
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(movieValidation) });

  // on submit
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    dispatch(
      updateMoviesAction(movie?._id, {
        ...data,
        image: imageWithoutTitle,
        cardImage: imageTitle,
        video: videoUrl,
      })
    );
  };

  //useEffect
  useEffect(() => {
    if (movie?._id !== id) {
      dispatch(getMovieByIdAction(id));
    } else {
      setValue("name", movie?.name);
      setValue("time", movie?.time);
      setValue("language", movie?.language);
      setValue("year", movie?.year);
      setValue("category", movie?.category);
      setValue("desc", movie?.desc);
      setImageWithoutTitle(movie?.image);
      setImageTitle(movie?.cardImage);
      setVideoUrl(movie?.video);
    }

    // If success than update movie
    if (isSuccess) {
      dispatch({ type: "UPDATE_MOVIE_RESET" });
      navigate(`/edit-movie/${id}`);
    }

    //if error than show error
    if (editError) {
      console.log(editError)
      // toast.error("Something went wrong");
      dispatch({ type: "UPDATE_MOVIE_RESET" });
    }
  }, [dispatch, id, movie, setValue, isSuccess, editError, navigate]);

  return (
    <Sidebar>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">Something went wrong</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <h2 className="font-semibold text-x">Update "{movie?.name}"</h2>
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

              {errors.language && (
                <InlineError text={errors.language.message} />
              )}
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
                Image without title
              </p>
              <Uploader setImageUrl={setImageWithoutTitle} />
              <Imagepreview
                image={imageWithoutTitle}
                name="imageWithoutTitle"
              />
            </div>

            {/* {Image with title} */}
            <div className="flex flex-col gap-2">
              <p className="text-white font-semibold text-sm">
                Image with title
              </p>
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
            <div
              className={`w-full grid ${videoUrl && "md:grid-cols-2"} gap-6`}
            >
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
              disabled={isLoading}
              onClick={handleSubmit(onSubmit)}
              className="bg-subMain transitions hover:bg-main border border-subMain text-white py-[11px] px-6 rounded-md w-full sm:w-auto"
            >
              {isLoading ? "Updating..." : <>Update Movie</>}
            </button>
          </div>
        </div>
      )}
    </Sidebar>
  );
};

export default EditMovie;
