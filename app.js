const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');

db.sequelize
	.authenticate()
	.then(async () => {
		console.log('db connect ok');
		await db.sequelize.sync({ force : false });
	}) 
	.catch(err => {
		console.log('db' + err);
	});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

const Router = require('./routes');

app.use('/api/user', Router.userRouter);

app.listen(2000, () => {
	console.log('server on')
});
