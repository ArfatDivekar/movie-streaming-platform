import toast from "react-hot-toast";
import Axios from "../Redux/APIs/Axios"
import { FaDownload } from "react-icons/fa";

// Download movies url functionality
const DownloadVideo = async (videoUrl, setProgress) => {
    const { data } = await Axios({
        url: videoUrl,
        method: "GET",
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
            setProgress(percent);
            if(percent > 0 && percent < 100) {
                toast.loading(`Downloading... ${percent}%`, {
                    id: "download",
                    duration: 100000000,
                    position: "bottom-right",
                    style: {
                        background: "#0B0F29",
                        color: "#fff",
                        borderRadius: "10px",
                        border: ".5px solid #F20000",
                        padding: "15px",
                    },
                    icon: <FaDownload className="text-2xl mr-2 text-subMain"/>
                })
            }
            else {
                toast.dismiss("download")
            }
        },
    });
    return data;
}

export { DownloadVideo }