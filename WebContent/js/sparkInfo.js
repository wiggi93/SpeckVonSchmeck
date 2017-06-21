var _dotCount = 1;

function getSparkInfo(){
	console.log("getSparkInfo");
	getRunningApplicationIds();
}

function getRunningApplicationIds(){
	var applicationIds = [];
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: "http://localhost:8080/rest/spectrum/applications",
		cache: false,
		success: function(msg){
			for(var i = 0; i < msg.length; i++){
				applicationIds.push(msg[i].id);
			}
			getRunningSparkJobs(applicationIds);
		}
	});
}

function getRunningSparkJobs(ids){
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: "http://localhost:8080/rest/spectrum/sparkJobs/"+ids[0],
		cache: false,
		success: function(msg){
			displayJobStatus(msg);
		}
	});
}

function displayJobStatus(jobArray){
	var amountRunning = 0;
	for(var i = 0; i < jobArray.length; i++){
		if(jobArray[i].status == "RUNNING"){
			amountRunning++;
		}
	}
	_dotCount++;
	_dotCount %= 4;
	var text = "Running jobs";
	for(var i = 0; i < _dotCount; i++){
		text += ".";
	}
	text += " ("+amountRunning+")";
	$("#runningJobsAmount").text(text);
	
	if(amountRunning <= 0){
		$("#runningJobsAmount").text("JOBS FINISHED");
		clearInterval(_sparkInfoIntervalId);
	}
		
}

