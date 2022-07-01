const express = require('express');
const cors = require('cors');

var corsOptions = {
	  origin: 'http://localhost:4000',
	  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

}

const { usersRouter } = require('./routes/users.routes');


// Global err controller
const { globalErrorHandler } = require('./controllers/error.controller');

// Utils
const { AppError } = require('./utils/appError.util');


const app = express();


app.use(express.json()) 

app.use('/api/v1/users', usersRouter);

//Handle incoming unknown routes to the server
app.all('*', (req, res, next) => {
	next(
		new AppError(
			`${req.method} ${req.originalUrl} not found in this server`,
			404
		)
	);
});

app.use(globalErrorHandler);

module.exports = { app };