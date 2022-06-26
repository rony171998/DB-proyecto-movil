const { db, DataTypes } = require('../utils/database.util');


const Task = db.define('task', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	userId: {
		foreignkey: true,
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	limitDate: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	startDate: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	finishDate: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { Task };