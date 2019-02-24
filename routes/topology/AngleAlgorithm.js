



n번 반복

//rotate
function(var n,var x1,var y1) {

  var Angle = 360/ n / 180 * Math.PI; //Degree를 Radian으로 변경

  var cos = Math.cos(Angle);
  var sin =Math.sin(Angle);
  // a,b 센터좌표
  // x2 y2 회전 후 좌표
  var x2 = (x1-a) * cos - (y1-b)sin + a;
  var y2 = (x1-a) * sin + (y1-b)cos + b;

}


//
