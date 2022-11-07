import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import DonateRow from './DonateRow';

const Donates = () => {
    const [donates, setDonates] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/donates')
        .then(res => res.json())
        .then(data => setDonates(data))
    }, [])


    const handleDelete = id => {
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
                .then(data =>{
                    if(data.deletedCount > 0){
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )
                        const remaining = donates.filter(dnt => dnt._id !== id);
                        setDonates(remaining);
                    }
                })
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
                    ></DonateRow>)
                }
			</tbody>
		</table>
	</div>
</div>
    );
};

export default Donates;