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
                  angleArray[j][0] = 0.875 * x; // 기존값 0.84
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


    function DeviceAlgo(n, i, Dtype, Stype) { //지역노드 n번째의 i장치그림위치

      for (var test = 0; test < 3 * n; test++) { //디바이스 원형 draw 지역-장치
        cfx = AngleAlgorithm(1, ax, ay, 3 * n)[test][0];
        cfy = AngleAlgorithm(1, ax, ay, 3 * n)[test][1];
        nodesTable.addRow([test + 30, "", cfx, cfy]);
        // makeImg("Mosquitto", "1", cfx, cfy); //////////////////////////////// 좌표 보정할것
      }

      for (var test = 0; test < 12 * n; test++) { //센서 원형 draw 장치-센서
        cfx = AngleAlgorithm(2, ax, ay, 12 * n)[test][0];
        cfy = AngleAlgorithm(2, ax, ay, 12 * n)[test][1];
        nodesTable.addRow([test + 51, "", cfx, cfy]);

        // makeImg("sensor", "센서", cfx, cfy)
      }

      // linksTable.addRow([51 + dcount * 4, dcount + 30, "moving-arrows", undefined])
      var abcd = nodeAll[i].Device.length

      switch (abcd) {
        case 3:
          linksTable.addRow([30 + 3 * i + 1, i + 2, "moving-arrows", undefined]) //지역-장치 link
          makeImg(Dtype, "1", AngleAlgorithm(1, ax, ay, 3 * n)[3 * i + 1][0], AngleAlgorithm(1, ax, ay, 3 * n)[3 * i + 1][1]) // 디바이스 draw
          makeImg(Stype, "1", AngleAlgorithm(2, ax, ay, 12 * n)[12 * i + 3][0], AngleAlgorithm(2, ax, ay, 12 * n)[12 * i + 3][1]) // 센서 draw
          makeImg(Stype, "1", AngleAlgorithm(2, ax, ay, 12 * n)[12 * i + 4][0], AngleAlgorithm(2, ax, ay, 12 * n)[12 * i + 4][1])
          makeImg(Stype, "1", AngleAlgorithm(2, ax, ay, 12 * n)[12 * i + 5][0], AngleAlgorithm(2, ax, ay, 12 * n)[12 * i + 5][1])
          makeImg(Stype, "1", AngleAlgorithm(2, ax, ay, 12 * n)[12 * i + 6][0], AngleAlgorithm(2, ax, ay, 12 * n)[12 * i + 6][1])
          linksTable.addRow([51 + 12 * i + 3, 30 + 3 * i + 1, "moving-arrows", undefined])
          linksTable.addRow([51 + 12 * i + 4, 30 + 3 * i + 1, "moving-arrows", undefined])
          linksTable.addRow([51 + 12 * i + 5, 30 + 3 * i + 1, "moving-arrows", undefined])
          linksTable.addRow([51 + 12 * i + 6, 30 + 3 * i + 1, "moving-arrows", undefined])
          // linksTable.addRow([12*i+3 + 30, i + 2, "moving-arrows", undefined]) //디바이스이미지 -> 지역이미지 링크 linksTable
          // linksTable.addRow([12*i+4 + 30, i + 2, "moving-arrows", undefined])

        case 2:
          {
            if (i == 0) { // 배열 인덱스값 -1 조정
              linksTable.addRow([30 + 3 * n - 1, i + 2, "moving-arrows", undefined]) //지역-장치 link
              makeImg(Dtype, "1", AngleAlgorithm(1, ax, ay, 3 * n)[3 * n - 1][0], AngleAlgorithm(1, ax, ay, 3 * n)[3 * n - 1][1]) // 3*n - 1 디바이스 드로우
              makeImg(Stype, "1", AngleAlgorithm(2, ax, ay, 12 * n)[12 * n - 2][0], AngleAlgorithm(2, ax, ay, 12 * n)[12 * n - 2][1]) // 센서 draw
              makeImg(Stype, "1", AngleAlgorithm(2, ax, ay, 12 * n)[12 * n - 3][0], AngleAlgorithm(2, ax, ay, 12 * n)[12 * n - 3][1])
              makeImg(Stype, "1", AngleAlgorithm(2, ax, ay, 12 * n)[12 * n - 4][0], AngleAlgorithm(2, ax, ay, 12 * n)[12 * n - 4][1])
              makeImg(Stype, "1", AngleAlgorithm(2, ax, ay, 12 * n)[12 * n - 5][0], AngleAlgorithm(2, ax, ay, 12 * n)[12 * n - 5][1])
              linksTable.addRow([51 + 12 * n - 2, 30 + 3 * n - 1, "moving-arrows", undefined])
              linksTable.addRow([51 + 12 * n - 3, 30 + 3 * n - 1, "moving-arrows", undefined])
              linksTable.addRow([51 + 12 * n - 4, 30 + 3 * n - 1, "moving-arrows", undefined])
              linksTable.addRow([51 + 12 * n - 5, 30 + 3 * n - 1, "moving-arrows", undefined])
            } else {
              linksTable.addRow([30 + 3 * i - 1, i + 2, "moving-arrows", undefined]) //지역-장치 link
              makeImg(Dtype, "1", AngleAlgorithm(1, ax, ay, 3 * n)[3 * i - 1][0], AngleAlgorithm(1, ax, ay, 3 * n)[3 * i - 1][1]) // 디바이스 draw
              makeImg(Stype, "1", AngleAlgorithm(2, ax, ay, 12 * n)[12 * i - 2][0], AngleAlgorithm(2, ax, ay, 12 * n)[12 * i - 2][1]) // 센서 draw
              makeImg(Stype, "1", AngleAlgorithm(2, ax, ay, 12 * n)[12 * i - 3][0], AngleAlgorithm(2, ax, ay, 12 * n)[12 * i - 3][1])
              makeImg(Stype, "1", AngleAlgorithm(2, ax, ay, 12 * n)[12 * i - 4][0], AngleAlgorithm(2, ax, ay, 12 * n)[12 * i - 4][1])
              makeImg(Stype, "1", AngleAlgorithm(2, ax, ay, 12 * n)[12 * i - 5][0], AngleAlgorithm(2, ax, ay, 12 * n)[12 * i - 5][1])
              linksTable.addRow([51 + 12 * i - 2, 30 + 3 * i - 1, "moving-arrows", undefined])
              linksTable.addRow([51 + 12 * i - 3, 30 + 3 * i - 1, "moving-arrows", undefined])
              linksTable.addRow([51 + 12 * i - 4, 30 + 3 * i - 1, "moving-arrows", undefined])
              linksTable.addRow([51 + 12 * i - 5, 30 + 3 * i - 1, "moving-arrows", undefined])
            }
          }
        case 1:
          linksTable.addRow([30 + 3 * i, i + 2, "moving-arrows", undefined]) //지역-장치 link
          makeImg(Dtype, "1", AngleAlgorithm(1, ax, ay, 3 * n)[3 * i][0], AngleAlgorithm(1, ax, ay, 3 * n)[3 * i][1]) // 디바이스 draw
          makeImg(Stype, "1", AngleAlgorithm(2, ax, ay, 12 * n)[12 * i + 0][0], AngleAlgorithm(2, ax, ay, 12 * n)[12 * i + 0][1])
          makeImg(Stype, "1", AngleAlgorithm(2, ax, ay, 12 * n)[12 * i + 1][0], AngleAlgorithm(2, ax, ay, 12 * n)[12 * i + 1][1])
          makeImg(Stype, "1", AngleAlgorithm(2, ax, ay, 12 * n)[12 * i + 2][0], AngleAlgorithm(2, ax, ay, 12 * n)[12 * i + 2][1])
          linksTable.addRow([51 + 12 * i + 0, 30 + 3 * i, "moving-arrows", undefined]) //장치-센서 link
          linksTable.addRow([51 + 12 * i + 1, 30 + 3 * i, "moving-arrows", undefined])
          linksTable.addRow([51 + 12 * i + 2, 30 + 3 * i, "moving-arrows", undefined])
          if (i == 0) {
            makeImg(Stype, "1", AngleAlgorithm(2, ax, ay, 12 * n)[12 * n - 1][0], AngleAlgorithm(2, ax, ay, 12 * n)[12 * n - 1][1]) // 센서 draw
            linksTable.addRow([51 + 12 * n - 1, 30 + 3 * i, "moving-arrows", undefined])
          } else {
            makeImg(Stype, "1", AngleAlgorithm(2, ax, ay, 12 * n)[12 * i - 1][0], AngleAlgorithm(2, ax, ay, 12 * n)[12 * i - 1][1]) // 센서 draw
            linksTable.addRow([51 + 12 * i - 1, 30 + 3 * i, "moving-arrows", undefined])
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

      console.log("전체 지역 수 : ", n, "지역 인덱스 번호 : ", i, "장치개수", nodeAll[i].Device.length)
      DeviceAlgo(n, i, "Mosquitto", "sensor")


      if (i == 0) {
        fx = AngleAlgorithm(0, ax, ay, n)[0][0];
        fy = AngleAlgorithm(0, ax, ay, n)[0][1];
        nodesTable.addRow([i + 2, "", fx, fy]);
        linksTable.addRow([i + 2, 1, 'moving-arrows', undefined]);
        makeImg(nodeAll[i].NodeType, nodeAll[i].NodeName, fx, fy);
      } else {
        fx = AngleAlgorithm(0, ax, ay, n)[i][0];
        fy = AngleAlgorithm(0, ax, ay, n)[i][1];
        nodesTable.addRow([i + 2, "", fx, fy]);
        linksTable.addRow([i + 2, 1, 'moving-arrows', undefined]);
        makeImg(nodeAll[i].NodeType, nodeAll[i].NodeName, fx, fy);
      }
    }

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
    img2.style.left = imgx + "px"; // 25더했음
    img2.style.top = imgy  + "px"; //25더헀음
    img2.width = "20";
    img2.height = "20";
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
    // img.setAttribute("id", "left2");
    img.setAttribute("class", "left22");
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
