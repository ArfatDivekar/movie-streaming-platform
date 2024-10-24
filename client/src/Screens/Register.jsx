import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { LoginInputs } from '../Components/UsedInputs'
import { Logo } from '../Components/assets/'
import { Link, useNavigate } from 'react-router-dom'
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux'
import { registerAction } from '../Redux/Actions/userActions'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { RegisterValidation } from '../Components/Validation/UserValidation'
import { InlineError } from '../Components/Notifications/Error'
import { IoEye, IoEyeOff  } from "react-icons/io5";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isError, userInfo, isSuccess } = useSelector (
        (state) => state.userRegister
    );

    // validate user
    const { register, handleSubmit, formState: { errors}, } = useForm({ resolver: yupResolver(RegisterValidation),});

    // on submit
    const onSubmit = (data) => {
        dispatch(registerAction(data))
    }

    const [showPassword, setShowPassword] = useState(false);

    //useEffect
    useEffect(() => {
        if (userInfo?.isAdmin) {
            navigate("/dashboard")
        }
        else if (userInfo) {
            navigate("/profile")
        }
        if (isSuccess) {
            toast.success(`Welcome ${userInfo?.fullName}`);
            dispatch({ type: "USER_REGISTER_RESET" });
        }
        if (isError && !userInfo) {  // Add a check here to avoid showing error toast when logging out
            toast.error(isError);
            dispatch({ type: "USER_REGISTER_RESET" });
          }
    }, [userInfo, isSuccess, isError, navigate, dispatch]);

  return (
    <Layout>
    <div className="container mx-auto px-2 my-12 flex-colo">
        <form onSubmit={handleSubmit(onSubmit)}  className="w-full xl:w-2/5 flex-colo gap-8 p-14 md:w-3/5 bg-dry rounded-lg border border-border ">
            <img 
                src={Logo} 
                alt="logo" 
                className='w-full h-12 object-contain'
            />

            <div className="w-full">

                {/* Name input box */}
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


            {/* Password input box */}
            {/* <div className="w-full">

                <LoginInputs 
                    label="Password" 
                    placeholder="Enter your password" 
                    type="password"
                    name="password"
                    register={register("password")}
                    bg={true}
                />

                {errors.password && <InlineError text={errors.password.message}/>}

            </div> */}
            {/* Password input box */}
            <div className="w-full">
                <div className="relative">
                    <LoginInputs
                        label="Password"
                        placeholder="*******"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        register={register("password")}
                        bg={true}
                    />
                    <button
                        type="button"
                        className="absolute right-[16px] top-[58px] transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? <IoEye className='w-6 h-6 text-border'/> : <IoEyeOff className='w-6 h-6 text-border'/>}
                    </button>
                </div>
                    {errors.password && <InlineError text={errors.password.message} />}
            </div>

            {/* Signup btn */}
            <button type='submit' className='w-full bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg'>
                {/* <FiLogIn/>Sign Up */}
                {
                    // if loading show loading
                    isLoading ? ("Loading") : (<><FiLogIn/>Sign Up</>)
                }
            </button>

            {/* Dont have acc btn */}
            <p className='text-center text-border'>
                Already have an account?{" "}
                <Link to="/login" className='text-dryGray font-semibold ml-2 hover:underline'>
                Login
                </Link>
            </p>
        </form>
    </div>
</Layout>
  )
}

export default Register