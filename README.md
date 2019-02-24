# Visualization

### Install Node.js

<pre><code>
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install nodejs
sudo apt-get install build-essential
nodejs -v
npm -v
</code></pre>
<hr/>

#### npm =  node package manager

<code>
 const 변수이름 = require(패키지이름);
 </code>

 <hr/>

### Express - Install express

<pre><code>
sudo npm install express
</code></pre>


<pre><code>
const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(8080, () => {
  console.log('Express App on port 8080!');
});
</code></pre>

<hr/>

## 미들웨어(Middleware)

<pre><code>
const express = require('express');
const app = express();
app.use((req, res, next) => {
  console.log('미들웨어');
  next();
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(8080, () => {
  console.log('Express App on port 8080!');
});
</code></pre>
<hr/>


### socket.io
socket.io로 실시간 업데이트를 구현하는데 사용. </br>socket.io는 웹소켓을 사용해서 클라이언트에 실시간으로 데이터를 전송.</br> 클라이언트에서는 이벤트 리스너로 대기하고 있으면 새로운 정보가 들어옴에 따라 보이는 정보를 업데이트할 수 있습니다.
<pre><code>
<script src="/socket.io/socket.io.js"></script>  
<script>  
// localhost로 연결한다.
var socket =  
  io.connect('http://localhost');

// 서버에서 news 이벤트가 일어날 때 데이터를 받는다.
socket.on('news',  
  function (data) {
    console.log(data);
  //서버에 my other event 이벤트를 보낸다.
    socket.emit('my other event',
      { my: 'data' });
});
</script>  
</code></pre>
브라우저에서 클라이언트 페이지를 열면 클라이언트 콘솔에는 "{ hello : 'world' }"가, 서버 콘솔에는 "{ my : 'data' }"가 출력되는 것을 확인할 수 있을 것이다.
예를들면 클라이언트 콘솔에는 센서값을 통한 결과가 출력되고 서버콘솔에는 센서값 자체가 출력된다.

</hr>
