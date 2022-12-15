import React from 'react';

const DeleteModal = ({closeModal, deletingUser, successAction, image, name, email}) => {
    // console.log('modal',image, name, email);
    // const { photoURL, name, email } = modalData;
    console.log('deletingUser', deletingUser);
	return (
		<div>
			<input type='checkbox' id='confirmation-modal' className='modal-toggle' />
			<div className='modal'>
				<div className='modal-box'>
					<h3 className='font-bold text-lg my-5 flex justify-center'>
						Are You Sure To Delete This {deletingUser.role} ?
					</h3>

					<div className='flex flex-col items-center pb-10'>
						<img
							className='mb-3 h-24 w-24 rounded-full shadow-lg'
							src={image}
							alt='buyer img'
						/>
						<h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
							{name}
						</h5>
						<h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
							{email}
						</h5>

						<div className='mt-4 flex space-x-3 lg:mt-6'>
							<label
								onClick={() => successAction(deletingUser)}
								htmlFor='confirmation-modal'
								className='btn border-0 bg-red-600 text-white hover:bg-red-700'
							>
								Delete
							</label>
							<label
								onClick={closeModal}
								htmlFor='confirmation-modal'
								className='btn border-0 bg-gray-800 text-white'
							>
								Cancel
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;