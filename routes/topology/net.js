google.load("visualization", "1");
  // Set callback to run when API is loaded
google.setOnLoadCallback(drawVisualization);

// Called when the Visualization API is loaded.
function drawVisualization() {
  $.get("http://192.168.0.37:3000/getNodeList/",function(data,status){
    var a = new Array(); //NodeName
    var b = new Array(); //NodeType
    var n = data.Node.length
    for (var i = 0 ; i<n ; i++){
       a[i] = data.Node[i].NodeName;
       b[i] = data.Node[i].NodeType;
    }
    // Case Node1. - Special Case
    // Case Node2.
    // Case Node3.
    // Case Node4. - Special Case
    // Case Node5.  .....
    function AngleAlgorithm(i ,x , y){
        var angle = 360/ n /180 * Math.PI * i ;  //Degree를 Radian으로 변경
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var angleArray = new Array();

        for (var j = 0 ; j < n ; j++){
          if(n==4)
            y = 375;
          else
            y = 300;
        angleArray[j] = new Array();
        angleArray[j][0] = (575-425) * cos - (y-300) * sin + 425; //센터좌표 425,300
        angleArray[j][1] = (575-425) * sin + (y-300) * cos + 300;
        }
        return angleArray;
    }
    //img태그 차트에추가, 좌표
    function makeImg(type,fx,fy){
      var img = document.createElement('img');
      var imgtype = "";
      if(type == "Home"){
        imgtype = "/house.png";
      }
      else if(type == "Company"){
        imgtype = "/company.png";
      }
      else if(type == "University"){
        imgtype = "/school.png";
      }
      else {
        imgtype = "/JNU.png";
      }
      img.src = '/views/img' + imgtype;
      img.width = "70";
      img.height = "60";
      img.style.position = "relative";
      img.style.left = fx + "px";
      img.style.top = fy + "px";
      var g = document.getElementById('chart');
      g.appendChild(img);
      img.setAttribute("id","left1"); //left2 로 변경해야함 센서 추가 삭제기능으로
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

       nodesTable.addRow([1, "center",425,300]); //센터고정값
      if(n==4){
         for (var i = 0 ; i<n ; i++){
           var fx; var fy;
            if(i==0){
              fx=575; fy=350;
              nodesTable.addRow([i+2, a[i],fx,fy]);
              linksTable.addRow([i+2, 1,'moving-arrows',undefined]);
           }
           else{

             fx = AngleAlgorithm(i,fx,fy)[i][0];
             fy = AngleAlgorithm(i,fx,fy)[i][1];
             nodesTable.addRow([i+2,a[i],fx,fy]);
             linksTable.addRow([i+2, 1,'moving-arrows',undefined]);
           }
        }
        // makeImg(b[i],fx,fy);
      }
      else{
        var fx=575; var fy=300;
        for (var i = 0 ; i<n ; i++){
            if(i==0){
              fx=575; fy=300;
              nodesTable.addRow([i+2, a[i],fx,fy]);
              linksTable.addRow([i+2, 1,'moving-arrows',undefined]);
            }
            else{

              fx = AngleAlgorithm(i,fx,fy)[i][0];
              fy = AngleAlgorithm(i,fx,fy)[i][1];
              console.log(fx);
              nodesTable.addRow([i+2,a[i],fx,fy]);
              linksTable.addRow([i+2, 1,'moving-arrows',undefined]);
            }
        }
        var k = 1;
        while(k-1 < n){
          var fxa;
          var fxb;
        a = AngleAlgorithm(1,fx,fy)[k-1][0];
        b = AngleAlgorithm(1,fx,fy)[k-1][1];
        makeImg(b[n-1],a,b);
        k++;
        }
      }
         network = new links.Network(document.getElementById('mynetwork'));
         var options = {width:  $('div.item0').width()+"px",
                      height: $('div.item0').height()+"px",
                      stabilize: false, // do not stabilize before displaying
                     };
      network.draw(nodesTable, linksTable, options);
    })
}
function resetImg(){
  var el = document.getElementById('left1');
  el.parentNode.remove()
}
