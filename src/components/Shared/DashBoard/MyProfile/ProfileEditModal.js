import React from 'react';

const ProfileEditModal = () => {
    return (
			<div>
				<input type='checkbox' id='profileEdit' className='modal-toggle' />
				<div className='modal'>
					<div className='modal-box relative'>
						<label
							htmlFor='profileEdit'
							className='btn btn-sm btn-circle btn-error text-white absolute right-2 top-2'
						>
							✕
						</label>
						<p>Update Your ...{}</p>
						<form className='text-lg font-bold'>
							<input
								type='text'
								className='input input-bordered rounded-none input-primary w-full max-w-xs'
							/>
							<input type='submit' value='Submit' className='px-3 py-2 bg-blue-600 text-white' />
						</form>
					</div>
				</div>
			</div>
		);
};

export default ProfileEditModal;