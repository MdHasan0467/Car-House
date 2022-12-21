import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthProvider';
import { Link } from 'react-router-dom';

const MyOrders = () => {
	const { user, loading } = useContext(AuthContext);
	const [orders, setOrders] = useState([{}]);
	// const [ordersTwo, setOrdersTwo] = useState();

	useEffect(() => {
		axios
			.get(
				`https://assignment-twelve-server.vercel.app/myorders?email=${user?.email}`
			)
			.then((data) => {
				if (data.data !== undefined) {
					console.log(typeof data.data);
					console.log(data.data);
					setOrders(data.data);
				}
			});
	}, [user?.email]);

	console.log(orders);

	return (
		<div className='mx-12 bg-transparent'>
			<h1 className='my-5'>My Total orders : {orders?.length}</h1>

			{orders?.map((order) => (
				<div key={order?._id} className='card  bg-base-100 shadow-xl'>
					<div className='card lg:card-side my-5 bg-base-100 shadow-xl'>
						<img src={order?.productImg} className='lg:w-[50%]' alt='Album' />

						<div className='card-body'>
							<div className='card-body '>
								<h2 className='card-title'>
									<span className='text-bold text-gray-800 lg:text-lg'>
										Brand :
									</span>
									{order?.productCategory}
								</h2>
								<p className='text-start'>
									<span className='text-bold text-gray-800 lg:text-lg'>
										Model :
									</span>
									{order?.productModel}
								</p>
								<p className='text-start'>
									<span className='text-bold text-gray-800 lg:text-lg'>
										Resell Price :
									</span>
									{order?.resellPrice}
								</p>
								<p className='text-start'>
									<span className='text-bold text-gray-800 lg:text-lg'>
										Seller Name :
									</span>
									{order?.sellerName}
								</p>
								<p className='text-start'>
									<span className='text-bold text-gray-800 lg:text-lg'>
										Seller Email :
									</span>
									{order?.sellerEmail}
								</p>
								<p className='text-start'>
									<span className='text-bold text-gray-800 lg:text-lg'>
										Seller Location :
									</span>
									{order?.sellerLocation}
								</p>
								<p className='text-start'>
									<span className='text-bold text-gray-800 lg:text-lg'>
										Meeting Date :
									</span>
									{order?.meetingDate}
								</p>
								<p className='text-start'>
									<span className='text-bold text-gray-800 lg:text-lg'>
										Buyer Number :
									</span>
									{order?.buyerNumber}
								</p>
								<div className='card-actions justify-end'>
									{order?.resellPrice && !order?.paid && (
										<Link to={`/dashboard/myOrders/${order?._id}`}>
											<button className='btn border-0 bg-blue-500 hover:bg-blue-600 text-white'>
												Pay
											</button>
										</Link>
									)}
									{order?.resellPrice && order?.paid && (
										<button className='btn border-0 cursor-default bg-green-500 hover:bg-green-500 text-white'>
											Paid
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default MyOrders;
