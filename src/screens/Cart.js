import React from 'react';
import { useCart, useDispatchCart } from '../Components/ContextReducers';

import '../Components/css/cart.css';

export default function Cart() {
	let data = useCart();
	let dispatch = useDispatchCart();
	if (data.length === 0) {
		return (
			<div className='flexBoxCenter' style={{ marginTop: '25px' }}>
				<div>Your cart is Empty</div>
			</div>
		);
	}
	const handleCheckOut = async () => {
		let userEmail = localStorage.getItem('userEmail');
		console.log('from cart.js', userEmail);
		let response = await fetch('http://localhost:5000/api/orderData', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				order_data: data,
				email: userEmail,
				order_date: new Date().toDateString(),
			}),
		});
		console.log('Order respone:', response.status);
		if (response.status === 200) {
			dispatch({ type: 'DROP' });
		}
	};
	let totalPrice = data.reduce((total, food) => total + food.price, 0);

	return (
		<div className='cartContainer'>
			<div className='pageHeading flexBoxCenter'>
				<h2>Cart</h2>
			</div>
			<div className='cartTableArea flexBoxAlignStart'>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Size</th>
							<th>Quantity</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						{data.map((food, index) => {
							return (
								<tr key={food.id + index}>
									<td>{index + 1}</td>
									<td>{food.fName}</td>
									<td>{food.size}</td>
									<td>{food.qty}</td>
									<td>{food.price}</td>
									<td className='noneBorder'>
										<button
											className='hover'
											onClick={() => {
												dispatch({ type: 'REMOVE', index: index });
											}}>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className='totalPriceArea flexBoxJustifyStart'>
				<span>{totalPrice}</span>
				/-
			</div>
			<div className='checkoutArea flexBoxCenter'>
				<div className='buttonArea'>
					<button onClick={handleCheckOut}>Checkout</button>
				</div>
			</div>
		</div>
	);
}
