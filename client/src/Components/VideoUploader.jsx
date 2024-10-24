import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { IoCloudUpload } from "react-icons/io5";
import Loader from './Notifications/Loader';
import { uploadImageService } from '../Redux/APIs/ImageUploadService';

const VideoUploader = ({ setImageUrl }) => {
    const [loading, setLoading] = useState(false)

    //upload file
    const onDrop = useCallback(async (acceptedFiles) => {
        const file = new FormData()
        file.append("file", acceptedFiles[0])
        const data = await uploadImageService(file, setLoading);
        setImageUrl(data);
        console.log(data)
    },
    [setImageUrl]
    )


    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone ({
        multiple: false,
        // maxSize: 100000,
        // onDrop: ( acceptedFiles ) => {
        //     alert(acceptedFiles[0].name);
        // }
        onDrop,
    });
    
  return (
    <div className="w-full text-center cursor-pointer">
        {
            loading ? (
                <div className="px-6 w-full py-8 border-2 border-border border-dashed bg-dry rounded-md">
                    <Loader/>
                </div>

            ) : (

            <div 
                {...getRootProps()}
                className="px-6 py-8 pt-5 pb-6 border-2 border-border border-dashed bg-main rounded-lg">
                    <input {...getInputProps()} />
                    <span className="mx-auto flex-colo text-subMain text-3xl">
                        <IoCloudUpload />
                    </span>
                    <p className="text-sm mt-2">Drag your video here</p>
                    <em className='text-xs text-border'>
                        {isDragActive 
                            ? "Drop it here" 
                            : isDragReject 
                            ? "Unsupported file type..." 
                            : "only .mp4 and .mkv files will be accepted"
                        }
                    </em>
            </div>
            )
        }

    </div>
  )
}

export default VideoUploader