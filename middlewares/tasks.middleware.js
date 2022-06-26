// Models
const { Task } = require('../models/task.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const taskExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const task = await Task.findOne({ where: { id } });

	if (!task) {
		return next(new AppError('Task not found', 404));
	}

	req.task = task;
	next();
});

const taskStatus = catchAsync(async (req, res, next) => {
	const { status } = req.params;

	if (status === 'active' || status === 'completed' || status === 'cancelled' || status === 'late') {
		const task = await Task.findAll({ where: { status } });

		if (task.length === 0) {
			return next(new AppError('Tasks by status not founds', 404));
		}else{
			req.task = task;
			
		}
		
	}else {
		return next(new AppError('status not valid', 404));
	}

	next();
});

module.exports = { taskExists , taskStatus };