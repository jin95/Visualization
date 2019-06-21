# Docker
## 테스트해봐야할 것.
- Default 로그인 할 방법 찾고 URL 집어넣을 방법 찾기
- RESTAPI를 사용하여 URL 입력 
<pre><code>
git clone https://gitlab.com/Shinobi-Systems/ShinobiDocker.git ShinobiDocker && cd ShinobiDocker
// Shinobi
docker pull migoller/shinobidocker

// Shinobi Serber:8080
docker run -d -p 8080:8080 migoller/shinobidocker

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
