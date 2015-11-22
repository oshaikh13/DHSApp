
var username = ""; //Skyward username
var password = ""; //Skyward password
var qryFirstAuthStr = "codeType=tryLogin&codeValue=" + username +"&duserid=-1&login=" + username + "&loginID=-1&password=" + password + "&requestAction=eel";

var authParser = function(data) {
  data = data.firstChild.childNodes[0].data;
  debugger;
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
  
  var qrySecondAuthStr = "BrowseRowNumber=&Browser=Chrome&BrowserName=&BrowserPlatform=MacIntel&BrowserVersion=46&CurrentProgram=skyportlogin.w&CurrentVersion=010155&HomePage=sepadm01.w&HomePageMenuID=0&LinkData=&LinkNames=&MobileId=&OpenDetails=&OpenRow=&PaCVersion=05.15.06.00.08&PopupHeight=671&PopupWidth=1013&PreviousProgram=&RefreshMode=&SecurityMenuID=0&SuperVersion=011900&TouchDevice=false&User-Type=2&UserLookupLevel=5&UserSecLevel=5&blobid=&brwsInfo=Chrome+46&cUserRole=&currentbrowse=&currentrecord=&delAttachReturn=&displaySecond=no&duserid=" + firstAuthData.duserid + "&dwd=" + firstAuthData.dwd + "&enc=" + firstAuthData.enc + "&encsec=&entities=&entity=&fileInputId=&fileUploadLimit=&filterElementList=&hAlternateColors=true&hAnon=bjlbYpAByijcxUsV&hApplyingFilter=&hAutoOpenPref=no&hBrowseFirstRowid=&hButtonHotKeyIDs=bCancel&hButtonHotKeys=B&hCompName=DBW2K8-106&hDisplayBorder=true&hFilterOpen=&hIPInfo=82.167.231.193&hLoadTime=.04&hNavMenus=&hNavSearchOption=all&hNavSubMenus=&hNotificationsJSON=%5B%5D&hOSName=Windows+NT&hOpenSave=no&hRepositioning=&hScrollBarWidth=17&hSecCache=0+items+in+0+entities&hforgotLoginPage=seplog01&insecure=no&login=&loginID=-1&nameid=" + firstAuthData.nameid +"&noheader=yes&osName=Mac+OS+X&pButtons=&pCountry=SA&pDesc=&pEnc=&pInfo=&pParams=&pPath=&pPriority=&pProgram=&pSrpplmIn=&pState=XX&pType=&pageused=Desktop&passedparams=&password=&recordLimit=30&redirectTo=&screenHeight=480&screenWidth=320&showTracker=false&subversion=46&supported=true&tempAccess=&userAgent=Mozilla%2F5.0+(Macintosh%3B+Intel+Mac+OS+X+10_11_0)+AppleWebKit%2F537.36+(KHTML%2C+like+Gecko)+Chrome%2F46.0.2490.86+Safari%2F537.36&vMaintOption=&vSelectMode=N&vSelectedColumn=&vSelectedColumnDirection=&web-data-recid=" + firstAuthData.web_data_recid + "&wfaacl=" + firstAuthData.wfaacl + "&wfaacl-recid=" + firstAuthData.wfaacl_recid;

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