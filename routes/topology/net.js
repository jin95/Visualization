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

    function AngleAlgorithm(x , y){
          //Degree를 Radian으로 변경
        var angleArray = new Array();
        for (var j = 0 ; j < n ; j++){
          var angle = 360/ n /180 * Math.PI * (j) ;
          var cos = Math.cos(angle);
          var sin = Math.sin(angle);
          if(n==4)
            y = 375;
          else{
            y = 300;
          }
          angleArray[j] = new Array();
          angleArray[j][0] = (625-425) * cos - (y-300) * sin + 425; //센터좌표 425,300
          angleArray[j][1] = (625-425) * sin + (y-300) * cos + 300;
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
      else if(type == "JNU"){
        imgtype = "/JNU.png";
      }
      else {
        console.log("이미지가 없습니다.");
      }
      img.src = '/views/img' + imgtype;
      img.width = "50";
      img.height = "50";
      img.style.position = "relative";
      img.style.left = fx + "px";
      img.style.top = fy + "px";
      var g = document.getElementById("x");
      img.setAttribute("id","left2");
      g.appendChild(img);
      var imgs = document.querySelectorAll(".item0> img");
      // var in = imgs.length;
      for(var i = 0 ; i <imgs.length-1 ; i++){
        if(n==4)
          fy = 350;
        else
          fy = 300;
        if(i==0){
          fx = 625;
        }
        else{
        fx = AngleAlgorithm(fx,fy)[i][0];
        fy = AngleAlgorithm(fx,fy)[i][1];
        }
        imgs[i+1].style.left = fx + "px";
        imgs[i+1].style.top  = fy + "px";
        console.log(imgs[i+1]);
        console.log("이미지 x좌표 : " + i +"번 - " +  imgs[i+1].style.left);
      }
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
       console.log("n=" + n);
      for (var i = 0 ; i<n ; i++){
        var fx; var fy;
        if(n==4) // Case Node4. - Special Case
          fy=350;
        else
          fy=300;
        if(i==0){
          fx=625;
          makeImg(b[i],fx,fy);
          console.log("노드 x좌표 : " + fx);
          nodesTable.addRow([i+2, a[i],fx,fy]);
          linksTable.addRow([i+2, 1,'moving-arrows',undefined]);

        }
        else{
          makeImg(b[i],fx,fy);
          fx = AngleAlgorithm(fx,fy)[i][0];
          fy = AngleAlgorithm(fx,fy)[i][1];
          console.log("노드 x좌표 : " + fx);
          nodesTable.addRow([i+2,a[i],fx,fy]);
          linksTable.addRow([i+2, 1,'moving-arrows',undefined]);
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
  var images = document.getElementById('left2');
  // var el = document.getElementById('left2');
  var l = images.length;
  for(var i = 0 ; i< l ; i++){
    images[i].parentNode.removeChild(images[i]);
  // el.parentNode.removeChild()
}
}
