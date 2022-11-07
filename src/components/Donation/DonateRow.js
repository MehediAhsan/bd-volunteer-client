import React from 'react';

const DonateRow = ({donate, handleDelete}) => {
    const {_id, eventName, donar, phone, email} = donate;
    return (
        <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
            <td className="p-3">
                <button onClick={() => handleDelete(_id)} className='bg-gray-700 p-2'>X</button>
            </td>
            <td className="p-3">
                <p>{eventName}</p>
            </td>
            <td className="p-3">
                <p>{donar}</p>
                <p className="dark:text-gray-400">{phone}</p>
            </td>
            <td className="p-3">
                <p>{email}</p>
            </td>
            <td className="p-3">
                <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">
                    <span>Pending</span>
                </span>
            </td>
        </tr>
           
    );
};

export default DonateRow;