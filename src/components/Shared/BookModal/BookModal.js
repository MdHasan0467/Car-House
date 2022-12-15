import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const BookModal = ({ selected, setSelected }) => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleModalValue = (e) => {
		e.preventDefault();
		console.log(e.target.value);

		const productImg = selected.image;
		const sellerName = e.target.sellerName.value;
		const sellerEmail = e.target.sellerEmail.value;
		const productCategory = e.target.productCategory.value;
		const productModel = e.target.productModel.value;
		const resellPrice = e.target.resellPrice.value;
		const sellerLocation = e.target.sellerLocation.value;
		const meetingDate = e.target.meetingDate.value;
		const buyerNumber = e.target.buyerNumber.value;

		const bookingData = {
			productImg,
			sellerName,
			sellerEmail,
			productCategory,
			productModel,
			resellPrice,
			sellerLocation,
			meetingDate,
			buyerNumber,
		};

		fetch('http://localhost:5000/bookingData', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(bookingData),
		})
			.then((res) => res.json())
			.then((result) => {
				toast.success('Successfully added a new Product!!');
				navigate('/dashboard/myOrders');
			});
	};
	return (
		<div className='modal_body'>
			<input type='checkbox' id='booking-modal' className='modal-toggle' />
			<div className='modal'>
				<div className='modal-box relative'>
					<label
						htmlFor='booking-modal'
						className='btn border-0 hover:bg-red-600 text-white btn-sm btn-circle absolute right-2 top-2'
					>
						✕
					</label>
					<form onSubmit={handleModalValue} className='modal_card my-5'>
						<input
							type='text'
							name='sellerName'
							readOnly
							defaultValue={user?.displayName}
							className='input text-center input-bordered w-full '
						/>

						<input
							type='text'
							name='sellerEmail'
							readOnly
							defaultValue={user?.email}
							className='input input-bordered text-center  my-3 w-full '
						/>
						<div className='my-3'>
							<h1 className='text-start'>Brand :</h1>
							<input
								type='text'
								name='productCategory'
								readOnly
								defaultValue={selected?.category}
								className='input input-bordered w-full '
							/>
						</div>
						<div className='my-3'>
							<h1 className='text-start'>Product Model :</h1>
							<input
								type='text'
								name='productModel'
								readOnly
								defaultValue={selected?.title}
								className='input input-bordered w-full '
							/>
						</div>
						<div className='my-3'>
							<h1 className='text-start'>Resell Price :</h1>
							<input
								type='text'
								name='resellPrice'
								readOnly
								defaultValue={selected?.resalePrice}
								className='input input-bordered w-full '
							/>
						</div>
						<div className='my-3'>
							<h1 className='text-start'>Seller Location :</h1>
							<input
								type='text'
								name='sellerLocation'
								readOnly
								defaultValue={selected?.location}
								className='input input-bordered w-full '
							/>
						</div>
						<div className='my-3'>
							<h1 className='text-start'>Meeting Date :</h1>
							<input
								type='text'
								name='meetingDate'
								placeholder='Give here Your Meeting date'
								className='input input-bordered w-full '
							/>
						</div>
						<div className='my-3'>
							<h1 className='text-start'>Buyer Number :</h1>
							<input
								type='text'
								name='buyerNumber'
								placeholder='Give here Your Phone Number'
								className='input input-bordered w-full '
							/>
						</div>

						<input
							type='submit'
							htmlFor='booking-modal'
							value='Confirm'
							className='btn border-0 hover:bg-green-400 mt-3 text-white'
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default BookModal;
