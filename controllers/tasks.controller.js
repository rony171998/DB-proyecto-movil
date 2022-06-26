// Models
const { Task } = require('../models/task.model');
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllTasks = catchAsync(async (req, res, next) => {
	const tasks = await Task.findAll({
		include: User,
	});

	res.status(200).json({
		status: 'success',
		tasks,
	});
});

const createTask = catchAsync(async (req, res, next) => {
	const { title,userId ,limitDate } = req.body;
	

	const newTask = await Task.create({
		title,
		userId,
		limitDate,
		startDate: new Date(),
		
	});

	res.status(201).json({
		status: 'success',
		newTask,
	});
});

const getTaskById = catchAsync(async (req, res, next) => {
	const { task } = req;

	res.status(200).json({
		status: 'success',
		task,
	});
});

const getTaskByStatus = catchAsync(async (req, res, next) => {
	const { task } = req;

	res.status(200).json({
		status: 'success',
		task,
	});
});

const updateTask = catchAsync(async (req, res, next) => {
	const { task } = req;
	const { status  } = req.body;

	if (status === 'active') {
		await task.update({ status: 'completed' });
		res.status(204).json({ status: 'success' });
	}else {
		res.status(204).json({ status: 'error no active task' });
	}
	
	
});

const deleteTask = catchAsync(async (req, res, next) => {
	const { task } = req;

	await task.update({ status: 'cancelled' });

	res.status(204).json({ status: 'success' });
});

module.exports = {
	getAllTasks,
	createTask,
	getTaskById,
	updateTask,
	deleteTask,
};