function getSparkInfo(){
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
				console.log(msg[i].id);
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
			console.log(msg);
		}
	});
}

