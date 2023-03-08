import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducers';

import './css/navBar.css';

export default function NavBar() {
	let data = useCart();
	const [none, setNone] = useState('');
	const [cartView, setCartView] = useState(false);
	const [numberOfItems, setNumberOfItems] = useState(0);

	useEffect(() => {
		if (numberOfItems === 0) {
			setNone('none');
		} else {
			setNone('flex');
		}
		setNumberOfItems(data.length);
	}, [data.length, numberOfItems]);
	return (
		<div className='navBar'>
			<div className='container flexBoxJustifySpaceBetween'>
				<div className='title flexBoxCenter'>
					<Link to='/'>
						<span className='appTitle'>
							<span className='appTitleCaps'>K</span>
							<span>hana</span>
							<span className='appTitleCaps'>G</span>
							<span>har</span>
						</span>
					</Link>
				</div>
				<div className='links flexBoxJustifyStart'>
					<div className='eachLink flexBoxCenter boldText'>
						<Link to='/'>
							<h3>Home</h3>
						</Link>
					</div>
					{localStorage.getItem('authToken') ? (
						<div className='linkButtons flexBoxCenter'>
							<Link to='/myOrder'>My Orders</Link>
						</div>
					) : (
						''
					)}
				</div>
				{!localStorage.getItem('authToken') ? (
					<>
						<div className='linkButtons flexBoxJustifyEnd'>
							<Link to='/login'>Login</Link>
						</div>
						<div className='linkButtons flexBoxCenter'>
							<Link to='/signUp'>SignUp</Link>
						</div>
					</>
				) : (
					<>
						<div className='linkButtons cart flexBoxJustifyEnd'>
							<Link
								to='/'
								className='flexBoxCenter'
								onClick={() => setCartView(true)}>
								Cart &nbsp;
								<span
									className='badge flexBoxCenter'
									style={{ display: `${none}` }}>
									{numberOfItems}
								</span>
							</Link>
						</div>
						{cartView ? (
							<Modal onClose={() => setCartView(false)}>
								<Cart />
							</Modal>
						) : null}
						<div className='linkButtons logout flexBoxCenter'>
							<Link
								to='/'
								onClick={() => {
									localStorage.setItem('authToken', '');
									localStorage.setItem('userEmail', '');
									window.location.reload(false);
								}}>
								Logout
							</Link>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
