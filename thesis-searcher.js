var express = require('express');
var elasticsearch = require('elasticsearch');
 
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
.get('/search/:id', function(req, res) {
	// :id = req.params.id
    res.send({data : 
				[{
					id		: 1,
					date	: "14 Avril 2013", 
					author	: "Romain Dauby", 
					fileName: "M13_DAUBY.pdf"
				},
				{
					id		: 2,
                    date    : "24 Juin 2013",
                    author  : "Felix Wattez",
                    fileName: "M13_WATTEZ.pdf"
                }]
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
					id		: 1,
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
