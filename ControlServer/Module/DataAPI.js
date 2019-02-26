var fs = require('fs');
var path = "../Format/Node1.json"




// Node.json 파일이 존재하는지 그리고 "Node" 키가 존재하는지  체크
function CheckNodeJson(path){
if(fs.existsSync(path)){
	var Obj = JSON.parse(fs.readFileSync(path,'utf-8'));
        if("Node" in Obj){
		return Obj;
        }
	else
		Obj['Node']=[];
		return Obj;
}
else{
	var Obj = new Object();
	Obj['Node']=[];
	var STR = JSON.stringify(Obj);
	fs.writeFileSync(path,STR,'utf-8');
	return Obj;
}};




// Node.json 파일 내 "Node" 개수 체크하는데 사용.
function CountNodes(path){
var Data = CheckNodeJson(path);
if(Data.Node.length == 0){
	console.log("empty");
	return Data.Node.length
}
else{
	return Data.Node.length
}}




// Node.json 파일 내 "Node"의 List를 보여준다.
exports.GetNodeList = function(path){
var Data = CheckNodeJson(path);
	return Data;
}




// 체크용 i 값이 0이 아닐 시 비정상
function CheckNodeName(path,nodename){
var Data = CheckNodeJson(path);
i = CountNodes(path);
	while(i>0){
		if(Data.Node[CountNodes(path)-i].NodeName==nodename){
			break;
		}
	i--;
	}
	return i;
}




exports.CheckNodeNameExist = function(path,nodename){
var Data = CheckNodeJson(path);
i = CountNodes(path);
        while(i>0){
                if(Data.Node[CountNodes(path)-i].NodeName==nodename){
			console.log(nodename,"이 존재합니다.");
                        break;
                }
        i--;
        }
        return i;
}




// Node.json 파var Error = CheckNodeName(path,nodename)일 "Node"를 생성한다.
exports.CreateNode = function(path,nodetype,nodename){
var Data = CheckNodeJson(path);
var Error = CheckNodeName(path,nodename)
if(Error!=0){
	console.log("중복된 이름이 있습니다.");
}
else{
	Data.Node.push({
        	"NodeType":nodetype,
        	"NodeName":nodename,
        	"Device":[]
	});
	var STR = JSON.stringify(Data);
	fs.writeFileSync(path,STR,'utf-8');
	console.log("입력되었습니다");
}}




// 특정 Node의 Device들의 개수를 정한다.
// 필요
exports.CountDevices = function(path,nodename){
var Data = CheckNodeJson(path);
var i = CheckNodeName(path,nodename);
var NodePro = Data.Node[CountNodes(path)-i];
if(NodePro.hasOwnProperty("Device")){
	return Data.Node[CountNodes(path)-i].Device.length;
}
else{
	return 0;
}
}





// Node.json 파일 "Node" 값을 삭제.
// Node Device가 하나도 없을 시 삭제 가능.
exports.DeleteNode = function(path,nodename){
var Data = CheckNodeJson(path);
var Count = CheckNodeName(path,nodename);
console.log(Data,CountDevices(path,nodename));
if(Count==0){
	console.log("Node가 존재하지 않습니다.");
}
else if(CountDevices(path,nodename)==0){
	console.log("Node 내에 Device가 존재하지 않습니다.");
	delete Data.Node[CountNodes(path)-Count];
	var STR = JSON.stringify(Data);
	fs.writeFileSync(path,STR,'utf-8');
	console.log("Node가 제거되었습니다.");
}}


function CreateCamera(path,nodename,dtype,protocol,url){
var Data = CheckNodeJson(path);
var result = CheckNodeName(path,nodename)
if(result!=0){
	//디바이스내 ID 검사
	var id = 0;
        Data.Node.push({
                "id":id,
                "Dtype":dtype,
                "Protocol":protocol,
		"URL":url
        });
        var STR = JSON.stringify(Data);
        fs.writeFileSync(path,STR,'utf-8');
        console.log("입력되었습니다");
}}


//DeleteNode(path,"Sungung");
/*
obj.Node[1].Device.push({
        "id":"",
        "Dtype":"",
        "Protocol":"",
        "URL":""
})
console.log("Put Test",obj.Node[1].Device);
*/
