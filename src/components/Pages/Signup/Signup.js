import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import Loader from '../../Loader/Loader';

const Signup = () => {
	const { user, loading } = useContext(AuthContext);
	const [success, setSuccess] = useState(false);
	const [passwordError, setPasswordError] = useState('');
	// const [createdUserEmail, setCreatedUserEmail] = useState('');
	const { createSignUp, userprofile } = useContext(AuthContext);

	const navigate = useNavigate();

	//! submit btn...
	const submitBtn = (e) => {
		e.preventDefault();
		setSuccess(false);
		setPasswordError('');

		const form = e.target;
		const name = form.name.value;
		const email = form.email.value;
		const password = form.password.value;
		const photoURL = form.img.value;
		const role = form.role.value;

		// console.log(name, photoURL, email, password, role);

		//! Regex for password validation...
		if (password.length < 6) {
			setPasswordError('password should be at least 6 characters');
			return;
		}
		if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
			setPasswordError('Please provide at least two uppercase');
			return;
		}

		if (!/(?=.*[!@#$&*])/.test(password)) {
			setPasswordError('Please add at least one special character');
			return;
		}
		setPasswordError('');

		createSignUp(email, password)
			.then((result) => {
				const user = result.user;
				// console.log(user);
				setSuccess(true);
				form.reset();
				updateUserDetails(name, photoURL);
				saveUsers(name, email, role, photoURL);
			})

			.catch((error) => {
				console.error(error);
				setPasswordError(error.message);
			});
	};
	const updateUserDetails = (name, photoURL) => {
		userprofile(name, photoURL)
			.then(() => {
				// alert('Profile Updated');
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const saveUsers = (name, email, role, photoURL) => {
		const user = { name, email, role, photoURL };
		fetch('http://localhost:5000/users', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				navigate('/');
				// setCreatedUserEmail(email);
			});
	};

	if (loading) {
		return <Loader></Loader>;
	}
	console.log(user);
	return (
		<div>
			<div>
				<div className='hero min-h-screen bg-base-200'>
					<div className='hero-content flex-col'>
						<div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
							<form onSubmit={submitBtn} className='card-body'>
								<div className='form-control'>
									<label className='label'>
										<span className='label-text'>Name</span>
									</label>
									<input
										type='text'
										name='name'
										placeholder='Name'
										className='input input-bordered'
									/>
								</div>
								<div className='form-control'>
									<label className='label'>
										<span className='label-text'>Email</span>
									</label>
									<input
										type='email'
										name='email'
										placeholder='Email'
										className='input input-bordered'
									/>
								</div>
								<div className='form-control'>
									<label className='label'>
										<span className='label-text'>Password</span>
									</label>
									<input
										type='password'
										name='password'
										placeholder='Password'
										className='input input-bordered'
									/>
								</div>
								<div className='form-control'>
									<label className='label'>
										<span className='label-text'>Profile</span>
									</label>
									<input
										className='block   py-1 px-7 mb-2 rounded-md'
										type='text'
										name='img'
										placeholder='Photo URL'
										required
									/>
								</div>
								<div className='form-control'>
									<label className='label'>
										<span className='label-text'>Who are you ?</span>
									</label>
									<select
										className='select select-success w-full max-w-xs'
										name='role'
									>
										<option>Seller</option>
										<option>Buyer</option>
									</select>
								</div>
								<p className='text-red-700'>
									<small>{passwordError}</small>
								</p>
								{success && (
									<p className='text-green-600'>
										<small>Registration Successful</small>
									</p>
								)}
								<div className='form-control mt-6'>
									<button className='btn btn-primary'>SignUp</button>
								</div>
							</form>
							<p className='mb-2 lg:ml-3 px-2'>
								<small>
									Already have an account?
									<button className='ml-3 hover:text-blue-500 py-1 px-2 rounded-md'>
										<Link className=' px-2' to={'/login'}>
											Login
										</Link>
									</button>
								</small>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;

// import React, { useContext, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import toast, { Toaster } from 'react-hot-toast';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../Context/AuthProvider';
// import Loader from '../../Loader/Loader';

// const Signup = () => {
// 	const {
// 		register,
// 		formState: { errors },
// 		handleSubmit,
// 	} = useForm();
// 	const { createSignUp, loading, userprofile } = useContext(AuthContext);
// 	const [signUpError, setSignUpError] = useState('')
// 	const navigate = useNavigate()
// 	// const [token] = useToken(createdUserEmail);
// 	// TODO: const [createdUserEmail, setCreatedUserEmail] = useState('');
// 	// TODO: const [createdUserEmail, setCreatedUserEmail] = useState('');

// 	const handleSignIn = (data) => {
// 		setSignUpError('')
// 		// console.log(data);
// 		createSignUp(data.email, data.password)
// 			.then((result) => {
// 				const user = result.user;
// 				console.log(user);
// 				toast.success('Successfully created a account');

// 				const userInfo = {
// 					displayName: data.name,
// 					photoURL: data.photoURL,
// 				};
// 				// console.log(userInfo);
// 				userprofile(userInfo)
// 					.then(() => {
// 						saveUsers(data.name, data.email, data.role);
// 						console.log('call');
// 					})
// 					.catch((err) => {
// 						console.log(err)
// 						setSignUpError(err.message)
// 					});
// 			})
// 			.catch((err) => console.log(err));
// 	};
// 		const saveUsers = (name, email, role) => {
// 			const user = { name, email, role };
// 			fetch('http://localhost:5000/users', {
// 				method: 'POST',
// 				headers: {
// 					'content-type': 'application/json',
// 				},
// 				body: JSON.stringify(user),
// 			})
// 				.then((res) => res.json())
// 				.then((data) => {
// 					console.log('saveData',data);
// 					navigate('/login')
// 					//TODO: setCreatedUserEmail(email);
// 				});
// 		};

// 	if (loading) {
// 		return <Loader></Loader>;
// 	}

// 	return (
// 		<div className='h-[800px] flex justify-center items-center'>
// 			<Toaster></Toaster>
// 			<div className='w-96 p-7 border-2 border-gray-800 rounded-xl'>
// 				<h2 className='text-xl text-center'>Sign Up Now</h2>
// 				<form onSubmit={handleSubmit(handleSignIn)}>
// 					<div className='form-control w-full max-w-xs'>
// 						<label className='label'>
// 							<span className='label-text'>Name</span>
// 						</label>
// 						<input
// 							type='text'
// 							{...register('name', {
// 								required: 'Name Address is required',
// 							})}
// 							className='input input-bordered w-full max-w-xs'
// 						/>
// 						{errors.name && (
// 							<p className='text-red-600'>{errors.name?.message}</p>
// 						)}
// 					</div>
// 					<div className='form-control w-full max-w-xs'>
// 						<label className='label'>
// 							<span className='label-text'>Email</span>
// 						</label>
// 						<input
// 							type='email'
// 							{...register('email', {
// 								required: 'Email Address is required',
// 							})}
// 							className='input input-bordered w-full max-w-xs'
// 						/>
// 						{errors.email && (
// 							<p className='text-red-600'>{errors.email?.message}</p>
// 						)}
// 					</div>

// 					<div className='form-control w-full max-w-xs'>
// 						<label className='label'>
// 							<span className='label-text'>Password</span>
// 						</label>
// 						<input
// 							type='password'
// 							{...register('password', {
// 								required: 'Password is required',
// 								minLength: {
// 									value: 6,
// 									message: 'Password must be 6 characters or longer',
// 								},
// 							})}
// 							className='input input-bordered w-full max-w-xs'
// 						/>

// 						{errors.password && (
// 							<p className='text-red-600'>{errors.password?.message}</p>
// 						)}
// 					</div>
// 					<div className='form-control w-full mb-3 max-w-xs'>
// 						<label className='label'>
// 							<span className='label-text'>Profile</span>
// 						</label>
// 						<input
// 							type='text'
// 							{...register('photoURL', {
// 								required: 'Profile is required',
// 							})}
// 							className='input input-bordered w-full max-w-xs'
// 						/>

// 						{errors.photoURL && (
// 							<p className='text-red-600'>{errors.photoURL?.message}</p>
// 						)}
// 					</div>

// 					<div className='form-control w-full mb-3 max-w-xs'>
// 						<label className='label'>
// 							<span className='label-text'>User role</span>
// 						</label>
// 						<select
// 							{...register('role')}
// 							className='select select-bordered w-full max-w-xs'
// 						>
// 							<option disabled selected>
// 								Who are you?
// 							</option>
// 							<option>Buyer</option>
// 							<option>Seller</option>
// 						</select>
// 					</div>

// 					<input
// 						className='btn bg-green-500 hover:bg-green-600 border-0 text-white w-full'
// 						value='Sign Up'
// 						type='submit'
// 					/>
// 					{signUpError && <p className='text-red-600'>{signUpError}</p>}
// 				</form>
// 				<p>
// 					Already have an account ?
// 					<Link className='text-secondary m-3' to='/login'>
// 						Login
// 					</Link>
// 				</p>
// 			</div>
// 		</div>
// 	);
// };

// export default Signup;
