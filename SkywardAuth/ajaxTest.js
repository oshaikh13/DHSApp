
var username = ""; //Skyward username
var password = ""; //Skyward password
var qryFirstAuthStr = "codeType=tryLogin&codeValue=" + username +"&duserid=-1&login=" + username + "&loginID=-1&password=" + password + "&requestAction=eel";

var authParser = function(data) {
  data = data.firstChild.childNodes[0].data;
  data = data.split("^");
  var newReqData = {};
  newReqData.duserid = data[5];
  newReqData.dwd = data[0];
  newReqData.enc = data[13];
  newReqData.web_data_recid = data[1];
  newReqData.wfaacl = data[3];
  newReqData.wfaacl_recid = data[2];
  newReqData.nameid = data[4];
  console.log(newReqData);
  return newReqData;
}

var firstAuthRun  = function(qry) {
  $.ajax({
    url : 'https://skywarddhs.isg.edu.sa/scripts/wsisa.dll/WService=wsEAPlusDHS/skyporthttp.w',
    type: 'POST',
    data: qry,
    success: function (data) {
      console.log("Success");
      console.log(data);
      secondAuthRun(authParser(data));
    }
  })
}

var secondAuthRun = function(firstAuthData) {
  
  var qrySecondAuthStr = "duserid=" + firstAuthData.duserid + "&dwd=" + firstAuthData.dwd + "&enc=" + firstAuthData.enc + "&loginID=-1&nameid=" + firstAuthData.nameid +"&recordLimit=30&web-data-recid=" + firstAuthData.web_data_recid + "&wfaacl=" + firstAuthData.wfaacl + "&wfaacl-recid=" + firstAuthData.wfaacl_recid;

  $.ajax({
    url: 'https://skywarddhs.isg.edu.sa/scripts/wsisa.dll/WService=wsEAPlusDHS/sfhome01.w',
    type: 'POST',
    data: qrySecondAuthStr,
    success: function(data) {
      console.log(data);
    }
  })
}

firstAuthRun(qryFirstAuthStr);


