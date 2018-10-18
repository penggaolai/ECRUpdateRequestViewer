var express = require('express');
var router = express.Router();
var mongojs=require('mongojs');
var db=mongojs('soldev', ['rabbitmq_businesstype'])

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('ECRUpdateRequestViewer', { title:'' });
});

module.exports = router;
