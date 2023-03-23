import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import '../Components/css/home.css';
import loadingImage from '../Components/Icons/loadicon.png';

export default function Home() {
	const [search, setSearch] = useState('');
	const [foodCat, setFoodCat] = useState([]);
	const [foodItem, setFoodItem] = useState([]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const loadData = async () => {
		let response = await fetch(
			'https://khanagharbackend.onrender.com/api/foodData',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		response = await response.json();
		setFoodItem(response[0]);
		setFoodCat(response[1]);
		if (foodCat === null) {
			console.log('yess');
			window.location.reload(false);
		}
	};

	useEffect(() => {
		document.title = 'KhanaGhar';
		loadData();
	}, [loadData]);

	return (
		<>
			<NavBar />
			<div className='homeContents'>
				<div className='homeImage flexBoxAlignEnd'>
					<div className='searchBar'>
						<form className='searchBarForm flexBoxSpaceAround'>
							<input
								type='search'
								name='searchBar'
								id='searchBar'
								placeholder='Search in here..'
								value={search}
								onChange={e => {
									setSearch(e.target.value);
								}}
							/>
						</form>
					</div>
				</div>
				<div className='allItemsContainer flexBoxCenter'>
					<div className='allItemCards'>
						{foodCat !== null && foodCat.length !== 0 ? (
							foodCat.map(data => {
								return (
									<div className='indCat' key={data._id}>
										<div className='categoryName flexBoxJustifyStart'>
											<h2>{data.CategoryName}</h2>
										</div>
										<hr />
										<div className='indCatCards'>
											{foodItem !== [] ? (
												foodItem
													.filter(
														item =>
															item.CategoryName === data.CategoryName &&
															(item.name
																.toLowerCase()
																.includes(search.toLowerCase()) ||
																item.description
																	.toLowerCase()
																	.includes(search.toLowerCase())),
													)
													.map(filterItems => {
														return (
															<div key={filterItems._id}>
																<Card
																	foodItem={filterItems}
																	options={filterItems.options[0]}
																/>
															</div>
														);
													})
											) : (
												<div> No such data </div>
											)}
										</div>
									</div>
								);
							})
						) : (
							<>
								<div
									className='laodingAnimation flexBoxCenter'
									style={{ width: '100%', height: '150px' }}>
									<img src={loadingImage} alt='' />
								</div>
								<div className='waitMessage flexBoxCenter'>
									<h3>Please wait while we fetch data from the server.</h3>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
