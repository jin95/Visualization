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

설치한 express는 node_modules라는 폴더 안에 저장됩니다. 또한 package.json에 express가 설치되었음이 기록됩니다. </br>앞으로는 package.json 파일만 있으면 node_modules 폴더가 지워졌더라도 복구할 수 있습니다. npm install 하면 자동으로 package.json안에 기록된 모든 패키지들을 설치합니다.

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
익스프레스 프레임워크의 장점 중 하나가 미들웨어를 사용한다는 것. 이름처럼 요청에 대한 응답 과정 중간에 껴서 어떠한 동작을 해주는 프로그램.</br>
익스프레스는 요청이 들어올 때 그에 따른 응답을 보내어 응답을 보내기 전에 미들웨어가 지정한 동작을 수행합니다.</br>
예시로
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

## 라우팅

익스프레스의 또다른 장점은 라우팅이 편리합니다. 라우팅이라 함은 클라이언트에서 보내는 주소에 따라 다른 처리를 하는 것을 의미. 익스프레스는 REST API에 따라 처리하는 데 그 방법이 아주 간단합니다.

app 객체에 app[REST메소드]('주소', 콜백함수) 이렇게 연결. </br>앞에서 app.get('/', 콜백) 하는 것은 바로 / 주소로 GET 요청이 올 때 콜백하라고 등록.</br> app.get 외에, app.post, app.put, app.delete 메소드를 사용합니다.

##### route.js

<pre><code>
const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리
router.get('/', (req, res) => { // app 대신 router에 연결
  res.sendFile(path.join(__dirname, 'html', 'main.html'));
});
router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'about.html'));
});
module.exports = router; // 모듈로 만드는 부분
</code></pre>
express에서는 express.Router()을 사용해 라우터를 분리할 수 있습니다. module.exports가 바로 모듈을 만드는 코드입니다.</br> 이 부분이 있어야 다른 파일에서 여기서 export한 것을 require할 수 있습니다.
이렇게 만든 route.js파일을 server.js에서 불러옵니다. 코드를 분리해야 유지보수가 편함.
</hr>

## WAS와 웹서버의 차이

### 웹 서버 (Web Server)
클라이언트가 서버에 페이지 요청을 하면 요청을 받아 정적 컨텐츠(.html, .png, .css등)를 제공하는 서버
클라이언트에서 요청이 올 때 가장 앞에서 요청에 대한 처리를 한다.
클라이언트의 요청을 기다리고 요청에 대한 데이터를 만들어서 응답하는 역할 (정적 데이터)

CASE
정적 컨텐츠를 요청(request)했나?
1. 정적 컨텐츠구나! 내가 제공해줄게 => .html, .png 등 응답(response)
2. 정적컨텐츠가 아니면 WAS에게 처리를 맡김 => 결국 WAS가 처리해준 컨텐츠를 받은 웹서버는 응답(response)을 해줌
대표 : Apache, nginx

### WAS (Web Application Server)

동적 컨텐츠를 제공하기 위해 만들어진 애플리케이션 서버 (DB조회, 로직처리가 요구되는 컨텐츠)

JSP,Servlet 구동 환경 제공

컨테이너, 웹컨테이너, 서블릿 컨테이너라고도 부름

* JSP, servlet을 실행시킬 수 있는 소프트웨어 = 컨테이너

동작 프로세스
1. 웹서버로부터 요청이 오면 컨테이너가 받아서 처리</br>
2. 컨테이너는 web.xml을 참조하여 해당 서블릿에 대한 쓰레드 생성하고 httpServletRequest와 httpServletResponse 객체를 생성하여 전달한다.</br>
3. 컨테이너는 서블릿을 호출한다.</br>
4. 호출된 서블릿의 작업을 담당하게 된 쓰레드(2번에서 만든 쓰레드)는 doPost()또는 doGet()을 호출한다.</br>
5. 호출된 doPost(), doGet() 메소드는 생성된 동적 페이지를 Response객체에 담아 컨테이너에 전달한다.</br>
6. 컨테이너는 전달받은 Response객체를 HTTPResponse형태로 바꿔 웹서버에 전달하고 생성되었던 쓰레드를 종료하고 httpServletRequest, httpServletResponse 객체를 소멸시킨다.</br>

대표 : Tomcat, Jeus, JBoss

</hr>

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


#### REST

--REST의 구체적인 개념</br>
REST란</br>
REST의 정의</br>
“Representational State Transfer” 의 약자</br>
자원을 이름(자원의 표현)으로 구분하여 해당 자원의 상태(정보)를 주고 받는 모든 것을 의미한다.</br>
즉, 자원(resource)의 표현(representation) 에 의한 상태 전달</br>
자원(resource)의 표현(representation)</br>
자원: 해당 소프트웨어가 관리하는 모든 것</br>
-> Ex) 문서, 그림, 데이터, 해당 소프트웨어 자체 등</br>
자원의 표현: 그 자원을 표현하기 위한 이름</br>
-> Ex) DB의 학생 정보가 자원일 때, ‘students’를 자원의 표현으로 정한다.</br>
상태(정보) 전달</br>
데이터가 요청되어지는 시점에서 자원의 상태(정보)를 전달한다.</br>
JSON 혹은 XML를 통해 데이터를 주고 받는 것이 일반적이다.</br>
월드 와이드 웹(www)과 같은 분산 하이퍼미디어 시스템을 위한 소프트웨어 개발 아키텍처의 한 형식</br>
REST는 기본적으로 웹의 기존 기술과 HTTP 프로토콜을 그대로 활용하기 때문에 웹의 장점을 최대한 활용할 수 있는 아키텍처 스타일이다.</br>
REST는 네트워크 상에서 Client와 Server 사이의 통신 방식 중 하나이다.</br>
REST의 구체적인 개념
HTTP URI(Uniform Resource Identifier)를 통해 자원(Resource)을 명시하고, HTTP Method(POST, GET, PUT, DELETE)를 통해</br> 해당 자원에 대한 CRUD Operation을 적용하는 것을 의미한다.</br>
즉, REST는 자원 기반의 구조(ROA, Resource Oriented Architecture) 설계의 중심에 Resource가 있고 HTTP Method를 통해 Resource를 처리하도록 설계된 아키텍쳐를 의미한다.</br>
웹 사이트의 이미지, 텍스트, DB 내용 등의 모든 자원에 고유한 ID인 HTTP URI를 부여한다.</br>
CRUD Operation
Create : 생성(POST)
Read : 조회(GET)
Update : 수정(PUT)
Delete : 삭제(DELETE)
HEAD: header 정보 조회(HEAD)
