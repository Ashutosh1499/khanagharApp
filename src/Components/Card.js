import React, { useEffect, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducers';

import '../Components/css/card.css';
import cartImage from '../Components/Icons/cart.png';

export default function Card(props) {
	let data = useCart();
	let dispatch = useDispatchCart();
	let options = props.options;
	let priceOptions = Object.keys(options);
	let foodItem = props.foodItem;

	const [selected, setSelected] = useState(Object.keys(options)[0]);
	const [itemCost, setItemCost] = useState(Object.values(options)[0]);
	const [qValue, setQValue] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	const handleSelectedValue = e => {
		setSelected(e.target.value);
	};

	const handleAddToCart = async () => {
		if (qValue === 0) {
			alert('increase quantity of the item');
			return;
		}
		let food = [];
		for (const item of data) {
			console.log(data);
			if (item.id === props.foodItem._id && item.size === selected) {
				food = item;

				break;
			}
		}
		if (food !== []) {
			if (food.size === selected) {
				await dispatch({
					type: 'UPDATE',
					id: foodItem._id,
					price: totalPrice,
					qty: qValue,
					index: 2,
				});
				console.log('yess');
				return;
			} else if (food.size !== selected) {
				await dispatch({
					type: 'ADD',
					id: foodItem._id,
					fName: foodItem.name,
					price: totalPrice,
					qty: qValue,
					size: selected,
					img: foodItem.img,
				});
				console.log('no');
				return;
			}
			return;
		}
		await dispatch({
			type: 'ADD',
			id: foodItem._id,
			fName: foodItem.name,
			price: totalPrice,
			qty: qValue,
			size: selected,
			img: foodItem.img,
		});
	};

	useEffect(() => {
		setItemCost(options[`${selected}`]);
		setTotalPrice(qValue * itemCost);
	}, [options, selected, qValue, itemCost]);

	return (
		<div className='individualItemCard'>
			<div className='itemImage'>
				<img src={foodItem.img} alt='' />
			</div>
			<div className='itemInfo'>
				<div className='itemName fb ac jfs'>
					<h3>{foodItem.name}</h3>
				</div>
				<div className='itemDetail'>{foodItem.description}</div>
			</div>
			<div className='itemInput fb ac jsa'>
				<div className='itemSize fb ac jc'>
					<select
						name='itemSize'
						id='itemSize'
						style={{ width: '95%' }}
						onChange={handleSelectedValue}>
						{priceOptions.map(data => {
							return (
								<option key={data} value={data}>
									{data} ({options[`${data}`]})
								</option>
							);
						})}
					</select>
				</div>
				<div className='itemQuantity fb ac jsa'>
					<div
						className='quanButton fb ac jc hover'
						onClick={() => {
							if (qValue > 0) {
								setQValue(qValue - 1);
								setTotalPrice((qValue - 1) * itemCost);
							}
						}}>
						-
					</div>
					<div className='displayQuantity fb ac jc'>{qValue}</div>
					<div
						className='quanButton fb ac jc hover'
						onClick={() => {
							if (qValue < foodItem.limit) {
								setQValue(qValue + 1);
								setTotalPrice((qValue + 1) * itemCost);
							}
						}}>
						+
					</div>
				</div>
			</div>
			<div className='addToCart fb ac jc'>
				<div className='priceUpdate fb ac jc'>₹{totalPrice}/-</div>
				<div className='atcButtonArea fb ac jc'>
					<button className='hover fb ac jc' onClick={handleAddToCart}>
						<img src={cartImage} alt='' />
					</button>
				</div>
			</div>
		</div>
	);
}
