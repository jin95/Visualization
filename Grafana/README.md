~~~
//install 방법 1(도커 이용)
docker pull grafana/grafana
docker run -it -d -p 9000:3000 --name=grafana grafana/grafana //외부포트를 9000으로 설정

//install 방법 2
sudo nano /etc/apt/sources.list
deb https://packagecloud.io/grafana/stable/debian/ stretch main 작성하고 저장
sudo curl https://packagecloud.io/gpg.key | sudo apt-key add -
sudo apt-get update -y
sudo apt-get install grafana -y
sudo systemctl daemon-reload
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
sudo systemctl status grafana-server //grafana 실행중인지 확인
~~~

Grafana 사용법
==============






