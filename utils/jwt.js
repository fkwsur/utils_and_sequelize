const jwt = require('jsonwebtoken');
const {ACCESS_KEY} = process.env;
const { user } = require('../models');



module.exports = {
	createToken : (payload) => {
		const token = jwt.sign({username : payload.toString()}, ACCESS_KEY, {
			algorithm : 'HS256',
			expiresIn : '1y'
		});
		return token;
	},
	verifyToken : (token) => {
		let decoded = jwt.verify(token , ACCESS_KEY);
		return decoded;
	},
	checkToken : async (deceded_data) => {
		let check = await user.findOne({ where : { deceded_data }});
		return check ;
	}
}