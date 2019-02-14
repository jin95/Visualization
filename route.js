const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리
router.get('/', (req, res) => { //app 대신 router에 연결
  res.sendFile(path.join(__dirname, 'html', 'example.html'));
});
router.get('/1', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', '1.html'));
});
module.exports = router; //모듈로 만드는 부분

//코드를 분리했다는 것에 의의