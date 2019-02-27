$(document).ready(function() {
        $('#login').eq(0).bind("click", function() {
               var obj = new Object();
               obj.type = 'login';
               obj.id = $('#id').val();
               obj.password = $('#pw').val();
               obj.idStore = 'on';
               if(obj.id == '' || obj.password == ''){
                       alert('아이디와 비밀번호를 입력하세요');
                       return;
               }
               var jsonData = JSON.stringify(obj);
               $.ajax({
                       type : "POST",
                       dataType : "json",
                       url : "/News/LoginManager",
                       data : {
                              json : jsonData
                       },
                       success : function(data) {
                              // data는 서버로부터 전송받은 결과(JSON)이므로 바로 사용한다
                              if (data.answer == 'success') {
                                      alert(data.name + '님 환영합니다.');
                                      var map = new MapArray();
                                      postData('/News/index.do', map);
                              } else if (data.answer == 'fail') {
                                      alert('아이디와 비번이 일치하지 않습니다.');
                              } else if (data.answer == 'error') {
                                      alert('원활한 접속이 이루어 지지 못했습니다. 관리자에게 문의하십시오.');
                              }
                       },
                       error : function(e) {
                              alert('서버 연결 도중 에러가 났습니다. 다시 시도해 주십시오.');
                       }
               });
        });
});
