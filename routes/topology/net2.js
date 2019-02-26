var ln = 2;
google.load("visualization", "1");
// Set callback to run when API is loaded
google.setOnLoadCallback(drawVisualization);

// Called when the Visualization API is loaded.
     function drawVisualization() {

       // Create a datatable for the nodes.
       var nodesTable = new google.visualization.DataTable();
       nodesTable.addColumn('number', 'id');
       nodesTable.addColumn('string', 'text');
       nodesTable.addColumn('number', 'x');
       nodesTable.addColumn('number', 'y');

       // create a datatable for the links between the nodes
       var linksTable = new google.visualization.DataTable();
       linksTable.addColumn('number', 'from');
       linksTable.addColumn('number', 'to');
       linksTable.addColumn('string', 'style');
       linksTable.addColumn('number', 'width');


       // 지역추가 ==> AngleAlgorithm
       //이동되는 좌표
       var fx = 0;
       var fy = 0;
      // 센터 고정 값
       nodesTable.addRow([1, "center",425,300]);

       // Case Node1. - Special Case
       if(ln==1){
         fx = 575;
         fy = 300;
         nodesTable.addRow([ln+1, "지역1", fx, fy]);
         linksTable.addRow([ln+1, 1,'moving-arrows',undefined]);
       }
       // Case Node2.
       if(ln==2){
         fx = 575;
         fy = 300;
         nodesTable.addRow([2, "지역1", 425, 500]);
         linksTable.addRow([2, 1,'moving-arrows',undefined]);
         // AngleAlgorithm(fx,fy);
         nodesTable.addRow([3, "지역2", 600, 400]);
         linksTable.addRow([3, 1,'moving-arrows',undefined]);
       }
       // Case Node3.
       // Case Node4. - Special Case
       // Case Node5.  .....

       // nodesTable.addRow([3, "Arduino", "circle",625,300]);
       // nodesTable.addRow([4, "sensor1", "database",220,180]);
       // nodesTable.addRow([5, "sensor2", "database",250,140]);
       // nodesTable.addRow([6, "sensor3", "database",300,100]);
       // nodesTable.addRow([7, "sensor4", "database",400,150]);
       // nodesTable.addRow([8, "temp", "star",550,250]);
       // nodesTable.addRow([9, "air", "star",500,200]);
       // nodesTable.addRow([10, "light", "star",500,250]);
       // nodesTable.addRow([11, "light2", "star",600,150]);
       // nodesTable.addRow([12,"Camera","", 300,400]);
       // nodesTable.addRow([13,"ESP32.2","", 550,400]);
       //
       // linksTable.addRow([2, 1,'moving-arrows',undefined]);
       // linksTable.addRow([3, 1,'moving-arrows',undefined]);
       // linksTable.addRow([4, 1,'moving-arrows',undefined]);
       // linksTable.addRow([4, 2,'moving-arrows',undefined]);
       // linksTable.addRow([5, 2,'moving-arrows',undefined]);
       // linksTable.addRow([6, 2,'moving-arrows',undefined]);
       // linksTable.addRow([7, 2,'moving-arrows',undefined]);
       // linksTable.addRow([8, 3,'moving-arrows',undefined]);
       // linksTable.addRow([9, 3,'moving-arrows',undefined]);
       // linksTable.addRow([10, 3,'moving-arrows',undefined]);
       // linksTable.addRow([11, 3,'moving-arrows',undefined]);
       // linksTable.addRow([12, 1,'moving-arrows',undefined]);
       // linksTable.addRow([13, 1,'moving-arrows',undefined]);

       // specify options
       var options = {width:  "850px",
                      height: "600px",
                      stabilize: false, // do not stabilize before displaying
                     };

       // Instantiate our network object.
       var network = new links.Network(opener.document.getElementById('mynetwork'));

       // Draw our network with the created data and options
       network.draw(nodesTable, linksTable, options);
     }

     //AngleAlgorithm
     // 지역 추가 1개 - 고정 좌표 값
     // 지역 추가 2개 - 알고리즘 적용
     // 지역 추가 3개 - 알고리즘 적용
     // 지역 추가 4개 - 알고리즘 적용하면서 각도 조금씩 이동.
     // 지역 추가 5개 - 알고리즘 적용
     // n지역 추가 카운트 , (x,y) 첫번째 점의 좌표
     function AngleAlgorithm(x , y){
                  var angle = 360/ln /180 * Math.PI ;  //Degree를 Radian으로 변경
                  var cos = Math.cos(angle);
                  var sin = Math.sin(angle);
                  x = (x-425) * cos - (y-300) * sin + 425; //센터좌표 425,300
                  y = (x-425) * sin + (y-300) * cos + 300;

    }

    function sendToParent(){
      ln = 2; // 이 ln값이 관리가 안됨 ...
      google.load("visualization", "1");
      // Set callback to run when API is loaded
      google.setOnLoadCallback(drawVisualization);
      //drawVisualization();

      var txt = document.getElementById("childText").value;
      // opener 를 이용해 부모 window 객체에 접근할 수 있습니다.
      // 부모에게서 전달받은 값에 추가로 문자열을 더해서 다시 부모의 receiveFromChild 라는 id를 갖는
      // 태그요소에 value 값을 바꾸어 주는 작업입니다.
      window.opener.document.getElementById("NodeName").value = txt;
      window.location.reload()  //부모창 새로고침
      // 창을 닫음
    //  window.close();
    }
