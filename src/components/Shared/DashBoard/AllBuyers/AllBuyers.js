import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';
import Loader from '../../../Loader/Loader';
import DeleteModal from '../DeleteModal/DeleteModal';

const AllBuyers = () => {
	const { loading } = useContext(AuthContext);
	const [deletingUser, setDeletingUser] = useState(null);
	console.log('deletingUser', deletingUser);

	//! fetch for getting products data from mongodb.....

	const url = 'https://assignment-twelve-server.vercel.app/usersroleBuyers';

	const { data: usersroleBuyers = [], refetch } = useQuery({
		queryKey: ['usersroleBuyers'],
		queryFn: async () => {
			const res = await fetch(url);
			const data = await res.json();
			return data;
		},
	});

	//! Cancel Button of modal...
	const closeModal = () => {
		setDeletingUser(null);
	};

	//! Delete button of modal...
	const handleDeleteUser = (buyer) => {
		console.log('buyer', buyer?._id);
		fetch(`https://assignment-twelve-server.vercel.app/Buyer/${buyer?._id}`, {
			method: 'DELETE',
			headers: {
				authorization: `${localStorage.getItem('userAccessToken')}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.deletedCount > 0) {
					toast.success(`${buyer?.email} delete successfully!!`);
				}
				refetch();
			});
	};

	if (loading) {
		return <Loader></Loader>;
	}

	// console.log(usersroleBuyers);
	return (
		<div>
			<h1>All Buyers here</h1>
			<div className='lg:overflow-x-auto lg:w-full w-[100vw]'>
				<table className='table w-full'>
					<thead>
						<tr>
							<th>User</th>
							<th>Role</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{usersroleBuyers &&
							usersroleBuyers?.map((buyer) => (
								<tr>
									<td>
										<div className='flex items-center space-x-3'>
											<div className='avatar'>
												<div className='mask mask-squircle w-12 h-12'>
													<img
														src={buyer?.photoURL}
														alt='Avatar Tailwind CSS Component'
													/>
												</div>
											</div>
											<div>
												<div className='font-bold'>{buyer?.name}</div>
												<div className='text-sm opacity-50'>{buyer?.email}</div>
											</div>
										</div>
									</td>
									<td>
										{buyer.role}
										<br />
										<span className='badge badge-ghost badge-sm'>
											**********
										</span>
									</td>

									<th>
										<label
											onClick={() => setDeletingUser(buyer)}
											htmlFor='confirmation-modal'
											className='btn btn-sm text-white border-0 bg-red-500 hover:bg-red-700'
										>
											Delete
										</label>
									</th>
								</tr>
							))}
					</tbody>
				</table>
			</div>

			{deletingUser && (
				<DeleteModal
					deletingUser={deletingUser}
					image={deletingUser?.photoURL}
					name={deletingUser?.name}
					email={deletingUser?.email}
					closeModal={closeModal}
					successAction={handleDeleteUser}
				></DeleteModal>
			)}
		</div>
	);
};

export default AllBuyers;
