
google.load("visualization", "1");
// Set callback to run when API is loaded
google.setOnLoadCallback(drawVisualization);
//AngleAlgorithm
// 지역 추가 1개 - 고정 좌표 값
// 지역 추가 2개 - 알고리즘 적용
// 지역 추가 3개 - 알고리즘 적용
// 지역 추가 4개 - 알고리즘 적용하면서 각도 조금씩 이동.
// 지역 추가 5개 - 알고리즘 적용
// n지역 추가 카운트 , (x,y) 첫번째 점의 좌표
// 회전한 좌표를 구하기 위한 알고리즘.
function AngleAlgorithm(x , y){
             var angle = 360/ln /180 * Math.PI ;  //Degree를 Radian으로 변경
             var cos = Math.cos(angle);
             var sin = Math.sin(angle);
             x = (x-425) * cos - (y-300) * sin + 425; //센터좌표 425,300
             y = (x-425) * sin + (y-300) * cos + 300;
           }
// 받을때 ControlServer에서 받은 Json값에 의해 ln변경.(Location Number)
var ln = 1;
//function draw1(n,type,name){
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

       //이동되는 좌표
       var fx = 0;
       var fy = 0;
      // 센터 고정 값
       nodesTable.addRow([1, "center",425,300]);
       // Case Node1. - Special Case
       // Case Node2.
       // Case Node3.
       // Case Node4. - Special Case
       // Case Node5.  .....

       if(ln==1){
         fx = 575;fy = 300;
         nodesTable.addRow([ln+1, "지역1", fx, fy]);
         linksTable.addRow([ln+1, 1,'moving-arrows',undefined]);
       }
       else if(ln==2){
         fx = 575;fy = 300;
         AngleAlgorithm(fx,fy);
         nodesTable.addRow([
           [2,name[0],fx,fy],
           [3,type[1],600,400]
         ]);
         linksTable.addRow([2, 1,'moving-arrows',undefined]);
         linksTable.addRow([3, 1,'moving-arrows',undefined]);
       }
       // specify options
       var options = {width:  "850px",
                      height: "600px",
                      stabilize: false, // do not stabilize before displaying
                     };
       // Instantiate our network object.
       var network = new links.Network(document.getElementById('mynetwork'));
       // new links.Network(opener.document.getElementById('mynetwork'));
       // Draw our network with the created data and options
       network.draw(nodesTable, linksTable, options);
     }
