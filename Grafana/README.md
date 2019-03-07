**환경 : Ubuntn 18.04**

Grafana 기본 설정
================
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
//기본 설정이 3000포트로 되어있으므로 외부를 9000포트로 설정해주기
/etc/grafana/grafana.ini 파일 수정
~~~

Grafana 사용법
==============
1. 시작  
localhost:3000으로 접속  
기본 아이디: admin 비밀번호: admin  
(비밀번호 변경은 알아서)   
![1](https://user-images.githubusercontent.com/46422952/53957822-b6053980-4122-11e9-81b1-ba2a982b5f6a.png)  

2. Data sources 설정  
-> Name = InfluxDB  
-> HTTP url = http://localhost:8086 (localhost 부분은 사용할 ip에 따라 변경 필요, 8086은 influxdb의 포트)  
-> InfluxDB Details Database = iot_db (사용할 데이터베이스 이름, 권한이 설정되어있다면 user, password도 입력)  
-> Save & Test 버튼 클릭 - success 나오면 성공  
![2](https://user-images.githubusercontent.com/46422952/53957824-b998c080-4122-11e9-8fd5-7959cd71ad0f.png)  

3. 대쉬보드 생성
-> 사이드바 메뉴 중 Create - Dashboard 클릭  
-> choose Visualization 클릭  
-> 생성하고자 하는 대쉬보드 선택  
-> Queries 메뉴에 들어가서 Queries to를 InfluxDB로 설정  
-> From <default> <사용하고자하는 measurement명> where ( //생략가능 <measurement의 태그명> = <태그값> )  
-> SELECT <field(읽어오고자하는 필드명)> mean()
-> 그 외의 설정은 알아서 설정  
  
![3](https://user-images.githubusercontent.com/46422952/53957826-bbfb1a80-4122-11e9-9e55-18085ebc568e.png)  
![4](https://user-images.githubusercontent.com/46422952/53957831-bef60b00-4122-11e9-9f21-9e50639fbc47.png)  
  



