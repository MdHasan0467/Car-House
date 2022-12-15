import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import {
	BsFillBookmarkStarFill,
	BsArrowRightSquare,
	BsFillHddStackFill,
	BsArrowDownSquare,
} from 'react-icons/bs';
import toast from 'react-hot-toast';

const CustomNav = () => {
	const { user, logUser, logOut } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogOut = () => {
		navigate('/login');
		logOut()
			.then(() => {
				toast.error('Log Out!');
				navigate('/login');
			})
			.catch((error) => console.error(error));
	};
	return (
		<div className='navbar bg-base-100'>
			<div className='flex-1'>
				<Link to='/home' className='lg:flex hidden '>
					<img
						src='CH_logo.png'
						className='mr-3 h-6 sm:h-9 rounded-lg '
						alt='CH Logo'
					/>
					<span className='self-center whitespace-nowrap hidden cursor-pointer lg:block text-xl font-semibold dark:text-white'>
						Car House
					</span>
				</Link>
				<div className='drowar'>
					<label
						htmlFor='my-drawer-2'
						tabIndex={2}
						className='btn btn-ghost lg:hidden btn-circle'
					>
						<div className='indicator btn btn-primary'>
							<BsArrowRightSquare></BsArrowRightSquare>
						</div>
					</label>
				</div>
			</div>

			<div className='menu hidden lg:flex'>
				{user && (
					<div className='flex me-10firebase'>
						<Link
							className='hover:bg-green-400 px-3 py-2 rounded-lg'
							to='/home'
						>
							Home
						</Link>

						<div className='dropdown dropdown-bottom dropdown-end mt-2'>
							<div className='flex'>
								<p className=''>Car Collections</p>
								<Link tabIndex={0} className=' flex px-3  rounded-lg '>
									<BsArrowDownSquare className='mt-1 hover:border border-green-500 hover:text-white hover:bg-green-500'></BsArrowDownSquare>
								</Link>
							</div>
							<ul
								tabIndex={0}
								className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'
							>
								<li>
									<Link
										className='hover:bg-green-400 px-3 py-2 rounded-lg'
										to='/mercedes'
									>
										Mercedes
									</Link>
								</li>
								<li>
									<Link
										className='hover:bg-green-400 px-3 py-2 rounded-lg'
										to='/rolls'
									>
										Rolls Royce
									</Link>
								</li>
								<li>
									<Link
										className='hover:bg-green-400 px-3 py-2 rounded-lg'
										to='/tesla'
									>
										Tesla
									</Link>
								</li>
								<li>
									<Link
										className='hover:bg-green-400 bg-transparent px-3 py-2 rounded-lg'
										to='/ferrari'
									>
										Ferrari
									</Link>
								</li>
								<li>
									<Link
										className='hover:bg-green-400 bg-transparent px-3 py-2 rounded-lg'
										to='/audi'
									>
										Audi
									</Link>
								</li>

								<li>
									<Link
										className='hover:bg-green-400 btn-disabled bg-transparent px-3 py-2 rounded-lg'
										to='/'
									>
										BMW (Comming soon)
									</Link>
								</li>
								<li>
									<Link
										className='hover:bg-green-400 btn-disabled bg-transparent px-3 py-2 rounded-lg'
										to='/'
									>
										Lamborghini (Comming soon)
									</Link>
								</li>
							</ul>
						</div>

						<Link className='hover:bg-green-400 px-3 py-2 rounded-lg' to='/faq'>
							FAQ
						</Link>

						<Link className='hover:bg-green-400 px-3 py-2 rounded-lg' to='/'>
							About
						</Link>
					</div>
				)}
				{!user && (
					<Link className='hover:bg-green-400 px-3 py-2 rounded-lg' to='/login'>
						Login
					</Link>
				)}
			</div>
			<div className='flex-none'>
				<div className='dropdown dropdown-end lg:hidden'>
					<label tabIndex={0} className='btn btn-ghost btn-circle'>
						<div className='indicator btn btn-primary'>
							<BsFillHddStackFill></BsFillHddStackFill>
						</div>
					</label>
					<div
						tabIndex={1}
						className='mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow'
					>
						<div className='card-body'>
							{user && (
								<>
									<Link
										className='hover:bg-green-400 px-3 py-2 rounded-lg'
										to='/home'
									>
										Home
									</Link>
									<Link
										className='hover:bg-green-400 px-3 py-2 rounded-lg'
										to='/faq'
									>
										FAQ
									</Link>
								</>
							)}
							<Link className='hover:bg-green-400 px-3 py-2 rounded-lg' to='/'>
								About
							</Link>
							{!user && (
								<Link
									className='hover:bg-green-400 px-3 py-2 rounded-lg'
									to='/login'
								>
									Login
								</Link>
							)}
						</div>
					</div>
				</div>

				<div className='dropdown dropdown-end'>
					{user && (
						<div className='indicator'>
							<span className='indicator-item mr-1 mt-2 border border-white badge-xs badge bg-green-400'></span>
							<label
								tabIndex={3}
								className='btn btn-ghost border border-blue-400 btn-circle avatar'
							>
								<div className='w-12 rounded-full'>
									<img src={user?.photoURL} />
								</div>
							</label>
						</div>
					)}
					<ul
						tabIndex={0}
						className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
					>
						<div>
							<div className='userName flex justify-center'>
								<span className='block text-sm font-bold'>
									{user?.displayName}
								</span>
								<span>
									{logUser?.role === 'admin' && (
										<BsFillBookmarkStarFill className='text-green-600 mt-1 ml-2'></BsFillBookmarkStarFill>
									)}
								</span>
								<p className='mx-2'>({logUser?.role})</p>
							</div>
							<span className='block truncate text-sm font-medium '>
								{user?.email}
							</span>
						</div>
						<div>
							<Link
								className='hover:bg-green-400 w-full p-2 flex justify-start'
								to='/dashboard'
							>
								Dashboard
							</Link>
							<Link
								onClick={handleLogOut}
								className='hover:bg-green-400 w-full p-2 flex justify-start'
							>
								Sign out
							</Link>
							<div className='dark_mood swap'>
								<label className='swap swap-rotate'>
									{/* this hidden checkbox controls the state  */}
									<input className='hidden' type='checkbox' />
									{/*sun icon  */}
									<svg
										className='swap-on fill-current w-6 h-6'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'
									>
										<path d='M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z' />
									</svg>
									{/*moon icon */}
									<svg
										className='swap-off fill-current w-6 h-6'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'
									>
										<path d='M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z' />
									</svg>
								</label>
							</div>
						</div>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default CustomNav;
