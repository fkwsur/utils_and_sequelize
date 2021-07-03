const {user } = require('../models');
const { crypt, jwt, handler } = require('../utils');
const { errorHandler } = handler;
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	
	SignUp : async (req, res) =>{
		try {
			let {username, password } = req.body;
			let hashpassword = crypt.Hash(password);
			//create => insert 문이다.
			const rows = await user.create({username :username, password : hashpassword });
			if(rows) return res.status(200).json({result : true});
			else throw { code : 1 } ; 
		} catch (err) {
			return res.status(400).send(errorHandler(err));
		}
	},
	SignIn : async (req, res) => {
		try {
			let {username, password } = req.body;
			//select 문 중에서도  쓰는 경우
			console.log(username, password);
			const rows = await user.findOne({where : {username}});
			let check = crypt.CompareHash(password, rows.password);
			console.log(rows);
			let token = jwt.createToken(username);
			if(check)return res.status(200).json({token : token});
			else return res.send('failed');
		} catch (e) {
			console.log(e);
		}
	},
	List : async (req, res) => {
		try {
			//select * from 테이블 
			const rows = await user.findAll();
			if(rows) return res.status(200).json({result : rows});
		} catch (e) {}
	},
	UpdateUser : async (req, res) => {
		try {
			let {username, new_username } = req.body;
			//update table setusername = ? whereusername = ?
			const rows = await user.update({username : new_username },
				{
					where : {
						username :username,
					}
				});
				if(rows) return res.status(200).json({result : true});
		} catch (e) {}
	},
	Delete : async (req, res) => {
		try {
			let {username } = req.body;
			const rows = await user.destroy({ 
				where : {
					username :username
				}
			});
			if(rows) return res.status(200).json({result : true});
		} catch (e) {}
	},
	Search : async (req, res) => {
		try {
			let { data } = req.body;
			const rows = await sequelize.query(
				'select * from user where username like "%"?"%"',
				{
					replacements : [data],
					type : QueryTypes.SELECT
				}
			);
			if(rows) return res.status(200).send(rows);
		} catch (e) {}
	},
	Hello : async (req, res) => {
		try {
			//select * from 테이블 
			// let {username } = req.body;
			let token = req.get('x_auth');
			console.log(token);
			let decoded = jwt.verifyToken(token);
			console.log(decoded);
			console.log('/');
			const rows = jwt.checkToken(decoded.username);
			if(rows) return res.status(200).json({result : 'hello'});
			else throw res.status(400).send('failed');
		} catch (error) {
			console.log(error);
		}
	}
}