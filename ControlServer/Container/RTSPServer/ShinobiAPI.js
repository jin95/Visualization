const fs = require('fs');
const mysql = require('mysql');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jquery')(window);


var RTSPURL = "rtsp://admin@168.131.148.45:18888/videoMain"
var cameraName = "SomeStream";
var MonitorID = "";
fs.readFile('ASCII.txt','utf-8',function(error,data){
	data = String(data);
        for(var i=0; i<10; i++){
                var Random = Math.floor(Math.random()*(62));
                MonitorID += data.substring(String(Random),String(Random+1));
        }
});
// Create RTSP Camera;
// Container/RTSPServer/
function getCameraJSON(callback){
	fs.readFile('data.json','utf-8',function(error,data){
		callback(JSON.stringify(data));
	});
}
function divideRTSPURL(RTSPURL){
	var SplitURL = RTSPURL.split('/');
	if(SplitURL[2].indexOf('@') == -1) {
		var SplitIP = SplitURL[1].split(':');
		return {"host":SplitIP[0],"port":SplitIP[0],"path":SplitURL[3],"muser":"","mpass":""}
	}
	if(SplitURL[2].indexOf('@') != -1){
		var SplitSub = SplitURL[2].split('@');
		if(SplitSub[1].indexOf(':')==-1){
        		var SplitIP = SplitSub[1].split(':');
        		var SplitIdPass = SplitSub[0].split(':');
			return {"host":SplitIP[0],"port":SplitIP[1],"path":SplitURL[3],"muser":SplitIdPass[0],"mpass":""}
		}else{
                        var SplitIP = SplitSub[1].split(':');
                        var SplitIdPass = SplitSub[0].split(':');
			return {"host":SplitIP[0],"port":SplitIP[1],"path":SplitURL[3],"muser":SplitIdPass[0],"mpass":SplitIdPass[1]}
		}
	}
}
exports.CreateRTSPCam = function(RTSPURL,id){
$.post('http://localhost:8080/?json=true',{machineID: "Qt4bXl76m0fg2mNaeCIH", mail: "yeom4032yeom4032@gmail.com", pass: "y930101", function: "dash"},function(d){
	getCameraJSON(function(data){
		data = JSON.parse(data);
		data = JSON.parse(data);
		var RTSP = divideRTSPURL(RTSPURL);
		//console.log(RTSP);
		console.log(data.ke);
		var Cam = JSON.parse(data.details);
		console.log(MonitorID);
		data.mid = MonitorID;
		data.name = id;
		data.host = RTSP.host;
		data.port = RTSP.port;
		data.path = RTSP.path;
		//streamurl='/'+d.$user.auth_token+'/mp4/'+d.$user.ke+'/'+data.mid+'/s.mp4';
        	//data.streams[0] = streamurl;
        	//data.streamsSortedByType.mp4[0] = streamurl;
		Cam.auto_host = RTSPURL;
		Cam.muser = RTSP.muser;
		Cam.mpass = RTSP.mpass;
		data.details = JSON.stringify(Cam);
		//console.log(data);
		var ACameraURL = 'http://localhost:8080/'+d.$user.auth_token+'/configureMonitor/'+d.$user.ke+'/'+data.mid+'?data='+JSON.stringify(data);
		$.get(ACameraURL, function(data, status){
			console.log("안녕",data);
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
		else{
			return null
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
