import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import Loader from '../../../Loader/Loader';

const CreateUserByAdmin = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { user, loading, createSignUp, userprofile } = useContext(AuthContext);
	const [success, setSuccess] = useState(false);
	const [passwordError, setPasswordError] = useState('');
	// const [createdUserEmail, setCreatedUserEmail] = useState('');

	const navigate = useNavigate();
	//! from .env.local file====>
	const imgHostKey = process.env.REACT_APP_Imgbb_key;
	// console.log(imgHostKey)

	//! submit btn...
	const handleAddedUser = (data) => {
		// e.preventDefault();
		setSuccess(false);
		setPasswordError('');
		const name = data.name;
		const email = data.email;
		const password = data.password;
		//TODO: const number = data.number;
		const role = data.role;
		const image = data?.img[0];
		console.log(image);

		const formData = new FormData();
		formData.append('image', image);
		const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
		fetch(url, {
			method: 'POST',
			body: formData,
		})
			.then((res) => res.json())
			.then((photoURL) => {
				// console.log(photoURL);
				if (photoURL.success) {
					// console.log(photoURL.data.url);
				}
				// ! Regex for password validation...
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
						updateUserDetails(name, photoURL.data.url);
						saveUsers(name, email, role, photoURL.data.url);
						toast.success('You are successfully added a new user');
					})

					.catch((error) => {
						console.error(error);
						setPasswordError(error.message);
					});
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
	// console.log(user);
	return (
		<div className='bg-base-200'>
			<br />
			<h1 className='mb-5 text-2xl'>Create a new user</h1>
			<div className='hero min-h-screen bg-base-200'>
				<div className='hero-content grid grid-cols-1 lg:grid-cols-2-col'>
					<div className='card grid grid-cols-1 lg:grid-cols-2-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
						<form
							onSubmit={handleSubmit(handleAddedUser)}
							className='card-body'
						>
							<div className='form-control w-full max-w-xs'>
								<label className='label'>
									<span className='label-text'>Name : </span>
								</label>
								<input
									type='text'
									{...register('name', {
										required: 'Name is Required',
									})}
									className='input input-bordered w-full max-w-xs'
								/>
								{errors.name && (
									<p className='text-red-500'>{errors.name?.message}</p>
								)}
							</div>
							<div className='form-control w-full max-w-xs'>
								<label className='label'>
									<span className='label-text'>Email : </span>
								</label>
								<input
									type='email'
									{...register('email', {
										required: 'Email is Required',
									})}
									className='input input-bordered w-full max-w-xs'
								/>
								{errors.email && (
									<p className='text-red-500'>{errors.email?.message}</p>
								)}
							</div>
							<div className='form-control w-full max-w-xs'>
								<label className='label'>
									<span className='label-text'>Password : </span>
								</label>
								<input
									type='password'
									{...register('password', {
										required: 'Password is Required',
									})}
									className='input input-bordered w-full max-w-xs'
								/>
								{errors.password && (
									<p className='text-red-500'>{errors.password?.message}</p>
								)}
							</div>
							<div className='form-control w-full max-w-xs'>
								<label className='label'>
									<span className='label-text'>Number : </span>
								</label>
								<input
									type='number'
									{...register('number')}
									className='input input-bordered w-full max-w-xs'
								/>
								{errors.number && (
									<p className='text-red-500'>{errors.number?.message}</p>
								)}
							</div>

							<div className='form-control w-full max-w-xs'>
								<label className='label'>
									<span className='label-text'>Role : </span>
								</label>
								<select
									{...register('role', {
										required: true,
									})}
									className='select input-bordered w-full max-w-xs'
								>
									<option>admin</option>
									<option>Seller</option>
									<option>Buyer</option>
								</select>
								{errors.role && (
									<p className='text-red-500'>{errors.role.message}</p>
								)}
							</div>

							<div className='form-control w-full max-w-xs'>
								<label className='label'>
									<span className='label-text'>Photo</span>
								</label>
								<input
									type='file'
									{...register('img', {
										required: 'Photo is Required',
									})}
									className='input input-bordered w-full max-w-xs'
								/>
								{errors.img && (
									<p className='text-red-500'>{errors.img.message}</p>
								)}
							</div>
							<input
								className='btn bg-green-500 hover:bg-green-600 border-0 text-white w-full mt-4'
								value='Create Confirm'
								type='submit'
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateUserByAdmin;
