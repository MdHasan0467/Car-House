import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Advertisement = () => {
	// //! fetch for getting products data from mongodb.....
	const { data: animation } = useQuery({
		queryKey: ['animation'],
		queryFn: async () => {
			try {
				const res = await fetch(
					'http://localhost:5000/advertisement/categories/animation'
				);
				const data = await res.json();
				return data;
			} catch (err) {
				console.error(err);
			}
		},
	});
	// console.log(animation);

	// //! fetch for getting products data from mongodb.....
	const { data: categories } = useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			try {
				const res = await fetch(
					'http://localhost:5000/advertisement/categories'
				);
				const data = await res.json();
				return data;
			} catch (err) {
				console.error(err);
			}
		},
	});
	// console.log(categories);
	return (
		<div className='my-2'>
			<marquee className='bg-slate-300 shadow-xl'>
				<div className='flex '>
					{animation?.map((product) => (
						<div className='card w-80 h-52 bg-base-100 shadow-xl image-full mx-7'>
							<figure>
								<img className='w-[100%]' src={product?.image} alt='Shoes' />
							</figure>
							<div className='card-body'>
								<h2 className='card-title text-slate-200 font-serif'>
									{product?.category}
								</h2>
								<p className='text-slate-200 font-serif'>{product?.title}</p>
								<div className='card-actions justify-end'>
									<h1 className='text-2xl text-slate-200 font-serif font-semibold'>
										Buy Now ! Win Now !!
									</h1>
								</div>
							</div>
						</div>
					))}
				</div>
			</marquee>
			{categories?.length > 0 && (
				<>
					<h1 className='flex justify-start text-2xl text-gray-900 font-bold font-serif my-2 ml-5 underline'>
						Advertisement
					</h1>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{categories?.map((category) => (
							<div className='card w-96 glass'>
								<figure>
									<img
										className='w-full h-72 animate-pulse'
										src={category?.image}
										alt='car!'
									/>
								</figure>
								<div className='card-body'>
									<h2 className='card-title'>{category?.title}</h2>
									<p className='text-start'>
										<span>Brand Name :</span> {category?.category}
									</p>
									<p className='text-start'>
										<span>Resale Price:</span> {category?.resalePrice}
									</p>

									<div className='rating'>
										<input
											type='radio'
											name='rating-4'
											className='mask mask-star-2 bg-green-500'
										/>
										<input
											type='radio'
											name='rating-4'
											className='mask mask-star-2 bg-green-500'
											checked
										/>
										<input
											type='radio'
											name='rating-4'
											className='mask mask-star-2 bg-green-500'
										/>
										<input
											type='radio'
											name='rating-4'
											className='mask mask-star-2 bg-green-500'
										/>
										<input
											type='radio'
											name='rating-4'
											className='mask mask-star-2 bg-green-500'
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Advertisement;
