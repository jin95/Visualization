# Docker
## 테스팅 해봐야할 것.
- docker run -e 옵션으로 nginx.conf에 변수 URL 입력할 방법 찾기
- 동영상 공유할 디렉토리 만들고 어떤 단위로 동영상 끊어서 저장할건지 정의

<pre><code>
# raspi cam RTMP address
rtmp://192.168.1.105:1935/live/101

docker build -t nginxrtmpserver .
docker run -d -it -p 1935:1935 -p 1936:80 -v $PWD/config:/config --name nginx_rtmp nginxrtmpserver
</code></pre>


# Testing
use rtmp.html
