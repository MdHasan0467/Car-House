import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
// import useToken from '../../../hook/useToken';

const Login = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const { logIn, googleSignUp, loading } = useContext(AuthContext);
	const [loginError, setLoginError] = useState('');
	const location = useLocation();
	const navigate = useNavigate();
	const [loginUserEmail, setLoginUserEmail] = useState('');
	// const [token] = useToken(loginUserEmail);

	const from = location.state?.from?.pathname || '/';
	const toaster = location.state?.toast || false;

	if (toaster) {
		toast.error(`Ohh, sorry!
		You are not an admin!`);
	}

	const handleLogin = (data) => {
		console.log(data);
		setLoginError('');

		//! login By User Email
		logIn(data.email, data.password)
			.then((result) => {
				const user = result.user;
				console.log('user login by email', user);

				navigate(from, { replace: true });
				console.log('success login');
				toast.success('Successfully Login.');
				setLoginUserEmail(data.email);
			})
			.catch((error) => {
				console.log(error.message);
				toast.error('Sorry! Try again with valid user');
			});
	};
	//! Google Log In....
	const handleGooleLogIn = () => {
		googleSignUp()
			.then((result) => {
				const user = result.user;
				console.log(user);

				fetch('http://localhost:5000/googlebuyer', {
					method: 'POST',
					headers: {
						'content-type': 'application/json',
					},
					body: JSON.stringify(user),
				})
					.then((res) => res.json())
					.then((data) => {
						console.log(data);
						navigate('/');
					});

				navigate(from, { replace: true });
				toast.success('Successfully Login!');
			})
			.catch((error) => console.error(error));
	};
	//!......................................

	return (
		<div className='h-[800px] flex justify-center items-center'>
			<Toaster></Toaster>
			<div className='w-96 p-7 border-2 border-gray-800 rounded-xl'>
				<h2 className='text-xl text-center'>Login</h2>
				<form onSubmit={handleSubmit(handleLogin)}>
					<div className='form-control w-full max-w-xs'>
						<label className='label'>
							<span className='label-text'>Email</span>
						</label>
						<input
							type='text'
							{...register('email', {
								required: 'Email Address is required',
							})}
							className='input input-bordered w-full max-w-xs'
						/>
						{errors.email && (
							<p className='text-red-600'>{errors.email?.message}</p>
						)}
					</div>

					<div className='form-control mb-3 w-full max-w-xs'>
						<label className='label'>
							<span className='label-text'>Password</span>
						</label>
						<input
							type='password'
							{...register('password', {
								required: 'Password is required',
								minLength: {
									value: 6,
									message: 'Password must be 6 characters or longer',
								},
							})}
							className='input input-bordered w-full max-w-xs'
						/>

						{errors.password && (
							<p className='text-red-600'>{errors.password?.message}</p>
						)}
					</div>

					<input
						className='btn bg-green-500 hover:bg-green-600 border-0 text-white w-full'
						value='Login'
						type='submit'
					/>

					<div>
						{loginError && <p className='text-red-600'>{loginError}</p>}
					</div>
				</form>
				<p>
					Create new Account
					<Link className='text-secondary m-3' to='/signup'>
						Sign Up
					</Link>
				</p>
				<div className='divider'>OR</div>
				<button
					onClick={handleGooleLogIn}
					className='btn btn-outline hover:bg-red-400 w-full'
				>
					CONTINUE WITH GOOGLE
				</button>
			</div>
		</div>
	);
};

export default Login;
