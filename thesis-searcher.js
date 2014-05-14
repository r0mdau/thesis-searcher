var express = require('express');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client();
 
var app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

app.get('/pdf', function(req, res) {
    res.send({message:'Veuillez fournir un paramètre de recherche'});
});
app.get('/pdf/:id', function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
});
 
app.listen(80);
