# Docker
## 테스트해봐야할 것.
- Default 로그인 할 방법 찾고 URL 집어넣을 방법 찾기
- RESTAPI를 사용하여 URL 입력 
<pre><code>
// Shinobi
docker pull migoller/shinobidocker:debian-dev

// Shinobi Serber:8080
docker run -d \
     -p 8080:8080 \
     -v /etc/localtime:/etc/localtime:ro \
     -v /etc/timezone:/etc/timezone:ro \
     -v ~/Shinobi/config:/config \
     -v ~/Shinobi/datadir:/var/lib/mysql \
     -v ~/Shinobi/videos:/opt/shinobi/videos \
     -v /dev/shm/shinobiDockerTemp:/dev/shm/streams \
     migoller/shinobidocker:debian-dev

// make your username : admin@shinobi.video,   passward : admin
http://192.168.0.111:8080/super     // Add Accounts
http://yourip:8080                  // Login in Here
// IP camera
rtsp:192.168.1.100/unicast
// Shinobi : Add Carmera
http://yourip/settings
</code></pre>

# Testing
use rtsp.html
