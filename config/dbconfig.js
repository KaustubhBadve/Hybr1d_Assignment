const options = {
	DB: {
		HOST: "127.0.0.1",
		USER: "root",
		PASSWORD: "password",
		DB: "dev_db",
		dialect: "mysql",
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	},
};
module.exports = options;
