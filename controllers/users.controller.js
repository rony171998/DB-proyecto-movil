// Models
const { User } = require('../models/user.model');


// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.findAll();

	res.status(200).json({
		status: 'success',
		users,
	});
});

const createUser = catchAsync(async (req, res, next) => {
	const { email,password,first_name ,last_name,age,photo } = req.body;

	const newUser = await User.create({

		email,
		password,
		first_name,
		last_name,
		age,
		photo,
		
	});

	res.status(201).json({
		status: 'success',
		newUser,
	});
});

const getUserById = catchAsync(async (req, res, next) => {
	const { user } = req;

	res.status(200).json({
		status: 'success',
		user,
	});
});

const updateUser = catchAsync(async (req, res, next) => {
	const { user } = req;
	const { email,password,first_name ,last_name,age,photo  } = req.body;

	await user.update({  email,password,first_name ,last_name,age,photo  });

	res.status(200).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
	const { user } = req;

	await user.update({ status: 'deleted' });

	res.status(200).json({ status: 'success' });
});

module.exports = {
	getAllUsers,
	createUser,
	getUserById,
	updateUser,
	deleteUser,
};
