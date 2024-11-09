import { PuffLoader } from "react-spinners";

function Loader() {
  return (
    <div className="w-full py-4 px-2 flex-colo">
      <PuffLoader color="#F20000" />
      <p className="p-4">Please wait the data is loading...</p>
    </div>
  );
}

export default Loader;
