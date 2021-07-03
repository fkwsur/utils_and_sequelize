const bcrypt = require('bcryptjs');

module.exports = {

	Hash : (password) => {
		const salt = bcrypt.genSaltSync(8);
		const hashpw = bcrypt.hashSync(password, salt);
		return hashpw;
	},
	CompareHash : (password, dbpassword) => {
		return bcrypt.compareSync(password, dbpassword);
	}
}