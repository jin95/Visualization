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
        if(n==4)
          y = 375;
        else{
          y = 300;
        }
        x = (575-425) * cos - (y-300) * sin + 425; //센터좌표 425,300
        y = (575-425) * sin + (y-300) * cos + 300;
        return [x,y];
    }
    function makeimg(type){
      var img = document.createElement('img');
      img.src = 
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
             fx = AngleAlgorithm(i,fx,fy)[0];
             fy = AngleAlgorithm(i,fx,fy)[1];
             nodesTable.addRow([i+2,a[i],fx,fy]);
             linksTable.addRow([i+2, 1,'moving-arrows',undefined]);


           }
        }
       }
      else{
        for (var i = 0 ; i<n ; i++){
          var fx; var fy;
            if(i==0){
              fx=575; fy=300;
              nodesTable.addRow([i+2, a[i],fx,fy]);
              linksTable.addRow([i+2, 1,'moving-arrows',undefined]);
            }
            else{
              fx = AngleAlgorithm(i,fx,fy)[0];
              fy = AngleAlgorithm(i,fx,fy)[1];
              nodesTable.addRow([i+2,a[i],fx,fy]);
              linksTable.addRow([i+2, 1,'moving-arrows',undefined]);
            }
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
