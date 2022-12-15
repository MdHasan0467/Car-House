import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
	const bookings = useLoaderData();
	console.log(bookings);
	const { productCategory, productModel, resellPrice } = bookings;
	return (
		<div>
			<h1>Payment Now</h1>
			<h2 className='text-start ml-10 text-xl'>
				Please pay : <span className='text-blue-600 font-bold'> ${resellPrice}</span>
			</h2>
			<h2 className='text-start ml-10'>For,</h2>
			<h2 className='text-start ml-10'>
				<span className='mr-3 text-2xl'>Brand : {productCategory} , </span>
				<span className='mr-3 text-xl'>Model : {productModel}</span>
			</h2>
		</div>
	);
};

export default Payment;
