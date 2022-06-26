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
	const {userId ,title  ,limitDate } = req.body;
	const user = await User.findOne({where: {id: userId}});

	if (!user) {
		return next(new AppError('User not found', 404));
	}else{
		const task = await Task.create({
			userId,
			title,
			limitDate,
			startDate: new Date(),
		});

		res.status(201).json({
			status: 'success',
			task,
		});
	}
	
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
	

	if (task.status === 'active') {
		if (task.limitDate > new Date()) {
			await task.update({ status: 'completed', finishDate: new Date() });	
			res.status(200).json({ status: 'success completed' , finishDate: new Date() });		
		}else{
			await task.update({ status: 'late', finishDate: new Date() });
			res.status(200).json({ status: 'success late' });
        }
		

	}else {
		res.status(200).json({ status: 'error no active task' });
	}
		
});

const deleteTask = catchAsync(async (req, res, next) => {
	const { task } = req;

	await task.update({ status: 'cancelled' });

	res.status(200).json({ status: 'success' });
});

module.exports = {
	getAllTasks,
	createTask,
	getTaskById,
	getTaskByStatus,
	updateTask,
	deleteTask,
};