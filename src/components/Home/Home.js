import React, { useEffect, useState } from 'react';
import Event from './Event';
import HomeTop from './HomeTop';

const Home = () => {
    const [events, setEvents] = useState([])
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10);

    useEffect(() => {
        fetch(`http://localhost:5000/events?page=${page}&size=${size}`)
        .then(res => res.json())
        .then(data => {
            setCount(data.count)
            setEvents(data.events)
        })
    }, [page, size])

    const pages = Math.ceil(count / size);

    return (
        <div>
            <HomeTop></HomeTop>
            <div>
                <h1 className='text-4xl text-center font-semibold mb-20'>Total Events: {count}</h1>
                <div className='grid grid-cols-3 gap-6 px-20'>
                {
                    events.map(event => <Event key={event._id} event={event}></Event>)
                }
                </div>
            </div>
            <div className='text-center my-10'>
                {/* <p>Selected page : {page} and size: {size}</p> */}
                <button className='mr-1 w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-700 dark:border-gray-800 text-white' onClick={() => {page > 0 && setPage(page-1)}}>{"<"}</button>
                {
                    [...Array(pages).keys()].map(number => <button
                    key={number}
                    className={page === number ? 'mr-1 w-8 h-8 text-sm font-semibold border-2 rounded shadow-md dark:bg-gray-900 dark:text-white dark:border-violet-600' : 'mr-1 w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-700 dark:border-gray-800 text-white'}
                    onClick={() => setPage(number)}
                    >
                        {number+1}
                    </button>)
                }
                <button className='mr-1 w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-700 dark:border-gray-800 text-white' onClick={() => {Array(pages).length - 1 > page && setPage(page+1)}}>{">"}</button>
                <select onChange={event => setSize(event.target.value)} defaultValue={size}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Home;