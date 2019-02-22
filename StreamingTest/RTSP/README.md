# Docker
## 테스트해봐야할 것.
- Default 로그인 할 방법 찾고 URL 집어넣을 방법 찾기
- RESTAPI를 사용하여 URL 입력 
<pre><code>
docker pull kerberos/kerberos
docker run -d -p 80:80 -p 8889:8889 --name Kerberos kerberos/kerberos
// defalut login : root/root  http:80,  ?:8889
// make your username
http://yourip
// IP camera
rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.movr
// Kerberos.io : Add Carmera
http://yourip/settings
</code></pre>

# Testing
use rtsp.html
