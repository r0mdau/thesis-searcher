var CronJob = require('cron').CronJob;
var fs = require('fs');

var job = new CronJob({
  cronTime: '0 * * * * *',
  onTick: function() {
	fs.readdir(".",function(error,files){
		for(var i in files){
			var file = fs.readFileSync(files[i],"UTF-8");
			var datas = file.split("\n");	
			for(var i = 0 ; i < datas.length ; i++){
			    if(datas[i] != ''){
					console.log(datas[i]);
				}
			}
		}
	});
  },
  start: false
});
job.start();
