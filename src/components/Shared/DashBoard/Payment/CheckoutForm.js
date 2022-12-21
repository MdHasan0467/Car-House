import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ bookings }) => {
	const { resellPrice, buyerName, buyerEmail, _id } = bookings;
	const [cardError, setCardError] = useState('');
	const [success, setSuccess] = useState('');
	const [processing, setProcessing] = useState(false);
	const [transactionId, setTransactionId] = useState('');
	const stripe = useStripe();
	const elements = useElements();
	const [clientSecret, setClientSecret] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch('https://assignment-twelve-server.vercel.app/create-payment-intent', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ resellPrice }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, [resellPrice]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return;
		}
		const card = elements.getElement(CardElement);
		if (card === null) {
			return;
		}

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card,
		});

		if (error) {
			console.log(error);
			setCardError(error.message);
		} else {
			setCardError('');
		}
		setSuccess('');
		setProcessing(true);

		const { paymentIntent, error: ConfirmError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						name: buyerName,
						email: buyerEmail,
					},
				},
			});

		if (ConfirmError) {
			setCardError(ConfirmError.message);
			return;
		}
		if (paymentIntent.status === 'succeeded') {
			//Store the payment information in the database

			const payment = {
				resellPrice,
				transactionId: paymentIntent.id,
				buyerEmail,
				paymentId: _id,
			};

			fetch('https://assignment-twelve-server.vercel.app/payment', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(payment),
			})
				.then((res) => res.json())
				.then((data) => {
					console.log('paymentData', data);
					if (data.insertedId) {
						toast.success('Your Payment Successfully Done!');
						setSuccess('Congrats! your payment completed');
						setTransactionId(paymentIntent.id);
						navigate('/dashboard/myOrders');
					}
				});
		}
		setProcessing(false);
		console.log('paymentIntent', paymentIntent);
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<CardElement
					className='ml-10'
					options={{
						style: {
							base: {
								fontSize: '16px',
								color: '#424770',
								'::placeholder': {
									color: '#aab7c4',
								},
							},
							invalid: {
								color: '#9e2146',
							},
						},
					}}
				/>

				<button
					className='btn btn-sm btn-secondary my-5'
					type='submit'
					disabled={!stripe || !clientSecret || processing}
				>
					Pay
				</button>
			</form>
			<p className='text-red-600 ml-10'>{cardError}</p>
			{success && (
				<div className='text-start ml-10'>
					<p className='text-green-500'>{success}</p>
					<p>
						Your Transaction Id :{' '}
						<span className='font-semibold mt-2'>{transactionId}</span>
					</p>
				</div>
			)}
		</div>
	);
};

export default CheckoutForm;
