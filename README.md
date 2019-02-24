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

 Node.js에서는 자주 쓰이고 재사용되는 자바스크립트 코드들을 패키지로 만들어서 사용할 수 있습니다. 그러한 패키지를 모아놓은 저장소가 npm입니다.
 이제 다른 사람의 패키지들을 npm install [패키지 이름]을 명령으로 cmd에서 설치할 수 있습니다. 그 후
<code>
 const 변수이름 = require(패키지이름);
 </code>
 하면 해당 변수 이름으로 패키지를 사용할 수 있습니다. require 해서 패키지 사용가능
npm에서 패키지를 사용할 것이라면 패키지들을 체계적으로 관리할 필요가 있다.
실제 서비스에서는 패키지를 수십, 수백 개 가량 다운받게 되기 때문에 각각의 패키지에 대한 버전을 기록. </br> 그래서 패키지명과 함께 패키지 버전도 함께 기록할 필요가 있습니다. 그 역할을 하는 게 package.json 파일
 <hr/>

## Express
### Install express

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


## socket.io
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
