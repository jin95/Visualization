var fs = require('fs');
var RTSP = require('../Container/RTSPServer/ShinobiAPI.js');
var path = "../Format/Node1.json"
var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

// Node.json 파일이 존재하는지 그리고 "Node" 키가 존재하는지  체크
function CheckNodeJson(path){
if(fs.existsSync(path)){
	var Obj = JSON.parse(fs.readFileSync(path,'utf-8'));
        if("Node" in Obj){
		return Obj;
        }
	else
		Obj['Node']=[];
		return Obj;
}
else{
	var Obj = new Object();
	Obj['Node']=[];
	var STR = JSON.stringify(Obj);
	fs.writeFileSync(path,STR,'utf-8');
	return Obj;
}};

// Node.json 파일 내 "Node" 개수 체크하는데 사용.
function CountNodes(path){
var Data = CheckNodeJson(path);
if(Data.Node.length == 0){
	console.log("empty");
	return Data.Node.length
}
else{
	return Data.Node.length
}}


// Node.json 파일 내 "Node"의 List를 보여준다.
exports.GetNodeList = function(path){
var Data = CheckNodeJson(path);
	return Data;
}

// 체크용 i 값이 0이 아닐 시 비정상
function CheckNodeName(path,nodename){
var Data = CheckNodeJson(path);
i = CountNodes(path);
	while(i>0){
		if(Data.Node[CountNodes(path)-i].NodeName==nodename){
			break;
		}
	i--;
	}
	return i;
}

exports.CheckNodeNameExist = function(path,nodename){
var Data = CheckNodeJson(path);
i = CountNodes(path);
        while(i>0){
                if(Data.Node[CountNodes(path)-i].NodeName==nodename){
			console.log(nodename,"이 존재합니다.");
                        break;
                }
        i--;
        }
        return i;
}

// Node.json 파var Error = CheckNodeName(path,nodename)일 "Node"를 생성한다.
exports.CreateNode = function(path,nodetype,nodename){
var Data = CheckNodeJson(path);
var Error = CheckNodeName(path,nodename)
if(Error!=0){
	console.log("중복된 이름이 있습니다.");
}
else{
	Data.Node.push({
        	"NodeType":nodetype,
        	"NodeName":nodename,
        	"Device":[]
	});
	var STR = JSON.stringify(Data);
	fs.writeFileSync(path,STR,'utf-8');
	console.log("입력되었습니다");
}}

// Node.json 파일 "Node" 값을 삭제.
// Node Device가 하나도 없을 시 삭제 가능.
exports.DeleteNode = function(path,nodename){
var Data = CheckNodeJson(path);
var Count = CheckNodeName(path,nodename);
if(Count==0){
	console.log("Node가 존재하지 않습니다.");
	return 0;
}
else {
	if(CountDevices(path,nodename)==0){
		console.log("Node 내에 Device가 존재하지 않습니다.");
		Data.Node.splice(CountNodes(path)-Count,1);
		var STR = JSON.stringify(Data);
		fs.writeFileSync(path,STR,'utf-8');
		console.log("Node가 제거되었습니다.");
		return 1;
	}else{
		return 0;
	}
}}



exports.CreateDevice = function(path,nodename,id,dtype,protocol,url,topic){
var Data = CheckNodeJson(path);
var result = CheckNodeName(path,nodename);
var checkarray = CountNodes(path)-result;
if(result!=0){
	if(dtype == 'RTSP'){
		/*
		console.log(Data.Node[checkarray].Device.length);
		if(Data.Node[checkarray].Device.length == 0){
			console.log("0일경우",Data.Node[checkarray].Device.length);
			Data.Node[checkarray].Device.push({
                                        "id":id,
                                        "Dtype":dtype,
                                        "URL":url,
					"Protocol":protocol,
					"ContainerName":containername
                                });
			var STR = JSON.stringify(Data);
        		fs.writeFileSync(path,STR,'utf-8');
			RTSP.CreateRTSPCam(url, id);
			console.log('RTSP Device Create');
		}
		else{
			for(var i=0;i< Data.Node[checkarray].Device.length+1;i++){
				if(Data.Node[checkarray].Device[i].id!=id){
                			if(Data.Node[checkarray].Device.length==i){
						console.log("0이 아닐경우",Data.Node[checkarray].Device.length);
						Data.Node[checkarray].Device.push({
                                        		"id":id,
                                        		"Dtype":dtype,
                                        		"URL":url,
                                        		"Protocol":protocol,
                                        		"ContainerName":containername
                				});
						var STR = JSON.stringify(Data);
        					fs.writeFileSync(path,STR,'utf-8');
						RTSP.CreateRTSPCam(url, id);
						console.log('RTSP Device');
					}
				}else{
					console.log(id,'이(가) 이미 존재합니다.');
					break;
				}
       			}
		}
		*/
	}
	if(dtype == 'RTMP'){
		console.log('RTMP 입니다');
	}
	if(dtype == 'Kafka'){
		console.log('Kafka 입니다');
	}
	if(dtype == 'Mosquitto'){
		// Node Device가 하나도 없을 때
		var k = 1;
		var sub_name = 'sub' + String(k);
	  var containername = [];
	  docker.listContainers(function(err, containers){
	        for(i=0;i<containers.length;i++){
	          var temp = containers[i].Names[0]
	          containername.unshift(temp.split('/',2)[1])
	          for(j=0;j<containername.length;j++){
	            if(containername[j] == sub_name){
	               k = k+1;
	               sub_name = 'sub' + String(k);
		    	 		}
	          }
	        }
	        Topic = String("Topic="+topic);
	        docker.createContainer({
	          name: sub_name,
	          Image: 'sub',
	          AttachStdin: false,
	          AttachStdout: true,
	          AttachStderr: true,
	          Tty: true,
		        Env: [Topic]
	        }).then(function(container){
	                return container.start();
	        }).catch(function(err) {
	                console.log(err)
	        })
	        k = k+1
				})
        Data.Node[checkarray].Device.push({
                        "id":id,
                        "Dtype":dtype,
                        "URL":url,
                        "Protocol":protocol,
                        "ContainerName":sub_name
                });
        var STR = JSON.stringify(Data);
        fs.writeFileSync(path,STR,'utf-8');
        console.log('Mosquitto 입니다');
	}
}}

//Delete Devices
exports.DeleteDevice = function(path,nodename,id,dtype){
	var Data = CheckNodeJson(path);
	var result = CheckNodeName(path,nodename);
	var checkarray = CountNodes(path)-result;
	if(result!=0){
		if(dtype == 'RTSP'){
		Data.DeleteRTSPCam(id);
			console.log("RTSP Device Delete");
		}
		if(dtype == 'Mosquitto'){
			// Node Device가 하나도 없을 때
			if(CountDevices(path,nodename)==0){
				console.log("삭제할 디바이스가 존재하지 않습니다.");
			}
	    else{
				var find_id = Data.Node[checkarray].Device.findIndex(function(item) {return item.id == id})
 				if(find_id > -1){
					var tmp = Data.Node[checkarray].Device.splice(find_id,1).pop()
					if(tmp.id == id){
						console.log(tmp.ContainerName)
						var container = docker.getContainer(String(tmp.ContainerName));
						container.stop(function(err,data){
							container.remove(function(err,data){});
						});
					}
					console.log('삭제했습니다');
				}
	   	}
		}
	}
}

// 특정 Node의 Device들의 개수를 정한다.
// 필요
function CountDevices(path,nodename){
	var Data = CheckNodeJson(path);
	var i = CheckNodeName(path,nodename);
	var NodePro = Data.Node[CountNodes(path)-i];
	if(NodePro.hasOwnProperty("Device")){
		return Data.Node[CountNodes(path)-i].Device.length;
	}
	else{
		return 0;
	}
}

//DeleteNode(path,"Sungung");
/*
obj.Node[1].Device.push({
        "id":"",
        "Dtype":"",
        "Protocol":"",
        "URL":""
})
console.log("Put Test",obj.Node[1].Device);
*/
