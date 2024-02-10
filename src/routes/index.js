const express = require("express");

const router = express.Router();
const fs = require("fs");

const constant = require("../constants/constants");

fs.readdirSync(__dirname).forEach((file) => {
	if (file === "index.js" || file.indexOf(".js") === -1) return;
	const name = file.replace(/\.js$/, "");
	if (name) {
		router.use("/", require(`./${name}`));
	}
});

module.exports = router;
