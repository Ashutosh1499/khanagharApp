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
			<div className='container fb ac jsb'>
				<div className='title fb ac jc'>
					<Link to='/'>
						<span className='appTitle'>
							<span className='appTitleCaps'>K</span>
							<span className='appTitleSmalls'>hana</span>
							<span className='appTitleCaps'>G</span>
							<span className='appTitleSmalls'>har</span>
						</span>
					</Link>
				</div>
				<div className='navLinks fb ac jc'>
					<div className='plainLinks fb'>
						<div className='eachLink fb ac jc'>
							<Link to='/'>
								<h3>Home</h3>
							</Link>
						</div>
						{localStorage.getItem('authToken') ? (
							<div className='eachLink fb ac jc'>
								<Link to='/myOrder'>
									<h3>History</h3>
								</Link>
							</div>
						) : (
							''
						)}
					</div>
					<div className='buttonLinks fb ac jfe'>
						{!localStorage.getItem('authToken') ? (
							<>
								<div className='linkButtons lin fb ac jfe'>
									<Link to='/login'>Login</Link>
								</div>
								<div className='linkButtons lout fb ac jc'>
									<Link to='/signUp'>SignUp</Link>
								</div>
							</>
						) : (
							<>
								<div className='linkButtons cart fb ac jfe'>
									<Link
										to='/'
										className='fb ac jc'
										onClick={() => setCartView(true)}>
										Cart &nbsp;
										<span
											className='badge fb ac jc'
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
								<div className='linkButtons logout fb ac jc'>
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
			</div>
		</div>
	);
}
