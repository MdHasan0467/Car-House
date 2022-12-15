import React from 'react';

const CustomModal = ({ product }) => {
	return (
		<>
			<input type='checkbox' id='modal_id' className='modal-toggle' />
			<div className='modal'>
				<div className='modal-box relative'>
					<label
						htmlFor='modal_id'
						className='btn btn-sm btn-circle absolute right-2 top-2'
					>
						✕
					</label>
					<h3 className='text-lg font-bold'>{product?.title}</h3>
					<p className='py-4'>
						You've been selected for a chance to get one year of subscription to
						use Wikipedia for free!
					</p>
				</div>
			</div>
		</>
	);
};

export default CustomModal;