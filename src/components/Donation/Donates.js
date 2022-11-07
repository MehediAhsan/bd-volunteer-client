import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthProvider';
import DonateRow from './DonateRow';

const Donates = () => {
    const {user, logOut} = useContext(AuthContext);
    const [donates, setDonates] = useState([]);

    useEffect( () => {
        fetch(`http://localhost:5000/donates?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
        .then( res => {
            if(res.status === 401 || res.status === 403){
                return logOut();
            }
            return res.json()
        })
        .then( data => setDonates(data))
    }, [user?.email, logOut])



    function handleDelete(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/donates/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            );
                            const remaining = donates.filter(dnt => dnt._id !== id);
                            setDonates(remaining);
                        }
                    });
            }
        });
    }

    const handleStatusUpdate = id => {
        fetch(`http://localhost:5000/donates/${id}`, {
            method: 'PATCH', 
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({status: 'Approved'})
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0) {
                const remaining = donates.filter(odr => odr._id !== id);
                const approving = donates.find(odr => odr._id === id);
                approving.status = 'Approved'

                const newDonates = [approving, ...remaining];
                setDonates(newDonates);
            }
        })
    }



    return (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
	<h2 className="mb-4 text-2xl text-gray-800 font-semibold leading-tight">You have {donates.length} donates</h2>
	<div className="overflow-x-auto">
		<table className="min-w-full text-xs">
			
			<thead className="dark:bg-gray-700">
				<tr className="text-left">
					<th className="p-3"></th>
					<th className="p-3">Event Name</th>
					<th className="p-3">Donar</th>
					<th className="p-3">Email</th>
					<th className="p-3">Status</th>
				</tr>
			</thead>
			<tbody>
				{
                    donates.map(donate => <DonateRow
                    key={donate._id}
                    donate={donate}
                    handleDelete={handleDelete}
                    handleStatusUpdate={handleStatusUpdate}
                    ></DonateRow>)
                }
			</tbody>
		</table>
	</div>
</div>
    );
};

export default Donates;