const express = require('express');
//const route = require('./route.js');
const path = require('path');
var CORS = require('cors')();
const app = express();
app.use(CORS);
//app.use('/', route);


// views html/css 파일 관리
app.get('/',function(req, res){
  res.sendFile(path.join(__dirname,'views/html', 'example.html'));
})
app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/css','style.css'));
});
app.get('/windowOpen.html', (req, res) => {
  res.sendFile(path.join(__dirname,'views/html' ,'windowOpen.html'));
});



// Topology 구성
app.get('/network.js', (req, res) => {
  res.sendFile(path.join(__dirname,'routes/topology', 'network.js'));
});
app.get('/contextmenu1.js', (req, res) => {
  res.sendFile(path.join(__dirname,'routes/topology' ,'contextmenu1.js'));
});
app.get('/net.js', (req, res) => {
  res.sendFile(path.join(__dirname,'routes/topology' ,'net.js'));
});





app.use((req, res, next) => { // 404 처리 부분
  res.status(404).send('일치하는 주소가 없습니다!');
});
app.use((err, req, res, next) => { // 에러 처리 부분
  console.error(err.stack); // 에러 메시지 표시
  res.status(500).send('서버 에러!'); // 500 상태 표시 후 에러 메시지 전송
});
app.listen(3000, () => {
  console.log("Express App on port 3000!");
});
