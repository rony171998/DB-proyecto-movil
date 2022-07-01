const { app } = require('./app');

// Models
const { User } = require('./models/user.model');

// Utils
const { db } = require('./utils/database.util');
const config = require('./config');


console.log('NODE_ENV:'+ config.NODE_ENV);


db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

app.listen(config.PORT,config.HOST,  () => {
	console.log('Express app running!! on port '+config.PORT +' on port '+config.HOST);
});
