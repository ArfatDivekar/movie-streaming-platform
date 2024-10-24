import toast from "react-hot-toast";
import Axios from "./Axios";

const uploadImageService = async (file, setLoading) => {
    try {
        setLoading(true);;
        const {data} = await Axios.post("/upload", file);
        setLoading(false);
        toast.success("File uploaded successfully");
        return data;
    } catch (error) {
        setLoading(false);
        toast.error("Something went wrong");
    }
};

export { uploadImageService };

// import toast from "react-hot-toast";
// import firebase from 'firebase/app';
// import { getStorage } from "firebase-admin/storage";



// const uploadImageService = async (file, setLoading) => {
//     try {
//         setLoading(true);
//         const storageRef = getStorage.ref();
//         const fileRef = storageRef.child(file.get("file").name);
        
//         // Upload the file
//         await fileRef.put(file.get("file"));

//         // Get the download URL
//         const downloadURL = await fileRef.getDownloadURL();

//         setLoading(false);
//         toast.success("File uploaded successfully");
        
//         return downloadURL;
//     } catch (error) {
//         setLoading(false);
//         toast.error("Something went wrong");
//     }
// };

// export { uploadImageService };
