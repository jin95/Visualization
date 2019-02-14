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
</pre></code>
<hr/>

#### ref - 가장 기본적인 서버 구축
<pre><code>
const http = require('http'); // 서버를 만드는 모듈 불러옴
http.createServer((request, response) => { // 서버 만드는 메소드
  console.log('server start!');
}).listen(30000-);
</pre></code>
Node.js는 모듈 시스템을 구축하고 있습니다. 모듈이란, 필요한 것만 불러오는 것이라고 생각하면 됩니다. http 서버가 필요하니 http 모듈을 require 메소드를 통해서 불러와 http 변수에 저장하였습니다. npm의 패키지가 이와 비슷한 개념입니다. 단, http 패키지는 Node.js 자체에서 기본적으로 제공하는 패키지이기 때문에 npm install http로 따로 설치할 필요가 없습니다. 서버가 실행된 후의 동작을 콜백 함수로 등록합니다. http 패키지의 createServer 메소드의 인자로 넣어주면 됩니다. 그리고 3000번 포트에 연결(listen)합니다.
<hr/>

## Express

### Install express

<pre><code>
sudo npm install express
</pre></code>

설치한 express는 node_modules라는 폴더 안에 저장됩니다. 또한 package.json에 express가 설치되었음이 기록됩니다. 앞으로는 package.json 파일만 있으면 node_modules 폴더가 지워졌더라도 복구할 수 있습니다. npm install 하면 자동으로 package.json안에 기록된 모든 패키지들을 설치합니다. server.js를 다음과 같이 바꿉니다.
<code><pre>
const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(8080, () => {
  console.log('Express App on port 8080!');
});
</pre></code>
<hr/>
