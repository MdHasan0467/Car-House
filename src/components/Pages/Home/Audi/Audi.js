import React, { useContext, useState } from 'react';
import BookModal from '../../../Shared/BookModal/BookModal';
import { Checkmark } from 'react-checkmark';
import { AuthContext } from '../../../Context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Loader from '../../../Loader/Loader';

const Audi = () => {
	const { logUser, loading, user } = useContext(AuthContext);
	const [selected, setSelected] = useState(null);
	const [author, setAuthor] = useState(null);
	const time = String(new Date()).slice(8, 21);
	//! fetch for getting audiDatas data from mongodb.....
	const { data: audiDatas = [] } = useQuery({
		queryKey: ['audiDatas'],
		queryFn: async () => {
			try {
				const res = await fetch('http://localhost:5000/audiDatas');
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
		fetch(`http://localhost:5000/productById/${id}`)
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
					fetch('http://localhost:5000/wishLists', {
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
				src='audi_banner.png'
				alt='audi-logo'
				className='w-[500px] hidden my-3 ml-[30%] lg:block h-[200px]'
			/>

			<div className='grid grid-cols-1 my-5 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{audiDatas?.map((audiData) => (
					<div className='card w-96 bg-base-100 shadow-xl'>
						<figure>
							<img
								className='w-full h-[200px]'
								src={audiData?.image}
								alt='Shoes'
							/>
						</figure>
						<div className='card-body'>
							<h2 className='card-title'>Brand Name: {audiData?.title}</h2>
							<p className='text-start'>
								Exposure time :{' '}
								<span className='text-blue-600'>{audiData?.time}</span>{' '}
							</p>

							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Category :
								</span>
								{audiData.category}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Location :
								</span>
								{audiData.location}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Original Price :
								</span>
								{audiData.originalPrice}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Resale Price :
								</span>
								{audiData.resalePrice}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Years of use :
								</span>
								{audiData.yearsOfUse}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Year of Purchase :
								</span>
								{audiData.yearOfPurchase}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Description :
								</span>
								{audiData.description}
							</p>

							{audiData.author && (
								<p className='text-start flex'>
									<span className='text-bold text-gray-800 text-xl'>
										Seller :
									</span>
									<span className='flex ml-2'>
										<p>{audiData.author}</p>
										<p>
											<Checkmark size='small' color='blue' />
										</p>
									</span>
								</p>
							)}

							<div className='card-actions justify-end'>
								<button>
									<label
										onClick={() => setSelected(audiData)}
										htmlFor='booking-modal'
										className='btn bg-green-500 hover:bg-green-600 border-0 text-white'
									>
										Book Now
									</label>
								</button>
								<button>
									<label
										onClick={() => handleWishList(audiData?._id)}
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

export default Audi;
