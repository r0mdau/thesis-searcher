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
		q: 'content:'+req.params.queryString
	}, function (error, response) {
		if(response.hits){
			if(response.hits.hits){
				var memoires = response.hits.hits;
				for(var i = 0; i < memoires.length; i++){
					datas.data.push({
						id : memoires[i]._source.id,
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
				warning:'Veuillez fournir l\'identifiant du PDF demande'}
			});
})
.get('/pdf/:id', function(req, res) {
	res.send({data :
                {
					id		: "1",
                    date    : "14 Avril 2013",
                    author  : "Romain Dauby",
                    fileName: "M13_DAUBY.pdf",
                    content : "WAZAAAAAAAAA CONTENU DE OUF"
                }
            });
})

.use(function(req, res, next){
    res.redirect('/info');
}) 

.listen(80);
