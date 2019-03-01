const app = require('express')();
const path = require('path');
var CORS = require('cors')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const request = require('request')
//const app = express();
var json_parse; // ControlServer에서 받은 JSON 파싱하기위한 변수
var ln = 1;
app.use(CORS);
io.on('connection', function(socket){
  console.log('Node created');
  socket.emit('news', { check: 'Connect' });
  socket.on('my other event', function (data) {
    if(data.success==1){
      request.get('http://192.168.0.37:3000/getNodeList',function(error, response) {
      console.log("-------------------parsing testing----------------------");
      json_parse = JSON.parse(response.body);
      var i =0;
        while(i < json_parse.Node.length){
          console.log(json_parse.Node[i].NodeType + " : "+json_parse.Node[i].NodeName );
          i++;
      }
     })
   }
  });
});

request.get('http://192.168.0.37:3000/getNodeList',function(error, response) {
  json_parse = JSON.parse(response.body);
  var i = 0;
  while(i < json_parse.Node.length){
  console.log(json_parse.Node[i].NodeType);
  i++;
  }
})



// views html/css 파일 관리
app.get('/',(req,res) => {
  res.sendFile(path.join(__dirname,'views/html', 'main.html'));
})
app.get('/windowOpen.html', (req, res) => {
  res.sendFile(path.join(__dirname,'views/html' ,'windowOpen.html'));
});
app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/css','style.css'));
});

// Topology 구성
app.get('/network.js', (req, res) => {
  res.sendFile(path.join(__dirname,'routes/topology', 'network.js'));
});
app.get('/net.js', (req, res) => {
  res.sendFile(path.join(__dirname,'routes/topology' ,'net.js'));
});
app.get('/contextmenu1.js', (req, res) => {
  res.sendFile(path.join(__dirname,'routes/topology' ,'contextmenu1.js'));
});

// 이미지 라우팅
app.get('/views/img/sensor.png',(req,res) => {
  res.sendFile(path.join(__dirname,'views/img' ,'sensor.png'));
});
app.get('/views/img/dns_logo.png',(req,res) => {
  res.sendFile(path.join(__dirname,'views/img' ,'dns_logo.png'));
});
app.get('/views/img/sensor.png',(req,res) => {
  res.sendFile(path.join(__dirname,'views/img' ,'sensor.png'));
});

app.use((req, res, next) => { // 404 처리 부분
  res.status(404).send('일치하는 주소가 없습니다!');
});
app.use((err, req, res, next) => { // 에러 처리 부분
  console.error(err.stack); // 에러 메시지 표시
  res.status(500).send('서버 에러!'); // 500 상태 표시 후 에러 메시지 전송
});
http.listen(5000, () => {
  console.log("Express App on port 5000!");
});
