import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import NavBar from '../Components/NavBar';

import '../Components/css/myOrder.css';

export default function MyOrder() {
	const [orderData, setOrderData] = useState('');
	const fetchMyOrder = async () => {
		await fetch('http://localhost:5000/api/myorderData', {
			// credentials: 'include',
			// Origin: "http://localhost:3000/login",
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: localStorage.getItem('userEmail'),
			}),
		}).then(async res => {
			let response = await res.json();
			setOrderData(response);
		});
	};
	useEffect(() => {
		fetchMyOrder();
	});
	return (
		<>
			<NavBar />
			<div className='myOrdersConatianer'>
				<div className='heading flexBoxCenter'>
					<h3>Your order history</h3>
				</div>
				{orderData !== {}
					? Array(orderData).map(data => {
							return data.orderData
								? data.orderData.order_data
										.slice(0)
										.reverse()
										.map(item => {
											return item.map(arrayData => {
												console.log(arrayData);
												return (
													<>
														{arrayData.Order_date ? (
															<>
																<div className='dateContainer flexBoxCenter'>
																	<div className='dateHrArea flexBoxCenter'>
																		<div className='dateArea'>
																			{arrayData.Order_date}
																		</div>
																		<hr />
																	</div>
																</div>
															</>
														) : (
															<>
																<div className='individualOrderCard'>
																	<div className='orderImage'>
																		<img src={arrayData.img} alt='' />
																	</div>
																	<div
																		className='detailsArea'
																		style={{ paddingLeft: '5px' }}>
																		<div className='orderDetail flexBoxJustifyStart'>
																			{arrayData.qty + ' ' + arrayData.size}
																		</div>
																		<div className='orderName flexBoxJustifyStart'>
																			<h3 style={{ margin: '0' }}>
																				{arrayData.fName}
																			</h3>
																		</div>
																		<div className='orderPrice flexBoxJustifyStart'>
																			{arrayData.price}
																		</div>
																	</div>
																</div>
															</>
														)}
													</>
												);
											});
										})
								: '';
					  })
					: ''}
			</div>
			<Footer />
		</>
	);
}
