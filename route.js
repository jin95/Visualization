const express = require('express');
const path = require('path'); //디렉토리 주소를 다루는 모듈
const router = express.Router(); // 라우터 분리
router.get('/', (req, res) => { //app 대신 router에 연결
  res.sendFile(path.join(__dirname, 'html', 'example.html'));
});


router.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'html','style.css'));
});
router.get('/net.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'net.js'));
});
router.get('/network.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'network.js'));
});
router.get('/contextmenu1.js', (req, res) => {
  res.sendFile(path.join(__dirname,'html' ,'contextmenu1.js'));
});


module.exports = router; //모듈로 만드는 부분

//코드를 분리했다는 것에 의의
