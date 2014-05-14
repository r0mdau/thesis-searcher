var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '* */5 * * * *',
  onTick: function() {
	fs.readdir(".",function(error,directoryObject){
		for(var i in files){
			var file = fs.readFileSync(files[i],"UTF-8");
			var datas = file.split("\n");	
			for(var i = 0 ; i < datas.length ; i++){
			    if(datas[i] != ''){
					//A voir comment on recupè les donnees en fonction des pdf
				}
			}
		}
	});
  },
  start: false
});
job.start();
