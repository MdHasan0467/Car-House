import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import Loader from '../../Loader/Loader';
import { Checkmark } from 'react-checkmark';
import BookModal from '../../Shared/BookModal/BookModal';
import toast from 'react-hot-toast';

const MercedesGroup = () => {
	const { logUser, loading, user } = useContext(AuthContext);
	const [selected, setSelected] = useState(null);
	const [author, setAuthor] = useState(null);
	const time = String(new Date()).slice(8, 21);
	//! fetch for getting mercedesDatas data from mongodb.....
	const { data: mercedesDatas = [] } = useQuery({
		queryKey: ['mercedesDatas'],
		queryFn: async () => {
			try {
				const res = await fetch(
					'https://assignment-twelve-server.vercel.app/mercedesDatas'
				);
				const data = await res.json();
				return data;
			} catch (err) {
				console.error(err);
			}
		},
	});
	console.log('author', author);

	const handleWishList = (id) => {
		// alert(id)
		fetch(`https://assignment-twelve-server.vercel.app/productById/${id}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setAuthor(data);

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
	console.log(logUser);
	return (
		<div>
			<img
				src='mercedes.banner.png'
				alt='tesla banner'
				className='w-[500px] hidden my-3 ml-[30%] lg:block h-[200px]'
			/>

			<div className='grid grid-cols-1 my-5 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{mercedesDatas?.map((mercedesData) => (
					<div className='card w-96 bg-base-100 shadow-xl'>
						<figure>
							<img
								className='w-full h-[200px]'
								src={mercedesData?.image}
								alt='Shoes'
							/>
						</figure>
						<div className='card-body'>
							<h2 className='card-title'>Brand Name: {mercedesData?.title}</h2>
							<p className='text-start'>
								Exposure time :{' '}
								<span className='text-blue-600'>{mercedesData?.time}</span>{' '}
							</p>

							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Category :
								</span>
								{mercedesData.category}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Location :
								</span>
								{mercedesData.location}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Original Price :
								</span>
								{mercedesData.originalPrice}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Resale Price :
								</span>
								{mercedesData.resalePrice}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Years of use :
								</span>
								{mercedesData.yearsOfUse}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Year of Purchase :
								</span>
								{mercedesData.yearOfPurchase}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Description :
								</span>
								{mercedesData.description}
							</p>

							{mercedesData.author && (
								<p className='text-start flex'>
									<span className='text-bold text-gray-800 text-xl'>
										Seller :
									</span>
									<span className='flex ml-2'>
										<p>{mercedesData.author}</p>
										<p>
											<Checkmark size='small' color='blue' />
										</p>
									</span>
								</p>
							)}

							<div className='card-actions justify-end'>
								<button>
									<label
										onClick={() => setSelected(mercedesData)}
										htmlFor='booking-modal'
										className='btn bg-green-500 hover:bg-green-600 border-0 text-white'
									>
										Book Now
									</label>
								</button>
								<button>
									<label
										onClick={() => handleWishList(mercedesData?._id)}
										className='btn bg-lime-500 hover:bg-lime-600 border-0 text-white'
									>
										Add To Wish List
									</label>
								</button>
							</div>
						</div>

						<BookModal
							selected={selected}
							setSelected={setSelected}
						></BookModal>
					</div>
				))}
			</div>
		</div>
	);
};

export default MercedesGroup;
