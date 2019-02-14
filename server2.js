var io = require('socket.io').listen(3000);

// connection이 발생할 때 핸들러를 실행한다.
io.sockets.on('connection', function (socket) {
// 클라이언트로 news 이벤트를 보낸다.
  console.log('hihi');
    socket.emit('news', { hello: 'world' });

// 클라이언트에서 my other event가 발생하면 데이터를 받는다.
socket.on('my other event', function (data) {
        console.log(data);
    });
});
