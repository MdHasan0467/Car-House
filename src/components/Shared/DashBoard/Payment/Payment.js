import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
	const bookings = useLoaderData()
	console.log(bookings);
    return (
			<div>
				<h1>Payment Now</h1>
			</div>
		);
};

export default Payment;