import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
	
    return (
			<div className='errorCar'>
				<section className='flex items-center h-screen p-16 bg-[#090a27]  text-slate-200'>
					<img
						src='ferrari2.png'
						alt='car'
						className='w-[300px] hidden lg:block animate-pulse ml-32'
					/>
					<div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
						<div className='max-w-md text-center'>
							<h2 className='mb-8 ml-16 font-extrabold text-9xl flex text-slate-200'>
								<div>
									<span className='sr-only'>Error</span>4
								</div>
								<img
									className=' w-[150px] animate-spin'
									src='car-wheel.png'
									alt=''
								/>
								<span className='sr-only'>Error</span>4
							</h2>
							<p className='text-2xl font-semibold md:text-3xl'>
								Sorry, we couldn't find this page.
							</p>
							<p className='mt-4 mb-8'>
								But dont worry, you can find plenty of other things on our
								homepage.
							</p>
							<Link to='/home'>
								<a
									rel='noopener noreferrer'
									href='#'
									className='px-8 py-3 font-semibold rounded bg-white text-[#090a27]'
								>
									Back to home
								</a>
							</Link>
						</div>
					</div>
				</section>
			</div>
		);
};

export default Error;