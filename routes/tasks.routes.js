const express = require('express');

// Controllers
const {
	getAllTasks,
	createTask,
	getTaskById,
	updateTask,
	deleteTask,
} = require('../controllers/tasks.controller');

// Middlewares
const {
	createTaskValidators,
} = require('../middlewares/validators.middleware');
const { taskExists } = require('../middlewares/Tasks.middleware');

const tasksRouter = express.Router();

tasksRouter.get('/', getAllTasks);

tasksRouter.post('/', createTaskValidators, createTask);

tasksRouter.get('/:id', taskExists, getTaskById);

tasksRouter.patch('/:id', taskExists, updateTask);

tasksRouter.delete('/:id', taskExists, deleteTask);

module.exports = { tasksRouter };