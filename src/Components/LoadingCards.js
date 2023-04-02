import React from 'react';
import './css/loadingCard.css';

export default function LoadingCards() {
	return (
		<div className='individualItemCard load'>
			<div className='itemImage imgLoad loadAnim'></div>
			<div className='itemInfo'>
				<div className='itemName'></div>
				<div className='itemDetail' style={{ width: '50%' }}></div>
			</div>
			<div className='itemInput fb ac jsa'>
				<div className='itemSize fb ac jc'>
					<div
						className='imgLoad'
						style={{ width: '90%', height: '75%' }}></div>
				</div>
				<div className='itemQuantity fb ac jsa'>
					<div className='quanButton imgLoad'></div>
					<div className='displayQuantity imgLoad'></div>
					<div className='quanButton imgLoad'></div>
				</div>
			</div>
			<div className='addToCart fb ac jc'>
				<div className='priceUpdate imgLoad fb ac jc'></div>
				<div className='quanButton imgLoad'></div>
			</div>
		</div>
	);
}
