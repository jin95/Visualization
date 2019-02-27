Architecture
=============

![mqtt js](https://user-images.githubusercontent.com/46422952/53111651-d3fa6800-3580-11e9-8d5b-3b2584cba002.JPG)

Testing
========
~~~
//mqtt 모듈(mqtt.js 설치)
sudo npm install mqtt --save

//mqtt broker 실행
mosquitto

//mqtt client - publisher
var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost'); //브로커에 연결

client.on('connect', function () { //연결이 된 상태
    client.publish('토픽명', '보낼 메세지'); // example) client.publish('hello','nice day')
    client.end(); //클라이언트 연결 끊어짐
});

//mqtt client - subscriber
var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');

client.on('connect', function () {
      client.subscribe('토픽명'); 
});

client.on('message', function (topic, message) { //클라이언트가 메세지를 받은 상태
      // message is Buffer
      console.log(message.toString()); //문자열 리턴 함수
      client.end();
});

~~~
