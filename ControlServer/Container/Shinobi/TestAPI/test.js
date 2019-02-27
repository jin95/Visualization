var Shinobi = require(__dirname + "/Module");
var rtspUrl = [];

// write RTSP URL
rtspUrl.push('rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov');

var host = '127.0.0.1';
var url_ = rtspUrl[0];
var ports = 8080; //  web port  - ports[0]
var cameraName = 'Test';
var callback = '';

// Set up Camera
Shinobi.ShinobiSetup(host, ports, cameraName, rtspUrl, callback, function(result,data){
        if (result){
            console.log(result);
        }
});

// Delete Camera
/*
Shinobi.ShinobiDeleteMonitor(host, ports, cameraName, callback,function(result,data){
        if (result){
            console.log(result);
        }
});
*/
