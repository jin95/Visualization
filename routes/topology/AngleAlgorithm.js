var AngleAlgorithm = function(n , x , y){
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
