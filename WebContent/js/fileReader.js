var _selectedFiles;
var _totalIonsCount = 0;
var _uploadedIonsCount = 0;

//browse clicked
function getFilesFromEvent(evt) {
	$("#spinner_browse").css("display", "inherit");
	disableInputButtons();
	_selectedFiles = evt.target.files
    readSelectedFiles();
}

function disableInputButtons(){
	$("#button_send_again").prop('disabled', true);
}

function enableInputButtons(){
	$("#button_send_again").prop('disabled', false);
	$(".spinner").css("display", "none");
}

function readSelectedFiles(){
	_totalIonsCount = 0;
	_uploadedIonsCount = 0;
	$("#progress_bar").css("display", "block");
	$('.progress-bar').attr('aria-valuenow', 0+'%').css('width', 0+'%');
	
	
	if (_selectedFiles) {
        for (var i = 0, f; f = _selectedFiles[i]; i++) {
            var r = new FileReader();
            r.onload = (function (f) {
                return function (e) {
                	_totalIonsCount += (e.target.result.match(/END IONS/g) || []).length;
                    parseFile(e.target.result);
                };
            })(f);
            r.readAsText(f);
            
        }
    } else {
    	console.log("Failed to load selected files");
    }
}
document.getElementById('openFile').addEventListener('change', getFilesFromEvent, false);


function parseFile(content){
	while(content.indexOf("BEGIN IONS") > -1){
		var spec = new Spectrum();
		
		spec.x = [];
		spec.y = [];
        
		try{
		    content = content.substring(content.indexOf("\n")+1, content.length);
		    spec.title = content.substring(content.indexOf("TITLE")+6,content.indexOf("\n",content.indexOf("TITLE")));
		    content = content.substring(content.indexOf("\n")+1, content.length);
		    spec.pepmass = content.substring(content.indexOf("PEPMASS")+8,content.indexOf("\n",content.indexOf("PEPMASS")));
		    content = content.substring(content.indexOf("\n")+1, content.length);
		    spec.charge = content.substring(content.indexOf("CHARGE")+7,content.indexOf("\n",content.indexOf("CHARGE")));
	        content = content.substring(content.indexOf("\n")+1, content.length);
	        spec.rtinseconds = content.substring(content.indexOf("RTINSECONDS")+12,content.indexOf("\n",content.indexOf("RTINSECONDS")));
	        content = content.substring(content.indexOf("\n")+1, content.length);
	        spec.scans = content.substring(content.indexOf("SCANS")+6,content.indexOf("\n",content.indexOf("SCANS")));
	        content = content.substring(content.indexOf("\n")+1, content.length);
		}catch(e){
			console.log(e);
		}
		
        while(content.indexOf("END IONS") > 0){
            spec.x.push(content.substring(0,content.indexOf(" ")));
            spec.y.push(content.substring(content.indexOf(" ")+1, content.indexOf("\n")));
            content = content.substring(content.indexOf("\n")+1, content.length);
        }
        uploadJson(JSON.stringify(spec));
        content=content.substring(content.indexOf("BEGIN IONS"), content.length);
    }
    
}

function uploadJson(json){
	console.log("UPLOAD ---->");
	$.ajax({
    	type: "POST",
    	contentType: "application/json",
    	url: "http://localhost:8080/rest/spectrum/sendSpectrum",
    	data: json,
    	cache: false,
    	success: function(msg){
    		console.log("SUCCESS");
    		_uploadedIonsCount++; 
            let progress = (_uploadedIonsCount / _totalIonsCount) * 100;
            $('.progress-bar').attr('aria-valuenow', (progress)+'%').css('width', progress+'%').text(_uploadedIonsCount+' Ions uploaded.');
            
            if(_uploadedIonsCount >= _totalIonsCount)
            	enableInputButtons();
    	}
    });
}

function sendFilesAgain(){
	if(_selectedFiles != undefined){
		$("#spinner_send_again").css("display", "inherit");
		disableInputButtons();
		readSelectedFiles();
	}
}

function getSparkInfo(){
//	$.ajax({
//    	type: "GET",
//    	dataType: "application/json",
//    	url: "http://localhost:8080/rest/spectrum/getSparkInfo",
//    	success: function(data){
//    		console.log(data);
//    	}
//    });
	
	var ws = new WebSocket("ws://localhost:8080/spark");
	
	ws.onopen = function(){
		console.log("Opened!");
		ws.send("Hello Server");
	}
}

