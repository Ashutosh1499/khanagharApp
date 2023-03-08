const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecret = 'MynameisAshutoshKaushik#1999';

router.post(
	'/createuser',
	[
		body('email').isEmail(),
		body('password', 'incorrect password').isLength({ min: 5 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const salt = await bcrypt.genSalt(10);
		let securedPassword = await bcrypt.hash(req.body.password, salt);
		try {
			await User.create({
				name: req.body.name,
				password: securedPassword,
				email: req.body.email,
				location: req.body.location,
			});
			res.json({ success: true });
		} catch (error) {
			console.log(error);
			res.json({ success: false });
		}
	},
);

router.post('/userlogin', [body('email').isEmail()], async (req, res) => {
	let email = req.body.email;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		let userData = await User.findOne({ email });
		if (!userData) {
			return res.json({ success: false, errorNumber: '1' });
		}
		const pwdCompare = await bcrypt.compare(
			req.body.password,
			userData.password,
		);
		if (!pwdCompare) {
			return res.json({ success: false, errorNumber: '2' });
		}
		const data = {
			user: {
				id: userData.id,
			},
		};
		const authToken = jwt.sign(data, jwtSecret);
		return res.json({ success: true, authToken: authToken });
	} catch (error) {
		res.json({ success: false });
	}
});
module.exports = router;
