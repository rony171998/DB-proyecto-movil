const { body, validationResult, param } = require('express-validator');

const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		
		const errorMsgs = errors.array().map(err => err.msg);

		const message = errorMsgs.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};

const createUserValidators = [
	
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('password')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters long')
		.isAlphanumeric()
		.withMessage('Password must contain letters and numbers'),
	body('first_name').notEmpty().withMessage('first_name cannot be empty'),
	body('last_name').notEmpty().withMessage('last_name cannot be empty'),	
	body('age').notEmpty().withMessage('age cannot be empty')
	.isDate().withMessage('age must be a Date'),
	body('photo').notEmpty().withMessage('photo cannot be empty')
	.isURL().withMessage('photo must be a URL'),
	checkResult,
];



module.exports = { createUserValidators  };
