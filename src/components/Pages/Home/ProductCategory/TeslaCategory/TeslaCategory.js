import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';

const TeslaCategory = () => {
	// //! fetch for getting Tesla from mongodb.....
	const { data: teslas } = useQuery({
		queryKey: ['teslas'],
		queryFn: async () => {
			try {
				const res = await fetch(
					'https://assignment-twelve-server.vercel.app/teslas'
				);
				const data = await res.json();
				return data;
			} catch (err) {
				console.error(err);
			}
		},
	});
	// console.log(teslas);
	return (
		<div>
			<h1 className='mt-16 text-gray-800 font-serif font-bold text-2xl'>
				TESLA
			</h1>
			<div className='grid grid-cols-1 my-5 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{teslas?.map((data) => (
					<div className='card w-96 bg-base-100 shadow-xl'>
						<img className='w-full h-72' src={data?.image} alt='Shoes' />
						<div className='card-body'>
							<h2 className='card-title'>
								<span className='font-bold text-gray-800 font-serif'>
									Brand :
								</span>
								{data?.category}
							</h2>
							<p className='text-start'>
								<span className='font-bold text-gray-800 font-serif'>
									Model :
								</span>
								{data?.title}
							</p>
							<p className='text-start'>
								<span className='font-bold text-gray-800 font-serif'>
									Poste Time :
								</span>
								<span className='text-blue-600'>{data?.time}</span>
							</p>
							<p className='text-start'>
								<span className='font-bold text-gray-800 font-serif'>
									Seller Location :{' '}
								</span>
								{data?.location}
							</p>
							<p className='text-start'>
								<span className='font-bold text-gray-800 font-serif'>
									Resell Price :{' '}
								</span>
								{data?.resalePrice}
							</p>
							<p className='text-start'>
								<span className='font-bold text-gray-800 font-serif'>
									Original Price :{' '}
								</span>
								{data?.originalPrice}
							</p>
							<p className='text-start'>
								<span className='font-bold text-gray-800 font-serif'>
									Years of use :{' '}
								</span>
								{data?.yearsOfUse}
							</p>
							<p className='text-start'>
								<span className='font-bold text-gray-800 font-serif'>
									year of Purchase
								</span>
								{data?.yearOfPurchase}
							</p>
							<p className='text-start'>
								<span className='font-bold text-gray-800 font-serif'>
									Description :{' '}
								</span>
								{data?.description}
							</p>
						</div>
					</div>
				))}
			</div>
			<button className='btn bg-blue-500 hover:bg-blue-600 border-0 text-white'>
				<Link to='/tesla'>See More</Link>
			</button>
		</div>
	);
};

export default TeslaCategory;
