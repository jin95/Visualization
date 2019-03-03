const fs = require('fs');
const mysql = require('mysql');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jquery')(window);


// Create RTSP Camera;
function getCameraJSON(callback){
	fs.readFile('Container/RTSPServer/data.json',function(error,data){
		callback(JSON.parse(data));
	});
}
function divideRTSPURL(RTSPURL){
	var SplitURL = RTSPURL.split('/');
	var SplitSub = SplitURL[2].split('@');
	var SplitIP = SplitSub[1].split(':');
	var SplitIdPass = SplitSub[0].split(':');
	if(SplitIdPass.length == 0){
		return {"host":SplitIP[0],"port":SplitIP[1],"path":SplitURL[3],"muser":"","mpass":""}
	}else if(SplitIdPass.length == 1){
		return {"host":SplitIP[0],"port":SplitIP[1],"path":SplitURL[3],"muser":SplitIdPass[0],"mpass":""}
	}
		return {"host":SplitIP[0],"port":SplitIP[1],"path":SplitURL[3],"muser":SplitIdPass[0],"mpass":SplitIdPass[1]}
}
exports.CreateRTSPCam = function(RTSPURL,id){
$.post('http://localhost:8080/?json=true',{machineID: "Qt4bXl76m0fg2mNaeCIH", mail: "yeom4032yeom4032@gmail.com", pass: "y930101", function: "dash"},function(d){
	console.log(d.$user.auth_token);
	getCameraJSON(function(data){
		var RTSP = divideRTSPURL(RTSPURL);
		//console.log(RTSP);
		var Cam = JSON.parse(data.details);
		data.mid = id;
		data.name = id;
		data.host = RTSP.host;
		data.port = RTSP.port;
		data.path = RTSP.path;
		streamurl='/'+d.$user.auth_token+'/mp4/'+d.$user.ke+'/'+data.mid+'/s.mp4';
        	data.streams[0] = streamurl;
        	data.streamsSortedByType.mp4[0] = streamurl;
		Cam.auto_host = RTSPURL;
		Cam.muser = RTSP.muser;
		Cam.mpass = RTSP.mpass;
		data.details = JSON.stringify(Cam);
		//console.log(data);
		var ACameraURL = 'http://localhost:8080/'+d.$user.auth_token+'/configureMonitor/'+d.$user.ke+'/'+data.mid+'?data='+JSON.stringify(data);
		$.get(ACameraURL, function(data, status){
			console.log(data);
		});
	});
});
}
//CreateRTSPCam(RTSPURL,cameraName);



// Delete RTSP Camera;
function getCameraList(data,id){
	for(var i=0; i < data.length; i++){
		if(id == data[i].mid){
			return data[i].mid
		}
	}
}
exports.DeleteRTSPCam = function(id){
$.post('http://localhost:8080/?json=true',{machineID: "Qt4bXl76m0fg2mNaeCIH", mail: "yeom4032yeom4032@gmail.com", pass: "y930101", function: "dash"},function(d){
	$.get('http://localhost:8080/'+d.$user.auth_token+'/monitor/'+d.$user.ke,function(data, status){
		var MonitorId = getCameraList(data,id);
		if(MonitorId != null){
			console.log(MonitorId);
			var DCameraURL = 'http://localhost:8080/'+d.$user.auth_token+'/configureMonitor/'+d.$user.ke+'/'+MonitorId+'/delete';
			$.get(DCameraURL, function(data, status){
                        	console.log(data);
                	});
		}
	});
});
}
//DeleteRTSPCam('SomeStream');
