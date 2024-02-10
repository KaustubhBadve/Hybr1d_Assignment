const config = require("../../config/dbconfig");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const ZER0 = 0;
const NEGATIVE_THREE = -3;
const Sequelize = require("sequelize");

let sequelize = new Sequelize(config.DB.DB, config.DB.USER, config.DB.PASSWORD, {
	host: config.DB.HOST,
	dialect: config.DB.dialect,
	operatorsAliases: 0,
	define: {
		freezeTableName: true,
	},
	pool: {
		max: config.DB.pool.max,
		min: config.DB.pool.min,
		acquire: config.DB.pool.acquire,
		idle: config.DB.pool.idle,
	},
});

const db = {};

fs.readdirSync(__dirname)
	.filter((file) => file.indexOf(".") !== ZER0 && file !== basename && file.slice(NEGATIVE_THREE) === ".js")
	.forEach((file) => {
		var model = require(path.join(__dirname, file))(sequelize, Sequelize);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
