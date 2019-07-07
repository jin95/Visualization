google.load("visualization", "1");
google.setOnLoadCallback(drawVisualization);

function drawVisualization() {
  var ax = $('div.item0').width();
  var ay = $('div.item0').height();
  $.get("http://192.168.0.111:3000/getNodeList/", function(data, status) {
    var nodeAll = new Array(); //NodeName
    var b = new Array(); //NodeType
    var n = data.Node.length // 지역 갯수
    nodeAll = data.Node;
    //지역노드 좌표 알고리즘, 배열로 리턴
    //speial case : if n=4

    function AngleAlgorithm(k, x, y, n) {
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
                { //지역 이미지 위치
                  angleArray[j][0] = 13 / 20 * x;
                  angleArray[j][1] = 1 / 2 * y;
                  break;
                }
              case 1:
                { //디바이스 이미지 위치
                  angleArray[j][0] = 0.76 * x;
                  angleArray[j][1] = 0.5 * y;
                  break;
                }
              case 2:
                { //센서 이미지 위치
                  angleArray[j][0] = 0.84 * x;
                  angleArray[j][1] = 0.5 * y;
                }
            }
          }
        } else {
          angleArray[j] = new Array();
          angleArray[j][0] = (angleArray[0][0] - (1 / 2 * x)) * cos - (angleArray[0][1] - (1 / 2 * y)) * sin + (1 / 2 * x);
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
    makeImg("center", "center", 1 / 2 * ax, 1 / 2 * ay);
    nodesTable.addRow([1, "", 1 / 2 * ax, 1 / 2 * ay]);


    function ImgAlgo(n, i) { //지역노드 n번째의 i장치그림위치
      var abcd = nodeAll[i].Device.length
      switch (abcd) {
        case 3:
          {
            makeImg("Mosquitto", "1", AngleAlgorithm(1, ax, ay, 3 * n)[3 * i + 1][0], AngleAlgorithm(1, ax, ay, 3 * n)[3 * i + 1][1])
            console.log(3)
          }
        case 2:
          {
            if (i == 0) {
              makeImg("Mosquitto", "1", AngleAlgorithm(1, ax, ay, 3 * n)[3 * n - 1][0], AngleAlgorithm(1, ax, ay, 3 * n)[3 * n - 1][1])
              console.log(2)
            } else {
              makeImg("Mosquitto", "1", AngleAlgorithm(1, ax, ay, 3 * n)[3 * i - 1][0], AngleAlgorithm(1, ax, ay, 3 * n)[3 * i - 1][1])
              console.log(2)
            }
          }
        case 1:
          {
            makeImg("Mosquitto", "1", AngleAlgorithm(1, ax, ay, 3 * n)[3 * i][0], AngleAlgorithm(1, ax, ay, 3 * n)[3 * i][1])
            console.log(1)
          }
        default:
          break
      }
    }

    for (var i = 0; i < n; i++) {
      var fx = 0,
        fy = 0;
      var sfx = 0,
        sfy = 0;

      for (var test = 0; test < 3 * n; test++) { //디바이스 원형 draw
        cfx = AngleAlgorithm(1, ax, ay, 3 * n)[test][0];
        cfy = AngleAlgorithm(1, ax, ay, 3 * n)[test][1];
        nodesTable.addRow([test + 30, "", cfx, cfy]);
        // makeImg("Mosquitto", "1", cfx, cfy); //////////////////////////////// 좌표 보정할것
        // $('.left3').hide()

      }

      console.log("장치번호 : ", i, "장치개수", nodeAll[i].Device.length)
      ImgAlgo(n, i)

      // makeImg("Mosquitto", "1", AngleAlgorithm(1, ax, ay, 3 * n)[3 ][0], AngleAlgorithm(1, ax, ay, 3 * n)[3 ][1])



      // makeImg("Mosquitto", "1", AngleAlgorithm(1, ax, ay, 3 * n)[0][0], AngleAlgorithm(1, ax, ay, 3 * n)[0][1])
      // makeImg("Mosquitto", "1", AngleAlgorithm(1, ax, ay, 3 * n)[1][0], AngleAlgorithm(1, ax, ay, 3 * n)[1][1])
      //  makeImg("Mosquitto", "1", AngleAlgorithm(1,ax,ay,3*n)[2][0], AngleAlgorithm(1,ax,ay,3*n)[2][1])
      // makeImg("Mosquitto", "1", AngleAlgorithm(1, ax, ay, 3 * n)[3][0], AngleAlgorithm(1, ax, ay, 3 * n)[3][1])
      // makeImg("Mosquitto", "1", AngleAlgorithm(1, ax, ay, 3 * n)[3 * n - 1][0], AngleAlgorithm(1, ax, ay, 3 * n)[3 * n - 1][1])
      //  makeImg("Mosquitto", "1", AngleAlgorithm(1,ax,ay,3*n)[4][0], AngleAlgorithm(1,ax,ay,3*n)[4][1])
      //  nodesTable.addRow([test + 30, "", AngleAlgorithm(1, ax, ay, n)[test][0],AngleAlgorithm(1, ax, ay, n)[test][0]]);





      for (var test = 0; test < 18 * n; test++) { //센서 원형 draw
        cfx = AngleAlgorithm(2, ax, ay, 18 * n)[test][0];
        cfy = AngleAlgorithm(2, ax, ay, 18 * n)[test][1];
        nodesTable.addRow([test + 51, "", 0.965 * cfx, cfy]);
        makeImg("sensor", "센서", cfx, cfy)
      }

      if (i == 0) {
        fx = AngleAlgorithm(0, ax, ay, n)[0][0];
        fy = AngleAlgorithm(0, ax, ay, n)[0][1];
        nodesTable.addRow([i + 2, "", fx, fy]);
        linksTable.addRow([i + 2, 1, 'moving-arrows', undefined]);
        makeImg(nodeAll[i].NodeType, nodeAll[i].NodeName, fx, fy);
        // console.log(nodeAll[i].Device.length)
        for (var dcount = 0; dcount < nodeAll[i].Device.length; dcount++) {
          // $('.deviceHide').hide()
          linksTable.addRow([dcount + 30, i + 2, "moving-arrows", undefined]) //디바이스이미지 -> 지역이미지 링크 linksTable
          // linksTable.addRow([dcount + 31, i + 2, "moving-arrows", undefined]) //디바이스이미지 -> 지역이미지 링크 linksTable
          linksTable.addRow([51 + dcount * 4, dcount + 30, "moving-arrows", undefined])
          linksTable.addRow([52 + dcount * 4, dcount + 30, "moving-arrows", undefined])
          linksTable.addRow([53 + dcount * 4, dcount + 30, "moving-arrows", undefined])
          linksTable.addRow([54 + dcount * 4, dcount + 30, "moving-arrows", undefined]) //센서이미지 - 디바이스이미지 링크
        }
      } else {
        fx = AngleAlgorithm(0, ax, ay, n)[i][0];
        fy = AngleAlgorithm(0, ax, ay, n)[i][1];
        nodesTable.addRow([i + 2, "", fx, fy]);
        linksTable.addRow([i + 2, 1, 'moving-arrows', undefined]);
        makeImg(nodeAll[i].NodeType, nodeAll[i].NodeName, fx, fy);
        for (var dcount = 0; dcount < nodeAll[i].Device.length; dcount++) {
          linksTable.addRow([dcount + 30 + Math.round(21 / n), i + 2, "moving-arrows", undefined]) //디바이스이미지 -> 지역이미지 linksTable
          linksTable.addRow([51 + dcount * 4, dcount + 30 + Math.round(21 / n), "moving-arrows", undefined])
          linksTable.addRow([52 + dcount * 4, dcount + 30 + Math.round(21 / n), "moving-arrows", undefined])
          linksTable.addRow([53 + dcount * 4, dcount + 30 + Math.round(21 / n), "moving-arrows", undefined])
          linksTable.addRow([54 + dcount * 4, dcount + 30 + Math.round(21 / n), "moving-arrows", undefined]) //센서이미지 - 디바이스이미지 링크
        }
      }
    }
    //sensor 노드 테스트 , route img 수정
    network = new links.Network(document.getElementById('mynetwork'));
    var options = {
      width: ax + "px",
      height: ay + "px",
      stabilize: false,
    };
    network.draw(nodesTable, linksTable, options);
  })
}

function makeImg(type, name, imgx, imgy) { //img태그 차트에 추가
  imgx = imgx * 0.94;
  imgy = imgy * 0.900;

  var img = document.createElement('img');
  var img2 = document.createElement('img');
  var img3 = document.createElement('img');
  var img4 = document.createElement('img');
  var img5 = document.createElement('img');
  var text = document.createElement('span');
  var text2 = document.createElement('span');
  var text3 = document.createElement('span');
  var text4 = document.createElement('span');
  var text5 = document.createElement('span');
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
  } else if ((type == "Kafka") || (type == "Mosquitto")) {
    imgtype = "/RaspberryPi.png"
  } else if (type == "sensor") {
    imgtype = "/sensor.png"
  } else {
    alert("이미지 오류!");
  }

  if (type != "sensor") {
    img.src = '/views/img' + imgtype;
    img.style.position = "absolute";
    text.style.position = "absolute";
  }
  var g = document.getElementById("x");

  if (type == "center") {
    img.style.left = imgx + "px";
    img.style.top = imgy + "px";
    img.width = "50";
    img.height = "50";
    text.innerHTML = "center";
    text.style.left = imgx + "px";
    text.style.top = imgy + 45 + "px";
    img.setAttribute("id", "left1");
  } else if ((type == "Kafka") || (type == "Mosquitto")) {
    img.style.left = imgx + 25 + "px";
    img.style.top = imgy + "px";
    img.width = "50";
    img.height = "50";
    text.innerHTML = type;
    text.style.left = imgx + "px";
    text.style.top = imgy + 50 + "px";
    img.classList.add("deviceHide")
    text.classList.add("deviceHide")
    img.setAttribute("id", "left3");
  } else if (type == "sensor") {
    img2.src = '/views/img' + imgtype;
    img2.style.position = "absolute";
    text2.style.position = "absolute";
    img2.style.left = imgx + 25 + "px";
    img2.style.top = imgy + 25 + "px";
    img2.width = "25";
    img2.height = "25";

    // img3.src = '/views/img' + imgtype;
    // img3.style.position = "absolute";
    // text3.style.position = "absolute";
    // img3.style.left = imgx + 30 + "px";
    // img3.style.top = imgy + 50 + "px";
    // img3.width = "25";
    // img3.height = "25";
    //
    // img4.src = '/views/img' + imgtype;
    // img4.style.position = "absolute";
    // text4.style.position = "absolute";
    // img4.style.left = imgx - 20 + "px";
    // img4.style.top = imgy + 15 +"px";
    // img4.width = "25";
    // img4.height = "25";
    //
    // img5.src = '/views/img' + imgtype;
    // img5.style.position = "absolute";
    // text5.style.position = "absolute";
    // img5.style.left = imgx + 20 + "px";
    // img5.style.top = imgy - 20 + "px";
    // img5.width = "25";
    // img5.height = "25";
    g.appendChild(img2);
    g.appendChild(img3);
    g.appendChild(img4);
    g.appendChild(img5);
  } else {
    img.style.left = imgx + "px";
    img.style.top = imgy + "px";
    img.width = "50";
    img.height = "50";
    text.innerHTML = name;
    text.style.left = imgx + "px";
    text.style.top = imgy + 45 + "px";
    img.setAttribute("id", "left2");
    img.setAttribute("alt", name);
    img.setAttribute("onclick", "f2(this)");
  }
  g.appendChild(img);

  g.appendChild(text);
  g.appendChild(text2);
  g.appendChild(text3);
  g.appendChild(text4);
  g.appendChild(text5);
}
