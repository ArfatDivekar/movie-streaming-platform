import axios from "axios";

const Axios = axios.create({
  baseURL: "https://movie-streaming-platform-s25p.onrender.com/api",
});

export default Axios;
