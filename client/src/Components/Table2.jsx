import React from 'react'
import { FaEdit  } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { noProfile } from './assets';
import { DateFormat, shortenId } from './Notifications/Empty';

const Head = "text-sm text-left text-main font-semibold px-5 py-3 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3"

const Rows = ({data, users, onEditFunction, onDeleteFunction}) => {
    return (
        <tr>

            {/* Users */}
            {
                users ? (
                    <>
                        <td className={`${Text}`}>
                            <div className="w-12 bg-dry border border-border h-12 rounded overflow-hidden">
                                <img 
                                    src={`${data?.image ? data.image : noProfile}`}
                                    alt={data?.fullName}
                                    className='h-full w-full object-cover'
                                />
                            </div>
                        </td>
                        <td className={`${Text}`}>{data?._id ? shortenId(data._id) : "2563"}</td>
                        <td className={`${Text}`}>{DateFormat(data?.createdAt)}</td>
                        <td className={`${Text}`}>{data?.fullName}</td>
                        <td className={`${Text}`}>{data?.email}</td>
                        <td className={`${Text}`}>{data?.isAdmin ? "Admin" : "User"}</td>
                        <td className={`${Text} flex-right flex-rows gap-2 mt-3`}>
                            {
                                !data.isAdmin && (
                                    <button 
                                        onClick={() => onDeleteFunction(data?._id)}
                                        className="bg-subMain text-white rounded flex-colo w-6 h-6">
                                        <MdDelete />
                                    </button>
                                )
                            }
                            
                        </td>
                    </>
                ) : (
                    
                    // Categories
                    <>
                        <td className={`${Text} font-bold`}>{data?._id ? shortenId(data._id) : "2R5T78"}</td>
                                                    {/* OR THIS */}
                                                    {/* OR THIS */}
                        {/* <td className={`${Text} font-bold`}>2563</td> */}

                        <td className={`${Text}`}>{DateFormat(data?.createdAt)}</td>
                        <td className={`${Text}`}>{data.title}</td>
                        <td className={`${Text} flex-right flex-rows gap-2 my-1`}>
                            <button 
                                onClick={() => onEditFunction(data)} 
                                className="border border-border bg-dry flex-rows gap-2 w-6 h-6  text-border rounded ">
                                <FaEdit className='text-green-500'/>
                            </button>

                            <button 
                                onClick={() => onDeleteFunction(data?._id)}
                                className="bg-subMain text-white rounded flex-colo w-6 h-6">
                                <MdDelete />
                            </button>
                        </td>
                    </>
                )
            }

        </tr>
    )
}



const Table2 = ({ data, users, onEditFunction, onDeleteFunction }) => {

  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full scrollbar-thin scrollbar-thumb-main scrollbar-track-dry hover:scrollbar-thumb-subMain hover:scrollbar-track-dryGray">
        <table className='w-full table-auto border border-border divide-y rounded divide-border'>
            <thead>
                <tr className='bg-dryGray'>
                    {
                        users ? (
                            <>
                                <th scope='col' className={`${Head}`}>
                                    Image
                                </th>
                                <th scope='col' className={`${Head}`}>
                                    Id
                                </th>
                                <th scope='col' className={`${Head}`}>
                                    Date
                                </th>
                                <th scope='col' className={`${Head}`}>
                                    Full name
                                </th>
                                <th scope='col' className={`${Head}`}>
                                    Email
                                </th>
                                <th scope='col' className={`${Head}`}>
                                    Type
                                </th>
                            </>
                        ) : (
                            
                            <>
                                <th scope='col' className={`${Head}`}>
                                    Id
                                </th>
                                <th scope='col' className={`${Head}`}>
                                    Date
                                </th>
                                <th scope='col' className={`${Head}`}>
                                    Name
                                </th>
                            </>
                        )
                    }

                            <th scope='col' className={`${Head} text-center`}>
                                Actions
                            </th>
                    
                </tr>
            </thead>
            <tbody className='bg-main divide-y divide-gray-800'>
                {
                    data.map((data, i) => (
                        <Rows 
                            key={i}
                            data={data}
                            users={users}
                            onEditFunction={onEditFunction}
                            onDeleteFunction={onDeleteFunction}
                        />
                    ))
                }
            </tbody>
        </table>

    </div>
  )
}

export default Table2