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
// Called when the Visualization API is loaded.
function drawVisualization() {
  $.get("http://192.168.0.37:3000/getNodeList/",function(data,status){
    var a = new Array();
    var n = data.Node.length
    for (var i = 0 ; i<n ; i++){
       a[i] = data.Node[i].NodeName;
    }


    function AngleAlgorithm(x , y){
                 var angle = 360/ n /180 * Math.PI ;  //Degree를 Radian으로 변경
                 var cos = Math.cos(angle);
                 var sin = Math.sin(angle);
                 x = (x-425) * cos - (y-300) * sin + 425; //센터좌표 425,300
                 y = (x-425) * sin + (y-300) * cos + 300;
                 return [x,y];
               }
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
       // var fx = 575;
       // var fy = 300;
      // 센터 고정 값
       nodesTable.addRow([1, "center",425,300]);
       // Case Node1. - Special Case
       // Case Node2.
       // Case Node3.
       // Case Node4. - Special Case
       // Case Node5.  .....
         for (var i = 0 ; i<n ; i++){
             var fx; var fy;
           if(i == 0){
          fx = 575; fy = 300;
          }
          else if(i > 0 ) {
          var last = AngleAlgorithm(fx,fy);
          fx = last[0];
          fy = last[1];
          }
          // console.log(last[0]);
          nodesTable.addRow([i+2, a[i],fx,fy]);
          linksTable.addRow([i+2, 1,'moving-arrows',undefined]);
         }
         // addEdge(4,1,'moving-arrows',undefined);
         network = new links.Network(document.getElementById('mynetwork'));
         links.Network.prototype.addNodes('{id : 5, "text" : "지역추가", x : 200 , y : 200}');
         links.Network.prototype.addLinks('{from : 5, to : 1, "style" :"moving-arrows" ,width : undefined }');
         //ln = ln + 1;
         // specify options
         var options = {width:  $('div.item0').width()+"px",
                      height: $('div.item0').height()+"px",
                      stabilize: false, // do not stabilize before displaying
                     };
      network.draw(nodesTable, linksTable, options);
    })
}
