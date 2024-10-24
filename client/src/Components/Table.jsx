import React from "react";
import { FaEdit, FaPlay, FaDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Head = "text-sm text-left text-main font-semibold px-5 py-3 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";

const Rows = (movie, i, onDeleteHandler, admin, downloadVideo, progress) => {
  return (
    <tr key={i}>
      <td className={`${Text}`}>
        <div className="w-12 bg-dry border border-border h-12 rounded overflow-hidden">
          <img
            src={movie?.cardImage ? movie?.cardImage : "/images/user.png"}
            alt={movie?.name}
            className="h-full w-full object-cover"
          />
        </div>
      </td>
      <td className={`${Text} truncate`}>{movie.name}</td>
      <td className={`${Text} truncate`}>{movie.category}</td>
      <td className={`${Text} truncate`}>{movie.language}</td>
      <td className={`${Text} truncate`}>{movie.year}</td>
      <td className={`${Text} truncate`}>{movie.time}</td>
      <td className={`${Text} flex-right flex-rows gap-2 mt-3`}>
        {admin ? (
          <>
            <Link
              to={`/edit-movie/${movie?._id}`}
              className="border border-border bg-dry flex-rows gap-2 w-6 h-6  text-border rounded "
            >
              <FaEdit className="text-green-500" />
            </Link>

            <button
              onClick={() => onDeleteHandler(movie?._id)}
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <MdDelete />
            </button>
          </>
        ) : (
          <>
            <button
              disabled={progress > 0 && progress < 100}
              onClick={() => downloadVideo(movie?.video, movie?.name)}
              className="border border-border bg-dry flex-rows gap-2 w-6 h-6 text-border rounded "
            >
              <FaDownload className="text-green-500" />
            </button>
            <Link
              to={`/movie/${movie.name}`}
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <FaPlay />
            </Link>
          </>
        )}
      </td>
    </tr>
  );
};

const Table = ({ data, admin, onDeleteHandler, downloadVideo, progress }) => {
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full scrollbar-thin scrollbar-thumb-main scrollbar-track-dry hover:scrollbar-thumb-subMain hover:scrollbar-track-dryGray">
      <table className="w-full table-auto border border-border divide-y rounded divide-border">
        <thead className="rounded-xl">
          <tr className="bg-dryGray">
            <th scope="col" className={`${Head}`}>
              Image
            </th>
            <th scope="col" className={`${Head}`}>
              Name
            </th>
            <th scope="col" className={`${Head}`}>
              Category
            </th>
            <th scope="col" className={`${Head}`}>
              Language
            </th>
            <th scope="col" className={`${Head}`}>
              Year
            </th>
            <th scope="col" className={`${Head}`}>
              Hours
            </th>
            <th scope="col" className={`${Head} text-end`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((movie, i) =>
            Rows(movie, i, onDeleteHandler, admin, downloadVideo, progress)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
