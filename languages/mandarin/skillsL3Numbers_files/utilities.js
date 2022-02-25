function makeWimpy(path,file)
{
if (path=="*")
path="";
var first='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,47,0" width="25" height="25" name="'+file+'" id="'+file+'">';
var second='<param name="movie" value="http://www.chinese-lessons.com/sounds/wimpy_button.swf?theFile=http://www.chinese-lessons.com/sounds\/'+path+file+'.mp3" />';
var third='<embed src="http://www.chinese-lessons.com/sounds/wimpy_button.swf?theFile=http://www.chinese-lessons.com/sounds\/'+path+file+'.mp3" width="25" height="25" name="'+file+'" quality="high" bgcolor="#FFFFFF" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" /></object>';
document.write(first);
document.write(second);
document.write('<param name="quality" value="high" />');
document.write('<param name="BGCOLOR" value="#FFFFFF" />');
document.write(third);
}


function makeMP(file)
{
 makeWimpy('pinyin/south_f/',file);
}

function makeCP(file)
{
 makeWimpy('pingyam/',file);
}

function makeMG(file)
{
 makeWimpy('mandarin/grammar/',file);
}

function makeCG(file)
{
 makeWimpy('cantonese/grammar/',file);
}

function makeMS(file)
{
 makeWimpy('mandarin/skills/',file);
}

function makeCS(file)
{
 makeWimpy('cantonese/skills/',file);
}

function makeMV(file)
{
 makeWimpy('mandarin/vocab/',file);
}

function makeCV(file)
{
 makeWimpy('cantonese/vocab/',file);
}


function makeMB(file)
{
 makeWimpy('mandarin/binomials/',file);
}

function makeCB(file)
{
 makeWimpy('cantonese/binomials/',file);
}

function makeCC(file)
{
 makeWimpy('cantonese/culture/',file);
}

function makePre(file)
{
 makeWimpy('prefix/',file);
}

function makePhon(file)
{
 makeWimpy('phonics/',file);
}

function makeTai(file)
{
 makeWimpy('taiwan/',file);
}




function Get_Cookie(name) {
   var start = document.cookie.indexOf(name+"=");
   var len = start+name.length+1;
   if ((!start) && (name != document.cookie.substring(0,name.length))) return null;
   if (start == -1) return null;
   var end = document.cookie.indexOf(";",len);
   if (end == -1) end = document.cookie.length;
   return unescape(document.cookie.substring(len,end));
}

function Set_Cookie(name,value,expires,path,domain,secure) {
    var cookieString = name + "=" +escape(value) +
       ( (expires) ? ";expires=" + expires.toGMTString() : "") +
       ( (path) ? ";path=" + path : "") +
       ( (domain) ? ";domain=" + domain : "") +
       ( (secure) ? ";secure" : "");
    document.cookie = cookieString;
}

function Delete_Cookie(name,path,domain) {
   if (Get_Cookie(name)) document.cookie = name + "=" +
      ( (path) ? ";path=" + path : "") +
      ( (domain) ? ";domain=" + domain : "") +
      ";expires=Thu, 01-Jan-70 00:00:01 GMT";
}

var today = new Date();
var zero_date = new Date(0,0,0);
today.setTime(today.getTime() - zero_date.getTime());
var cookie_expire_date = new Date(today.getTime() + (8 * 7 * 86400000));

function setLang() {
   if (Get_Cookie('menuLang')) {
       var menu = Get_Cookie('menuLang');
   }else{
       Set_Cookie('menuLang',"english",cookie_expire_date);
   }
}

var loaded_script = true;