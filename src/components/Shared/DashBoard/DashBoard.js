import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import Loader from '../../Loader/Loader';
import CustomNav from '../Navbar/CustomNav';
// import { useQuery } from '@tanstack/react-query';

const DashBoard = () => {
	const { loading, user } = useContext(AuthContext);
	const [logUser, setLogUser] = useState();
	//! fetch for getting users data from mongodb.....
	// const { data: users } = useQuery({
	// 	queryKey: ['users'],
	// 	queryFn: async () => {
	// 		try {
	// 			const res = await fetch(`http://localhost:5000/users/${user?.email}`);
	// 			const data = await res.json();
	// 			return data;
	// 		} catch (err) {
	// 			console.error(err);
	// 		}
	// 	},
	// });

	useEffect(() => {
		fetch(`http://localhost:5000/users/${user?.email}`)
			.then((res) => res.json())
			.then((result) => {
				setLogUser(result[0]);
			});
	}, [user?.email]);

	if (loading) {
		return <Loader></Loader>;
	}
	return (
		<div>
			<CustomNav></CustomNav>
			<div className='drawer drawer-mobile'>
				<input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
				<div className='drawer-content'>
					<Outlet></Outlet>
					<label
						htmlFor='my-drawer-2'
						className='btn btn-primary drawer-button hidden'
					>
						Open drawer
					</label>
				</div>
				<div className='drawer-side border'>
					<label htmlFor='my-drawer-2' className='drawer-overlay'></label>
					<ul className='menu p-4 w-80 bg-base-100 text-base-content'>
						<Link to='/home' className='flex lg:hidden mb-10'>
							<img
								src='PremiCar.png'
								className='mr-3 h-6 sm:h-9 rounded-lg'
								alt='PremiCar Logo'
							/>
							<span className='self-center text-xl font-semibold  '>
								PremiCar
							</span>
						</Link>
						<li className=' hover:text-white  my-2 border-l-4 hover:border-l-8 border hover:animate-pulse hover:bg-green-600  border-gray-300 border-l-green-600'>
							<Link to='/dashboard/myprofile'>My Profile</Link>
						</li>
						{logUser?.role === 'Seller' && (
							<>
								<li className=' hover:text-white  my-2 border-l-4 hover:border-l-8 border hover:animate-pulse hover:bg-blue-600  border-gray-300 border-l-blue-600'>
									<Link to='/dashboard/addProduct'>Add Product</Link>
								</li>
								<li className=' hover:text-white  my-2 border-l-4 hover:border-l-8 border hover:animate-pulse hover:bg-orange-600 border-gray-300 border-l-orange-600'>
									<Link to='/dashboard/myProduct'>My Products</Link>
								</li>
								<li className=' hover:text-white  my-2 border-l-4 hover:border-l-8 border hover:animate-pulse hover:bg-purple-600 border-gray-300 border-l-purple-600'>
									<Link to='/dashboard/mybuyers'>My Buyers</Link>
								</li>
							</>
						)}

						{logUser?.role === 'Buyer' && (
							<>
								<li className=' hover:text-white  my-2 border-l-4 hover:border-l-8 border hover:animate-pulse hover:bg-blue-600 border-gray-300 border-l-blue-600 '>
									<Link to='/dashboard/myOrders'>My Orders</Link>
								</li>
								<li className=' hover:text-white  my-2 border-l-4 hover:border-l-8 border hover:animate-pulse hover:bg-orange-600 border-gray-300 border-l-orange-600'>
									<Link to='/dashboard/myWishList'>My WhishList</Link>
								</li>
							</>
						)}

						{logUser?.role === 'admin' && (
							<>
								<li className=' hover:text-white  my-2 border-l-4 hover:border-l-8 border hover:animate-pulse hover:bg-blue-600 border-gray-300 border-l-blue-600'>
									<Link to='/dashboard/allBuyers'>All Buyers</Link>
								</li>
								<li className=' hover:text-white  my-2 border-l-4 hover:border-l-8 border hover:animate-pulse hover:bg-purple-600 border-gray-300 border-l-purple-600'>
									<Link to='/dashboard/allSeller'>All Sellers</Link>
								</li>
								<li className=' hover:text-white  my-2 border-l-4 hover:border-l-8 border hover:animate-pulse hover:bg-pink-600 border-gray-300 border-l-pink-600'>
									<Link to='/dashboard/createUser'>Create an User</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default DashBoard;
