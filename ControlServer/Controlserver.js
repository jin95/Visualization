const express = require('express');
// CrossDomain Module
const CORS = require('cors')();
const app = express();
const fs = require('fs');
// Dockerode Module
var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
// bodyParser Moudle
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(CORS);

var DATA = require('./Module/DataAPI.js');
var Json = fs.readFileSync("./Format/Node1.json");
Json = JSON.parse(Json);
var path = "Format/Node1.json";
// Get Data
app.get('/', (req, res) => {
  // 수정 필요 html 파일로
  res.send(Json);
});

// Get NodeList
app.get('/getNodeList', (req, res) => {
  Json = DATA.GetNodeList(path)
  // 전체 NodeList를 가져온다.
  res.send(Json);
});

// Get NodeList
app.get('/getNodeList/:NodeName', (req, res) => {
	if(DATA.CheckNodeNameExist(path,req.params.NodeName)==0){
		res.send({result:0});
	}
	else{
		res.send({result:1});
	}
});

// Get DeviceList
app.get('/getDeviceList', (req, res) => {
  // 전체 DeviceList를 가져온다.
  res.send(Json);
});

app.get('/getDeviceList/:id', (req, res) => {
  // 파라메터에 의한 DeviceList를 가져온다.
  res.send(Json);
});

// Post Data
app.post('/createNode', (req, res) => {
  // NodeType: Home, Company, University, JNU
  // NodeName: "string"
  // Device: []
  var node = req.body;
  var nodetype = req.body.NodeType;
  var nodename = req.body.NodeName;
  DATA.CreateNode(path,nodetype,nodename)
  res.send({"result":1});
});

app.post('/createCamera', (req, res) => {
  // id: 최고 id 값 검색 후 +1
  // Dtype: RaspberryPi
  // Protocol: RTMP, RTSP
  // URL: RTMPURL, RTSPURL
  var Id = req.body.Id;
  var Dtype = req.body.Dtype;
  var URL = req.body.URL;
  var NodeName = req.body.NodeName;
  DATA.CreateDevice(path,NodeName,Id,Dtype,URL)
  res.send(Json);
});

var k = 1;
app.post('/createSensor', (req, res) => {
  // id: 최고 id 값 검색 후 +1
  // Dtype: ESP32, ArdRaspi
  // Protocol: NULL
  // URL: NULL
  var Id = req.body.Id;
  var Dtype = req.body.Dtype;
  var Protocol = null;
  var URL = null;
  var NodeName = req.body.NodeName;
  var topic = req.body.topic;
  console.log(topic);
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
	console.log(topic)
        DATA.CreateDevice(path,NodeName,Id,Dtype,Protocol,URL,sub_name)
        res.send({"result" : 1})
        })
});

app.post('/deleteSensor',(req,res) => {
  // Id는 Visualization 상에서 Sensor의 이름을 담당한다.
  // Container Name은 생성될 때 자동으로 이름이 맵핑이 된다.
  // JSON으로 Container이름과 Sensor이름을기록한다.
  var Id = req.body.Id;
  var container = docker.getContainer(remove_subname);
  docker.getContainer(remove_subname).stop();
  container.remove(function(err,data){
	console.log(data)
  });
  res.send({"result" : 1});
});

// Delete Data
app.post('/deleteNode', (req, res) => {
  var nodename = req.body.NodeName;
  if(DATA.DeleteNode(path,nodename)==1){
	res.send({"success":"1"});
  }
  else{
	res.send({"success":"0"});
  }
});

app.post('/deleteDevice', (req, res) => {
  var nodename = req.body.NodeName;
  var id = req.body.id;
  res.send(obj);
});

app.listen(3000, () => {
  console.log('Express App on port 3000!');
});
