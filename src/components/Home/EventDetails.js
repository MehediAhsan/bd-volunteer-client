import React from 'react';
import { useLoaderData } from 'react-router-dom';

const EventDetails = () => {
    const event = useLoaderData();
    const {title, img, description} = event;
    return (
        <div>
           <div className='flex flex-col gap-10'>
            <h1 className='text-3xl text-center font-semibold'>{title}</h1>
            <img src={img} alt="" />
            <p>{description}</p>
           </div>
           <button className='bg-blue-700 hover:bg-blue-800 text-white p-2 px-4 rounded max-w-xs my-10'>Donate Now</button> 
        </div>
    );
};

export default EventDetails;