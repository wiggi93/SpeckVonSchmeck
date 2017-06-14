var _selectedFiles;

function getFilesFromEvent(evt) {
	_selectedFiles = evt.target.files
    readSelectedFiles();
}

function readSelectedFiles(){
	if (_selectedFiles) {
        for (var i = 0, f; f = _selectedFiles[i]; i++) {
            var r = new FileReader();
            r.onload = (function (f) {
                return function (e) {
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
	while(content.indexOf("BEGIN IONS") >- 1){
		var spec = new Spectrum();
		
		spec.x = [];
		spec.y = [];
        
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

        while(content.indexOf("END IONS")!=0){
            spec.x.push(content.substring(0,content.indexOf(" ")));
            spec.y.push(content.substring(content.indexOf(" ")+1, content.indexOf("\n")));
            content = content.substring(content.indexOf("\n")+1, content.length);
        }
        
        
        
        uploadJson(JSON.stringify(spec));
        content=content.substring(content.indexOf("BEGIN IONS"), content.length);

    }

    
}

function uploadJson(json){
	$.ajax({
    	type: "POST",
    	contentType: "application/json",
    	url: "http://localhost:8080/rest/spectrum/sendSpectrum",
    	data: json,
    	success: function(msg){
    		console.log("Success! Data sent.");
    	}
    });
}

function sendFilesAgain(){
	if(_selectedFiles != undefined){
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

