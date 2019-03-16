google.load("visualization", "1");
google.setOnLoadCallback(drawVisualization);

function drawVisualization() {
  var x = $('div.item0').width();
  var y = $('div.item0').height();
  $.get("http://192.168.56.1:3000/getNodeList/", function(data, status) {
    // console.log(data.Node[0].Device[0]);
    // console.log(data.Node[0].Device[0].id);
    var nodeAll = new Array(); //NodeName
    var b = new Array(); //NodeType
    var n = data.Node.length

    nodeAll = data.Node;
    console.log(nodeAll[0].Device);
    //지역노드 좌표 알고리즘, 배열로 리턴
    //speial case : if n=4
    function AngleAlgorithm(k, x, y) {
      var angleArray = new Array();
      for (var j = 0; j < n; j++) {
        var angle = 360 / n / 180 * Math.PI * j; //Degree를 Radian으로 변경
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        if (j == 0) {
          angleArray[j] = new Array();
          if (n == 4) {
            switch (k) {
              case 0:
                {
                  angleArray[j][0] = 0.63 * x;
                  angleArray[j][1] = 0.575 * y;
                  break;
                }
              case 1:
                {
                  angleArray[j][0] = 0.716 * x;
                  angleArray[j][1] = 0.625 * y;
                }
            }
          } else {
            switch (k) {
              case 0:
                angleArray[j][0] = 13 / 20 * x;
                break;
              case 1:
                angleArray[j][0] = 3 / 4 * x;
            }
            // angleArray[j][0] = 13/20 * x;
            angleArray[j][1] = 1 / 2 * y;
          }
        } else {
          angleArray[j] = new Array();
          angleArray[j][0] = (angleArray[0][0] - (1 / 2 * x)) * cos - (angleArray[0][1] - (1 / 2 * y)) * sin + (1 / 2 * x); //센터좌표 425,300
          angleArray[j][1] = (angleArray[0][0] - (1 / 2 * x)) * sin + (angleArray[0][1] - (1 / 2 * y)) * cos + (1 / 2 * y);
        }
      }
      return angleArray;
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
    makeImg("center", "center", 1 / 2 * x, 1 / 2 * y);
    nodesTable.addRow([1, "", 1 / 2 * x, 1 / 2 * y]);
    for (var i = 0; i < n; i++) {
      var fx = 0,
        fy = 0;
      var sfx = 0,
        sfy = 0;
      if (i == 0) {
        fx = AngleAlgorithm(0, x, y)[0][0];
        fy = AngleAlgorithm(0, x, y)[0][1];
        sfx = AngleAlgorithm(1, x, y)[0][0];
        sfy = AngleAlgorithm(1, x, y)[0][1];
        makeImg(nodeAll[i].NodeType,nodeAll[i].NodeName , fx, fy);
        nodesTable.addRow([i + 2, "", fx, fy]);
        nodesTable.addRow([i + 11, "Rasp", sfx, sfy]);
        linksTable.addRow([i + 2, 1, 'moving-arrows', undefined]);
        linksTable.addRow([i + 11, i + 2, 'moving-arrows', undefined]);
        if(nodeAll[i].Device == null){
          console.log("test");
        }
        else{
          for(var j = 0 ; j < nodeAll[i].Device.length; j++)
          makeImg(nodeAll[i].NodeType,nodeAll[i].Device[j].Dtype , sfx, sfy + j*200);
        }
      } else {
        fx = AngleAlgorithm(0, x, y)[i][0];
        fy = AngleAlgorithm(0, x, y)[i][1];
        sfx = AngleAlgorithm(1, x, y)[0][0];
        sfy = AngleAlgorithm(1, x, y)[0][1];
        makeImg(nodeAll[i].NodeType,nodeAll[i].NodeName , fx, fy);
        nodesTable.addRow([i + 2, "", fx, fy]);
        linksTable.addRow([i + 2, 1, 'moving-arrows', undefined]);
        if(nodeAll[i].Device == null){
          console.log("test");
        }
        else{
          for(var j = 0 ; j < nodeAll[i].Device.length; j++){
          console.log(nodeAll[i].Device.length);
          makeImg(nodeAll[i].NodeType,nodeAll[i].Device[j].Dtype , sfx, sfy + j*500);
          }
        }
      }
    }
    //sensor 노드 테스트 , route img 수정
    network = new links.Network(document.getElementById('mynetwork'));
    var options = {
      width: x + "px",
      height: y + "px",
      stabilize: false,
    };
    network.draw(nodesTable, linksTable, options);
  })
}

function makeImg(type, name, imgx, imgy) { //img태그 차트에 추가
  imgx = imgx * 0.94;
  imgy = imgy * 0.900;
  var img = document.createElement('img');
  var text = document.createElement('span');
  var imgtype = "";
  if (type == "Home") {
    imgtype = "/house.png";
  } else if (type == "Company") {
    imgtype = "/company.png";
  } else if (type == "University") {
    imgtype = "/school.png";
  } else if (type == "JNU") {
    imgtype = "/JNU.png";
  } else if (type == "center") {
    imgtype = "/dns_logo.png"
  } else {
    alert("지역 이미지 오류!");
  }
  img.src = '/views/img' + imgtype;
  img.width = "50";
  img.height = "50";
  img.style.position = "absolute";
  img.style.left = imgx + "px";
  img.style.top = imgy + "px";
  text.innerHTML = name;
  text.style.position = "absolute";
  text.style.left = imgx + "px";
  text.style.top = imgy + 45 + "px";
  var g = document.getElementById("x");
  if (type == "center") {
    text.innerHTML = "center";
    img.setAttribute("id", "left1");
  } else {
    img.setAttribute("id", "left2");
  }
  g.appendChild(img);
  g.appendChild(text);
  var imgs = document.querySelectorAll(".item0> img");
}
