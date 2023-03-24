import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import NavBar from '../Components/NavBar';
import loadingImage from '../Components/Icons/loadicon.png';

import '../Components/css/myOrder.css';

export default function MyOrder() {
	const [orderData, setOrderData] = useState('');
	const fetchMyOrder = async () => {
		await fetch('https://khanagharbackend.onrender.com/api/myorderData', {
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
		document.title = 'KG | Orders';
		fetchMyOrder();
	});
	return (
		<>
			<NavBar />
			<div className='myOrdersConatianer'>
				<div className='heading fb ac jc'>
					<h3>Your order history</h3>
				</div>
				{orderData !== null && orderData !== {} ? (
					Array(orderData).map(data => {
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
															<div className='dateContainer fb ac jc'>
																<div className='dateHrArea fb ac jc'>
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
																	<div className='orderDetail fb ac jfs'>
																		{arrayData.qty + ' ' + arrayData.size}
																	</div>
																	<div className='orderName fb ac jfs'>
																		<h3 style={{ margin: '0' }}>
																			{arrayData.fName}
																		</h3>
																	</div>
																	<div className='orderPrice fb ac jfs'>
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
				) : (
					<>
						<div
							className='laodingAnimation fb ac jc'
							style={{ width: '100%', height: '50px' }}>
							<img src={loadingImage} alt='' />
						</div>
					</>
				)}
			</div>
			<Footer />
		</>
	);
}
