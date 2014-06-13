var express = require('express');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client();
 
var app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
})

.get('/info', function(req, res){
	res.send({data : {
                info:'Plus d\'informations conernant le contrat d\'interface de cette API ici : https://github.com/r0mdau/thesis-searcher/blob/master/README.md'}
            });
})

.get('/search', function(req, res) {
    res.send({data : {
				warning:'Veuillez fournir un element de recherche'}
			});
})

.get('/search/:queryString', function(req, res) {
	var datas = {data : []};
	client.search({
		index: 'thesis',
		q: 'content:*'+req.params.queryString+'* OR author:*'+req.params.queryString+'* OR fileName:*'+req.params.queryString+'*',
		analyzer : "french_stemmer"
	}, function (error, response) {
		if(response.hits){
			if(response.hits.hits){
				var memoires = response.hits.hits;
				for(var i = 0; i < memoires.length; i++){
					datas.data.push({
						id : memoires[i]._id,
						date : memoires[i]._source.date,
						author : memoires[i]._source.author,
						fileName : memoires[i]._source.fileName
					});
				}
			}
		}
		res.send(datas);
	});
})

.get('/pdf', function(req, res) {
    res.send({data : {
				warning:'Missing PDF identifier.'}
			});
})
.get('/pdf/:id', function(req, res) {
	var datas = {data : {}};
    client.get({
        index: 'thesis',
        type : 'document',
		id   : req.params.id
    }, function (error, response) {
		if(response._source){
	        datas.data = {
	        	id : response._id,
	            date : response._source.date,
	            author : response._source.author,
	            fileName : response._source.fileName,
				content : response._source.content
	        };
		}else{
			datas.data = {error : 'Oops! Something is wrong with the provided PDF identifier.'};
		}
        res.send(datas);
    });
})

.use(function(req, res, next){
    res.redirect('/info');
}) 

.listen(80);
