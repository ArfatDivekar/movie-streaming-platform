import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Uploader from '../../Components/Uploader'
import { LoginInputs } from '../../Components/UsedInputs'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { InlineError } from '../../Components/Notifications/Error';
import { ProfileValidation } from '../../Components/Validation/UserValidation';
import { Imagepreview } from '../../Components/Imagepreview';
import { deleteProfileAction, updateProfileAction } from '../../Redux/Actions/userActions';
import toast from 'react-hot-toast';

const Profile = () => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector (
        (state) => state.userLogin
    );

    const [imageUrl, setImageUrl] = useState (userInfo ? userInfo.image : "")

    const { isLoading, isError, isSuccess } = useSelector (
        (state) => state.userUpdateProfile
    );

    const { isLoading: deleteLoading, isError: deleteError } = useSelector (
        (state) => state.userDeleteProfile
    );


    // validate user
    const { register, handleSubmit, setValue, formState: { errors}, } = useForm({ resolver: yupResolver(ProfileValidation),});

    // update button action
    const onSubmit = (data) => {
        dispatch(updateProfileAction({ ...data, image: imageUrl }))
        // console.log({ ...data, image: imageUrl });
    };

    // delete button action
    const deleteProfile = () => {
        window.confirm("Are you sure you want to delete your profile?") &&
        dispatch(deleteProfileAction())
    }

    //useEffect
    useEffect(() => {
        if(userInfo) {
            setValue("fullName", userInfo?.fullName);
            setValue("email", userInfo?.email);
        }
        if(isSuccess) {
            dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
        };
        if(isError || deleteError) {
            toast.error(isError || deleteError);
            dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
            dispatch({ type: "USER_DELETE_PROFILE_RESET" });
        }
    }, [userInfo, setValue, isSuccess, isError, dispatch, deleteError]);


  return (
    <Sidebar>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <h2 className="font-semibold">
                Profile
            </h2>
            <div className="w-full grid lg:grid-cols-12 gap-6">
                <div className="col-span-10">
                    <Uploader setImageUrl={setImageUrl}/>
                </div>

                {/* image preview */}
                <div className="col-span-2">
                    <Imagepreview 
                        image={imageUrl}
                        name={userInfo ? userInfo.fullName : "Ninjaxx"}
                    />
                </div>
            </div>

            <div className="w-full">

                {/* Email input box */}
                <LoginInputs 
                    label="Full name" 
                    placeholder="Enter your full name" 
                    type="text"
                    name="fullName"
                    register={register("fullName")}
                    bg={true}
                />

                {errors.fullName && <InlineError text={errors.fullName.message}/>}

            </div>

            <div className="w-full">

                {/* Email input box */}
                <LoginInputs 
                    label="Email" 
                    placeholder="Enter your email" 
                    type="email"
                    name="email"
                    register={register("email")}
                    bg={true}
                />

                {errors.email && <InlineError text={errors.email.message}/>}

            </div>
            <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
                <button 
                    disabled={ deleteLoading || isLoading }
                    className="bg-main transitions hover:bg-green-600 border border-green-600 text-white py-[11px] px-6 rounded-md w-full sm:w-auto">
                    { isLoading ? "Updating..." : "Update Profile"}
                </button>

                <button
                    onClick={deleteProfile}
                    disabled={ deleteLoading || isLoading }
                    className="bg-subMain transitions hover:bg-main border border-subMain text-white py-[11px] px-6 rounded-md w-full sm:w-auto">
                { deleteLoading ? "Deleting..." : "Delete Account"}
                </button>
            </div>
        </form>
    </Sidebar>
  )
}

export default Profile