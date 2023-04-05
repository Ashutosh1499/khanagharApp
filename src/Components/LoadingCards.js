import React from 'react';
import './css/loadingCard.css';
import { Skeleton } from '@mui/material';

const skeleton = (
	<Skeleton
		color='primary'
		animation='wave'
		variant='rectangular'
		sx={{
			width: '100%',
			height: '100%',
			'&::after': {
				animationDuration: '1s',
				background:
					'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent) !important',
			},
		}}
	/>
);
export default function LoadingCards() {
	return (
		<div className='individualItemCard load'>
			<div className='itemImage imgLoad loadAnim'>{skeleton}</div>
			<div className='itemInfo'></div>
			<div className='itemInput fb ac jsa'>
				<div className='itemSize fb ac jc'>
					<div className='imgLoad' style={{ width: '90%', height: '75%' }}>
						{skeleton}
					</div>
				</div>
				<div className='itemQuantity fb ac jsa'>
					<div className='quanButton imgLoad' style={{ width: '75%' }}>
						{skeleton}
					</div>
				</div>
			</div>
			<div className='addToCart fb ac jc'>
				<div className='priceUpdate imgLoad'>{skeleton}</div>
			</div>
		</div>
	);
}
