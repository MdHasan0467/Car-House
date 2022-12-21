import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loader from '../../../Loader/Loader';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
// console.log(process.env.REACT_APP_STRIPE_PK);
const Payment = () => {
	const bookings = useLoaderData();
	console.log(bookings);
	const { productCategory, productModel, resellPrice } = bookings;

	const navigation = useNavigation()
	if (navigation.state === 'loading') {
		return <Loader></Loader>
	}
	return (
		<div>
			<h1>Payment Now</h1>
			<h2 className='text-start ml-10 text-xl'>
				Please pay :
				<span className='text-blue-600 font-bold'> ${resellPrice}</span>
			</h2>
			<h2 className='text-start ml-10'>For,</h2>
			<h2 className='text-start ml-10'>
				<span className='mr-3 text-2xl'>Brand : {productCategory} , </span>
				<span className='mr-3 text-xl'>Model : {productModel}</span>
			</h2>
			<div className='my-12 w-96'>
				<Elements stripe={stripePromise}>
					<CheckoutForm bookings={bookings} />
				</Elements>
			</div>
		</div>
	);
};

export default Payment;
