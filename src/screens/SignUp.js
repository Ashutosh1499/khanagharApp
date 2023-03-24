import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import '../Components/css/loginSignup.css';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
	let navigate = useNavigate();
	const [Credentials, setCredentials] = useState({
		name: '',
		email: '',
		password: '',
		geolocation: '',
	});
	const handleSubmit = async e => {
		e.preventDefault();
		const response = await fetch(
			'https://khanagharbackend.onrender.com/api/createuser',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: Credentials.name,
					email: Credentials.email,
					password: Credentials.password,
					location: Credentials.geolocation,
				}),
			},
		);
		const json = await response.json();
		console.log(json);

		if (!json.success) {
			alert('Enter Valid Credentials');
		}
		if (json.success) {
			navigate('/');
		}
	};
	const onchange = evt => {
		setCredentials({ ...Credentials, [evt.target.name]: evt.target.value });
	};
	useEffect(() => {
		document.title = 'KG | SignUp';
	});
	return (
		<>
			<NavBar />
			<div className='logPage'>
				<div className='pageHeading fb ac jc'>
					<h2>Sign Up</h2>
				</div>
				<div className='mainContainer fb ac jc'>
					<div className='logContainer'>
						<form onSubmit={handleSubmit}>
							<input
								type='text'
								placeholder='Name'
								name='name'
								value={Credentials.name}
								onChange={onchange}
							/>
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
							<input
								type='text'
								placeholder='Location'
								name='geolocation'
								value={Credentials.geolocation}
								onChange={onchange}
							/>
							<button type='submit' className='firstButton'>
								Sign Up
							</button>
							<Link to='/login'>
								<button type='button' className='secondButton'>
									Already a User?
								</button>
							</Link>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
