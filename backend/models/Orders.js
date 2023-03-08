const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	order_data: {
		type: Array,
		required: true,
	},
});

const NewOrderSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	order_data: {
		type: Object,
		required: true,
	},
});
module.exports = mongoose.model('order', OrderSchema);
module.exports = mongoose.model('orders', NewOrderSchema);
