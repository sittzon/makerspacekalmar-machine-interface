const app = require('express');
const router = app.Router();
const gpio = require('../gpio');
const mysql = require('../mysql');

var renderRoot = function (req, res, next) {
	res.render('body', {machineNames: mysql.machineNames, pinsTimeLeft: gpio.pinsTimeLeft});
}

router.get('/', [renderRoot]);

module.exports = router;