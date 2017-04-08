require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./app/routes');

const compiler = webpack(config);
const app = express();



// connect the remote mongodb databace
mongoose.connect(process.env.DB_URI);


// app.use(bodyParser.urlencoded( {extended: false}));

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});



app.use(require('webpack-dev-middleware')(
	compiler, {
		publicPath: config.output.publicPath
	}
));

app.use(require('webpack-hot-middleware')(compiler));
app.use(bodyParser.json());

//set routes, order is important
app.use(router);


app.listen(3000, function (err) {
	if (err) {
		return console.error(err);
	}

	console.log('Listening at http://localhost:3000');
});
