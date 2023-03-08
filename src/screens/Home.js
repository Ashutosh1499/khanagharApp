import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import '../Components/css/home.css';

export default function Home() {
	const [search, setSearch] = useState('');
	const [foodCat, setFoodCat] = useState([]);
	const [foodItem, setFoodItem] = useState([]);
	const loadData = async () => {
		let response = await fetch('http://localhost:5000/api/foodData', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		response = await response.json();
		setFoodItem(response[0]);
		setFoodCat(response[1]);
	};

	useEffect(() => {
		loadData();
	}, []);

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
						{foodCat !== []
							? foodCat.map(data => {
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
							: ''}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
