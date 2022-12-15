import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import MercedesCategory from './MercedesCategory/MercedesCategory';
import RollsRoyec from './RollsRoyec/RollsRoyec';
import TeslaCategory from './TeslaCategory/TeslaCategory';

const ProductCategory = () => {
;
	return (
		<div className='my-16'>
			<h1 className='flex justify-start text-2xl text-gray-900 font-bold font-serif my-2 ml-5 underline'>
				Product Category
			</h1>
			<div className=''>
				<RollsRoyec></RollsRoyec>
				<MercedesCategory></MercedesCategory>
				<TeslaCategory></TeslaCategory>
			</div>
		</div>
	);
};

export default ProductCategory;
