const express = require('express');

// Controllers
const {
	getAllTasks,
	createTask,
	getTaskById,
	getTaskByStatus,
	updateTask,
	deleteTask,
	
} = require('../controllers/tasks.controller');

// Middlewares
const {
	createTaskValidators, getTaskByStatusValidators
} = require('../middlewares/validators.middleware');
const { taskExists , taskStatus } = require('../middlewares/Tasks.middleware');

const tasksRouter = express.Router();

tasksRouter.get('/', getAllTasks);

tasksRouter.post('/', createTaskValidators, createTask);

tasksRouter.get('/:id', taskExists, getTaskById);

tasksRouter.get('/status/:status', taskStatus, getTaskByStatus);

tasksRouter.patch('/:id', taskExists, updateTask);

tasksRouter.delete('/:id', taskExists, deleteTask);

module.exports = { tasksRouter };