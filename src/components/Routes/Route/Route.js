import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DeshboardDesign from '../../DeshboardDesign/DeshboardDesign';
import Error from '../../Error/Error';
import FAQ from '../../Pages/FAQ/FAQ';
import Audi from '../../Pages/Home/Audi/Audi';
import FerrariGroup from '../../Pages/Home/FerrariGroup/FerrariGroup';
import Home from '../../Pages/Home/Home';
import ProductCategory from '../../Pages/Home/ProductCategory/ProductCategory';
import Login from '../../Pages/Login/Login';
import MercedesGroup from '../../Pages/MercedesGroup/MercedesGroup';
import RollsGroup from '../../Pages/RollsGroup/RollsGroup';
import Signup from '../../Pages/Signup/Signup';
import TeslaGroup from '../../Pages/TeslaGroup/TeslaGroup';
import PrivateRoute from '../../PrivateRoute/PrivateRoute';
import AddProduct from '../../Shared/DashBoard/AddProduct/AddProduct';
import AllBuyers from '../../Shared/DashBoard/AllBuyers/AllBuyers';
import AllSeller from '../../Shared/DashBoard/AllSeller/AllSeller';
import CreateUserByAdmin from '../../Shared/DashBoard/CreateUserByAdmin/CreateUserByAdmin';
import DashBoard from '../../Shared/DashBoard/DashBoard';
import MyBuyers from '../../Shared/DashBoard/MyBuyers/MyBuyers';
import MyOrders from '../../Shared/DashBoard/MyOrders/MyOrders';
import MyProducts from '../../Shared/DashBoard/MyProducts/MyProducts';
import MyProfile from '../../Shared/DashBoard/MyProfile/MyProfile';
import MyWishList from '../../Shared/DashBoard/MyWishList/MyWishList';
import Payment from '../../Shared/DashBoard/Payment/Payment';
import Main from '../Main/Main';

const Route = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Main></Main>,
			children: [
				{
					path: '/',
					element: <Home></Home>,
				},
				{
					path: '/home',
					element: <Home></Home>,
				},

				{
					path: '/tesla',
					element: (
						<PrivateRoute>
							<TeslaGroup></TeslaGroup>
						</PrivateRoute>
					),
				},
				{
					path: '/rolls',
					element: (
						<PrivateRoute>
							<RollsGroup></RollsGroup>
						</PrivateRoute>
					),
				},
				{
					path: '/mercedes',
					element: (
						<PrivateRoute>
							<MercedesGroup></MercedesGroup>
						</PrivateRoute>
					),
				},
				{
					path: '/ferrari',
					element: (
						<PrivateRoute>
							<FerrariGroup></FerrariGroup>
						</PrivateRoute>
					),
				},
				{
					path: '/audi',
					element: (
						<PrivateRoute>
							<Audi></Audi>
						</PrivateRoute>
					),
				},
				{
					path: '/faq',
					element: <FAQ></FAQ>,
				},
				{
					path: '/login',
					element: <Login></Login>,
				},
				{
					path: '/signup',
					element: <Signup></Signup>,
				},
			],
		},
		{
			path: '/dashboard',
			element: (
				<PrivateRoute>
					<DashBoard></DashBoard>
				</PrivateRoute>
			),
			children: [
				{
					path: '/dashboard/addProduct',
					element: <AddProduct></AddProduct>,
				},
				{
					path: '/dashboard',
					element: <DeshboardDesign></DeshboardDesign>,
				},
				{
					path: '/dashboard/myprofile',
					element: <MyProfile></MyProfile>,
				},
				{
					path: '/dashboard/myProduct',
					element: <MyProducts></MyProducts>,
				},
				{
					path: '/dashboard/mybuyers',
					element: <MyBuyers></MyBuyers>,
				},
				{
					path: '/dashboard/myOrders',
					element: <MyOrders></MyOrders>,
				},
				{
					path: '/dashboard/myOrders/:id',
					element: <Payment></Payment>,
					loader: ({ params }) =>
						fetch(
							`https://assignment-twelve-server.vercel.app/payment/${params.id}`
						),
				},
				{
					path: '/dashboard/myWishList',
					element: <MyWishList></MyWishList>,
				},
				{
					path: '/dashboard/allSeller',
					element: <AllSeller></AllSeller>,
				},
				{
					path: '/dashboard/allBuyers',
					element: <AllBuyers></AllBuyers>,
				},
				{
					path: '/dashboard/createUser',
					element: <CreateUserByAdmin></CreateUserByAdmin>,
				},
			],
		},
		{
			path: '*',
			element: <Error></Error>,
		},
	]);
	return (
		<div>
			<RouterProvider router={router}></RouterProvider>
		</div>
	);
};

export default Route;
