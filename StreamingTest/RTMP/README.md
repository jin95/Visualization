<pre><code>
# raspi cam RTMP address
rtmp://192.168.1.105:1935/live/101

docker build -t nginxrtmpserver .
docker run -d -it -p 1935:1935 -p 1936:80 -v $PWD/config:/config --name nginx_rtmp nginxrtmpserver
</code></pre>
