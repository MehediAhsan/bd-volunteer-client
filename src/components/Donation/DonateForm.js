import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const DonateForm = () => {
    const {_id, title} = useLoaderData();
    const {user} = useContext(AuthContext);

    const handleDonateConfirm = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = user?.email;
        const phone = form.phone.value;
        const message = form.message.value;
        console.log(name,email,phone,message,title);
    }

    return (
        <div className="p-6 dark:text-gray-100">
            <form onSubmit={handleDonateConfirm} novalidate="" className="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md shadow dark:bg-gray-700 ng-untouched ng-pristine ng-valid">
                <h2 className="w-full text-3xl font-semibold leading-tight">You are about to donate "{title}"</h2>
                <div>
                    <label for="name" className="block mb-1 ml-1">Name</label>
                    <input id="name" type="text" name='name' defaultValue={user?.displayName} placeholder="Your name" required="" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 dark:bg-gray-800" />
                </div>
                <div>
                    <label for="email" className="block mb-1 ml-1">Email</label>
                    <input id="email" type="email" name='email' defaultValue={user?.email} readOnly placeholder="Your email" required="" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 dark:bg-gray-800" />
                </div>
                <div>
                    <label for="phone" className="block mb-1 ml-1">Phone</label>
                    <input id="phone" type="text" name='phone' placeholder="Your Phone No." required="" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 dark:bg-gray-800" />
                </div>
                <div>
                    <label for="message" className="block mb-1 ml-1">Message</label>
                    <textarea id="message" type="text" name='message' placeholder="Message..." className="block w-full p-2 rounded autoexpand focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 dark:bg-gray-800"></textarea>
                </div>
                <div>
                    <button type="submit" className="w-full px-4 py-2 font-semibold rounded shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 dark:bg-blue-500 focus:ring-blue-400 hover:ring-blue-600 dark:text-gray-900">Donate Confirm</button>
                </div>
            </form>
        </div>
    );
};

export default DonateForm;