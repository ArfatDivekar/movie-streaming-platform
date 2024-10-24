import React from 'react'
import { Notfound } from '../Components/assets'
import Layout from '../Layout/Layout'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex-colo gap-6 w-full xl:min-h-screen h-full text-white bg-main py-8 lg:py-20 px-6">
        <div className=" grid xl:flex w-full border-2 border-border p-6 rounded-xl bg-dry text-main">
          <div className=' w-full xl:mt-10'>
            <h1 className='flex justify-center font-sans text-3xl xl:text-5xl xl:mt-24 mt-8 font-bold text-white w-full '>
              Page not found !!
            </h1>
            <p className='flex justify-center font-sans text-lg xl:text-2xl xl:mt-10 mt-6 font-normal text-white text-center w-full '>
              You are trying to access the page which doesn't exist
            </p>
            <button onClick={() => navigate(-1)} className='xl:ml-64 xl:mt-8 ml-[68px] my-4 bg-subMain hover:text-white flex-rows gap-2 transitions font-medium text-white rounded px-8 py-3 text-sm'>
            <IoMdArrowRoundBack/> Go back
            </button>
          </div>
          <img 
            src={Notfound} 
            alt="Not found" 
            className='w-full h-[12rem] xl:h-[28rem] object-contain'/>
        </div>

      </div>
    </Layout>
  )
}

export default NotFound