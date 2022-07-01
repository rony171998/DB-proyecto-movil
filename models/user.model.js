const { db, DataTypes } = require('../utils/database.util');

const User = db.define('user', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	first_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	last_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	age: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	photo: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	
});

module.exports = { User };
