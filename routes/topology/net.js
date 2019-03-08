google.load("visualization", "1");
google.setOnLoadCallback(drawVisualization);

function drawVisualization() {
  var x = $('div.item0').width();
  var y = $('div.item0').height();
  $.get("http://192.168.56.1:3000/getNodeList/",function(data,status){
    var a = new Array(); //NodeName
    var b = new Array(); //NodeType
    var n = data.Node.length
    for (var i = 0 ; i<n ; i++){
       a[i] = data.Node[i].NodeName;
       b[i] = data.Node[i].NodeType;
    }
    //지역노드 좌표 알고리즘, 배열로 리턴
    //speial case : if n=4
    function AngleAlgorithm(x , y){
        var angleArray = new Array();
        for (var j = 0 ; j < n ; j++){
          var angle = 360/ n /180 * Math.PI * j ; //Degree를 Radian으로 변경
          var cos = Math.cos(angle); var sin = Math.sin(angle);
          if(j==0){
            angleArray[j] = new Array();
            if(n==4){
              angleArray[j][0] = 31/50*x;
              angleArray[j][1] = 23/40*y;}
            else{
              angleArray[j][0] = 13/20 * x;
              angleArray[j][1] = 1/2*y;}
          }
          else{
            angleArray[j] = new Array();
            angleArray[j][0] = (angleArray[0][0]-(1/2*x)) * cos - (angleArray[0][1]-(1/2*y)) * sin + (1/2*x); //센터좌표 425,300
            angleArray[j][1] = (angleArray[0][0]-(1/2*x)) * sin + (angleArray[0][1]-(1/2*y)) * cos + (1/2*y);
          }
        }
        return angleArray;
    }
    function makeImg(type,name,imgx,imgy){ //img태그 차트에 추가
      imgx = imgx * 0.94;
      imgy = imgy * 0.900;
      var img = document.createElement('img');
      var text = document.createElement('span');
      var imgtype = "";
      if(type == "Home"){imgtype = "/house.png";}
      else if(type == "Company"){imgtype = "/company.png";}
      else if(type == "University"){imgtype = "/school.png";}
      else if(type == "JNU"){imgtype = "/JNU.png";}
      else if(type == "center"){imgtype = "/dns_logo.png"}
      else { alert("지역 이미지 오류!");}
      img.src = '/views/img' + imgtype;
      img.width = "50";
      img.height = "50";
      img.style.position = "absolute";
      img.style.left  = imgx +"px" ;
      img.style.top   = imgy +"px";
      text.innerHTML = name;
      text.style.position = "absolute";
      text.style.left  = imgx + "px" ;
      text.style.top   = imgy + 45  + "px";
      var g = document.getElementById("x");
      if(type == "center"){
        text.innerHTML = "center";
        img.setAttribute("id","left1");
        }
      else{
        img.setAttribute("id","left2");
      }
      g.appendChild(img);
      g.appendChild(text);
      var imgs = document.querySelectorAll(".item0> img");
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

      // center
      makeImg("center","center",1/2*x,1/2*y);
      nodesTable.addRow([1, "",1/2*x,1/2*y]);
      for (var i = 0 ; i < n ; i++){
        var fx=0, fy=0;
          if(i==0){
            fx = AngleAlgorithm(x,y)[0][0];
            fy = AngleAlgorithm(x,y)[0][1];
            makeImg(b[i],a[i],fx,fy);
            nodesTable.addRow([i+2, "",fx,fy]);
            linksTable.addRow([i+2, 1,'moving-arrows',undefined]);
          }
          else{
            fx = AngleAlgorithm(x,y)[i][0];
            fy = AngleAlgorithm(x,y)[i][1];
            makeImg(b[i],a[i],fx,fy);
            nodesTable.addRow([i+2,"",fx,fy]);
            linksTable.addRow([i+2, 1,'moving-arrows',undefined]);
          }
      }
      network = new links.Network(document.getElementById('mynetwork'));
      var options = {width:  $('div.item0').width()+"px",
       height: $('div.item0').height()+"px", stabilize: false,};
      network.draw(nodesTable, linksTable, options);
    })
  }
