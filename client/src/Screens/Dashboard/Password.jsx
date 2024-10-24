import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { LoginInputs } from '../../Components/UsedInputs'
import { IoEye, IoEyeOff  } from "react-icons/io5";
import { InlineError } from '../../Components/Notifications/Error';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordValidation } from '../../Components/Validation/UserValidation';
import { changePasswordAction } from '../../Redux/Actions/userActions';
import toast from 'react-hot-toast';

const Password = () => {
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);

    const dispatch = useDispatch();
    
    const { isLoading, isError, message, isSuccess } = useSelector (
        (state) => state.userChangePassword
    );

    // validate user
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({ resolver: yupResolver(PasswordValidation)});

    // on submit
    // const onSubmit = (data) => {
    //     dispatch(changePasswordAction(data))
    // }
    const onSubmit = (data) => {
        const { newPassword, confirmPassword } = data;
    
        // Check if new password and confirm password match
        if (newPassword !== confirmPassword) {
            // If they don't match, trigger an error
            toast.error("New password and confirm password must match");
        } else {
            // If they match, dispatch the changePasswordAction
            dispatch(changePasswordAction(data));
        }
    };

    //useEffect
    useEffect(() => {
        if (isSuccess) {
            dispatch({ type: "USER_CHANGE_PASSWORD_RESET"})
        }
        // if (isError && !userInfo) {  
        //     toast.error(isError);
        //     dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
        //   }
        if (isError) {  
            toast.error(isError);
            dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
        }
        if (message) {  
            toast.success(message);
            reset();
        }
    }, [isSuccess, isError, message, reset, dispatch]);


  return (
    <Sidebar>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <h2 className="font-semibold text-x">
                Change Password
            </h2>
            {/* <LoginInputs 
                label="Current Password" 
                placeholder="Enter your current password" 
                type="password" 
                bg={true}
            />
            <LoginInputs 
                label="Re-enter Password" 
                placeholder="Re-enter your current password" 
                type="password" 
                bg={true}
            />
            <LoginInputs
                label="New Password" 
                placeholder="Enter your new password" 
                type="password" 
                bg={true}
            /> */}

            <div className="w-full">
                <div className="relative">
                    <LoginInputs
                        label="Current Password"
                        placeholder="Enter your current password"
                        type={showPassword1 ? "text" : "password"}
                        bg={true}
                        name="oldPassword"
                        register={register("oldPassword")}
                    />
                    <button
                        type="button"
                        className="absolute right-[16px] top-[58px] transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword1(!showPassword1)}
                    >
                    {showPassword1 ? <IoEye className='w-6 h-6 text-border'/> : <IoEyeOff className='w-6 h-6 text-border'/>}
                    </button>
                </div>
                    {errors.oldPassword && <InlineError text={errors.oldPassword.message} />}
            </div>

            <div className="w-full">
                <div className="relative">
                    <LoginInputs
                        label="New Password"
                        placeholder="Enter your new password"
                        type={showPassword2 ? "text" : "password"}
                        bg={true}
                        name="newPassword"
                        register={register("newPassword")}
                    />
                    <button
                        type="button"
                        className="absolute right-[16px] top-[58px] transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword2(!showPassword2)}
                    >
                    {showPassword2 ? <IoEye className='w-6 h-6 text-border'/> : <IoEyeOff className='w-6 h-6 text-border'/>}
                    </button>
                </div>
                    {errors.newPassword && <InlineError text={errors.newPassword.message} />}
            </div>

            <div className="w-full">
                <div className="relative">
                    <LoginInputs
                        label="Confirm Password"
                        placeholder="Re-enter your new password"
                        type={showPassword3 ? "text" : "password"}
                        bg={true}
                        name="confirmPassword"
                        register={register("confirmPassword")}
                    />
                    <button
                        type="button"
                        className="absolute right-[16px] top-[58px] transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword3(!showPassword3)}
                    >
                    {showPassword3 ? <IoEye className='w-6 h-6 text-border'/> : <IoEyeOff className='w-6 h-6 text-border'/>}
                    </button>
                </div>
                    {errors.confirmPassword && <InlineError text={errors.confirmPassword.message} />}
            </div>

            {/* Change Password btn */}
            <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
                <button
                    type='submit'
                    disabled={isLoading} 
                    className="bg-main transitions hover:bg-green-600 border border-green-600 text-white py-[11px] px-6 rounded-md w-full sm:w-auto"
                >
                    {isLoading ? "Changing" : "Change Password"}
                </button>
            </div>
        </form>
    </Sidebar>
  )
}

export default Password