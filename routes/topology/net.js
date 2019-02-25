google.load("visualization", "1");

// Set callback to run when API is loaded
google.setOnLoadCallback(drawVisualization);
// Called when the Visualization API is loaded.
     function drawVisualization() {
       // Create a datatable for the nodes.
       var nodesTable = new google.visualization.DataTable();
       nodesTable.addColumn('number', 'id');
       nodesTable.addColumn('string', 'text');
    //nodesTable.addColumn('string', 'image');
    //   nodesTable.addColumn('string', 'style');
       nodesTable.addColumn('number', 'x');
       nodesTable.addColumn('number', 'y');

      // 센터 고정 값
       nodesTable.addRow([1, "center",425,300]);

       // AngleAlgorithm 적용.
       // optional

       // Case Node1. - Special Case


       // Case Node2.


       // Case Node3.


       // Case Node4. - Special Case


       // Case Node5.  .....

      nodesTable.addRow([2, "지역1",575,300]);
      nodesTable.addRow([3, "지역2", (575-425) * (Math.cos(360/3/180*Math.PI)) -(300-300) * Math.sin(360/3/180*Math.PI)+ 425,
                          (575-425)* Math.sin(360/3/180*Math.PI) + (300-300)* Math.cos(360/3/180*Math.PI)+ 300])

      nodesTable.addRow([4, "지역3", (575-425) * (Math.cos(360/3/180*Math.PI*2)) -(300-300) * Math.sin(360/3/180*Math.PI*2)+ 425,
                          (575-425)* Math.sin(360/3/180*Math.PI*2) + (300-300)* Math.cos(360/3/180*Math.PI*2)+ 300])
/*
       nodesTable.addRow([3, "Arduino", "circle",625,300]);
       nodesTable.addRow([4, "sensor1", "database",220,180]);
       nodesTable.addRow([5, "sensor2", "database",250,140]);
       nodesTable.addRow([6, "sensor3", "database",300,100]);
       nodesTable.addRow([7, "sensor4", "database",400,150]);
      // nodesTable.addRow([8, "temp", "star",550,250]);
       //nodesTable.addRow([9, "air", "star",500,200]);
       //nodesTable.addRow([10, "light", "star",500,250]);
       //nodesTable.addRow([11, "light2", "star",600,150]);
       nodesTable.addRow([12,"Camera","", 300,400]);
       nodesTable.addRow([13,"ESP32.2","", 550,400]);

*/
       // create a datatable for the links between the nodes
       var linksTable = new google.visualization.DataTable();
       linksTable.addColumn('number', 'from');
       linksTable.addColumn('number', 'to');
       linksTable.addColumn('string', 'style');
       linksTable.addColumn('number', 'width');

       linksTable.addRow([2, 1,'moving-arrows',undefined]);
       linksTable.addRow([3, 1,'moving-arrows',undefined]);
       linksTable.addRow([4, 1,'moving-arrows',undefined]);
      /* linksTable.addRow([4, 2,'moving-arrows',undefined]);
       linksTable.addRow([5, 2,'moving-arrows',undefined]);
       linksTable.addRow([6, 2,'moving-arrows',undefined]);
       linksTable.addRow([7, 2,'moving-arrows',undefined]);
    //   linksTable.addRow([8, 3,'moving-arrows',undefined]);
    //   linksTable.addRow([9, 3,'moving-arrows',undefined]);
    //   linksTable.addRow([10, 3,'moving-arrows',undefined]);
    //   linksTable.addRow([11, 3,'moving-arrows',undefined]);
       linksTable.addRow([12, 1,'moving-arrows',undefined]);
       linksTable.addRow([13, 1,'moving-arrows',undefined]);
*/
       // specify options
       var options = {width:  "850px",
                      height: "600px",
                      stabilize: false, // do not stabilize before displaying
                     };

       // Instantiate our network object.
       var network = new links.Network(document.getElementById('mynetwork'));

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
     function AngleAlgorithm(n , x , y){
         //반복문
         var i = 1;

         if( n == 1 ){ //첫 지역 추가는 고정위치
           ax = x + ?;
           ay = y;
         }
         else{
           while(i < n){
             //i번 회전 ~n까지
             var angle = 360/n /180 * Math.PI * i;  //Degree를 Radian으로 변경
             var cos = Math.cos(angle);
             var sin = Math.sin(angle);
             var ax = (x-a) * cos - (y-b) * sin + a; // a,b 센터좌표
             var ay = (x-a) * sin + (y-b) * cos + b; //ax , ay 값이 회전 후 좌표
             i = i+1;
           }
         }
     }
     //
     // nodesTable.addRow([3, "지역2", (575-425) * (Math.cos(360/3/180*Math.PI)) -(300-300) * Math.sin(360/3/180*Math.PI)+ 425,
     //                    (575-425)* Math.sin(360/3/180*Math.PI) + (300-300)* Math.cos(360/3/180*Math.PI)+ 300])
     //
     // nodesTable.addRow([4, "지역3", (575-425) * (Math.cos(360/3/180*Math.PI*2)) -(300-300) * Math.sin(360/3/180*Math.PI*2)+ 425,
     //                    (575-425)* Math.sin(360/3/180*Math.PI*2) + (300-300)* Math.cos(360/3/180*Math.PI*2)+ 300])
