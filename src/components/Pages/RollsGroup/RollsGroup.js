import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import Loader from '../../Loader/Loader';
import { Checkmark } from 'react-checkmark';
import BookModal from '../../Shared/BookModal/BookModal';
import toast from 'react-hot-toast';

const RollsGroup = () => {
	const [selected, setSelected] = useState(null);
	const { logUser, loading, user } = useContext(AuthContext);
	const time = String(new Date()).slice(8, 21);
	//! fetch for getting rollsDatas data from mongodb.....
	const { data: rollsDatas } = useQuery({
		queryKey: ['rollsDatas'],
		queryFn: async () => {
			try {
				const res = await fetch(
					'https://assignment-twelve-server.vercel.app/rollsDatas'
				);
				const data = await res.json();
				return data;
			} catch (err) {
				console.error(err);
			}
		},
	});

	const handleWishList = (id) => {
		// alert(id)
		fetch(`https://assignment-twelve-server.vercel.app/productById/${id}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);

				const wishData = {
					author: data.author,
					authorEmail: data.email,
					productImage: data.image,
					authorLocation: data.location,
					originalPrice: data.originalPrice,
					resalePrice: data.resalePrice,
					postedTime: data.time,
					productTitle: data.title,
					yearOfPurchase: data.yearOfPurchase,
					yearsOfUse: data.yearsOfUse,
					category: data.category,
					description: data.description,
					email: user.email,
					wishTime: time,
					wisher: logUser.role,
				};

				if (data) {
					fetch('https://assignment-twelve-server.vercel.app/wishLists', {
						method: 'POST',
						headers: {
							'content-type': 'application/json',
						},
						body: JSON.stringify(wishData),
					})
						.then((res) => res.json())
						.then((ad) => {
							// console.log(ad);
							toast.success(
								'You are successfully added your new wishing product'
							);
						});
				}
			});
	};

	if (loading) {
		return <Loader></Loader>;
	}
	// console.log(logUser)
	return (
		<div>
			<img
				src='rolls-royce-mtu.png'
				alt='tesla banner'
				className='w-[500px] hidden my-3 ml-[30%] lg:block h-[200px]'
			/>

			<div className='grid grid-cols-1 my-5 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{rollsDatas?.map((rollsData) => (
					<div className='card w-96 bg-base-100 shadow-xl'>
						<figure>
							<img
								className='w-full h-[200px]'
								src={rollsData?.image}
								alt='Shoes'
							/>
						</figure>
						<div className='card-body'>
							<h2 className='card-title'>Brand Name: {rollsData?.title}</h2>
							<p className='text-start'>
								Exposure time :{' '}
								<span className='text-blue-600'>{rollsData?.time}</span>
							</p>

							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Category :
								</span>
								{rollsData.category}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Location :
								</span>
								{rollsData.location}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Original Price :
								</span>
								{rollsData.originalPrice}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Resale Price :
								</span>
								{rollsData.resalePrice}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Years of use :
								</span>
								{rollsData.yearsOfUse}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Year of Purchase :
								</span>
								{rollsData.yearOfPurchase}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Description :
								</span>
								{rollsData.description}
							</p>

							{rollsData.author && (
								<p className='text-start flex'>
									<span className='text-bold text-gray-800 text-xl'>
										Seller :
									</span>
									<span className='flex ml-2'>
										{rollsData.author} <Checkmark size='small' color='blue' />
									</span>
								</p>
							)}

							<div className='card-actions justify-end'>
								<button>
									<label
										onClick={() => setSelected(rollsData)}
										htmlFor='booking-modal'
										className='btn bg-green-500 hover:bg-green-600 border-0 text-white'
									>
										Book Now
									</label>
								</button>
								<button>
									<label
										onClick={() => handleWishList(rollsData?._id)}
										className='btn bg-lime-500 hover:bg-lime-600 border-0 text-white'
									>
										Add to wish list
									</label>
								</button>
							</div>
						</div>
						<BookModal selected={selected}></BookModal>
					</div>
				))}
			</div>
		</div>
	);
};

export default RollsGroup;
