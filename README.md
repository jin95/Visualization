# Visualization

### atom , ubuntu ftp 설정

#### vsftp 설치
<pre><code>
sudo apt-get update
sudo apt-get install vsftpd
</code></pre>

#### vsftp.conf 파일 수정

<pre><code>
sudo vim /etc/vsftpd.conf
</code></pre>


##### 주석수정

<pre><code>
listen_ipv6=YES
anonymous_enable=NO
local_enable=YES
write_enable=YES
local_umask=022
xferlog_enable=YES
</code></pre>

#### 참고
<pre><code>
sudo service vsftpd restart
sudo service --status-all
sudo netstat -atlpvn
</code></pre>


### git 설정
#### git 설치
<pre><code>
sudo apt-get install git-core
</code></pre>

#### Github 개인 정보 등록
<pre><code>
sudo git config --global user.name "본인 계정 입력"
sudo git config --global user.email "본인 메일 주소 입력"
sudo git config --global color.ui "auto"
</code></pre>
#### github 저장소 복제
<pre><code>
sudo git clone "주소"
</code></pre>
#### 원격 저장소 등록
<pre><code>
sudo git remote add origin "주소"
sudo git fetch origin
</code></pre>

##### 참고
<pre><code>
sudo git add -A // 변경된 모든 파일 추가(커밋 전에 필수 실행) 필수과정
sudo git commit // 엔터치고 변경목록이 보이면 컨트롤+o 이후 엔터 그리고 컨트롤+x 종료.
sudo git commit -m "메세지입력" //필수과정
sudo git push
sudo git pull //저장소 업데이트(내려받기)
git status //git 상태확인
</code></pre>
<hr/>


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

<<<<<<< HEAD

<code>
 const 변수이름 = require(패키지이름);
 </code>

 <hr/>

## Express
### Install express
=======
<code>
 const 변수이름 = require(패키지이름);
 </code>

<hr/>

##### CORS 크로스 도메인 해결법
<pre><code>
sudo npm install cors -save
</code></pre>
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
