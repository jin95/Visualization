# Docker
## 테스트해봐야할 것.
- Default 로그인 할 방법 찾고 URL 집어넣을 방법 찾기
- RESTAPI를 사용하여 URL 입력 
<pre><code>
// 현재 디렉토리에 들어온다.
docker build -t shinobi .
docker run -it -d -v /etc/localtime:/etc/localtime:ro -v /etc/timezone:/etc/timezone:ro -v $PWD/config:/config -v $PWD/videos:/opt/shinobi/videos -v $PWD/datadir:/var/lib/mysql -p 8080:8080 -p 3306:3306 shinobi

// defalut login : ccio@m03.ca/password  Shinobi Serber:8080,  mysql:3306
// make your username
http://yourip
// IP camera
rtsp:192.168.1.100/unicast
// Shinobi : Add Carmera
http://yourip/settings
</code></pre>

# Testing
use rtsp.html
