const mongoose = require('mongoose');

const mongoURI =
	'mongodb+srv://khanaghar:KG2023@cluster0.yucfuju.mongodb.net/khanaghardb?retryWrites=true&w=majority';

const mongoDB = async () => {
	await mongoose
		.connect(mongoURI, { useNewUrlParser: true })
		.then(async () => {
			console.log('Connected');
			const fData = await mongoose.connection.db
				.collection('food_items')
				.find()
				.toArray();
			if (Object.keys(fData).length !== 0) {
				global.food_items = fData;
				const fCategory = await mongoose.connection.db
					.collection('food_category')
					.find()
					.toArray();
				if (Object.keys(fCategory).length !== 0) {
					global.food_category = fCategory;
				}
			} else {
				console.log('No data present');
			}
		})
		.catch(err => console.log('error', err));
};

module.exports = mongoDB;
