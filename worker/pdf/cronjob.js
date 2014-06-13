var CronJob = require('cron').CronJob;
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client();
var fs = require('fs');
var tika = require('tika');
var mv = require('mv');
var curFile = '';
var escape = require('escape-html');

var job = new CronJob({
  	cronTime: '0 * * * * *',
  	onTick: function() {
		fs.readdir(".",function(error,files){
    		if(error) console.log(error);
    	    else{
    	    	for(var i in files){
    	        	if(/.+\.pdf/i.test(files[i])){
    	            	curFile = files[i];
    	                tika.extract(files[i], function(err, text, meta) {
    	                	createDocument(text, meta);
    	                    mv(curFile, '../done/'+curFile, function(err) {
    	                    });
    	                });
    	            }
    	        }
    	    }
    	});
  },
  start: false
});
job.start();

function createDocument(text, meta){
  var textWithoutHTML = escape(text);
	client.create({
		index	: 'thesis',
		type	: 'document',
		body	: {
	    	author	: meta.Author,
	    	date	: meta.date,
	    	fileName: meta.resourceName,
	    	content	: textWithoutHTML
  		}
	}, function (error, response) {
  		console.log(response);
	});
}
