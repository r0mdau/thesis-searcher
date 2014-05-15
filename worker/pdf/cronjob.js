var CronJob = require('cron').CronJob;
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client();
var fs = require('fs');
var tika = require('tika');

var job = new CronJob({
  cronTime: '*/10 * * * * *',
  onTick: function() {
	fs.readdir(".",function(error,files){
		for(var i in files){
			if(/[0-9a-zA-Z]+\.pdf/.test(files[i])){
				tika.extract(files[i], function(err, text, meta) {
					createDocument(text, meta);	
				});
			}
		}
	});
  },
  start: false
});
job.start();

function createDocument(text, meta){
	client.create({
		index	: 'thesis',
		type	: 'document',
		body	: {
	    	author	: meta.Author,
	    	date	: meta.date,
	    	fileName: meta.resourceName,
	    	content	: text
  		}
	}, function (error, response) {
  		console.log(response);
	});
}
