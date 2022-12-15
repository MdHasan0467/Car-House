import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import Loader from '../../../Loader/Loader';

const MyWishList = () => {
	const { user, loading } = useContext(AuthContext);
	//! fetch for getting products data from mongodb.....

	const url = `http://localhost:5000/mywish?email=${user?.email}`;

	const { data: products } = useQuery({
		queryKey: ['products', user?.email],
		queryFn: async () => {
			const res = await fetch(url);
			const data = await res.json();
			return data;
		},
	});

	console.log(products);

	if (loading) {
		return <Loader></Loader>;
	}
	return (
		<div className='mx-12'>
			<h1>My Wish Item {products?.length}</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
				{products?.map((product) => (
					<div key={product._id} className='card  bg-base-100 shadow-xl'>
						<figure>
							<img
								src={product.productImage}
								className='w-full h-[250px] lg:[350px]'
								alt='Shoes'
							/>
						</figure>
						<div className='card-body'>
							<h2 className='card-title'>{product.productTitle}</h2>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Category :
								</span>
								{product.category}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Location :
								</span>
								{product.authorLocation}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Original Price :
								</span>
								{product.originalPrice}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Resale Price :
								</span>
								{product.resalePrice}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Years of use :
								</span>
								{product.yearsOfUse}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Year of Purchase :
								</span>
								{product.yearOfPurchase}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl'>
									Description :
								</span>
								{product.description}
							</p>
							<p className='text-start'>
								<span className='text-bold text-gray-800 text-xl '>
									Post Time :
								</span>
								<span className='text-blue-600'> {product.postedTime}</span>
							</p>
							{product.author && (
								<>
									<p className='text-start'>
										<span className='text-bold text-gray-800 text-xl'>
											Seller :
										</span>
										{product.author}
									</p>
									<p className='text-start'>
										<span className='text-bold text-gray-800 text-xl'>
											Wish Time :
										</span>
										{product.wishTime}
									</p>
								</>
							)}
							<div className='flex'>
								<button className='btn btn-sm mx-2 bg-amber-500 hover:bg-amber-600 border-0 text-gray-600 hover:text-white'>
									Buy Now
								</button>
								{/*<button className='btn btn-sm mx-2 text-white'>Sold</button>*/}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyWishList;
