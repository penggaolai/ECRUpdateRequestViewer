var express = require('express');
var router = express.Router();
var mongojs=require('mongojs');
var db=mongojs('soldev', ['rabbitmq_businesstype', 'rabbitmq_routingkey']);

var locals_businesstypes;
var locals_selectedtype;

/* GET home page. */
router.get('/', function(req, res) {
    db.rabbitmq_businesstype.find(function(err, result) {
        locals_businesstypes=result;
        res.render('RabbitMQRoutingKeyViewer', {
            title:'',
            selectedtype: locals_selectedtype,
            businesstypes: locals_businesstypes,
            routingkeys: ''
        });
    });
});

router.post('/', function(req, res) {
    console.log(req.body);
    var locals_selectedtype=req.body.businesstypes;
    console.log("selected: "+locals_selectedtype);
    db.rabbitmq_routingkey.findOne({type: locals_selectedtype}, function(err, result) {
        //console.log(result.routing_keys)
        res.render('RabbitMQRoutingKeyViewer', {
            title:'',
            selectedtype: locals_selectedtype,
            businesstypes: locals_businesstypes,
            routingkeys: result.routing_keys
        });
    });
});

/*
router.post('/', function(req, res) {
    var locals_selectedtype=req.body.id;
    db.rabbitmq_routingkey.findOne({type: locals_selectedtype}, function(err, result) {
        console.log(result.routing_keys)
        res.render('RabbitMQRoutingKeyViewer', {
            title:'',
            businesstypes: locals_businesstypes,
            routingkeys: result.routing_keys
        });
    });
});
*/
module.exports = router;