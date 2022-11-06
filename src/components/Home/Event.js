import React from 'react';
import { Link } from 'react-router-dom';

const Event = ({event}) => {
    const {_id, title, img} = event;
    return (
        <Link to={`/event/${_id}`} aria-label="View Item">
            <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
                <img
                className="object-cover w-full h-56 md:h-64 xl:h-80"
                src={img}
                alt=""
                />
                <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-blue-700 bg-opacity-80">
                <p className="text-lg font-medium tracking-wide text-white">
                    {title}
                </p>
                </div>
            </div>
        </Link>
    );
};

export default Event;