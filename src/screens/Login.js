import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
	const [content, setContent] = useState('');
	const [Credentials, setCredentials] = useState({ email: '', password: '' });
	let navigate = useNavigate();
	const handleLogin = async e => {
		e.preventDefault();
		const response = await fetch(
			'https://khanagharbackend.onrender.com/api/userlogin',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: Credentials.email,
					password: Credentials.password,
				}),
			},
		);
		const json = await response.json();
		console.log(json);

		if (!json.success) {
			if (json.errorNumber === '1') {
				setContent('Email not registered');
				setTimeout(() => {
					setContent('');
					console.log('h');
				}, 1500);
			} else if (json.errorNumber === '2') {
				setTimeout(() => {
					setContent('');
				}, 1500);
				setContent('Incorrect password');
			} else {
				setContent('Enter valid credentials');
			}
		}
		if (json.success) {
			localStorage.setItem('userEmail', Credentials.email);
			localStorage.setItem('authToken', json.authToken);
			navigate('/');
		}
	};
	const onchange = evt => {
		setCredentials({ ...Credentials, [evt.target.name]: evt.target.value });
	};
	return (
		<div className='logPage'>
			<div className='pageHeading flexBoxCenter'>
				<h2>Login</h2>
			</div>
			<div className='mainContainer flexBoxCenter'>
				<div className='logContainer'>
					<form onSubmit={handleLogin}>
						<input
							type='text'
							placeholder='Email'
							name='email'
							value={Credentials.email}
							onChange={onchange}
						/>
						<input
							type='password'
							placeholder='Password'
							name='password'
							value={Credentials.password}
							onChange={onchange}
						/>
						<button type='submit' className='firstButton'>
							Login
						</button>
						<Link to='/signUp'>
							<button type='button' className='secondButton'>
								New user?
							</button>
						</Link>
						<span className='alertSpan'>{content}</span>
					</form>
				</div>
			</div>
		</div>
	);
}
