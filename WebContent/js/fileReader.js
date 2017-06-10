function readMultipleFiles(evt) {
    //Retrieve all the files from the FileList object
    var files = evt.target.files;

    if (files) {
        for (var i = 0, f; f = files[i]; i++) {
            var r = new FileReader();
            r.onload = (function (f) {
                return function (e) {
                    var contents = e.target.result;
                    parserTeppich(contents);
                };
            })(f);
            r.readAsText(f);
        }
    } else {
    	alert("Failed to load files");
    }
}
document.getElementById('openFile').addEventListener('change', readMultipleFiles, false);


function parserTeppich(contents){
	while(contents.indexOf("BEGIN IONS") >- 1){
		var spec = new Spectrum();
		
		spec.x = [];
		spec.y = [];
        
	    contents = contents.substring(contents.indexOf("\n")+1, contents.length);
	    spec.title = contents.substring(contents.indexOf("TITLE")+6,contents.indexOf("\n",contents.indexOf("TITLE")));
	    contents = contents.substring(contents.indexOf("\n")+1, contents.length);
	    spec.pepmass = contents.substring(contents.indexOf("PEPMASS")+8,contents.indexOf("\n",contents.indexOf("PEPMASS")));
	    contents = contents.substring(contents.indexOf("\n")+1, contents.length);
	    spec.charge = contents.substring(contents.indexOf("CHARGE")+7,contents.indexOf("\n",contents.indexOf("CHARGE")));
        contents = contents.substring(contents.indexOf("\n")+1, contents.length);
        spec.rtinseconds = contents.substring(contents.indexOf("RTINSECONDS")+12,contents.indexOf("\n",contents.indexOf("RTINSECONDS")));
        contents = contents.substring(contents.indexOf("\n")+1, contents.length);
        spec.scans = contents.substring(contents.indexOf("SCANS")+6,contents.indexOf("\n",contents.indexOf("SCANS")));
        contents = contents.substring(contents.indexOf("\n")+1, contents.length);

        while(contents.indexOf("END IONS")!=0){
            spec.x.push(contents.substring(0,contents.indexOf(" ")));
            spec.y.push(contents.substring(contents.indexOf(" ")+1, contents.indexOf("\n")));
            contents = contents.substring(contents.indexOf("\n")+1, contents.length);
        }
        
        uploadJson(JSON.stringify(spec));
        contents=contents.substring(contents.indexOf("BEGIN IONS"), contents.length);

    }

    
}

function uploadJson(json){
	console.log(json);
	$.ajax({
    	type:"POST",
    	contentType: "application/json",
    	url:"http://localhost:8080/rest/spectra",
    	data:json,
    	sucess: function(msg){
    		alert("nice");
    	}
    });
}


