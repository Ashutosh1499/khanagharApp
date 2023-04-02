import React from 'react';
import './css/loadingCard.css';
import { Skeleton } from '@mui/material';

export default function LoadingCards() {
	return (
		<div className='individualItemCard load'>
			<div className='itemImage imgLoad loadAnim'>
				<Skeleton
					color='primary'
					animation='wave'
					variant='rectangular'
					sx={{ width: '100%', height: '100%' }}
				/>
			</div>
			<div className='itemInfo'>
				<div className='itemName'></div>
				<div className='itemDetail' style={{ width: '50%' }}></div>
			</div>
			<div className='itemInput fb ac jsa'>
				<div className='itemSize fb ac jc'>
					<div className='imgLoad' style={{ width: '90%', height: '75%' }}>
						<Skeleton
							color='primary'
							animation='wave'
							variant='rectangular'
							sx={{ width: '100%', height: '100%' }}
						/>
					</div>
				</div>
				<div className='itemQuantity fb ac jsa'>
					<div className='quanButton imgLoad' style={{ width: '75%' }}>
						<Skeleton
							color='primary'
							animation='wave'
							variant='rectangular'
							sx={{ width: '100%', height: '100%' }}
						/>
					</div>
				</div>
			</div>
			<div className='addToCart fb ac jc'>
				<div className='priceUpdate imgLoad fb ac jc'>
					<Skeleton
						color='primary'
						animation='wave'
						variant='rectangular'
						sx={{ width: '100%', height: '100%' }}
					/>
				</div>
			</div>
		</div>
	);
}
