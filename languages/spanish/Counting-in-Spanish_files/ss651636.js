var fx=new Object();
fx.Base=function(){
};
fx.Base.prototype={setOptions:function(_1){
this.options={duration:500,onComplete:"",transition:fx.sinoidal};
Object.extend(this.options,_1||{});
},step:function(){
var _2=(new Date).getTime();
if(_2>=this.options.duration+this.startTime){
this.now=this.to;
clearInterval(this.timer);
this.timer=null;
if(this.options.onComplete){
setTimeout(this.options.onComplete.bind(this),10);
}
}else{
var _3=(_2-this.startTime)/(this.options.duration);
this.now=this.options.transition(_3)*(this.to-this.from)+this.from;
}
this.increase();
},custom:function(_4,to){
if(this.timer!=null){
return;
}
this.from=_4;
this.to=to;
this.startTime=(new Date).getTime();
this.timer=setInterval(this.step.bind(this),13);
},hide:function(){
this.now=0;
this.increase();
},clearTimer:function(){
clearInterval(this.timer);
this.timer=null;
}};
fx.Layout=Class.create();
fx.Layout.prototype=Object.extend(new fx.Base(),{initialize:function(el,_5){
this.el=$(el);
this.el.style.overflow="hidden";
this.iniWidth=this.el.offsetWidth;
this.iniHeight=this.el.offsetHeight;
this.setOptions(_5);
}});
fx.Height=Class.create();
Object.extend(Object.extend(fx.Height.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.height=this.now+"px";
},toggle:function(){
var _6=this.options.toHeight?this.options.toHeight:0;
if(this.el.offsetHeight>0){
this.custom(this.el.offsetHeight,_6);
}else{
this.custom(0,this.el.scrollHeight);
}
}});
fx.Width=Class.create();
Object.extend(Object.extend(fx.Width.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.width=this.now+"px";
},toggle:function(){
if(this.el.offsetWidth>0){
this.custom(this.el.offsetWidth,0);
}else{
this.custom(0,this.iniWidth);
}
}});
fx.Opacity=Class.create();
fx.Opacity.prototype=Object.extend(new fx.Base(),{initialize:function(el,_7){
this.el=$(el);
this.now=1;
this.increase();
this.setOptions(_7);
},increase:function(){
if(this.now==1&&(/Firefox/.test(navigator.userAgent))){
this.now=0.9999;
}
this.setOpacity(this.now);
},setOpacity:function(_8){
if(_8==0&&this.el.style.visibility!="hidden"){
this.el.style.visibility="hidden";
}else{
if(this.el.style.visibility!="visible"){
this.el.style.visibility="visible";
}
}
if(window.ActiveXObject){
this.el.style.filter="alpha(opacity="+_8*100+")";
}
this.el.style.opacity=_8;
},toggle:function(){
if(this.now>0){
this.custom(1,0);
}else{
this.custom(0,1);
}
}});
fx.sinoidal=function(_9){
return ((-Math.cos(_9*Math.PI)/2)+0.5);
};
fx.linear=function(_a){
return _a;
};
fx.cubic=function(_b){
return Math.pow(_b,3);
};
fx.circ=function(_c){
return Math.sqrt(_c);
};
fx.Scroll=Class.create();
fx.Scroll.prototype=Object.extend(new fx.Base(),{initialize:function(_d){
this.setOptions(_d);
},scrollTo:function(el){
var _e=Position.cumulativeOffset($(el))[1]-20;
var _f=window.innerHeight||document.documentElement.clientHeight;
var _10=document.documentElement.scrollHeight;
var top=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop;
if(_e+_f>_10){
this.custom(top,_e-_f+(_10-_e));
}else{
this.custom(top,_e);
}
},increase:function(){
window.scrollTo(0,this.now);
}});
fx.Text=Class.create();
fx.Text.prototype=Object.extend(new fx.Base(),{initialize:function(el,_11){
this.el=$(el);
this.setOptions(_11);
if(!this.options.unit){
this.options.unit="em";
}
},increase:function(){
this.el.style.fontSize=this.now+this.options.unit;
}});
fx.Combo=Class.create();
fx.Combo.prototype={setOptions:function(_12){
this.options={opacity:true,height:true,width:false};
Object.extend(this.options,_12||{});
},initialize:function(el,_13){
this.el=$(el);
this.setOptions(_13);
if(this.options.opacity){
this.o=new fx.Opacity(el,_13);
_13.onComplete=null;
}
if(this.options.height){
this.h=new fx.Height(el,_13);
_13.onComplete=null;
}
if(this.options.width){
this.w=new fx.Width(el,_13);
}
},toggle:function(){
this.checkExec("toggle");
},hide:function(){
this.checkExec("hide");
},clearTimer:function(){
this.checkExec("clearTimer");
},checkExec:function(_14){
if(this.o){
this.o[_14]();
}
if(this.h){
this.h[_14]();
}
if(this.w){
this.w[_14]();
}
},resizeTo:function(hto,wto){
if(this.h&&this.w){
this.h.custom(this.el.offsetHeight,this.el.offsetHeight+hto);
this.w.custom(this.el.offsetWidth,this.el.offsetWidth+wto);
}
},customSize:function(hto,wto){
if(this.h&&this.w){
this.h.custom(this.el.offsetHeight,hto);
this.w.custom(this.el.offsetWidth,wto);
}
}};
fx.Accordion=Class.create();
fx.Accordion.prototype={setOptions:function(_15){
this.options={delay:100,opacity:false};
Object.extend(this.options,_15||{});
},initialize:function(_16,_17,_18){
this.elements=_17;
this.setOptions(_18);
var _18=_18||"";
_17.each(function(el,i){
_18.onComplete=function(){
if(el.offsetHeight>0){
el.style.height="1%";
}
};
el.fx=new fx.Combo(el,_18);
el.fx.hide();
});
_16.each(function(tog,i){
tog.onclick=function(){
this.showThisHideOpen(_17[i]);
}.bind(this);
}.bind(this));
},showThisHideOpen:function(_19){
this.elements.each(function(el,i){
if(el.offsetHeight>0&&el!=_19){
this.clearAndToggle(el);
}
}.bind(this));
if(_19.offsetHeight==0){
setTimeout(function(){
this.clearAndToggle(_19);
}.bind(this),this.options.delay);
}
},clearAndToggle:function(el){
el.fx.clearTimer();
el.fx.toggle();
}};
var Remember=new Object();
Remember=function(){
};
Remember.prototype={initialize:function(el,_1a){
this.el=$(el);
this.days=365;
this.options=_1a;
this.effect();
var _1b=this.readCookie();
if(_1b){
this.fx.now=_1b;
this.fx.increase();
}
},setCookie:function(_1c){
var _1d=new Date();
_1d.setTime(_1d.getTime()+(this.days*24*60*60*1000));
var _1e="; expires="+_1d.toGMTString();
document.cookie=this.el+this.el.id+this.prefix+"="+_1c+_1e+"; path=/";
},readCookie:function(){
var _1f=this.el+this.el.id+this.prefix+"=";
var ca=document.cookie.split(";");
for(var i=0;c=ca[i];i++){
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_1f)==0){
return c.substring(_1f.length,c.length);
}
}
return false;
},custom:function(_20,to){
if(this.fx.now!=to){
this.setCookie(to);
this.fx.custom(_20,to);
}
}};
fx.RememberHeight=Class.create();
fx.RememberHeight.prototype=Object.extend(new Remember(),{effect:function(){
this.fx=new fx.Height(this.el,this.options);
this.prefix="height";
},toggle:function(){
if(this.el.offsetHeight==0){
this.setCookie(this.el.scrollHeight);
}else{
this.setCookie(0);
}
this.fx.toggle();
},resize:function(to){
this.setCookie(this.el.offsetHeight+to);
this.fx.custom(this.el.offsetHeight,this.el.offsetHeight+to);
},hide:function(){
if(!this.readCookie()){
this.fx.hide();
}
}});
fx.RememberText=Class.create();
fx.RememberText.prototype=Object.extend(new Remember(),{effect:function(){
this.fx=new fx.Text(this.el,this.options);
this.prefix="text";
}});
fx.expoIn=function(pos){
return Math.pow(2,10*(pos-1));
};
fx.expoOut=function(pos){
return (-Math.pow(2,-10*pos)+1);
};
fx.quadIn=function(pos){
return Math.pow(pos,2);
};
fx.quadOut=function(pos){
return -(pos)*(pos-2);
};
fx.circOut=function(pos){
return Math.sqrt(1-Math.pow(pos-1,2));
};
fx.circIn=function(pos){
return -(Math.sqrt(1-Math.pow(pos,2))-1);
};
fx.backIn=function(pos){
return (pos)*pos*((2.7)*pos-1.7);
};
fx.backOut=function(pos){
return ((pos-1)*(pos-1)*((2.7)*(pos-1)+1.7)+1);
};
fx.sineOut=function(pos){
return Math.sin(pos*(Math.PI/2));
};
fx.sineIn=function(pos){
return -Math.cos(pos*(Math.PI/2))+1;
};
fx.sineInOut=function(pos){
return -(Math.cos(Math.PI*pos)-1)/2;
};
fx.Position=Class.create();
fx.Position.prototype=Object.extend(new fx.Base(),{initialize:function(el,_21){
this.el=$(el);
this.setOptions(_21);
this.now=[0,0];
},step:function(){
var _22=(new Date).getTime();
if(_22>=this.options.duration+this.startTime){
this.now=this.to;
clearInterval(this.timer);
this.timer=null;
if(this.options.onComplete){
setTimeout(this.options.onComplete.bind(this),10);
}
}else{
var _23=(_22-this.startTime)/(this.options.duration);
var tmp=[];
tmp[0]=(this.options.transition(_23)*(this.to[0]-this.from[0])+this.from[0]);
tmp[1]=(this.options.transition(_23)*(this.to[1]-this.from[1])+this.from[1]);
this.now=tmp;
}
this.increase();
},increase:function(){
this.el.style["left"]=this.now[0]+"px";
this.el.style["top"]=this.now[1]+"px";
},move:function(_24,to){
to=to?to:this.now;
this.custom(_24,to);
}});
fx.Color=Class.create();
fx.Color.prototype=Object.extend(new fx.Base(),{initialize:function(el,_25){
this.el=$(el);
this.setOptions(_25);
this.now=0;
this.regex=new RegExp("#?(..?)(..?)(..?)");
if(!this.options.fromColor){
this.options.fromColor="#FFFFFF";
}
if(!this.options.toColor){
this.options.toColor="#FFFFFF";
}
if(!this.options.property){
this.props=new Array("backgroundColor");
}else{
this.props=this.options.property.split(",");
}
},increase:function(){
var hex="rgb("+(Math.round(this.cs[0]+(this.ce[0]-this.cs[0])*this.now))+","+(Math.round(this.cs[1]+(this.ce[1]-this.cs[1])*this.now))+","+(Math.round(this.cs[2]+(this.ce[2]-this.cs[2])*this.now))+")";
for(i=0;i<this.props.length;i++){
if(this.props[i]=="backgroundColor"){
this.el.style.backgroundColor=hex;
}else{
if(this.props[i]=="color"){
this.el.style.color=hex;
}else{
if(this.props[i]=="borderColor"){
this.el.style.borderColor=hex;
}
}
}
}
},toggle:function(){
this.cs=this.regex.exec(this.options.fromColor);
this.ce=this.regex.exec(this.options.toColor);
for(i=1;i<this.cs.length;i++){
this.cs[i-1]=parseInt(this.cs[i],16);
this.ce[i-1]=parseInt(this.ce[i],16);
}
if(this.now>0){
this.custom(1,0);
}else{
this.custom(0,1);
}
},cycle:function(){
this.toggle();
setTimeout(this.toggle.bind(this),this.options.duration+10);
},customColor:function(_26,to){
this.cs=this.regex.exec(_26);
this.ce=this.regex.exec(to);
for(i=1;i<this.cs.length;i++){
if(this.cs[i].length==1){
this.cs[i]+=this.cs[i];
}
if(this.ce[i].length==1){
this.ce[i]+=this.ce[i];
}
this.cs[i-1]=parseInt(this.cs[i],16);
this.ce[i-1]=parseInt(this.ce[i],16);
}
this.custom(0,1);
},customColorRGB:function(_27,to){
this.rgb_regex=new RegExp("^rgb.([^,]*),s?([^,]*),s?([^)]*)");
this.cs=this.rgb_regex.exec(_27);
this.ce=this.rgb_regex.exec(to);
if(!this.cs){
this.customColor(_27,to);
return;
}
for(i=1;i<this.cs.length;i++){
this.cs[i-1]=parseInt(this.cs[i]);
this.ce[i-1]=parseInt(this.ce[i]);
}
this.custom(0,1);
}});
fx.Slide=Class.create();
Object.extend(Object.extend(fx.Slide.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.height=this.now+"px";
},toggle:function(){
if(this.el.offsetHeight>0){
this.custom(this.el.offsetHeight,0);
}else{
this.custom(0,this.el.scrollHeight);
}
}});
function toggleOverlay(id){
toggleOverlay.init(id);
toggleOverlay.toggleCurtain();
};
function overlayIsOpen(id){
toggleOverlay.init(id);
return toggleOverlay.curtain.style.display=="block";
};
toggleOverlay.init=function(id){
this.isIE6orBelow=false;
var _28=navigator.userAgent.toLowerCase();
var _29=_28.indexOf("msie")+1;
if(_29){
version=_28.charAt(_29+4);
if(version<=6){
this.isIE6orBelow=true;
}
}
this.isMobile=_28.indexOf("mobile")>-1;
this.overlay=$(id);
this.wrapper=this.getWrapper();
this.curtain=this.getCurtain();
this.wrapper.appendChild(this.overlay);
if(this.isIE6orBelow){
this.iframe=this.getIframe();
}
if(navigator.userAgent.indexOf("Linux")!=-1){
tempObjects=document.body.getElementsByTagName("object");
this.elementsToHide=[];
for(var i=0;i<tempObjects.length;i++){
if(!$(tempObjects[i]).descendantOf(this.overlay)){
this.elementsToHide.push(tempObjects[i]);
}
}
}
if(this.isMobile){
scroll(0,0);
}
};
toggleOverlay.toggleCurtain=function(id){
this.overlay.toggle();
if(this.curtain.style.display!="block"){
this.showCurtain();
}else{
this.hideCurtain();
}
};
toggleOverlay.showCurtain=function(){
this.setElementVisibility("hidden");
this.wrapper.style.display="block";
this.curtain.style.display="block";
if(this.isIE6orBelow){
this.iframe.style.display="block";
}
this.stretchCurtain();
jq(this.overlay).trigger("visible",true);
Event.observe(window,"resize",this.stretchCurtain,false);
};
toggleOverlay.hideCurtain=function(){
this.setElementVisibility("visible");
this.curtain.style.display="none";
this.wrapper.style.display="none";
if(this.isIE6orBelow){
this.iframe.style.display="none";
}
jq(this.overlay).trigger("visible",false);
Event.stopObserving(window,"resize",this.stretchCurtain,false);
};
toggleOverlay.setElementVisibility=function(_2a){
if(this.elementsToHide){
for(i=0;i<this.elementsToHide.length;i++){
this.elementsToHide[i].style.visibility=_2a;
}
}
};
toggleOverlay.getWrapper=function(){
var id="toggleOverlayWrapper";
var div=$(id);
if(div){
return div;
}
div=document.createElement("div");
div.id=id;
document.body.appendChild(div);
div.style.zIndex="1000";
if(this.isIE6orBelow){
div.style.position="absolute";
div.style.top=Position.getViewportScrollY()+"px";
Event.observe(window,"scroll",function(){
div.style.top=Position.getViewportScrollY()+"px";
});
}else{
div.style.position="fixed";
}
return div;
};
toggleOverlay.getCurtain=function(){
var id="toggleOverlayCurtain";
var _2b=$(id);
if(_2b){
return _2b;
}
_2b=document.createElement("div");
_2b.id=id;
this.wrapper.appendChild(_2b);
return _2b;
};
toggleOverlay.getIframe=function(){
var id="toggleOverlayIframe";
var _2c=$(id);
if(_2c){
return _2c;
}
_2c=document.createElement("iframe");
_2c.id=id;
_2c.src="";
_2c.frameBorder="no";
_2c.scrolling="no";
document.body.appendChild(_2c);
return _2c;
};
toggleOverlay.stretchCurtain=function(){
height=jq(document).height();
toggleOverlay.wrapper.style.height=height+"px";
toggleOverlay.wrapper.style.width=document.body.scrollWidth+"px";
toggleOverlay.curtain.style.height=height+"px";
if(this.isIE6orBelow){
toggleOverlay.iframe.style.height=height+"px";
toggleOverlay.iframe.style.width=document.body.scrollWidth+"px";
}
if(this.isMobile||navigator.userAgent.indexOf("AppleWebKit/")>-1&&!document.evaluate){
wd=self["innerWidth"];
}else{
if(navigator.userAgent.indexOf("Opera")>-1&&parseFloat(window.opera.version())<9.5){
wd=document.body["clientWidth"];
}else{
wd=document.documentElement["clientWidth"];
}
}
left=wd/2-toggleOverlay.overlay.clientWidth/2+"px";
toggleOverlay.overlay.style.left=left;
};
var detect=navigator.userAgent.toLowerCase();
var OS,browser,version,total,thestring;
if(checkIt("konqueror")){
browser="Konqueror";
OS="Linux";
}else{
if(checkIt("safari")){
browser="Safari";
}else{
if(checkIt("opera")){
browser="Opera";
}else{
if(checkIt("msie")){
browser="IE";
}else{
if(!checkIt("compatible")){
browser="Netscape Navigator";
version=detect.charAt(8);
}else{
browser="An unknown browser";
}
}
}
}
}
if(!version){
version=detect.charAt(place+thestring.length);
}
if(!OS){
if(checkIt("linux")){
OS="Linux";
}else{
if(checkIt("x11")){
OS="Unix";
}else{
if(checkIt("mac")){
OS="Mac";
}else{
if(checkIt("win")){
OS="Windows";
}else{
OS="an unknown operating system";
}
}
}
}
}
var insideHubEditor=false;
function checkIt(_2d){
place=detect.indexOf(_2d)+1;
thestring=_2d;
return place;
};
function ssToId(id,_2e){
var _2e=_2e||1000;
jq("html, body").animate({scrollTop:jq("#"+id).offset().top},_2e);
return false;
};
function ssOnload(){
var _2f=location.hash.slice(1);
if(_2f=="comments"){
ssToId("comFirst");
}else{
if(_2f.substr(0,8)=="comment-"){
ssToId("comment"+_2f.substr(8));
}else{
if(_2f!=null&&_2f){
ssToId(_2f);
}
}
}
};
function insertVideo(_30,key,css,_31,_32,_33){
var _34="<div class=\"video\">";
var _35="opaque";
if(_32){
_35="transparent";
}
if(_33=="bad"){
_34="<div class=\"video\" style=\"background-color: #f7e1e1; border-bottom:3px solid #ed9693; color: #440000; padding: 5px;\">"+"<p style=\"margin:0;\">&nbsp;The specified URL is not working</p></div>";
}
if(_30=="Google"){
_34+="<embed style=\""+_31+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" id=\"VideoPlayback\" "+"src=\"http://video.google.com/googleplayer.swf?docId="+key+"&hl=en\""+" flashvars=\"\" wmode=\""+_35+"\">"+"</embed>";
}else{
if(_30=="YouTube"){
_34+="<embed style=\""+_31+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://www.youtube.com/v/"+key+"\" scale=\"exactFit\" "+"wmode=\""+_35+"\">"+"</embed>";
}else{
if(_30=="Revver"){
_34+="<embed style=\""+_31+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://flash.revver.com/player/1.0/player.swf?mediaId="+key+"\" scale=\"exactFit\" "+"wmode=\""+_35+"\" allowfullscreen=\"true\" allowScriptAccess=\"always\" flashvars=\"allowFullScreen=true\">"+"</embed>";
}else{
if(_30=="Metacafe"){
_34+="<embed style=\""+_31+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://www.metacafe.com/fplayer/"+key+".swf\" scale=\"exactFit\" "+"wmode=\""+_35+"\">"+"</embed>";
}else{
if(_30=="Yahoo"){
_34+="<embed class=\""+css+"\" src=\"http://d.yimg.com/nl/vyc/site/player.swf\" type=\"application/x-shockwave-flash\" "+"flashvars=\"vid="+key+"&amp;autoPlay=false&amp;volume=100&amp;enableFullScreen=1&amp;lang=en-US&amp;wmode="+_35+"\"></embed></object>";
}else{
if(_30=="YahooSports"){
_34+="<embed class=\""+css+"\" vid=\""+key+"\" flashvars=\"vid="+key+"\" allowfullscreen=\"true\" allowscriptaccess=\"never\" quality=\"high\" "+" bgcolor=\"#000\" scale=\"exactFit\" src=\"http://d.yimg.com/m/up/ypp/sports/player.swf\" type=\"application/x-shockwave-flash\" wmode=\""+_35+"\" />";
}else{
if(_30=="Vimeo"){
_34+="<embed style=\""+_31+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://vimeo.com/moogaloop.swf?clip_id="+key+"&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;"+"show_portrait=0&amp;color=&amp;fullscreen=1\" scale=\"exactFit\" allowFullscreen=\"true\" allowScriptAccess=\"never\" "+"wmode=\""+_35+"\">"+"</embed>";
}else{
if(_30=="BlipTV"){
_34+="<embed style=\""+_31+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://blip.tv/scripts/flash/stratos.swf#file=http://blip.tv/rss/flash/"+key+"\" scale=\"exactFit\" allowFullscreen=\"true\" allowScriptAccess=\"always\" "+"wmode=\""+_35+"\">"+"</embed>";
}else{
if(_30=="Unknown"){
_34+="<p style=\"margin-left:1em\">The specified URL was not recognized</p>";
}else{
_34+="<p style=\"margin-left:1em\">Video Not Available</p>";
}
}
}
}
}
}
}
}
}
_34+="</div>";
if(_32){
jq("#"+_32).html(_34);
}else{
if(_30!="New"){
document.write(_34);
}
}
};
function safeScriptEval(_36){
var _37=_36.innerHTML.strip();
if(_37.substring(0,4)=="<!--"){
_37=_37.substring(4,_37.length-3);
}
try{
eval(_37);
}
catch(e){
}
};
function seeMoreTags(id){
jq.post("/xml/tags.php",{a:id},function(rsp){
jq("#nav_tags").append(rsp);
});
};
function shareHub(url,_38){
if(_38===undefined){
_38=false;
}
if(_38){
var _39=confirm("Frequently sharing your own Hubs with followers is not recommended.  Do you want to proceed?.");
if(!_39){
return false;
}
}
jq.post("/xml/hubfeedshare.php",{url:url},function(rsp){
eval(rsp);
if(success){
jq("#share_with_followers").html("Hub shared!");
}else{
jq("#share_with_followers").html("Sorry, something went wrong!");
}
});
};
function praiseHub(id,val,_3a){
if(!id){
return;
}
jq("#praise_feedback").html("Saving ...");
jq("#praise_item_"+Math.abs(val)).load("/xml/feedback.php",{a:id,v:val,h:1,newdesign:(_3a?1:0)},function(){
jq("#praise_feedback").html("Saved. Thanks!");
});
return false;
};
function recArt(id,val){
jq("#rec_"+id).load("/xml/feedback.php",{a:id,v:val});
return false;
};
function selectTab(_3b,_3c,_3d,_3e){
var _3f;
var _40,_41;
for(var i=0;i<_3d;i++){
_40=jq("#tab_"+_3b+"_"+i);
_41=jq("#tabcontent_"+_3b+"_"+i);
if(!_40.size()||!_41.size()){
alert("Cannot locate element: baseid="+_3b+" index="+_3c+" tabcount="+_3d);
}
if(_40.hasClass("selected")){
_3f=i;
}
if(i==_3c){
_40.addClass("selected");
_41.addClass("selected");
}else{
_40.removeClass("selected");
_41.removeClass("selected");
}
}
var _42={};
if(_3e&&_42.toString.call(_3e)=="[object Function]"){
_3e(_3f,_3c);
}
return false;
};
function categoryFanBulkJoin(id,_43,_44,_45,_46,_47){
var _48=jq(".jc");
var _49=Array();
var _4a=Array();
var i=0;
var k=0;
jq(".jc").each(function(_4b,box){
if(jq(box).is(":checked")){
_49[i++]=parseInt(jq(box).attr("name").substr(3),10);
}else{
if(!_45){
_4a[k++]=parseInt(jq(box).attr("name").substr(3),10);
}
}
});
checked_ids=_49.join(",");
unchecked_ids=_4a.join(",");
if(_45){
jq.post("/xml/categoryFanBulkJoin.php",{checked_ids:checked_ids,unchecked_ids:unchecked_ids,html_target:id},function(rsp){
if(_46){
_46(rsp);
}
});
}else{
data={checked_ids:checked_ids,unchecked_ids:unchecked_ids,html_target:id};
if(typeof (_47)!="undefined"){
data["searchTxt"]=_47;
}
jq("#"+id).load("/xml/categoryFanBulkJoin.php",data,function(rsp){
if(_43){
window.location.replace("/contacts/newuser.php");
return;
}else{
if(_44){
setTimeout(categoryFanHighlight,500);
}
}
if(_46){
_46(rsp);
}
});
}
return false;
};
function categoryFanHighlight(){
jq(".highlighted").css("color","#ff0000").animate({color:"#fffff"},700);
};
function categoryFanSearch(_4c,_4d,_4e,_4f,_50){
if(!_4e){
var _4e=8;
}
if(!_4f){
var _4f=2;
}
var _51=jq("#"+_4d).val();
if(""==jq.trim(_51)){
return;
}
jq("#"+_4c).load("/xml/categoryFanSearch.php",{search:_51,limit:_4e,cols:_4f},function(){
if(_50){
_50();
}
});
return false;
};
function facebookConnect(_52){
if(typeof (_52)=="undefined"){
_52="/user/new/facebook_window.php";
}
this.child=facebookPopup("");
var uri=$H({returnurl:_52}).toQueryString();
var _53=new Ajax.Request("/xml/facebook_authurl.php",{method:"post",parameters:uri,onFailure:reportError,onComplete:function(req){
eval(req.responseText);
if(typeof (authorizationUrl)!="undefined"){
this.child.document.location=authorizationUrl;
}else{
this.child.close();
}
}});
return false;
};
function facebookPopup(_54){
xyPos="";
if(window.screenX&&window.innerWidth){
xPos=window.screenX+((window.innerWidth-550)/2);
yPos=window.screenY+((window.innerHeight-300)/2);
xyPos="top="+yPos+",left="+xPos+",";
}else{
if(window.screenLeft&&document.body.clientHeight){
xPos=window.screenLeft+((document.body.clientWidth-550)/2);
yPos=window.screenTop+((document.body.clientHeight-300)/2);
xyPos="top="+yPos+",left="+xPos+",";
}
}
child=window.open(_54,"authwindow",xyPos+"width=550,height=300,scrollbars=no,location=yes");
child.opener=self;
if(window.focus){
this.child.focus();
}
return child;
};
function updateSocialOptions(_55,_56){
var _57=new Ajax.Request("/xml/socialoptions.php",{method:"post",parameters:_55+"="+(_56?"1":"0"),onFailure:reportError,onComplete:function(req){
}});
};
function toggleShareIt(id,flg,_58){
if(_58===undefined){
_58=false;
}
if(flg){
var uri=$H({art_id:id,show_warn:_58}).toQueryString();
var _59=new Ajax.Updater({success:"share_tgt"},"/xml/shareit.php",{parameters:uri,onFailure:reportError});
}else{
$("share_tgt").innerHTML="";
}
return false;
};
function displaySocialButtons(_5a){
_5a=_5a||{};
var _5b=jQuery.ajaxSettings.cache;
jQuery.ajaxSettings.cache=true;
if(!_5a["nofacebook"]){
jq.getScript("//connect.facebook.net/en_US/all.js#xfbml=1",function(_5c,_5d){
FB.init({xfbml:true});
});
window.fbAsyncInit=function(){
FB.Event.subscribe("edge.create",function(_5e){
_gaq.push(["t2._trackSocial","facebook","like",_5e]);
});
FB.Event.subscribe("edge.remove",function(_5f){
_gaq.push(["t2._trackSocial","facebook","unlike",_5f]);
});
FB.Event.subscribe("message.send",function(_60){
_gaq.push(["t2._trackSocial","facebook","send",_60]);
});
FB.Event.subscribe("xfbml.render",function(){
jq(".socialbuttons").show();
});
};
}else{
jq(window).bind("load",function(){
jq(".socialbuttons").show();
});
}
if(!_5a["notwitter"]&&(browser!="IE"||version>7||document.documentMode)){
jq.getScript("//platform.twitter.com/widgets.js",function(_61,_62){
twttr.events.bind("tweet",function(_63){
if(_63){
_gaq.push(["t2._trackSocial","twitter","tweet"]);
}
});
});
}
if(!_5a["nogplus"]){
jq.getScript("https://apis.google.com/js/plusone.js");
}
if(!_5a["nopinit"]){
jq.getScript("//assets.pinterest.com/js/pinit.js");
}
jQuery.ajaxSettings.cache=_5b;
};
function checkViolations(_64){
if(_64){
jq(".violations_span").html("");
var _65={check_violation:1};
}else{
var _65={update_status:1};
}
jQuery.ajax({type:"POST",url:"/xml/checkviolations.php",data:_65,dataType:"json",success:function(_66){
if(_66.data){
jq(".violations_span").html(_66.data);
}
if(!_66.complete){
setTimeout(checkViolations,30000);
}
}});
return false;
};
function showAskSignup(_67){
var uri=$H({btn_text:"ask!",explain:_67,show_signup:1}).toQueryString();
showAjaxOverlay("/xml/showsignup.php",uri,"linkarticle");
return false;
};
function showLinkArticle(url,_68){
var uri=$H({page_url:url,page_title:_68}).toQueryString();
showAjaxOverlay("/xml/linkarticle.php",uri,"linkarticle");
return false;
};
function showFlagHub(id){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/flaghub.php?a="+id,uri,"flaghub");
return false;
};
function showFlagRequest(id){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/flagrequest.php?r="+id,uri,"flagrequest");
return false;
};
function showFlagProfile(id){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/flagprofile.php?u="+id,uri,"flagrequest");
return false;
};
function showEmailForm(_69,_6a,_6b){
var uri=$H({page_url:_69,page_type:_6a,page_filter:_6b}).toQueryString();
showAjaxOverlay("/xml/emailpage.php",uri,"emailhub");
return false;
};
function showEditProfileForm(){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/profileform.php",uri,"editprofile");
return false;
};
function showAuthorHubOfTheDay(aid){
var uri=$H({user_id:aid}).toQueryString();
showAjaxOverlay("/xml/hotd_author.php",uri,"hotd");
return false;
};
function showTermsOfService(){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/termsofservice.php",uri,"tos");
return false;
};
function showHubOverlay(url,_6c,_6d){
var uri=$H({url:url,addComment:_6c,commentText:_6d}).toQueryString();
showAjaxOverlay("/xml/articlerender.php",uri,"hubpage");
return false;
};
function showModuleOverlay(_6e){
var uri=$H({modId:_6e}).toQueryString();
showAjaxOverlay("/xml/module_render.php",uri,"hubpage");
return false;
};
function showPollsOverlay(_6f,_70){
var uri=$H({moduleId:_6f,pollId:_70}).toQueryString();
showAjaxOverlay("/xml/pollsrender.php",uri,"hubpage");
return false;
};
function showBioOverlay(uid){
var uri=$H({id:uid}).toQueryString();
showAjaxOverlay("/xml/userbio.php",uri,"userbio");
return false;
};
function showAjaxOverlay(_71,_72,_73){
if(!$("overlay")){
var _74=new Insertion.Before("footer","<div id=\"overlay\" class=\"overlay\" style=\"display:none\"><a id=\"overlay_close\" href=\"#\" onclick=\"return closeAjaxOverlay();\"/>close</a><div id=\"overlay_content\"><div class=\"spinner\"></div></div></div>");
}
if(_73){
$("overlay").addClassName(_73);
}
toggleOverlay("overlay");
var _75=new Ajax.Updater({success:"overlay_content"},_71,{parameters:_72,onComplete:function(){
if(!$("fixed_title")){
return;
}
var _76=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_76+"px"});
}
adjustOverlayHeight();
}.bind(this),onFailure:reportError,evalScripts:true});
};
function closeAjaxOverlay(){
toggleOverlay("overlay");
$("overlay").className="overlay";
$("overlay_content").innerHTML="<div class=\"spinner\"></div>";
return false;
};
function adjustOverlayHeight(){
var _77=browser=="IE"&&version<=6;
var _78=$("overlay");
var _79=Position.getViewportHeight();
if(_79>750){
var _7a=_79-150;
}else{
var _7a=_79-90;
}
var _7b=_78.getStyle("paddingTop");
var _7c=_78.getStyle("paddingBottom");
_7a-=_7b.substring(0,_7b.length-2);
_7a-=_7c.substring(0,_7c.length-2);
_7a=Math.max(_7a,100);
$("overlay").setStyle({height:_7a+"px"});
if(_79>750){
$("overlay").setStyle({top:"75px"});
if($("fixed_title")&&!_77){
$("fixed_title").setStyle({top:"75px"});
}
}else{
$("overlay").setStyle({top:"45px"});
if($("fixed_title")&&!_77){
$("fixed_title").setStyle({top:"45px"});
}
}
if($("scrollable_content")){
var _7d=$("overlay").getHeight()-$("fixed_title").getHeight()-10;
$("scrollable_content").setStyle({height:_7d+"px"});
$("overlay_content").setStyle({overflowY:"visible"});
}else{
$("overlay_content").setStyle({height:(_7a-60)+"px",overflowY:"auto"});
}
};
function follow(_7e,_7f,_80,_81,_82){
var _83={typeId:_7e,objectId:_7f,isActive:_80,printNumbers:_81,overrides:_82};
var _84=new jQuery.ajax({type:"POST",url:"/xml/follow.php",data:_83,success:function(_85){
if(_85=="Not signed in"){
var url="/signin?explain=";
switch(_7e){
case 1:
url+=escape("follow answers to this question");
break;
case 2:
url+=escape("follow comments to this Hub");
break;
case 3:
url+=escape("follow users");
break;
case 4:
url+=escape("follow categories");
break;
case 5:
case 6:
url+=escape("follow posts in this forum thread");
break;
}
url+="&url=";
url+=encodeURI(document.URL);
document.location.href=url;
}else{
if(_85=="same"){
alert("You may not follow yourself");
}else{
switch(_7e){
case 1:
jQuery(".follow_question_"+_7f).replaceWith(_85);
break;
case 2:
jQuery(".follow_article_"+_7f).replaceWith(_85);
break;
case 3:
var _86=JSONstring.toObject(_85);
jQuery("#follow_"+_7f).replaceWith(_86.buttonText);
jQuery.fancybox(_86.fanMail,{"autoDimensions":false,"height":400});
break;
case 4:
jQuery(".follow_"+_7f).replaceWith(_85);
break;
case 5:
case 6:
jQuery("#follow_"+_7f).replaceWith(_85);
break;
}
}
}
}});
};
function updateFollowButton(_87,_88,_89,_8a){
jQuery.ajax({type:"POST",url:"/xml/get_follow_text.php",data:{typeId:_87,objectId:_88,printNumbers:_89,overrides:_8a},success:function(_8b){
switch(_87){
case 1:
jQuery(".follow_question_"+_88).replaceWith(_8b);
break;
case 2:
jQuery(".follow_article_"+_88).html(_8b);
break;
case 3:
var _8c=JSONstring.toObject(_8b);
jQuery("#follow_"+_88).replaceWith(_8c.buttonText);
break;
case 4:
jQuery(".follow_"+_88).replaceWith(_8b);
break;
case 5:
jQuery("#follow_"+_88).replaceWith(_8b);
break;
case 6:
jQuery("#follow_"+_88).replaceWith(_8b);
break;
}
}});
};
function expandComments(id,mm,flg){
if(flg){
var _8d=$H({mdc_id:id,modMode:mm}).toQueryString();
var _8e=new Ajax.Updater({success:"comment_tgt"},"/xml/comments.php",{parameters:_8d,onFailure:reportError});
}else{
$("comment_tgt").innerHTML="";
}
return false;
};
function expandRequests(id,_8f){
var _90=$H({article_id:id,num_pages:_8f}).toQueryString();
var _91=new Ajax.Updater({success:"request_list_tgt"},"/xml/questions.php",{parameters:_90,onFailure:reportError});
return false;
};
function activity_why(id,_92,_93,_94){
var _95=new Ajax.Updater({success:id},"/xml/activity_why.php",{parameters:$H({actionTypeId:_92,actionTargetId:_93,createDate:_94}).toQueryString(),onFailure:reportError,onComplete:function(){
if(typeof canvas!="undefined"&&canvas.redraw){
canvas.redraw();
}
}});
return false;
};
function article_flag(id,_96){
var _97=new Ajax.Updater({success:"flaglink_"+id+"_"+_96},"/xml/flaghub.php",{parameters:$H({aID:id,reason:_96}).toQueryString(),onFailure:reportError});
};
function ellipse(str,_98){
if(str.length>_98&&_98!=0){
str=str.substr(0,_98-3);
var pos=str.lastIndexOf(" ");
if(pos===-1){
str=str.substr(0,_98-3)+"...";
}else{
str=str.substr(0,pos)+"...";
}
}
return str;
};
function loadRandomArt(_99,_9a){
var _9b=new Ajax.Request("/xml/random.php",{method:"post",parameters:"score="+_9a,onFailure:reportError,onComplete:function(req){
_99.location.href=req.responseText;
}});
};
function deleteComment(_9c,_9d){
jQuery.ajax({type:"POST",url:"/xml/comment.php",data:jq("#comment_"+_9d).serialize(),success:function(_9e){
toggleCommentEdit(_9c,false);
jq("#ctext_"+_9c).html(_9e);
jq("#cedit_"+_9c).remove();
}});
return false;
};
function toggleCommentEdit(_9f,_a0){
if(_a0){
$("cedit_"+_9f).style.display="none";
$("cbox_"+_9f).style.display="";
$("ctext_"+_9f).style.display="none";
}else{
if($("cedit_"+_9f)){
$("cedit_"+_9f).style.display="";
}
$("cbox_"+_9f).style.display="none";
$("ctext_"+_9f).style.display="";
}
};
function reportError(req){
alert("Something went wrong. Please try again. And when you get a chance, you may want to report this issue in the Hubpages forums.");
var _a1=req.getAllResponseHeaders();
var _a2=new Ajax.Request("/xml/reporterror.php",{parameters:_a1+"&error=1"});
};
function addTagEntries(){
var _a3=4;
var _a4=document.createElement("div");
_a4.id="moreEntryDiv";
var li=null;
var _a5=4+1;
var _a6=_a5+_a3;
for(var i=_a5;i<_a6;i++){
li=document.createElement("li");
_a4.appendChild(li);
var _a7=document.createElement("input");
_a7.className="tagEntry";
_a7.name="tag_"+i;
_a7.type="text";
_a7.size=40;
li.appendChild(_a7);
}
$("tagEntries").appendChild(_a4);
return true;
};
function hubtool_add_tag(_a8){
var _a9=(_a8)?$(_a8):$("add_tag_input");
if(!_a9){
return;
}
var tag;
if(Field.present(_a9)&&_a9.type){
tag=$F(_a9);
Field.clear(_a9);
}else{
if(_a9.innerHTML){
tag=_a9.innerHTML;
Element.remove(Element.findElement(_a9,"li"));
}
}
if(!tag){
return;
}
var _aa=0;
var _ab=/^tag_(\d+)$/i;
var _ac=$$(".tagEntry");
_ac.each(function(ele){
if(ele.id){
var ms=_ab.exec(ele.id);
if(ms&&ms.length>0){
var id=parseInt(ms[1],10);
if($F(ele).length&&id>_aa){
_aa=id;
}
}
}
});
_aa++;
var _ad="tag_"+_aa;
var _ae=$("add_tag_input").parentNode;
var _af="<input class=\"tagEntry\" id=\""+_ad+"\" name=\""+_ad+"\" value=\""+tag+"\" size=\"30\" onFocus=\"_helpOn('help__tags')\" onBlur=\"_helpOff('help__tags')\" />";
if($(_ad)){
var _b0=$(_ad).tabIndex;
Element.update($(_ad).parentNode,_af);
$(_ad).tabIndex=_b0;
}else{
var _b1=$("tag_1").tabIndex-1;
var _b0=_b1+_aa;
var _b2=new Insertion.Before(_ae,"<li>"+_af+"</li>");
$(_ad).tabIndex=_b0;
_b0=$("add_tag_input").tabIndex;
_b0++;
$("add_tag_input").tabIndex=_b0;
}
return false;
};
function add_calculated_tag(_b3,tag,_b4){
var _b5=tag.replace(/'/g,"\\'");
var _b6=tag.replace(/ /g,"+");
var _b7="tagd_"+tag.replace(/ /g,"_");
_b7=_b7.toLowerCase();
if($(_b7)){
$(_b7).style.fontWeight="bolder";
Field.clear("add_tag_input");
}else{
if(!tag.match(/^[a-zA-Z0-9 \-\'\&\.]{2,100}$/)){
alert("Invalid tag \""+tag+"\".\n\nTags should be from 2-100 characters, and contain only numbers, letters, spaces, dashes, periods, and ampersands.");
}else{
var _b8=$("nav_tags_edit");
var _b9="<a href=\"javascript:void delete_tag('"+_b3+"','"+_b5+"');\"><img src=\"http://x.hubpages.com/x/hubtool_discard_tag.gif\" width=\"14\" height=\"14\"/></a>";
_b9+="<a id=\""+_b7+"\" href=\"/tag/"+_b6+"\">"+tag+"</a>";
var _ba=document.createElement("li");
_ba.innerHTML=_b9;
_b8.appendChild(_ba);
save_tag(_b3,tag,false);
}
}
var _bb=$(_b4);
Element.remove(Element.findElement(_bb,"li"));
return false;
};
function add_tag(_bc){
if(!$("add_tag_input")||!$F("add_tag_input")){
return;
}
var tag=$F("add_tag_input");
var _bd=tag.replace(/'/g,"\\'");
var _be=tag.replace(/ /g,"+");
var _bf="tagd_"+tag.replace(/ /g,"_");
_bf=_bf.toLowerCase();
if($(_bf)){
$(_bf).style.fontWeight="bolder";
Field.clear("add_tag_input");
}else{
if(!tag.match(/^[a-zA-Z0-9 \-\'\&\.]{2,100}$/)){
alert("Invalid tag \""+tag+"\".\n\nTags should be from 2-100 characters, and contain only numbers, letters, spaces, dashes, periods, and ampersands.");
}else{
var _c0=$("nav_tags_edit");
var _c1="<a href=\"javascript:void delete_tag('"+_bc+"','"+_bd+"');\"><img src=\"http://x.hubpages.com/x/hubtool_discard_tag.gif\" width=\"14\" height=\"14\"/></a>";
_c1+="<a id=\""+_bf+"\" href=\"/tag/"+_be+"\">"+tag+"</a>";
var _c2=document.createElement("li");
_c2.innerHTML=_c1;
_c0.appendChild(_c2);
save_tag(_bc,tag,false);
Field.clear("add_tag_input");
}
}
return false;
};
function delete_tag(_c3,tag){
if(!_c3||!tag){
return;
}
var _c4="tagd_"+tag.replace(/ /g,"_");
var _c5=$(_c4);
if(!_c5){
return;
}
var li=_c5.parentNode;
Element.remove(li);
save_tag(_c3,tag,true);
return false;
};
function save_tag(_c6,tag,del){
var _c7=(del)?1:0;
var req={a:_c6,v:tag,d:_c7};
var _c8=$H(req).toQueryString();
var _c9=new Ajax.Request("/xml/tagadd.php",{parameters:_c8,onFailure:reportError,onComplete:function(){
if(typeof updateHubtoolWarnings!="undefined"){
updateHubtoolWarnings();
}
}});
};
function handleReturnKeyPress(_ca,_cb){
_ca=_ca||window.event;
if(_ca.keyCode==Event.KEY_RETURN){
Event.stop(_ca);
_cb();
return false;
}else{
return true;
}
};
function fireOnReturn(_cc,_cd){
Event.observe(_cc,"keyup",function(_ce){
_ce=_ce||window.event;
if(_ce.which){
if(_ce.which==Event.KEY_RETURN){
_ce.preventDefault();
_cd();
}
}else{
if(_ce.keyCode){
if(_ce.keyCode==Event.KEY_RETURN){
Event.stop(_ce);
_cd();
}
}
}
},false);
};
function InlineEdit(){
};
InlineEdit._registered=[];
InlineEdit._onedit=[];
InlineEdit._ondone=[];
InlineEdit._editting=[];
InlineEdit._setonclick=false;
InlineEdit.register=function(ele,_cf){
var obj=$(ele);
obj.title="Click to edit";
obj.style.backgroundColor="#ffe";
obj.empty_text="";
InlineEdit._registered[obj.id]=_cf;
obj.highlight=function(){
if(this.hide_timer){
clearTimeout(this.hide_timer);
}
this.style.backgroundColor="#ffffd3";
if(this.empty_text&&(this.innerHTML=="&nbsp;"||this.innerHTML==" "||this.innerHTML.charCodeAt(0)==160)){
this.innerHTML=this.empty_text;
}
};
obj.onmouseover=obj.highlight;
obj.onmouseout=function(){
if(this.hide_timer){
clearTimeout(this.hide_timer);
}
this.hide_timer=setTimeout("var el=$('"+this.id+"');if (el) {el.unhighlight();}",1000);
};
obj.unhighlight=function(){
this.style.backgroundColor="#ffe";
if(this.empty_text&&this.innerHTML==this.empty_text){
this.innerHTML="&nbsp;";
}
};
if(!InlineEdit._setonclick){
document.onclick=InlineEdit._handleDocClick;
InlineEdit._setonclick=true;
}
};
InlineEdit.unregister=function(ele){
var obj=$(ele);
obj.title="";
if(obj.hide_timer){
clearTimeout(obj.hide_timer);
}
obj.onmouseover=function(){
};
obj.onmouseout=function(){
};
obj.style.backgroundColor="";
delete InlineEdit._registered[obj.id];
};
InlineEdit.registerCallbacks=function(ele,_d0,_d1){
var obj=$(ele);
InlineEdit._onedit[obj.id]=_d0;
InlineEdit._ondone[obj.id]=_d1;
};
InlineEdit._handleDocClick=function(e){
if(!document.getElementById||!document.createElement){
return;
}
var obj;
if(!e){
obj=window.event.srcElement;
}else{
obj=e.target;
}
while(obj.nodeType!=1){
obj=obj.parentNode;
}
if(obj.tagName=="TEXTAREA"||obj.tagName=="A"){
return;
}
while(!InlineEdit._registered[obj.id]&&obj.nodeName!="HTML"){
obj=obj.parentNode;
}
if(obj.nodeName=="HTML"){
return;
}
InlineEdit.edit(obj);
};
InlineEdit.edit=function(ele){
ele=$(ele);
if(!InlineEdit._registered[ele.id]){
return false;
}
if(InlineEdit._onedit[ele.id]){
var _d2=InlineEdit._onedit[ele.id];
_d2(ele);
}
var _d3=ele.innerHTML;
if(ele.empty_text&&ele.empty_text==_d3){
_d3=" ";
}
var _d4=document.createElement("INPUT");
_d4.type="text";
Element.cloneStyles(ele,_d4);
ele.parentNode.insertBefore(_d4,ele);
InlineEdit._insertEditSpanBefore(ele);
_d4.id=ele.id+"_edit_inplace";
InlineEdit._editting[_d4.id]=ele;
Element.remove(ele);
_d4.value=_d3;
_d4.focus();
_d4.select();
return false;
};
InlineEdit._onButtonClick=function(_d5){
_d5=_d5||window.event;
var _d6=_d5.target||_d5.srcElement;
var _d7=(_d6.innerHTML.search(/CANCEL/)==-1)?true:false;
var _d8=_d6.parentNode;
var _d9=_d8;
while(_d9&&!InlineEdit._editting[_d9.id]){
_d9=_d9.previousSibling;
}
var _da=InlineEdit._editting[_d9.id];
_d9.hasFocus=false;
var z=_d9.parentNode;
z.insertBefore(_da,_d9);
z.removeChild(_d9);
z.removeChild(document.getElementsByClassName("buttonSpan",z)[0]);
delete InlineEdit._editting[_d9.id];
if(InlineEdit._ondone[_da.id]){
var _db=InlineEdit._ondone[_da.id];
_db(_da);
}
if(_d7){
_da.innerHTML=(_d9.value.length>0)?_d9.value:"&nbsp;";
var _dc=InlineEdit._registered[_da.id];
_dc(_d9.value);
}
};
InlineEdit._insertEditSpanBefore=function(obj){
if(document.getElementById&&document.createElement){
var _dd=document.createElement("span");
_dd.className="buttonSpan";
var _de=document.createElement("button");
var _df=document.createTextNode("OK");
_de.appendChild(_df);
_dd.appendChild(_de);
var _e0=document.createElement("button");
var _e1=document.createTextNode("CANCEL");
_e0.appendChild(_e1);
_dd.appendChild(_e0);
obj.parentNode.insertBefore(_dd,obj);
_de.onclick=InlineEdit._onButtonClick;
_e0.onclick=InlineEdit._onButtonClick;
}
};
var SampleDuration=Class.create();
SampleDuration.prototype={initialize:function(_e2){
this.art_id=_e2;
this.t=new Timer();
this.onleaveListener=this.onleave.bindAsEventListener(this);
Event.observe(window,"beforeunload",this.onleaveListener,false);
},onleave:function(e){
e=e||window.event;
this.t.stop();
var _e3=$H({art_id:this.art_id,dur:this.t.length});
var _e4=new Ajax.Request("/xml/duration",{parameters:_e3.toQueryString()});
}};
var myGlobalHandlers={onCreate:function(){
this.flag(true);
},onComplete:function(){
if(Ajax.activeRequestCount==0){
this.flag(false);
this.shouldShowIcon=false;
}
},onScroll:function(){
var div=insideHubEditor?$("ajaxing_big"):$("ajaxing");
if(div){
var _e5=insideHubEditor?200:0;
div.style.top=(Position.getViewportScrollY()+_e5)+"px";
}
},flagUp:function(){
this.flag(true);
},flagDown:function(){
this.flag(false);
},flag:function(up){
if(up){
this.shouldShowIcon=true;
setTimeout(this.showIcon.bind(this),2000);
}else{
if(!this.iconVisible){
return;
}
var _e6=insideHubEditor?$("ajaxing_big"):$("ajaxing");
if(_e6){
this.shouldShowIcon=false;
_e6.style.display="none";
Event.stopObserving(window,"scroll",this.scrollListener,false);
this.scrollListener=null;
this.iconVisible=false;
}
}
},showIcon:function(id){
if(this.shouldShowIcon&&!this.iconVisible&&Ajax.activeRequestCount>0){
this.iconVisible=true;
var _e7=insideHubEditor?$("ajaxing_big"):$("ajaxing");
_e7.style.display="inline";
this.onScroll();
this.scrollListener=this.onScroll.bindAsEventListener(this);
Event.observe(window,"scroll",this.scrollListener,false);
}
}};
Ajax.Responders.register(myGlobalHandlers);
Element.setOpacity=function(ele,_e8){
ele=$(ele);
if(window.ActiveXObject){
ele.style.filter="alpha(opacity="+Math.round(_e8*100)+")";
}
ele.style.opacity=_e8;
};
Element.getCurrentStyle=function(ele){
ele=$(ele);
var _e9;
if(document.defaultView){
_e9=document.defaultView.getComputedStyle(ele,"");
}else{
_e9=ele.currentStyle;
}
return _e9;
};
Element.cloneStyles=function(ele,_ea,_eb){
ele=$(ele);
_ea=$(_ea);
var _ec=Element.getCurrentStyle(ele);
for(var _ed in _ec){
if(browser=="Opera"){
if(_ed=="height"||_ed=="pixelHeight"||_ed=="pixelWidth"||_ed=="posHeight"||_ed=="posWidth"||_ed=="width"||_ed=="font"||_ed=="fontSize"){
continue;
}
}
var _ee=_ec[_ed];
if(_ee!==""&&!(_ee instanceof Object)&&_ed!="length"&&_ed!="parentRule"){
if(_eb&&_ed.indexOf(_eb)!==0){
continue;
}
_ea.style[_ed]=_ee;
}
}
return _ea;
};
Element.findElement=function(_ef,_f0){
_ef=$(_ef);
while(_ef.parentNode&&(!_ef.tagName||(_ef.tagName.toUpperCase()!=_f0.toUpperCase()))){
_ef=_ef.parentNode;
}
return _ef;
};
String.prototype.trim=function(){
var res=this;
while(res.substring(0,1)==" "){
res=res.substring(1,res.length);
}
while(res.substring(res.length-1,res.length)==" "){
res=res.substring(0,res.length-1);
}
return res;
};
String.prototype.startsWith=function(_f1){
var res=this;
return res.substring(0,_f1.length)==_f1;
};
Element.getWidth=function(ele){
ele=$(ele);
return ele.offsetWidth;
};
Element.ellipsis=function(ele,len){
len=len||(100);
var p=$(ele);
if(p&&p.innerHTML){
var _f2=p.innerHTML;
if(_f2.length>len){
_f2=_f2.substring(0,len);
_f2=_f2.replace(/\w+$/,"");
_f2+="...";
p.innerHTML=_f2;
}
}
};
Position.getViewportHeight=function(){
if(window.innerHeight!=window.undefined){
return window.innerHeight;
}
if(document.compatMode=="CSS1Compat"){
return document.documentElement.clientHeight;
}
if(document.body){
return document.body.clientHeight;
}
return window.undefined;
};
Position.getViewportWidth=function(){
if(window.innerWidth!=window.undefined){
return window.innerWidth;
}
if(document.compatMode=="CSS1Compat"){
return document.documentElement.clientWidth;
}
if(document.body){
return document.body.clientWidth;
}
return window.undefined;
};
Position.getDocumentHeight=function(){
return document.documentElement.scrollHeight;
};
Position.getDocumentWidth=function(){
return document.documentElement.scrollWidth;
};
Position.getViewportScrollX=function(){
var _f3=0;
if(document.documentElement&&document.documentElement.scrollLeft){
_f3=document.documentElement.scrollLeft;
}else{
if(document.body&&document.body.scrollLeft){
_f3=document.body.scrollLeft;
}else{
if(window.pageXOffset){
_f3=window.pageXOffset;
}else{
if(window.scrollX){
_f3=window.scrollX;
}
}
}
}
return _f3;
};
Position.getViewportScrollY=function(){
var _f4=0;
if(document.documentElement&&document.documentElement.scrollTop){
_f4=document.documentElement.scrollTop;
}else{
if(document.body&&document.body.scrollTop){
_f4=document.body.scrollTop;
}else{
if(window.pageYOffset){
_f4=window.pageYOffset;
}else{
if(window.scrollY){
_f4=window.scrollY;
}
}
}
}
return _f4;
};
Position.viewportPosition=function(id){
var off=jq("#"+id).offset();
eleBot=off.top+jq("#"+id).height();
var _f5=jq(window).scrollTop();
var _f6=_f5+jq(window).height();
if(eleBot<_f5){
return -1;
}
if(off.top>_f6){
return 1;
}
return 0;
};
Position.withinViewport=function(ele){
var off=Position.cumulativeOffset($(ele));
var _f7=[0+Position.getViewportScrollX(),Position.getViewportScrollY()];
var _f8=[_f7[0]+Position.getViewportWidth(),_f7[1]+Position.getViewportHeight()];
return (_f7[0]<off[0]&&off[0]<_f8[0]&&_f7[1]<off[1]&&off[1]<_f8[1]);
};
Position.set=function(ele,_f9){
if(ele&&_f9){
ele.style.left=_f9[0]+"px";
ele.style.top=_f9[1]+"px";
}
};
function check_signed_in_ajax(_fa,_fb){
jQuery.ajax({url:"/xml/checksignedin.php",complete:function(_fc,_fd){
_fa(eval(_fc.responseText),_fb);
}});
};
function phone_verify_required(_fe,_ff,_100,_101){
if(typeof (_101)=="undefined"){
data={};
}else{
data={a:_101};
}
jq.post("/xml/verify/phoneverifyrequired.php",data,function(req){
if(req){
require_phone_verification(_fe);
}else{
_ff.apply(null,_100);
}
},"json");
};
function require_phone_verification(_102,_103){
url="/xml/verify/phone.php";
if(typeof (_103)!="undefined"&&_103){
url+="?update=1";
}
jq.post(url,{inOrderToDoWhat:_102},function(rsp){
jq.fancybox({content:"<div id=\"phone_verify\">"+rsp+"</div>",overlayColor:"#000",overlayOpacity:0.8,titleShow:false,autoDimensions:false,height:300});
});
};
function select_all(name,_104,end){
for(var i=_104;i<=end;i++){
var ele=$(name+"_"+i);
if(ele){
ele.checked=true;
}
}
var disp=$(name+"_selected");
if(disp){
disp.innerHTML=(end-_104)+1;
}
update_plural(name);
};
function unselect_all(name,_105,end){
for(var i=_105;i<=end;i++){
var ele=$(name+"_"+i);
if(ele){
ele.checked=false;
}
}
var disp=$(name+"_selected");
if(disp){
disp.innerHTML=0;
}
update_plural(name);
};
function checkbox_onchange(name,num){
var disp=$(name+"_selected");
if(disp){
var ele=$(name+"_"+num);
if(ele.checked){
disp.innerHTML=parseInt(disp.innerHTML,10)+1;
update_plural(name);
}else{
disp.innerHTML=parseInt(disp.innerHTML,10)-1;
update_plural(name);
}
}
};
function update_plural(name){
var ele=document.getElementById(name+"_selected");
if(ele){
var disp=document.getElementById(name+"_plural");
if(disp){
if(parseInt(ele.innerHTML,10)==1){
disp.innerHTML=" is";
}else{
disp.innerHTML="s are";
}
}
}
};
function import_now(_106,name,_107,end){
var _108=self.opener.document.getElementById(_106);
if(_108){
for(var i=_107;i<=end;i++){
var ele=$(name+"_"+i);
if(ele&&ele.checked){
var _109=$(name+"_email_"+i);
if(_108.value.length<2||_108.value.charAt(_108.value.length)==","||_108.value.charAt(_108.value.length-1)==","){
_108.value=_108.value+_109.innerHTML;
}else{
_108.value=_108.value+", "+_109.innerHTML;
}
}
}
}else{
alert("cannot locate parent (opener) window!");
}
};
function charCounter(_10a,_10b,max){
var _10c=document.getElementById(_10a);
var _10d=document.getElementById(_10b);
if(!_10c){
alert("charCounter bad source: "+_10a);
}
if(!_10d){
alert("charCounter bad source: "+_10b);
}
if(_10c.value.length>max){
_10c.value=_10c.value.substring(0,max);
}
_10d.value=max-_10c.value.length;
};
function hideAnswers(){
$("hiddenAnswers").hide();
$("hideAnswers").hide();
$("showAnswers").show();
return false;
};
function showAnswers(){
$("hiddenAnswers").show();
$("hideAnswers").show();
$("showAnswers").hide();
return false;
};
function fetchAnswers(_10e,_10f,_110){
var _111=$H({answerIds:_10e,enableVoting:_10f,enableEditing:_110}).toQueryString();
new Ajax.Updater("hiddenAnswers","/xml/answerfetch.php",{parameters:_111,onComplete:function(_112){
supportAnswerDeletion();
}});
$("hideAnswers").show();
$("fetchAnswers").hide();
return false;
};
function answerVote(id,_113,v){
if(_113===undefined){
_113=true;
}
jq.ajax({url:"/xml/answervote.php",type:"POST",data:{id:id,vote:v,timeIndicator:_113},dataType:"html",success:function(html){
jq(".voting_"+id).html(html);
}});
return false;
};
function answerVoteDown(id,_114){
return answerVote(id,_114,-1);
};
function answerVoteUp(id,_115){
return answerVote(id,_115,1);
};
function fetchRecaptcha(_116){
var _117="6LemUQQAAAAAAC6mNwmiXb8ZwmUU0R9Z5v_yZ5xl";
if(typeof (Recaptcha)=="undefined"){
var _118=document.getElementsByTagName("head")[0];
var _119=document.createElement("script");
_119.type="text/javascript";
_119.src="http://api.recaptcha.net/js/recaptcha_ajax.js";
_119.onload=function(){
Recaptcha.create(_117,_116,{theme:"red"});
};
_119.onreadystatechange=function(){
if(this.readyState=="loaded"||this.readyState=="complete"){
Recaptcha.create(_117,_116,{theme:"red"});
}
};
_118.appendChild(_119);
}else{
Recaptcha.create(_117,_116,{theme:"red"});
}
};
function whenSignedIn(_11a,fn){
args=Array.prototype.slice.call(arguments);
args=args.slice(2);
info={options:_11a,fn:fn,args:args};
check_signed_in_ajax(whenSignedInCallback,info);
return false;
};
function whenSignedInCallback(_11b,info){
if(_11b){
info.fn.apply(null,info.args);
}else{
if(jQuery("#signInOverlay").size()==0){
var html="<div id=\"signInOverlay\" class=\"overlay\" style=\"display: none;\">";
html+="<a class=\"close\" href=\"#\" onclick=\"toggleOverlay('signInOverlay'); return false;\">close</a>";
html+="<div id=\"signInOverlayContent\"></div>";
html+="</div>";
jQuery("body").append(html);
}
jQuery.get("/xml/signinupform.php",info.options,function(data){
jQuery("#signInOverlayContent").html(data);
suFH.onSuccess=afterSignedIn.bind(null,info);
siFH.onSuccess=afterSignedIn.bind(null,info);
if(typeof (fetchRecaptcha)!="undefined"){
fetchRecaptcha("captcha_div");
}
toggleOverlay("signInOverlay");
});
}
return false;
};
function afterSignedIn(info){
toggleOverlay("signInOverlay");
info.fn.apply(null,info.args);
};
function getElementScreenTop(){
var _11c=(window.pageYOffset)?window.pageYOffset:(document.documentElement)?document.documentElement.scrollTop:document.body.scrollTop;
return _11c;
};
function setElementScreenTop(top){
if(window.pageYOffset){
var x=window.pageXOffset;
window.scrollTo(x,top);
}else{
if(document.documentElement){
document.documentElement.scrollTop=top;
}else{
document.body.scrollTop=top;
}
}
};
function getElementTop(elem){
var top=0;
do{
top+=elem.offsetTop;
elem=elem.offsetParent;
}while(elem!=null);
return top;
};
function getElementLeft(elem){
var left=0;
do{
left+=elem.offsetLeft;
elem=elem.offsetParent;
}while(elem!=null);
return left;
};
function getElementRight(elem){
return getElementLeft(elem)+elem.getWidth();
};
function getElementBottom(elem){
return getElementTop(elem)+elem.getHeight();
};
function StringBuffer(){
this.buffer=[];
};
StringBuffer.prototype.append=function(_11d){
this.buffer.push(_11d);
return this;
};
StringBuffer.prototype.toString=function toString(){
return this.buffer.join("");
};
function search_escape(str){
newstr=encodeURI(str);
newstr=newstr.replace(/\%20/g,"+");
return newstr;
};
var Timer=Class.create();
Timer.prototype={initialize:function(){
this.start();
},start:function(){
this.startTime=new Date();
},stop:function(){
this.stopTime=new Date();
this.length=(this.stopTime-this.startTime);
},inspect:function(){
if(!this.stopTime){
this.stop();
}
return "duration: "+this.length+"ms";
}};
function setupNavMenu(){
jq(document).ready(function(){
var _11e=(navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPod/i))||(navigator.userAgent.match(/iPad/i))?"touchstart":"click";
if(_11e=="touchstart"){
jq("#header_explore").bind(_11e+".nav",function(){
jq("#notifications_menu").css("display","");
jq("#user_menu").css("display","");
jq("#explore_menu").show();
});
jq("#header_notifications").bind(_11e+".nav",function(){
jq("#explore_menu").css("display","");
jq("#user_menu").css("display","");
jq("#notifications_menu").show();
resetNotificationCheckpoint();
});
jq("#header_signedin").bind(_11e+".nav",function(){
jq("#notifications_menu").css("display","");
jq("#explore_menu").css("display","");
jq("#user_menu").show();
});
jq("html").bind(_11e+".nav",function(){
nav_hide_all_menus();
});
jq("#nav").bind(_11e+".nav",function(_11f){
_11f.stopPropagation();
});
}
jq("#header_explore a").bind("focusin",function(_120){
jq("#notifications_menu").hide();
jq("#user_menu").hide();
jq("#explore_menu").show();
});
jq("#header_notifications a").bind("focusin",function(_121){
jq("#explore_menu").hide();
jq("#user_menu").hide();
jq("#notifications_menu").show();
resetNotificationCheckpoint();
});
jq("#header_signedin a").bind("focusin",function(_122){
jq("#notifications_menu").hide();
jq("#explore_menu").hide();
jq("#user_menu").show();
});
jq("#starthub_span").bind("focusin",function(_123){
nav_hide_all_menus();
});
jq("#signin_span").bind("focusin",function(_124){
nav_hide_all_menus();
});
jq("#join_span").bind("focusin",function(_125){
nav_hide_all_menus();
});
jq("#search_input").bind("focusin",function(_126){
nav_hide_all_menus();
});
jq("#search_button").bind("focusin",function(_127){
nav_hide_all_menus();
});
jq("html").bind("click",function(_128){
nav_hide_all_menus();
});
jq("#nav").bind("click",function(_129){
_129.stopPropagation();
});
});
};
function nav_hide_all_menus(){
jq("#nav .nav_menu_list").css("display","");
};
function initHubJS(){
setupSocialButtons();
initPinBoard();
};
function initPinBoard(){
jq("#pinboard").masonry({itemSelector:".pinboard_box",columnWidth:306,gutterWidth:27});
};
function setupSocialButtons(){
if(navigator.userAgent.match(/iPad/i)){
jq(".share_related").css("visibility","visible");
}else{
jq(".related_social_wrap").hover(function(){
var _12a=jq(this).find(".share_related");
if("inline"==_12a.find(".socialbuttons").css("display")){
_12a.css("visibility","visible");
}
},function(_12b){
jq(this).find(".share_related").css("visibility","hidden");
});
}
};
function google_ad_request_done(_12c){
var s="";
var i;
if(_12c.length==0){
return;
}
if(_12c[0].type=="flash"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br>"+"<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\""+" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" WIDTH=\""+_12c[0].image_width+"\" HEIGHT=\""+_12c[0].image_height+"\"> <PARAM NAME=\"movie\" VALUE=\""+_12c[0].image_url+"\">"+"<PARAM NAME=\"quality\" VALUE=\"high\">"+"<PARAM NAME=\"AllowScriptAccess\" VALUE=\"never\">"+"<EMBED src=\""+_12c[0].image_url+"\" WIDTH=\""+_12c[0].image_width+"\" HEIGHT=\""+_12c[0].image_height+"\" TYPE=\"application/x-shockwave-flash\""+" AllowScriptAccess=\"never\" "+" PLUGINSPAGE=\"http://www.macromedia.com/go/getflashplayer\"></EMBED></OBJECT>";
}else{
if(_12c[0].type=="image"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br> <a href=\""+_12c[0].url+"\" target=\"_top\" title=\"go to "+_12c[0].visible_url+"\" onmouseout=\"window.status=''\" onmouseover=\"window.status='go to "+_12c[0].visible_url+"';return true\"><img border=\"0\" src=\""+_12c[0].image_url+"\"width=\""+_12c[0].image_width+"\"height=\""+_12c[0].image_height+"\"></a>";
}else{
if(_12c[0].type=="html"){
s+=_12c[0].snippet;
}else{
s+="<div class=\"cjs_wrapper\">";
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br>";
for(i=0;i<_12c.length;++i){
ad=_12c[i];
s+="<div class=\"cjs_titleurl\">";
s+="<a class=\"cjs_title\" href=\""+ad.url+"\">"+ad.line1+"</a> ";
s+="<a class=\"cjs_url\" href=\""+ad.url+"\">"+ad.visible_url+"</a>";
s+="</div>";
s+="<div class=\"cjs_desc\">"+ad.line2+" "+ad.line3+"</div>";
}
s+="</div>";
}
}
}
document.write(s);
return;
};
function hubAnchorUpdate(){
var _12d=jq.address.value().substr(1);
if(""==_12d){
return;
}
var _12e=false;
if(_12d.substr(0,8)=="comment-"){
_12e=true;
_12d="comment"+_12d.substr(8);
}
if("morecomments"==_12d||_12e){
jq("#moreParagraph").remove();
jq("#additional_comments").show();
}
if("comments"==_12d){
ssToId("comFirst");
}else{
if("morecomments"==_12d){
}else{
ssToId(_12d);
}
}
};
function supportAnswerDeletion(){
jQuery(".answer_delete").click(function(_12f){
id=jQuery(_12f.target).attr("id");
jQuery.ajax({url:"/xml/delete_answer?id="+id,success:function(data){
jQuery("#"+id).html(data);
if(data=="Undelete Answer"){
jQuery("#answer"+id).css("opacity",0.4);
}else{
jQuery("#answer"+id).css("opacity",1);
}
jQuery("#answer"+id).effect("highlight",{color:"yellow"},1000);
}});
return false;
});
};
function hpFormHandler(_130){
this.submitMode=false;
this.submitUri="/";
this.nextUri="/";
this.lit=false;
this.form=$(_130);
this.errors=$H({});
this.method="post";
this.errorId="formErrors";
this.errorHeader="<strong>Please fix these errors before continuing:</strong><br/>";
this.useEffects=true;
this.individualerrors=false;
this.scrollToErrors=false;
this.ensureSignedInBeforeSave=false;
this.ensureSignedInOptions={};
this.ensureCheckedSecurity=false;
this.lastCheckedSecurity=new Date().getTime()-(1000*1000);
this.setValidators();
};
hpFormHandler.prototype.handleSubmitServerError=function(req){
};
hpFormHandler.prototype.validateHideDiv=function(id){
$(id).hide();
};
hpFormHandler.prototype.validateLengthMax=function(ele,max,msg){
var val=$F(ele);
this.testForError(($F(ele).trim().length>max),ele,msg);
};
hpFormHandler.prototype.validateLengthMin=function(ele,min,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.length<min),ele,msg);
};
hpFormHandler.prototype.validateLengthExactly=function(ele,len,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.length!=len),ele,msg);
};
hpFormHandler.prototype.validateValueMin=function(ele,min,msg){
var val=$F(ele);
this.testForError(val<min,ele,msg);
};
hpFormHandler.prototype.validateValueMax=function(ele,max,msg){
var val=$F(ele);
this.testForError(val>max,ele,msg);
};
hpFormHandler.prototype.validateMandatory=function(ele,msg){
var val=false;
if($F(ele)){
val=$F(ele).trim();
}
this.testForError((!val||val.length==0),ele,msg);
};
hpFormHandler.prototype.validateRadioChecked=function(ele,msg){
if(!ele.name){
return;
}
var _131=$$("input[name="+ele.name+"]");
var _132=false;
_131.each(function(r){
if(r.checked==true){
_132=true;
throw $break;
}
});
this.testForError(!_132,ele,msg);
};
hpFormHandler.prototype.validateEnoughSpaces=function(ele,msg){
val=$F(ele).trim();
var _133=false;
if(val.length>=20){
var _134=val.match(/\s+/g);
var _135=_134?_134.length:0;
var _136=_135+1;
_133=_136/(val.length-_135)<0.08;
}
this.testForError(_133,ele,msg);
};
hpFormHandler.prototype.validateIsNumeric=function(ele,msg){
this.validateRegex(ele,/^\s*[0-9]*\s*$/,msg);
};
hpFormHandler.prototype.validateRegex=function(ele,_137,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.search(_137)==-1),ele,msg);
};
hpFormHandler.prototype.validateNoRegex=function(ele,_138,msg){
var val=$F(ele);
this.testForError((val.search(_138)!=-1),ele,msg);
};
hpFormHandler.prototype.validateNoSpaces=function(ele,msg){
var val=$F(ele).trim();
this.testForError(val.search(/ /)!=-1,ele,msg);
};
hpFormHandler.prototype.validateNot=function(ele,not,msg){
this.testForError(($F(ele).trim()==not),ele,msg);
};
hpFormHandler.prototype.validateSameAs=function(ele,ele2,msg){
this.testForError(($F(ele)!=$F(ele2)),ele,msg);
};
hpFormHandler.prototype.validateNoWords=function(ele,_139,msg){
var val=$F(ele);
var _13a=false;
for(i=0;i<_139.length&&!_13a;i++){
var _13b=new RegExp("[^a-zA-Z]"+_139[i]+"[^a-zA-Z]","i");
_13a=(val.search(_13b)>=0);
if(!_13a){
_13b=new RegExp("^"+_139[i]+"[^a-zA-Z]","i");
_13a=(val.search(_13b)>=0);
}
if(!_13a){
_13b=new RegExp("[^a-zA-Z]"+_139[i]+"$","i");
_13a=(val.search(_13b)>=0);
}
if(!_13a){
_13b=new RegExp("^"+_139[i]+"$","i");
_13a=(val.search(_13b)>=0);
}
}
this.testForError(_13a,ele,msg);
};
hpFormHandler.prototype.validateServerCheck=function(ele,url,msg){
var val=$F(ele);
if(val.length==0){
return;
}
if(ele.lastGoodValue&&ele.lastGoodValue==val){
return;
}
val=encodeURIComponent(val);
var _13c=new Ajax.Request(url,{method:"post",parameters:ele.id+"="+val,onComplete:function(req){
eval(req.responseText);
if(!valid&&typeof msg=="object"){
if(typeof errorCode!="undefined"&&typeof msg[errorCode]!="undefined"){
msg=msg[errorCode];
}else{
msg=msg[0];
}
}
this.testForError(!valid,ele,msg);
if(valid){
ele.lastGoodValue=val;
}
this._showErrors();
}.bind(this),onException:function(){
alert("There was an error performing server side validation of your input, proceed with caution.");
},onFailure:reportError});
};
hpFormHandler.prototype.checkAnsweredSecurityQuestionBeforeSave=function(){
new Ajax.Request("/xml/profile/securityquestion.php",{method:"get",onComplete:function(req){
eval(req.responseText);
if(!valid){
showAskSecurityQuestion();
this.lastCheckedSecurity=new Date().getTime();
this._showErrors();
}else{
if(!this.submitMode){
this.params="ajax=1&"+Form.serialize(this.form);
var _13d=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
return;
}
this.form.submit();
}
}.bind(this),onException:function(){
alert("There was an error performing server side validation of your input, proceed with caution.");
},onFailure:"There was an error performing server side validation of your input, proceed with caution."});
};
function validateCheckedSecurityAndSubmit(form,fn,args){
new Ajax.Request("/xml/profile/securityquestion.php",{method:"get",onComplete:function(req){
eval(req.responseText);
if(!valid){
showAskSecurityQuestion();
}else{
if(typeof (fn)=="function"){
fn.apply(form,args);
}else{
form.submit();
}
}
}.bind(this),onException:function(){
alert("There was an error performing server side validation of your input, proceed with caution.");
},onFailure:"There was an error performing server side validation of your input, proceed with caution."});
};
function showAskSecurityQuestion(){
var aEl=jq("<a class=\"iframe\" href=\"/my/profile/security_ask_iframe.php\" style=\"display:none\">This goes to iframe</a>");
jq("#container").append(aEl);
jq(".iframe").fancybox({"hideOnContentClick":false,"hideOnOverlayClick":false,"enableEscapeButton":false,"showCloseButton":false,"width":750,"height":170,"scrolling":"no"});
jq(".iframe").click();
};
hpFormHandler.prototype.validateEmailList=function(ele){
var _13e=800;
var _13f=6;
this.validateLengthMin(ele,_13f,"The address you entered is too short. Please use an address at least "+_13f+" characters in length.");
this.validateNoRegex(ele,/\$/,"Dollar signs are not valid in an email address.");
this.validateNoRegex(ele,/\\/,"Backslashes are not valid in an email address.");
this.validateRegex(ele,/\@/,"A valid email address must contain an @ symbol.");
};
hpFormHandler.prototype.validateEmail=function(ele){
this.validateEmailList(ele);
var _140=200;
this.validateLengthMax(ele,_140,"Your email address is too long. Please use a shorter address.");
this.validateNoSpaces(ele,"Spaces are not valid characters in an email address.  Please recheck your address.");
};
hpFormHandler.prototype.validateEmailName=function(ele){
var _141=2;
var _142=200;
this.validateLengthMin(ele,_141,"Your name is too short.  Please enter at least 2 characters.");
this.validateLengthMax(ele,_142,"Your name is too long. Please use a shorter name.");
};
hpFormHandler.prototype.validatePhone=function(ele){
var val=$F(ele);
var us=/^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
this.testForError(!us.test(val)&&val.length>0,ele,"Please enter a valid phone number");
};
hpFormHandler.prototype.validatePostal=function(ele){
var val=$F(ele).trim();
var _143=false;
var us=/^\d{5}(-\d{4})?$/;
var ca=/[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d/i;
var gb=/^[A-Za-z]{1,2}[\d]{1,2}([A-Za-z])?\s?[\d][A-Za-z]{2}$/i;
if(val.length==0||(us.test(val)||ca.test(val)||gb.test(val))){
_143=true;
}
this.testForError(!_143,ele,"Please enter a valid postal code");
};
hpFormHandler.prototype.validateNewPassword=function(ele1,ele2){
ele1=$(ele1);
ele2=$(ele2);
var _144=40;
var _145=5;
this.validateMandatory(ele1,"Please protect your hubpages account with a password.");
this.validateLengthMin(ele1,_145,"Your password is too short.  Protect your account by choosing a password that is at least  "+_145+" characters long.  Safety first!");
this.validateLengthMax(ele1,_144,"Your password is too long; it will be difficult to type.  Please use a shorter password.");
this.validateMandatory(ele2,"Please confirm your password.");
this.validateSameAs(ele1,ele2,"Your passwords do not match.  Please retype them.");
};
hpFormHandler.prototype.validateTag=function(ele){
ele=$(ele);
var _146=60;
var _147=3;
this.validateRegex(ele,/^[\w\s\$\-\'\%\&]*$/,"Please use only alphanumeric and $, ', % or & characters in your tag.");
this.validateLengthMin(ele,3,"A tag should be at least three characters long.");
this.validateLengthMax(ele,_146,"A tag should not be longer than 60 characters.");
};
hpFormHandler.prototype.validateGroupName=function(ele,_148){
this.validateMandatory(ele,"Please specify a group name.");
this.validateLengthMax(ele,50,"Group names may be no longer than 50 characters.");
this.validateRegex(ele,/^[\w\s\$\-\'\%\&\!\?]*$/,"Please use only alphanumeric and $, ', -, %, !, ? or & characters in your group name.");
existingName=_148.detect(function(name){
return ($F(ele)==name);
});
this.testForError(existingName,ele,"You already have a group with this name.  Please select it from the list, or enter a new name.");
};
hpFormHandler.prototype.observe=function(){
new Form.EventObserver(this.form,this._elemsChanged.bind(this));
};
hpFormHandler.prototype.focusFirst=function(){
Form.focusFirstElement(this.form);
};
hpFormHandler.prototype.tabOnEnter=function(){
hpFormHandler.tabOnEnter(this.form);
};
hpFormHandler.tabOnEnter=function(form){
if(!$(form)){
return;
}
var _149=$A($(form).getElementsByTagName("input"));
_149.each(function(node){
Event.observe(node,"keydown",_handleInputKeypress,false);
});
};
hpFormHandler.prototype.ghostField=function(_14a,_14b,_14c){
if($(_14a)&&$(_14b)){
var gw=new GhostWatcher(_14a,_14b,_14c);
}
};
hpFormHandler.prototype.setValidators=function(_14d,_14e){
this.toValidate=$H(_14d);
this.toValidateOnsubmit=$H(_14e);
};
hpFormHandler.prototype.hasErrors=function(){
return (this.errors&&this.errors.keys()&&this.errors.keys().length>0);
};
hpFormHandler.prototype.cancel=function(){
this.reset();
};
hpFormHandler.prototype.reset=function(){
Form.reset(this.form);
if(this.cancelUri){
location.href=this.cancelUri;
}
};
hpFormHandler.prototype.valid=function(){
this._runValidators(true);
if(this.hasErrors()){
return false;
}
return true;
};
hpFormHandler.prototype.save=function(_14f){
if(this.ensureSignedInBeforeSave&&!_14f){
whenSignedIn(this.ensureSignedInOptions,this.save.bind(this,true));
return false;
}
this.form.descendants().each(function(elt){
if(elt&&elt.tagName&&elt.hasClassName&&(elt.tagName=="TEXTAREA"||elt.tagName=="INPUT")&&elt.hasClassName("dimmed")){
elt.value="";
}
});
this._runValidators(true);
if(this.hasErrors()){
if(this.scrollToErrors){
var _150=new fx.Scroll({duration:100});
_150.scrollTo(this.errorDiv);
}
return false;
}
if((this.ensureCheckedSecurity)&&(new Date().getTime()-this.lastCheckedSecurity>1000*15)){
this.checkAnsweredSecurityQuestionBeforeSave();
return false;
}
if(window.tinyMCE&&tinyMCE.triggerSave){
try{
tinyMCE.triggerSave(false,true);
}
catch(e){
}
}
if(!this.submitMode){
this.params="ajax=1&"+Form.serialize(this.form);
var _151=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
}
return (this.submitMode);
};
hpFormHandler.prototype.handleResponse=function(req){
if(!this.skipValidationOfResponse){
eval(req.responseText);
}
if(this.skipValidationOfResponse||valid==1){
if(this.saveCallback){
this.saveCallback(req);
}
if(this.nextUri){
location.href=this.nextUri;
}
return true;
}else{
this.handleSubmitServerError(req);
return false;
}
};
hpFormHandler.prototype.testForError=function(_152,ele,msg){
if(_152){
this.errors.set(ele.id,msg);
}else{
if(this.errors.get(ele.id)){
if(typeof msg=="object"){
for(idx in msg){
if(this.errors.get(ele.id)==msg[idx]){
this.errors.unset(ele.id);
}
}
}else{
if(this.errors.get(ele.id)==msg){
this.errors.unset(ele.id);
}
}
}
}
};
hpFormHandler.prototype._elemsChanged=function(ele){
this._runValidators(false);
};
hpFormHandler.prototype._runValidators=function(_153){
var _154=Form.getElements(this.form);
var _155=$A(_154);
_155.each(function(node){
if(_153){
var _156=this.toValidateOnsubmit.get(node.id);
if(!_156){
_156=this.toValidateOnsubmit.get(node.className);
}
if(_156){
_156(node);
}
}
var _156=this.toValidate.get(node.id);
if(!_156){
_156=this.toValidate.get(node.className);
}
if(_156){
_156(node);
}
}.bind(this));
this._showErrors();
return !this.hasErrors();
};
hpFormHandler.prototype.alertServerErrors=function(req){
var json=JSONstring.toObject(req.responseText);
var _157="";
if(json.status=="error"){
var _158=0;
for(var key in json.errors){
if(key=="security"){
showAskSecurityQuestion();
}else{
for(i=0;i<json.errors[key].length;i++){
_157+=" - "+json.errors[key][i]+"\n";
}
_158++;
}
}
if(_158>0){
var _159=json.header?(json.header+"\n\n"):"An error occurred while saving your changes:\n\n";
_159+=_157+"\nPlease make any necessary changes and Save Changes again. If you still have problems saving after making all necessary changes, please contact team@hubpages.com.";
alert(_159);
}
}else{
if(json.status=="saved"||json.status=="no change"){
var _15a=new fx.Scroll({duration:300});
_15a.scrollTo("changesSaved");
$("changesSaved").show();
}else{
alert("An unknown error has occured.  Please try saving again.  If the problem persists, contact team@hubpages.com");
}
}
};
hpFormHandler.prototype._showErrors=function(){
if(this.individualerrors){
this._showErrorsPerField();
}else{
this._showErrorsOneDiv();
}
};
hpFormHandler.prototype._showErrorsOneDiv=function(){
if(!this.errorDiv&&!$(this.errorId)){
new Insertion.Top(this.form,"<div id=\""+this.errorId+"\"></div>");
}
if(!this.errorDiv){
this.errorDiv=$(this.errorId);
}
if(this.useEffects&&!this.errFade){
this.errFade=new fx.Opacity(this.errorDiv,{duration:500});
this.errFade.now=0;
}
if(!this.hasErrors()){
if(this.lit){
if(this.useEffects){
this.errFade.toggle();
}
var eles=this.form.select(".alertBorder");
eles.each(function(ele){
hpFormHandler.lightEle(ele,false);
});
if($("nextB")){
$("nextB").src="http://x.hubpages.com/x/next.gif";
}
this.lit=false;
}
return;
}
var _15b=this.errorHeader;
_15b+="<ul>";
this.errors.each(function(err){
_15b+="<li>"+err.value+"</li>";
var ele=$(err.key);
hpFormHandler.lightEle(ele,true);
});
_15b+="</ul>";
this.errorDiv.className="alert";
if(!this.lit){
if(this.useEffects){
Element.setOpacity(this.errorDiv,0);
this.errFade.toggle();
}
}
this.errorDiv.innerHTML=_15b;
this.lit=true;
};
hpFormHandler.prototype._showErrorsPerField=function(){
if(this.hasErrors()){
this.errors.each(function(err){
var _15c=$(err.key);
var _15d=err.key+"_error";
var _15e=$(_15d);
if(_15e){
_15e.innerHTML=err.value;
_15e.className="alert";
_15e.show();
}else{
new Insertion.Top(_15c.parentNode,"<div id=\""+_15d+"\" class=\"alert\">"+err.value+"</div>");
}
hpFormHandler.lightEle(_15c,true);
});
var eles=this.form.select(".alertBorder");
eles.each(function(ele){
targetId=ele.id;
var _15f=typeof this.errors.get(targetId)=="undefined";
if(_15f){
if($(targetId+"_error")){
$(targetId+"_error").hide();
}
hpFormHandler.lightEle(ele,false);
}
}.bind(this));
this.lit=true;
}else{
if(this.lit){
if(this.useEffects){
var eles=this.form.select(".alert");
eles.each(function(ele){
ele.hide();
});
}
var eles=this.form.select(".alertBorder");
eles.each(function(ele){
hpFormHandler.lightEle(ele,false);
});
this.lit=false;
}
}
};
function _handleInputKeypress(_160){
_160=_160||window.event;
if(_160.which){
if(_160.which==Event.KEY_RETURN){
var _161=document.createEvent("KeyboardEvent");
_161.initKeyEvent("keydown",true,true,document.defaultView,_160.ctrlKey,_160.altKey,_160.shiftKey,_160.metaKey,Event.KEY_TAB,0);
_160.preventDefault();
_160.target.dispatchEvent(_161);
}
}else{
if(_160.keyCode){
if(_160.keyCode==Event.KEY_RETURN){
_160.keyCode=Event.KEY_TAB;
}
}
}
return true;
};
hpFormHandler.lightEle=function(ele,on){
ele=$(ele);
if(!ele){
return;
}
if(on){
Element.addClassName(ele,"alertBorder");
}else{
Element.removeClassName(ele,"alertBorder");
}
};
var GhostWatcher=Class.create();
GhostWatcher.prototype={initialize:function(_162,_163,_164){
this.fromEle=$(_162);
this.toEle=$(_163);
this.copyFunction=(_164!=null)?_164:this.copyValue;
if(this.fromEle&&this.toEle){
Event.observe(this.fromEle,"keyup",this.copyFunction.bind(this),false);
}
Event.observe(window,"focus",this.copyFunction.bind(this),false);
Event.observe(window,"load",this.copyFunction.bind(this),false);
},copyValue:function(evt){
var text=$F(this.fromEle);
this.toEle.innerHTML=text.stripTags();
},recopy:function(){
this.copyFunction();
}};
function growTextArea(elt,_165,_166,_167){
var rows=Math.ceil($F(elt).length/_165)+1;
var _168=rows*_166;
_168=Math.max(_168,_167);
elt.setStyle({height:_168+"px"});
};
function makeGrowable(id,_169,_16a,_16b){
var elt=$(id);
if(!elt){
return;
}
elt.observe("keyup",function(){
growTextArea(elt,_169,_16a,_16b);
});
};
function makeExpandable(id,_16c,_16d,_16e,_16f,_170){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
elt.addClass("expandable_text dimmed").val(_16c);
var _170=(_170===undefined)?"expanded":_170;
elt.bind("focus",function(){
var anc=jq(this).closest("div");
if(!anc.hasClass(_170)){
anc.addClass(_170);
if(typeof (_16f)=="function"){
_16f.apply(this);
}
}
if(jq(this).hasClass("dimmed")){
jq(this).removeClass("dimmed").val("");
}
if(typeof (_16d)=="function"){
_16d.apply(this);
}
});
elt.bind("blur",function(){
if(elt.val()!=""){
return;
}
if(!_16e){
jq(this).css({height:""}).closest("div").removeClass("expanded");
}
jq(this).addClass("dimmed").val(_16c);
});
};
function initAutoComplete(_171,_172){
var _173="";
var _174="++none++";
var _175=false;
var _176=false;
var _177=false;
var _178="#the_auto_comp_box";
var _179="#search_form";
var _17a="#search_input";
var _17b=".search_submit";
var _17c="search_form";
var _17d="/xml/getautocompletestrings.php";
var _17e="";
var _17f=0;
var _180=null;
var _181=null;
var _182=null;
var _183=null;
var _184=null;
var _185=false;
if(_172){
_178=_172.boxid;
_179=_172.container;
_17a=_172.input;
_17b=_172.submit;
if(_172.ajaxtarget!=undefined){
_17d=_172.ajaxtarget;
}
if(_172.querystring!=undefined){
_17e="&"+_172.querystring;
}
if(_172.filter!=undefined){
_180=_172.filter;
}
if(_172.callback!=undefined){
_181=_172.callback;
}
if(_172.keyboardelem!=undefined){
_183=_172.keyboardelem;
}
if(_172.targoutput!=undefined){
_182=_172.targoutput;
}
if(_172.keyuptarget!=undefined){
_184=_172.keyuptarget;
}
if(_172.showprogress!=undefined){
_185=_172.showprogress;
}
}
if(!_183){
_183=_17a;
}
if(!_182){
_182=_17a;
}
if(!_184){
_184=_183;
}
jq(document).ready(function(){
if(!_175){
_175=true;
jq("<div id=\""+_178.substr(1)+"\" class=\"auto_comp_box\"></div>").insertAfter(_183);
if(_185){
jq("<div id=\"auto_comp_close\">&nbsp;</div>").appendTo(_178);
jq("#auto_comp_close").bind("click",function(){
jq(_178).hide();
jq("#auto_comp_close").hide();
});
}
jq(_178).hide();
if(!_185){
jq(_178).bind("focusin",function(){
_176=true;
});
jq(_178).bind("focusout",function(){
_176=false;
});
jq(_179).bind("focusin",function(){
_177=true;
});
jq(_179).bind("focusout",function(){
_177=false;
setTimeout(function(){
if(!_176&&!_177){
jq(_178).hide();
jq("#auto_comp_close").hide();
_17e=_17e.replace(/start=[^&]*&?/,"");
}
},300);
});
}
jq(_179).attr("autocomplete","off");
jq(_183).bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
_17f=0;
jq(_178+" > .auto_comp_row:visible:eq(0) > a").trigger("focus");
return (false);
break;
}
return (true);
});
jq(_184).bind("keyup",function(){
var _186=jq(_17a).attr("value");
if(_17a!=_183){
if(_173!=_186){
_17e=_17e.replace(/start=[0123456789]+/,"");
_17e=_17e.replace(/&&/,"&");
}
_173="";
_174="++none++";
}
var _187;
if(_172){
_187="hubs";
}else{
_187=jq(".search_type option:selected").val();
if(_187==undefined){
_187="site";
}
}
if(_186.strip().length==0){
jq(_178).hide();
jq("#auto_comp_close").hide();
}
if(_186.strip().length>0&&_173!=_186){
_173=_186;
if(_186.indexOf(_174)==0){
jq(_178+" > .auto_comp_row").each(function(){
var _188=jq(this).text();
if(_180){
_188=_180(_188);
}
if(_188.indexOf(_186)==0){
jq(this).show();
}else{
jq(this).hide();
}
});
return true;
}
_174="++none++";
jq(_178+" > .auto_comp_row").remove();
var _189="?";
if(_185){
jq("<div id=\"auto_comp_progress\" >&nbsp;</div>").appendTo(_178);
jq(_178).show();
_189="?s="+escape(_186)+"&";
}
var _18a=jq(_179).serialize();
var _18b=/(^|&)s=/;
if(!_18a.match(_18b)&&!_17e.match(_18b)&&!_189.match(_18b)){
_18a+="&s="+_186;
}
jq.get(_17d+_189+"t="+escape(_187)+_17e,_18a,function(data){
jq(_178+" div[id=auto_comp_error]").remove();
jq(_178+" div[id=auto_comp_progress]").remove();
_17e=_17e.replace(/start=[0123456789]+/,"");
_17e=_17e.replace(/&&/,"&");
var _18c=jq(data).find("div").length;
var _18d=false;
if(_18c==0){
return true;
}
var _18e=jq(_17a).val();
if(_18e!=_186){
return true;
}
if(_18c<_171){
_174=_186;
}else{
_174="++none++";
}
jq(_178).show();
jq(_183).focus();
var _18f=jq(_183).position();
var _190=jq(_183).outerHeight(true);
jq(_178).position(_18f.top+_190,_18f.left+5);
jq(data).find("div").appendTo(_178);
jq(_178+" > .auto_comp_row").bind("click",function(){
var _191=false;
jq(this).find("a").each(function(){
var aid=jq(this).attr("id");
var href=jq(this).attr("href");
if(aid=="acrup"||aid=="acrdown"){
_191=true;
var _192=href.substr(8);
_17e+="&start="+_192;
_17e=_17e.replace(/&&/,"&");
}
});
if(_191){
if(!_18d){
setTimeout(function(){
jq(_184).trigger("keyup");
},200);
_176=false;
_18d=true;
}
return (false);
}
var _193=jq(this).text();
if(_180){
_193=_180(_193);
}
jq(_182).attr("value",_193);
if(document.forms[_17c]){
document.forms[_17c].submit();
}else{
if(_17b){
jq(_17b).trigger("click");
}
}
return (false);
});
jq(_178+" > .auto_comp_row").bind("keypress",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 13:
jq(this).trigger("click");
return (false);
break;
}
return (true);
});
jq(_178+" > .auto_comp_row").bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
if(!jq(_178+" > .auto_comp_row:visible:eq("+_17f+") > a").length){
return (false);
}
++_17f;
jq(_178+" > .auto_comp_row:visible:eq("+_17f+") > a").trigger("focus");
return (false);
break;
case 38:
--_17f;
if(_17f<0){
jq(_183).trigger("focus");
}else{
jq(_178+" > .auto_comp_row:visible:eq("+_17f+") > a").trigger("focus");
}
return (false);
break;
}
return (true);
});
if(_181){
_181();
}
},"html");
}
});
}
});
};
var ImageViewerControl=Class.create();
ImageViewerControl.prototype={initialize:function(_194,_195,_196,_197){
this.modId=_194;
this.floatStatus=_195;
this.displayStatus=_196;
this.popupFlg=_197;
this.photoData=new Object();
this.photoOrder=new Array();
this.viewer_id=null;
this.timer=null;
this.slide_idx=-1;
this.displaySlideshowLinks=false;
this.excludeImageIdsFromSlideshow=$A(new Array());
this.resources={ht_viewer_sect:"image_viewer_"+this.modId,ht_inline_sect:"image_inline_"+this.modId,ht_slideshow_sect:"image_slideshow_"+this.modId,ht_thumbnail_sect:"image_thumbnail_"+this.modId,inline_images:"imgs_"+this.modId,viewer_display:"slide_display_"+this.modId,viewer_photo:"slide_img_"+this.modId,viewer_caption:"slide_desc_"+this.modId,thumb_tn_section:"slide_tn_section_"+this.modId};
},setMaxHeight:function(_198){
this.firstTimeLoadingImage=true;
this.maxHeight=_198;
},addPhoto:function(rec){
this.photoData[rec.id]=rec;
this.photoOrder.push(rec.id);
},clear:function(){
delete this.photoData;
this.photoData=new Object();
this.photoOrder.clear();
},render:function(){
switch(this.displayStatus){
case "No Border":
case "With Border":
this.renderInlineImages();
break;
case "Thumbnail":
this.renderThumbnails();
break;
}
},toggleViewer:function(){
switch(this.displayStatus){
case "No Border":
case "With Border":
Element.hide(this.resources.ht_viewer_sect);
Element.show(this.resources.ht_inline_sect);
Element.hide(this.resources.ht_thumbnail_sect);
break;
case "Thumbnail":
Element.show(this.resources.ht_viewer_sect);
Element.hide(this.resources.ht_inline_sect);
Element.show(this.resources.ht_thumbnail_sect);
break;
}
},loadSlide:function(id){
if(!this.firstTimeLoadingImage&&this.maxHeight){
$(this.resources.viewer_display).style.height=this.maxHeight+"px";
}
this.viewer_id=id;
rec=this.photoData[id];
$(this.resources.viewer_photo).innerHTML=this._getDisplayUrl();
$(this.resources.viewer_caption).innerHTML=this._getCaptionAndSource(rec);
if(this.popupFlg){
this._addpopup(id,$(this.resources.viewer_photo).firstChild);
}
this.firstTimeLoadingImage=false;
},getMaxDisplayHeight:function(){
var top=0;
this.photoOrder.each(function(id){
var hgt=this._getDisplayHeight(id);
top=hgt>top?hgt:top;
}.bind(this));
return top;
},setDisplaySlideshowLinks:function(_199){
this.displaySlideshowLinks=_199;
},setExcludeImagesFromSlideshow:function(){
this.excludeImageIdsFromSlideshow=$A(arguments);
},_getDisplayUrl:function(){
rec=this.photoData[this.viewer_id];
var _19a=rec.origWidth>=200&&rec.origHeight>=150;
if(rec.maxSize==2&&this.displayStatus=="With Border"){
return this._createImageTag(rec.urlQuarter,"quarter_frame",rec.esc_cap)+(_19a&&this.displaySlideshowLinks&&this.excludeImageIdsFromSlideshow.indexOf(this.viewer_id)==-1?getHubSlideshowHtml("quarter",this.displayStatus=="With Border"):"");
}else{
if(rec.maxSize==2){
return this._createImageTag(rec.urlQuarter,"quarter",rec.esc_cap)+(_19a&&this.displaySlideshowLinks&&this.excludeImageIdsFromSlideshow.indexOf(this.viewer_id)==-1?getHubSlideshowHtml("quarter",this.displayStatus=="With Border"):"");
}else{
if((this.floatStatus=="right"||rec.maxSize==1)&&this.displayStatus=="With Border"){
return this._createImageTag(rec.urlHalfPad,"half_frame",rec.esc_cap)+(_19a&&this.displaySlideshowLinks&&this.excludeImageIdsFromSlideshow.indexOf(this.viewer_id)==-1?getHubSlideshowHtml("half",this.displayStatus=="With Border"):"");
}else{
if(this.floatStatus=="right"||rec.maxSize==1){
return this._createImageTag(rec.urlHalf,"half",rec.esc_cap)+(_19a&&this.displaySlideshowLinks?getHubSlideshowHtml("half",this.displayStatus=="With Border"):"");
}else{
if(this.floatStatus=="none"&&this.displayStatus=="With Border"){
return this._createImageTag(rec.urlFullPad,"full_frame",rec.esc_cap)+(_19a&&this.displaySlideshowLinks&&this.excludeImageIdsFromSlideshow.indexOf(this.viewer_id)==-1?getHubSlideshowHtml("full",this.displayStatus=="With Border"):"");
}else{
if(this.floatStatus=="none"){
return this._createImageTag(rec.urlFull,"full",rec.esc_cap)+(_19a&&this.displaySlideshowLinks&&this.excludeImageIdsFromSlideshow.indexOf(this.viewer_id)==-1?getHubSlideshowHtml("full",this.displayStatus=="With Border"):"");
}
}
}
}
}
}
},_createImageTag:function(url,_19b,_19c){
if(undefined==_19c){
_19c="";
}
return "<img class='"+_19b+"' title='"+_19c+"' alt='"+_19c+"' src='"+url+"' />";
},_getDisplayHeight:function(_19d){
rec=this.photoData[_19d];
if(rec.maxSize==2){
return rec.ratio*120;
}else{
if((this.floatStatus=="right"||rec.maxSize==1)&&this.displayStatus=="With Border"){
return rec.ratio*248;
}else{
if(this.floatStatus=="right"||rec.maxSize==1){
return rec.ratio*260;
}else{
if(this.floatStatus=="none"&&this.displayStatus=="With Border"){
return rec.ratio*496;
}else{
if(this.floatStatus=="none"){
return rec.ratio*520;
}
}
}
}
}
},_getCaptionAndSource:function(rec){
var _19e=rec.nofollow?" rel=\"nofollow\"":"";
var _19f="";
if(rec.sourceUrl==""){
_19f=rec.sourceName;
}else{
if(rec.sourceName==""){
_19f="<a href=\""+rec.sourceUrl.replace(/"/g,"")+"\""+_19e+">"+rec.sourceUrl.truncate(50)+"</a>";
}else{
_19f="<a href=\""+rec.sourceUrl.replace(/"/g,"")+"\""+_19e+">"+rec.sourceName+"</a>";
}
}
if(_19f!=""){
_19f="<div>Source: "+_19f+"</div>";
}
return rec.caption+_19f;
},_addInlineImage:function(id){
this.viewer_id=id;
var rec=this.photoData[id];
var _1a0=document.createElement("div");
var _1a1=this._getDisplayUrl();
if(this.floatStatus=="none"){
var _1a2="caption_full";
}else{
var _1a2="caption_half";
}
_1a0.id="img_"+rec.id;
_1a0.innerHTML="<div id='img_url_"+rec.id+"'>"+_1a1+"</div>"+"<div class='"+_1a2+"' id='img_desc_"+rec.id+"'>"+this._getCaptionAndSource(rec)+"</div>";
$(this.resources.inline_images).appendChild(_1a0);
if(this.popupFlg){
this._addpopup(rec.id,$("img_url_"+rec.id).firstChild);
}
},renderInlineImages:function(){
$(this.resources.inline_images).innerHTML="";
this.photoOrder.each(function(id){
this._addInlineImage(id);
}.bind(this));
},_addThumbnail:function(id){
var rec=this.photoData[id];
var _1a3=document.createElement("img");
_1a3.id="slide_tn_"+rec.id;
_1a3.src=rec.urlThumb;
_1a3.alt=rec.caption;
_1a3.title=rec.caption;
_1a3.onclick=function(){
this.loadSlide(rec.id);
}.bind(this);
$(this.resources.thumb_tn_section).appendChild(_1a3);
},renderThumbnails:function(){
$(this.resources.thumb_tn_section).innerHTML="";
this.photoOrder.each(function(id){
this._addThumbnail(id);
}.bind(this));
if(this.photoOrder.length>0){
$("slide_tn_"+this.photoOrder[0]).onclick();
}
},_addpopup:function(id,img){
img.title="Click to see full-size image.";
var link=jq("<a href=\"#\"></a>");
link.attr("data-lightbox",this.photoData[id].lightboxUrl).addClass("imglightbox");
jq(img).after(link).detach();
link.append(img);
link.fancybox({overlayOpacity:0.8,overlayColor:"#000",titleShow:false});
}};
var ForumSelector=Class.create();
ForumSelector.prototype={initialize:function(id,_1a4){
this.id=id;
this.userId=_1a4;
this.observeChanges();
},observeChanges:function(){
$(this.id+"_forum_id").observe("change",this.changeForum.bindAsEventListener(this));
$$("."+this.id+"_category_selector").each(function(elt){
elt.observe("change",this.changeCategory.bindAsEventListener(this));
}.bind(this));
},changeForum:function(_1a5){
var elt=Event.findElement(_1a5,"select");
this.chooseForum($F(elt));
},changeCategory:function(_1a6){
var elt=Event.findElement(_1a6,"select");
this.chooseCategory($F(elt));
},chooseForum:function(_1a7){
if(/fave/.test(_1a7)){
var _1a8=_1a7.substring(5);
this.chooseCategory(_1a8);
return;
}
new Ajax.Updater(this.id+"_forum_selector","/xml/forumselector.php",{parameters:$H({forumId:_1a7,id:this.id,userId:this.userId}).toQueryString(),onComplete:this.observeChanges.bind(this)});
},chooseCategory:function(_1a9){
new Ajax.Updater(this.id+"_forum_selector","/xml/forumselector.php",{parameters:$H({categoryId:_1a9,id:this.id,userId:this.userId}).toQueryString(),onComplete:this.observeChanges.bind(this)});
}};
var CategorySelector=Class.create();
CategorySelector.prototype={initialize:function(id,_1aa,_1ab,_1ac){
this.id=id;
this.onchange=_1aa;
this.onselect=_1ab;
this.userId=_1ac?_1ac:0;
this.observeChanges();
},observeChanges:function(){
$$("."+this.id+"_category_selector").each(function(elt){
elt.observe("change",this.changeCategory.bindAsEventListener(this));
}.bind(this));
$("startOver"+this.id).observe("click",this.startOver.bind(this));
},changeCategory:function(_1ad){
var elt=Event.findElement(_1ad,"select");
this.chooseCategory($F(elt));
},chooseCategory:function(_1ae,_1af,_1b0){
new Ajax.Request("/xml/categoryselector.php",{parameters:$H({categoryId:_1ae,userId:this.userId,id:this.id}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
$(this.id+"Wrapper").innerHTML=data["render"];
this.observeChanges();
if($(this.uniqueId+"SearchText")){
$(this.uniqueId+"SearchText").value="";
}
if($(this.uniqueId+"SearchResults")){
$(this.uniqueId+"SearchResults").innerHTML="";
}
this.onchange(data);
if(!_1af&&_1b0){
this.onselect(_1b0);
}
}.bind(this)});
},getValue:function(){
return $F(this.id+"Id");
},startOver:function(_1b1){
this.chooseCategory(0);
},refresh:function(){
this.chooseCategory(this.getValue());
},search:function(_1b2,_1b3,_1b4){
new Ajax.Updater(_1b3,"/xml/categorysearch.php",{parameters:$H({uniqueId:this.id,searchText:_1b2,numTabs:_1b4}),onFailure:function(){
}});
return false;
}};
(function($){
$.extend($.fn,{validate:function(_1b5){
if(!this.length){
_1b5&&_1b5.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");
return;
}
var _1b6=$.data(this[0],"validator");
if(_1b6){
return _1b6;
}
_1b6=new $.validator(_1b5,this[0]);
$.data(this[0],"validator",_1b6);
if(_1b6.settings.onsubmit){
this.find("input, button").filter(".cancel").click(function(){
_1b6.cancelSubmit=true;
});
if(_1b6.settings.submitHandler){
this.find("input, button").filter(":submit").click(function(){
_1b6.submitButton=this;
});
}
this.submit(function(_1b7){
if(_1b6.settings.debug){
_1b7.preventDefault();
}
function _1b8(){
if(_1b6.settings.submitHandler){
if(_1b6.submitButton){
var _1b9=$("<input type='hidden'/>").attr("name",_1b6.submitButton.name).val(_1b6.submitButton.value).appendTo(_1b6.currentForm);
}
_1b6.settings.submitHandler.call(_1b6,_1b6.currentForm);
if(_1b6.submitButton){
_1b9.remove();
}
return false;
}
return true;
};
if(_1b6.cancelSubmit){
_1b6.cancelSubmit=false;
return _1b8();
}
if(_1b6.form()){
if(_1b6.pendingRequest){
_1b6.formSubmitted=true;
return false;
}
return _1b8();
}else{
_1b6.focusInvalid();
return false;
}
});
}
return _1b6;
},valid:function(){
if($(this[0]).is("form")){
return this.validate().form();
}else{
var _1ba=true;
var _1bb=$(this[0].form).validate();
this.each(function(){
_1ba&=_1bb.element(this);
});
return _1ba;
}
},removeAttrs:function(_1bc){
var _1bd={},_1be=this;
$.each(_1bc.split(/\s/),function(_1bf,_1c0){
_1bd[_1c0]=_1be.attr(_1c0);
_1be.removeAttr(_1c0);
});
return _1bd;
},rules:function(_1c1,_1c2){
var _1c3=this[0];
if(_1c1){
var _1c4=$.data(_1c3.form,"validator").settings;
var _1c5=_1c4.rules;
var _1c6=$.validator.staticRules(_1c3);
switch(_1c1){
case "add":
$.extend(_1c6,$.validator.normalizeRule(_1c2));
_1c5[_1c3.name]=_1c6;
if(_1c2.messages){
_1c4.messages[_1c3.name]=$.extend(_1c4.messages[_1c3.name],_1c2.messages);
}
break;
case "remove":
if(!_1c2){
delete _1c5[_1c3.name];
return _1c6;
}
var _1c7={};
$.each(_1c2.split(/\s/),function(_1c8,_1c9){
_1c7[_1c9]=_1c6[_1c9];
delete _1c6[_1c9];
});
return _1c7;
}
}
var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(_1c3),$.validator.classRules(_1c3),$.validator.attributeRules(_1c3),$.validator.staticRules(_1c3)),_1c3);
if(data.required){
var _1ca=data.required;
delete data.required;
data=$.extend({required:_1ca},data);
}
return data;
}});
$.extend($.expr[":"],{blank:function(a){
return !$.trim(""+a.value);
},filled:function(a){
return !!$.trim(""+a.value);
},unchecked:function(a){
return !a.checked;
}});
$.validator=function(_1cb,form){
this.settings=$.extend(true,{},$.validator.defaults,_1cb);
this.currentForm=form;
this.init();
};
$.validator.format=function(_1cc,_1cd){
if(arguments.length==1){
return function(){
var args=$.makeArray(arguments);
args.unshift(_1cc);
return $.validator.format.apply(this,args);
};
}
if(arguments.length>2&&_1cd.constructor!=Array){
_1cd=$.makeArray(arguments).slice(1);
}
if(_1cd.constructor!=Array){
_1cd=[_1cd];
}
$.each(_1cd,function(i,n){
_1cc=_1cc.replace(new RegExp("\\{"+i+"\\}","g"),n);
});
return _1cc;
};
$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(_1ce){
this.lastActive=_1ce;
if(this.settings.focusCleanup&&!this.blockFocusCleanup){
this.settings.unhighlight&&this.settings.unhighlight.call(this,_1ce,this.settings.errorClass,this.settings.validClass);
this.addWrapper(this.errorsFor(_1ce)).hide();
}
},onfocusout:function(_1cf){
if(!this.checkable(_1cf)&&(_1cf.name in this.submitted||!this.optional(_1cf))){
this.element(_1cf);
}
},onkeyup:function(_1d0){
if(_1d0.name in this.submitted||_1d0==this.lastElement){
this.element(_1d0);
}
},onclick:function(_1d1){
if(_1d1.name in this.submitted){
this.element(_1d1);
}else{
if(_1d1.parentNode.name in this.submitted){
this.element(_1d1.parentNode);
}
}
},highlight:function(_1d2,_1d3,_1d4){
$(_1d2).addClass(_1d3).removeClass(_1d4);
},unhighlight:function(_1d5,_1d6,_1d7){
$(_1d5).removeClass(_1d6).addClass(_1d7);
}},setDefaults:function(_1d8){
$.extend($.validator.defaults,_1d8);
},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){
this.labelContainer=$(this.settings.errorLabelContainer);
this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm);
this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer);
this.submitted={};
this.valueCache={};
this.pendingRequest=0;
this.pending={};
this.invalid={};
this.reset();
var _1d9=(this.groups={});
$.each(this.settings.groups,function(key,_1da){
$.each(_1da.split(/\s/),function(_1db,name){
_1d9[name]=key;
});
});
var _1dc=this.settings.rules;
$.each(_1dc,function(key,_1dd){
_1dc[key]=$.validator.normalizeRule(_1dd);
});
function _1de(_1df){
var _1e0=$.data(this[0].form,"validator"),_1e1="on"+_1df.type.replace(/^validate/,"");
_1e0.settings[_1e1]&&_1e0.settings[_1e1].call(_1e0,this[0]);
};
$(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",_1de).validateDelegate(":radio, :checkbox, select, option","click",_1de);
if(this.settings.invalidHandler){
$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler);
}
},form:function(){
this.checkForm();
$.extend(this.submitted,this.errorMap);
this.invalid=$.extend({},this.errorMap);
if(!this.valid()){
$(this.currentForm).triggerHandler("invalid-form",[this]);
}
this.showErrors();
return this.valid();
},checkForm:function(){
this.prepareForm();
for(var i=0,_1e2=(this.currentElements=this.elements());_1e2[i];i++){
this.check(_1e2[i]);
}
return this.valid();
},element:function(_1e3){
_1e3=this.clean(_1e3);
this.lastElement=_1e3;
this.prepareElement(_1e3);
this.currentElements=$(_1e3);
var _1e4=this.check(_1e3);
if(_1e4){
delete this.invalid[_1e3.name];
}else{
this.invalid[_1e3.name]=true;
}
if(!this.numberOfInvalids()){
this.toHide=this.toHide.add(this.containers);
}
this.showErrors();
return _1e4;
},showErrors:function(_1e5){
if(_1e5){
$.extend(this.errorMap,_1e5);
this.errorList=[];
for(var name in _1e5){
this.errorList.push({message:_1e5[name],element:this.findByName(name)[0]});
}
this.successList=$.grep(this.successList,function(_1e6){
return !(_1e6.name in _1e5);
});
}
this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors();
},resetForm:function(){
if($.fn.resetForm){
$(this.currentForm).resetForm();
}
this.submitted={};
this.prepareForm();
this.hideErrors();
this.elements().removeClass(this.settings.errorClass);
},numberOfInvalids:function(){
return this.objectLength(this.invalid);
},objectLength:function(obj){
var _1e7=0;
for(var i in obj){
_1e7++;
}
return _1e7;
},hideErrors:function(){
this.addWrapper(this.toHide).hide();
},valid:function(){
return this.size()==0;
},size:function(){
return this.errorList.length;
},focusInvalid:function(){
if(this.settings.focusInvalid){
try{
$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin");
}
catch(e){
}
}
},findLastActive:function(){
var _1e8=this.lastActive;
return _1e8&&$.grep(this.errorList,function(n){
return n.element.name==_1e8.name;
}).length==1&&_1e8;
},elements:function(){
var _1e9=this,_1ea={};
return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){
!this.name&&_1e9.settings.debug&&window.console&&console.error("%o has no name assigned",this);
if(this.name in _1ea||!_1e9.objectLength($(this).rules())){
return false;
}
_1ea[this.name]=true;
return true;
});
},clean:function(_1eb){
return $(_1eb)[0];
},errors:function(){
return $(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext);
},reset:function(){
this.successList=[];
this.errorList=[];
this.errorMap={};
this.toShow=$([]);
this.toHide=$([]);
this.currentElements=$([]);
},prepareForm:function(){
this.reset();
this.toHide=this.errors().add(this.containers);
},prepareElement:function(_1ec){
this.reset();
this.toHide=this.errorsFor(_1ec);
},check:function(_1ed){
_1ed=this.clean(_1ed);
if(this.checkable(_1ed)){
_1ed=this.findByName(_1ed.name).not(this.settings.ignore)[0];
}
var _1ee=$(_1ed).rules();
var _1ef=false;
for(var _1f0 in _1ee){
var rule={method:_1f0,parameters:_1ee[_1f0]};
try{
var _1f1=$.validator.methods[_1f0].call(this,_1ed.value.replace(/\r/g,""),_1ed,rule.parameters);
if(_1f1=="dependency-mismatch"){
_1ef=true;
continue;
}
_1ef=false;
if(_1f1=="pending"){
this.toHide=this.toHide.not(this.errorsFor(_1ed));
return;
}
if(!_1f1){
this.formatAndAdd(_1ed,rule);
return false;
}
}
catch(e){
this.settings.debug&&window.console&&console.log("exception occured when checking element "+_1ed.id+", check the '"+rule.method+"' method",e);
throw e;
}
}
if(_1ef){
return;
}
if(this.objectLength(_1ee)){
this.successList.push(_1ed);
}
return true;
},customMetaMessage:function(_1f2,_1f3){
if(!$.metadata){
return;
}
var meta=this.settings.meta?$(_1f2).metadata()[this.settings.meta]:$(_1f2).metadata();
return meta&&meta.messages&&meta.messages[_1f3];
},customMessage:function(name,_1f4){
var m=this.settings.messages[name];
return m&&(m.constructor==String?m:m[_1f4]);
},findDefined:function(){
for(var i=0;i<arguments.length;i++){
if(arguments[i]!==undefined){
return arguments[i];
}
}
return undefined;
},defaultMessage:function(_1f5,_1f6){
return this.findDefined(this.customMessage(_1f5.name,_1f6),this.customMetaMessage(_1f5,_1f6),!this.settings.ignoreTitle&&_1f5.title||undefined,$.validator.messages[_1f6],"<strong>Warning: No message defined for "+_1f5.name+"</strong>");
},formatAndAdd:function(_1f7,rule){
var _1f8=this.defaultMessage(_1f7,rule.method),_1f9=/\$?\{(\d+)\}/g;
if(typeof _1f8=="function"){
_1f8=_1f8.call(this,rule.parameters,_1f7);
}else{
if(_1f9.test(_1f8)){
_1f8=jQuery.format(_1f8.replace(_1f9,"{$1}"),rule.parameters);
}
}
this.errorList.push({message:_1f8,element:_1f7});
this.errorMap[_1f7.name]=_1f8;
this.submitted[_1f7.name]=_1f8;
},addWrapper:function(_1fa){
if(this.settings.wrapper){
_1fa=_1fa.add(_1fa.parent(this.settings.wrapper));
}
return _1fa;
},defaultShowErrors:function(){
for(var i=0;this.errorList[i];i++){
var _1fb=this.errorList[i];
this.settings.highlight&&this.settings.highlight.call(this,_1fb.element,this.settings.errorClass,this.settings.validClass);
this.showLabel(_1fb.element,_1fb.message);
}
if(this.errorList.length){
this.toShow=this.toShow.add(this.containers);
}
if(this.settings.success){
for(var i=0;this.successList[i];i++){
this.showLabel(this.successList[i]);
}
}
if(this.settings.unhighlight){
for(var i=0,_1fc=this.validElements();_1fc[i];i++){
this.settings.unhighlight.call(this,_1fc[i],this.settings.errorClass,this.settings.validClass);
}
}
this.toHide=this.toHide.not(this.toShow);
this.hideErrors();
this.addWrapper(this.toShow).show();
},validElements:function(){
return this.currentElements.not(this.invalidElements());
},invalidElements:function(){
return $(this.errorList).map(function(){
return this.element;
});
},showLabel:function(_1fd,_1fe){
var _1ff=this.errorsFor(_1fd);
if(_1ff.length){
_1ff.removeClass().addClass(this.settings.errorClass);
_1ff.attr("generated")&&_1ff.html(_1fe);
}else{
_1ff=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(_1fd),generated:true}).addClass(this.settings.errorClass).html(_1fe||"");
if(this.settings.wrapper){
_1ff=_1ff.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();
}
if(!this.labelContainer.append(_1ff).length){
this.settings.errorPlacement?this.settings.errorPlacement(_1ff,$(_1fd)):_1ff.insertAfter(_1fd);
}
}
if(!_1fe&&this.settings.success){
_1ff.text("");
typeof this.settings.success=="string"?_1ff.addClass(this.settings.success):this.settings.success(_1ff);
}
this.toShow=this.toShow.add(_1ff);
},errorsFor:function(_200){
var name=this.idOrName(_200);
return this.errors().filter(function(){
return $(this).attr("for")==name;
});
},idOrName:function(_201){
return this.groups[_201.name]||(this.checkable(_201)?_201.name:_201.id||_201.name);
},checkable:function(_202){
return /radio|checkbox/i.test(_202.type);
},findByName:function(name){
var form=this.currentForm;
return $(document.getElementsByName(name)).map(function(_203,_204){
return _204.form==form&&_204.name==name&&_204||null;
});
},getLength:function(_205,_206){
switch(_206.nodeName.toLowerCase()){
case "select":
return $("option:selected",_206).length;
case "input":
if(this.checkable(_206)){
return this.findByName(_206.name).filter(":checked").length;
}
}
return _205.length;
},depend:function(_207,_208){
return this.dependTypes[typeof _207]?this.dependTypes[typeof _207](_207,_208):true;
},dependTypes:{"boolean":function(_209,_20a){
return _209;
},"string":function(_20b,_20c){
return !!$(_20b,_20c.form).length;
},"function":function(_20d,_20e){
return _20d(_20e);
}},optional:function(_20f){
return !$.validator.methods.required.call(this,$.trim(_20f.value),_20f)&&"dependency-mismatch";
},startRequest:function(_210){
if(!this.pending[_210.name]){
this.pendingRequest++;
this.pending[_210.name]=true;
}
},stopRequest:function(_211,_212){
this.pendingRequest--;
if(this.pendingRequest<0){
this.pendingRequest=0;
}
delete this.pending[_211.name];
if(_212&&this.pendingRequest==0&&this.formSubmitted&&this.form()){
$(this.currentForm).submit();
this.formSubmitted=false;
}else{
if(!_212&&this.pendingRequest==0&&this.formSubmitted){
$(this.currentForm).triggerHandler("invalid-form",[this]);
this.formSubmitted=false;
}
}
},previousValue:function(_213){
return $.data(_213,"previousValue")||$.data(_213,"previousValue",{old:null,valid:true,message:this.defaultMessage(_213,"remote")});
}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(_214,_215){
_214.constructor==String?this.classRuleSettings[_214]=_215:$.extend(this.classRuleSettings,_214);
},classRules:function(_216){
var _217={};
var _218=$(_216).attr("class");
_218&&$.each(_218.split(" "),function(){
if(this in $.validator.classRuleSettings){
$.extend(_217,$.validator.classRuleSettings[this]);
}
});
return _217;
},attributeRules:function(_219){
var _21a={};
var _21b=$(_219);
for(var _21c in $.validator.methods){
var _21d=_21b.attr(_21c);
if(_21d){
_21a[_21c]=_21d;
}
}
if(_21a.maxlength&&/-1|2147483647|524288/.test(_21a.maxlength)){
delete _21a.maxlength;
}
return _21a;
},metadataRules:function(_21e){
if(!$.metadata){
return {};
}
var meta=$.data(_21e.form,"validator").settings.meta;
return meta?$(_21e).metadata()[meta]:$(_21e).metadata();
},staticRules:function(_21f){
var _220={};
var _221=$.data(_21f.form,"validator");
if(_221.settings.rules){
_220=$.validator.normalizeRule(_221.settings.rules[_21f.name])||{};
}
return _220;
},normalizeRules:function(_222,_223){
$.each(_222,function(prop,val){
if(val===false){
delete _222[prop];
return;
}
if(val.param||val.depends){
var _224=true;
switch(typeof val.depends){
case "string":
_224=!!$(val.depends,_223.form).length;
break;
case "function":
_224=val.depends.call(_223,_223);
break;
}
if(_224){
_222[prop]=val.param!==undefined?val.param:true;
}else{
delete _222[prop];
}
}
});
$.each(_222,function(rule,_225){
_222[rule]=$.isFunction(_225)?_225(_223):_225;
});
$.each(["minlength","maxlength","min","max"],function(){
if(_222[this]){
_222[this]=Number(_222[this]);
}
});
$.each(["rangelength","range"],function(){
if(_222[this]){
_222[this]=[Number(_222[this][0]),Number(_222[this][1])];
}
});
if($.validator.autoCreateRanges){
if(_222.min&&_222.max){
_222.range=[_222.min,_222.max];
delete _222.min;
delete _222.max;
}
if(_222.minlength&&_222.maxlength){
_222.rangelength=[_222.minlength,_222.maxlength];
delete _222.minlength;
delete _222.maxlength;
}
}
if(_222.messages){
delete _222.messages;
}
return _222;
},normalizeRule:function(data){
if(typeof data=="string"){
var _226={};
$.each(data.split(/\s/),function(){
_226[this]=true;
});
data=_226;
}
return data;
},addMethod:function(name,_227,_228){
$.validator.methods[name]=_227;
$.validator.messages[name]=_228!=undefined?_228:$.validator.messages[name];
if(_227.length<3){
$.validator.addClassRules(name,$.validator.normalizeRule(name));
}
},methods:{required:function(_229,_22a,_22b){
if(!this.depend(_22b,_22a)){
return "dependency-mismatch";
}
switch(_22a.nodeName.toLowerCase()){
case "select":
var val=$(_22a).val();
return val&&val.length>0;
case "input":
if(this.checkable(_22a)){
return this.getLength(_229,_22a)>0;
}
default:
return $.trim(_229).length>0;
}
},remote:function(_22c,_22d,_22e){
if(this.optional(_22d)){
return "dependency-mismatch";
}
var _22f=this.previousValue(_22d);
if(!this.settings.messages[_22d.name]){
this.settings.messages[_22d.name]={};
}
_22f.originalMessage=this.settings.messages[_22d.name].remote;
this.settings.messages[_22d.name].remote=_22f.message;
_22e=typeof _22e=="string"&&{url:_22e}||_22e;
if(this.pending[_22d.name]){
return "pending";
}
if(_22f.old===_22c){
return _22f.valid;
}
_22f.old=_22c;
var _230=this;
this.startRequest(_22d);
var data={};
data[_22d.name]=_22c;
$.ajax($.extend(true,{url:_22e,mode:"abort",port:"validate"+_22d.name,dataType:"json",data:data,success:function(_231){
_230.settings.messages[_22d.name].remote=_22f.originalMessage;
var _232=_231===true;
if(_232){
var _233=_230.formSubmitted;
_230.prepareElement(_22d);
_230.formSubmitted=_233;
_230.successList.push(_22d);
_230.showErrors();
}else{
var _234={};
var _235=_231||_230.defaultMessage(_22d,"remote");
_234[_22d.name]=_22f.message=$.isFunction(_235)?_235(_22c):_235;
_230.showErrors(_234);
}
_22f.valid=_232;
_230.stopRequest(_22d,_232);
}},_22e));
return "pending";
},minlength:function(_236,_237,_238){
return this.optional(_237)||this.getLength($.trim(_236),_237)>=_238;
},maxlength:function(_239,_23a,_23b){
return this.optional(_23a)||this.getLength($.trim(_239),_23a)<=_23b;
},rangelength:function(_23c,_23d,_23e){
var _23f=this.getLength($.trim(_23c),_23d);
return this.optional(_23d)||(_23f>=_23e[0]&&_23f<=_23e[1]);
},min:function(_240,_241,_242){
return this.optional(_241)||_240>=_242;
},max:function(_243,_244,_245){
return this.optional(_244)||_243<=_245;
},range:function(_246,_247,_248){
return this.optional(_247)||(_246>=_248[0]&&_246<=_248[1]);
},email:function(_249,_24a){
return this.optional(_24a)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_249);
},url:function(_24b,_24c){
return this.optional(_24c)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_24b);
},date:function(_24d,_24e){
return this.optional(_24e)||!/Invalid|NaN/.test(new Date(_24d));
},dateISO:function(_24f,_250){
return this.optional(_250)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(_24f);
},number:function(_251,_252){
return this.optional(_252)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(_251);
},digits:function(_253,_254){
return this.optional(_254)||/^\d+$/.test(_253);
},creditcard:function(_255,_256){
if(this.optional(_256)){
return "dependency-mismatch";
}
if(/[^0-9-]+/.test(_255)){
return false;
}
var _257=0,_258=0,_259=false;
_255=_255.replace(/\D/g,"");
for(var n=_255.length-1;n>=0;n--){
var _25a=_255.charAt(n);
var _258=parseInt(_25a,10);
if(_259){
if((_258*=2)>9){
_258-=9;
}
}
_257+=_258;
_259=!_259;
}
return (_257%10)==0;
},accept:function(_25b,_25c,_25d){
_25d=typeof _25d=="string"?_25d.replace(/,/g,"|"):"png|jpe?g|gif";
return this.optional(_25c)||_25b.match(new RegExp(".("+_25d+")$","i"));
},equalTo:function(_25e,_25f,_260){
var _261=$(_260).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){
$(_25f).valid();
});
return $.trim(_25e)==$.trim(_261.val());
}}});
$.format=$.validator.format;
})(jQuery);
(function($){
var _262={};
if($.ajaxPrefilter){
$.ajaxPrefilter(function(_263,_264,xhr){
var port=_263.port;
if(_263.mode=="abort"){
if(_262[port]){
_262[port].abort();
}
_262[port]=xhr;
}
});
}else{
var ajax=$.ajax;
$.ajax=function(_265){
var mode=("mode" in _265?_265:$.ajaxSettings).mode,port=("port" in _265?_265:$.ajaxSettings).port;
if(mode=="abort"){
if(_262[port]){
_262[port].abort();
}
return (_262[port]=ajax.apply(this,arguments));
}
return ajax.apply(this,arguments);
};
}
})(jQuery);
(function($){
if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){
$.each({focus:"focusin",blur:"focusout"},function(_266,fix){
$.event.special[fix]={setup:function(){
this.addEventListener(_266,_267,true);
},teardown:function(){
this.removeEventListener(_266,_267,true);
},handler:function(e){
arguments[0]=$.event.fix(e);
arguments[0].type=fix;
return $.event.handle.apply(this,arguments);
}};
function _267(e){
e=$.event.fix(e);
e.type=fix;
return $.event.handle.call(this,e);
};
});
}
$.extend($.fn,{validateDelegate:function(_268,type,_269){
return this.bind(type,function(_26a){
var _26b=$(_26a.target);
if(_26b.is(_268)){
return _269.apply(_26b,arguments);
}
});
}});
})(jQuery);
jQuery.validator.addMethod("exactlength",function(_26c,_26d,_26e){
return this.optional(_26d)||this.getLength(jq.trim(_26c),_26d)==_26e;
},jQuery.format("Please enter exactly {0} characters."));
jQuery.validator.addMethod("forbidden",function(_26f,_270,_271){
if(!this.depend(_271,_270)){
return "dependency-mismatch";
}
switch(_270.nodeName.toLowerCase()){
case "select":
var val=jq(_270).val();
return !(val&&val.length>0);
case "input":
if(this.checkable(_270)){
return this.getLength(_26f,_270)==0;
}
default:
return jq.trim(_26f).length==0;
}
},"This field must be empty.");
jQuery.validator.addMethod("ssn",function(ssn,_272,_273){
if(!this.depend(_273,_272)){
return "dependency-mismatch";
}
var _274=false;
if(ssn.search(/^[0-9]{3}\-[0-9]{2}\-[0-9]{4}$/)==-1){
_274=true;
}else{
var _275=ssn.split("-");
if(_275[0]=="000"||_275[1]=="00"||_275[2]=="0000"){
_274=true;
}
if(_275[0]=="666"){
_274=true;
}
var _276=parseInt(_275[0],10);
if(_276>=900){
if(_275[1][0]!=7&&_275[1][0]!=8){
_274=true;
}
}
}
return !_274;
},"Your SSN or ITIN appears to be invalid. It should be in the format xxx-xx-xxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("nohtml",function(_277,_278,_279){
if(!this.depend(_279,_278)){
return "dependency-mismatch";
}
return _277.search(/[<|>]/)==-1;
},"Please do not include inequality signs (&lt; or &gt;) or HTML tags.");
jQuery.validator.addMethod("ein",function(ein,_27a,_27b){
if(!this.depend(_27b,_27a)){
return "dependency-mismatch";
}
return ein.search(/^[0-9]{2}\-[0-9]{7}$/)!=-1;
},"Your EIN appears to be invalid. It should be in the format xx-xxxxxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("mmddyyyy",function(_27c,_27d,_27e){
var _27c=jq.trim(_27c);
if(_27c.search(/^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/)==-1){
return false;
}
var _27f=_27c.split("-");
var m=1*_27f[0]-1;
var d=1*_27f[1];
var y=1*_27f[2];
if(y>2037){
return false;
}
var dte=new Date(y,m,d,1);
return (d==1*dte.getDate()&&m==1*dte.getMonth()&&y==1*dte.getFullYear());
},"Please provide a valid date with the format MM-DD-YYYY.");
jQuery.validator.addMethod("dollars",function(_280,_281,_282){
return jq.trim(_280).search(/^-?[0-9]+\.[0-9]{2}$/)!=-1;
},"Please enter a valid dollar and cents amount such as 50.04 or -0.26");
(function(_283,$,_284){
"use strict";
var _285=$.event,_286;
_285.special.smartresize={setup:function(){
$(this).bind("resize",_285.special.smartresize.handler);
},teardown:function(){
$(this).unbind("resize",_285.special.smartresize.handler);
},handler:function(_287,_288){
var _289=this,args=arguments;
_287.type="smartresize";
if(_286){
clearTimeout(_286);
}
_286=setTimeout(function(){
jQuery.event.handle.apply(_289,args);
},_288==="execAsap"?0:100);
}};
$.fn.smartresize=function(fn){
return fn?this.bind("smartresize",fn):this.trigger("smartresize",["execAsap"]);
};
$.Mason=function(_28a,_28b){
this.element=$(_28b);
this._create(_28a);
this._init();
};
$.Mason.settings={isResizable:true,isAnimated:false,animationOptions:{queue:false,duration:500},gutterWidth:0,isRTL:false,isFitWidth:false,containerStyle:{position:"relative"}};
$.Mason.prototype={_filterFindBricks:function(_28c){
var _28d=this.options.itemSelector;
return !_28d?_28c:_28c.filter(_28d).add(_28c.find(_28d));
},_getBricks:function(_28e){
var _28f=this._filterFindBricks(_28e).css({position:"absolute"}).addClass("masonry-brick");
return _28f;
},_create:function(_290){
this.options=$.extend(true,{},$.Mason.settings,_290);
this.styleQueue=[];
var _291=this.element[0].style;
this.originalStyle={height:_291.height||""};
var _292=this.options.containerStyle;
for(var prop in _292){
this.originalStyle[prop]=_291[prop]||"";
}
this.element.css(_292);
this.horizontalDirection=this.options.isRTL?"right":"left";
this.offset={x:parseInt(this.element.css("padding-"+this.horizontalDirection),10),y:parseInt(this.element.css("padding-top"),10)};
this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth==="function";
var _293=this;
setTimeout(function(){
_293.element.addClass("masonry");
},0);
if(this.options.isResizable){
$(_283).bind("smartresize.masonry",function(){
_293.resize();
});
}
this.reloadItems();
},_init:function(_294){
this._getColumns();
this._reLayout(_294);
},option:function(key,_295){
if($.isPlainObject(key)){
this.options=$.extend(true,this.options,key);
}
},layout:function(_296,_297){
for(var i=0,len=_296.length;i<len;i++){
this._placeBrick(_296[i]);
}
var _298={};
_298.height=Math.max.apply(Math,this.colYs);
if(this.options.isFitWidth){
var _299=0;
i=this.cols;
while(--i){
if(this.colYs[i]!==0){
break;
}
_299++;
}
_298.width=(this.cols-_299)*this.columnWidth-this.options.gutterWidth;
}
this.styleQueue.push({$el:this.element,style:_298});
var _29a=!this.isLaidOut?"css":(this.options.isAnimated?"animate":"css"),_29b=this.options.animationOptions;
var obj;
for(i=0,len=this.styleQueue.length;i<len;i++){
obj=this.styleQueue[i];
obj.$el[_29a](obj.style,_29b);
}
this.styleQueue=[];
if(_297){
_297.call(_296);
}
this.isLaidOut=true;
},_getColumns:function(){
var _29c=this.options.isFitWidth?this.element.parent():this.element,_29d=_29c.width();
this.columnWidth=this.isFluid?this.options.columnWidth(_29d):this.options.columnWidth||this.$bricks.outerWidth(true)||_29d;
this.columnWidth+=this.options.gutterWidth;
this.cols=Math.floor((_29d+this.options.gutterWidth)/this.columnWidth);
this.cols=Math.max(this.cols,1);
},_placeBrick:function(_29e){
var _29f=$(_29e),_2a0,_2a1,_2a2,_2a3,j;
_2a0=Math.ceil(_29f.outerWidth(true)/(this.columnWidth+this.options.gutterWidth));
_2a0=Math.min(_2a0,this.cols);
if(_2a0===1){
_2a2=this.colYs;
}else{
_2a1=this.cols+1-_2a0;
_2a2=[];
for(j=0;j<_2a1;j++){
_2a3=this.colYs.slice(j,j+_2a0);
_2a2[j]=Math.max.apply(Math,_2a3);
}
}
var _2a4=Math.min.apply(Math,_2a2),_2a5=0;
for(var i=0,len=_2a2.length;i<len;i++){
if(_2a2[i]===_2a4){
_2a5=i;
break;
}
}
var _2a6={top:_2a4+this.offset.y};
_2a6[this.horizontalDirection]=this.columnWidth*_2a5+this.offset.x;
this.styleQueue.push({$el:_29f,style:_2a6});
var _2a7=_2a4+_29f.outerHeight(true),_2a8=this.cols+1-len;
for(i=0;i<_2a8;i++){
this.colYs[_2a5+i]=_2a7;
}
},resize:function(){
var _2a9=this.cols;
this._getColumns();
if(this.isFluid||this.cols!==_2a9){
this._reLayout();
}
},_reLayout:function(_2aa){
var i=this.cols;
this.colYs=[];
while(i--){
this.colYs.push(0);
}
this.layout(this.$bricks,_2aa);
},reloadItems:function(){
this.$bricks=this._getBricks(this.element.children());
},reload:function(_2ab){
this.reloadItems();
this._init(_2ab);
},appended:function(_2ac,_2ad,_2ae){
if(_2ad){
this._filterFindBricks(_2ac).css({top:this.element.height()});
var _2af=this;
setTimeout(function(){
_2af._appended(_2ac,_2ae);
},1);
}else{
this._appended(_2ac,_2ae);
}
},_appended:function(_2b0,_2b1){
var _2b2=this._getBricks(_2b0);
this.$bricks=this.$bricks.add(_2b2);
this.layout(_2b2,_2b1);
},remove:function(_2b3){
this.$bricks=this.$bricks.not(_2b3);
_2b3.remove();
},destroy:function(){
this.$bricks.removeClass("masonry-brick").each(function(){
this.style.position="";
this.style.top="";
this.style.left="";
});
var _2b4=this.element[0].style;
for(var prop in this.originalStyle){
_2b4[prop]=this.originalStyle[prop];
}
this.element.unbind(".masonry").removeClass("masonry").removeData("masonry");
$(_283).unbind(".masonry");
}};
$.fn.imagesLoaded=function(_2b5){
var _2b6=this,_2b7=_2b6.find("img").add(_2b6.filter("img")),len=_2b7.length,_2b8="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",_2b9=[];
function _2ba(){
_2b5.call(_2b6,_2b7);
};
function _2bb(_2bc){
var img=_2bc.target;
if(img.src!==_2b8&&$.inArray(img,_2b9)===-1){
_2b9.push(img);
if(--len<=0){
setTimeout(_2ba);
_2b7.unbind(".imagesLoaded",_2bb);
}
}
};
if(!len){
_2ba();
}
_2b7.bind("load.imagesLoaded error.imagesLoaded",_2bb).each(function(){
var src=this.src;
this.src=_2b8;
this.src=src;
});
return _2b6;
};
var _2bd=function(_2be){
if(_283.console){
_283.console.error(_2be);
}
};
$.fn.masonry=function(_2bf){
if(typeof _2bf==="string"){
var args=Array.prototype.slice.call(arguments,1);
this.each(function(){
var _2c0=$.data(this,"masonry");
if(!_2c0){
_2bd("cannot call methods on masonry prior to initialization; "+"attempted to call method '"+_2bf+"'");
return;
}
if(!$.isFunction(_2c0[_2bf])||_2bf.charAt(0)==="_"){
_2bd("no such method '"+_2bf+"' for masonry instance");
return;
}
_2c0[_2bf].apply(_2c0,args);
});
}else{
this.each(function(){
var _2c1=$.data(this,"masonry");
if(_2c1){
_2c1.option(_2bf||{});
_2c1._init();
}else{
$.data(this,"masonry",new $.Mason(_2bf,this));
}
});
}
return this;
};
})(window,jQuery);
(function($){
var tmp,_2c2,_2c3,wrap,_2c4,_2c5,_2c6,_2c7,_2c8,_2c9=0,_2ca={},_2cb=[],_2cc=0,_2cd={},_2ce=[],_2cf=null,_2d0=new Image(),_2d1=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,_2d2=/[^\.]\.(swf)\s*$/i,_2d3,_2d4=1,_2d5,_2d6,busy=false,_2d7=20,fx=$.extend($("<div/>")[0],{prop:0}),_2d8=0,_2d9=!$.support.opacity&&!window.XMLHttpRequest,_2da=function(){
_2c2.hide();
_2d0.onerror=_2d0.onload=null;
if(_2cf){
_2cf.abort();
}
tmp.empty();
},_2db=function(){
$.fancybox("<p id=\"fancybox_error\">The requested content cannot be loaded.<br />Please try again later.</p>",{"scrolling":"no","padding":20,"transitionIn":"none","transitionOut":"none"});
},_2dc=function(){
return [$(window).width(),$(window).height(),$(document).scrollLeft(),$(document).scrollTop()];
},_2dd=function(){
var view=_2dc(),to={},_2de=_2cd.margin,_2df=_2cd.autoScale,_2e0=(_2d7+_2de)*2,_2e1=(_2d7+_2de)*2,_2e2=(_2cd.padding*2),_2e3;
if(_2cd.width.toString().indexOf("%")>-1){
to.width=((view[0]*parseFloat(_2cd.width))/100)-(_2d7*2);
_2df=false;
}else{
to.width=_2cd.width+_2e2;
}
if(_2cd.height.toString().indexOf("%")>-1){
to.height=((view[1]*parseFloat(_2cd.height))/100)-(_2d7*2);
_2df=false;
}else{
to.height=_2cd.height+_2e2;
}
if(_2df&&(to.width>(view[0]-_2e0)||to.height>(view[1]-_2e1))){
if(_2ca.type=="image"||_2ca.type=="swf"){
_2e0+=_2e2;
_2e1+=_2e2;
_2e3=Math.min(Math.min(view[0]-_2e0,_2cd.width)/_2cd.width,Math.min(view[1]-_2e1,_2cd.height)/_2cd.height);
to.width=Math.round(_2e3*(to.width-_2e2))+_2e2;
to.height=Math.round(_2e3*(to.height-_2e2))+_2e2;
}else{
to.width=Math.min(to.width,(view[0]-_2e0));
to.height=Math.min(to.height,(view[1]-_2e1));
}
}
to.top=view[3]+((view[1]-(to.height+(_2d7*2)))*0.5);
if(_2cd.minWidth==false){
to.left=view[2]+((view[0]-(to.width+(_2d7*2)))*0.5);
}else{
to.left=view[2]+((view[0]-(Math.max(to.width,_2cd.minWidth)+(_2d7*2)))*0.5);
}
if(_2cd.autoScale===false){
to.top=Math.max(view[3]+_2de,to.top);
to.left=Math.max(view[2]+_2de,to.left);
}
return to;
},_2e4=function(_2e5){
if(_2e5&&_2e5.length){
switch(_2cd.titlePosition){
case "inside":
return _2e5;
case "over":
return "<span id=\"fancybox-title-over\">"+_2e5+"</span>";
default:
return "<span id=\"fancybox-title-wrap\"><span id=\"fancybox-title-left\"></span><span id=\"fancybox-title-main\">"+_2e5+"</span><span id=\"fancybox-title-right\"></span></span>";
}
}
return false;
},_2e6=function(){
var _2e7=_2cd.title,_2e8=_2d6.width-(_2cd.padding*2),_2e9="fancybox-title-"+_2cd.titlePosition;
$("#fancybox-title").remove();
_2d8=0;
if(_2cd.titleShow===false){
return;
}
_2e7=$.isFunction(_2cd.titleFormat)?_2cd.titleFormat(_2e7,_2ce,_2cc,_2cd):_2e4(_2e7);
if(!_2e7||_2e7===""){
return;
}
$("<div id=\"fancybox-title\" class=\""+_2e9+"\" />").css({"width":_2e8,"paddingLeft":_2cd.padding,"paddingRight":_2cd.padding}).html(_2e7).appendTo("body");
switch(_2cd.titlePosition){
case "inside":
_2d8=$("#fancybox-title").outerHeight(true)-_2cd.padding;
_2d6.height+=_2d8;
break;
case "over":
$("#fancybox-title").css("bottom",_2cd.padding);
break;
default:
$("#fancybox-title").css("bottom",$("#fancybox-title").outerHeight(true)*-1);
break;
}
$("#fancybox-title").appendTo(_2c4).hide();
},_2ea=function(){
$(document).unbind("keydown.fb").bind("keydown.fb",function(e){
if(e.keyCode==27&&_2cd.enableEscapeButton){
e.preventDefault();
$.fancybox.close();
}else{
if(e.keyCode==37){
e.preventDefault();
$.fancybox.prev();
}else{
if(e.keyCode==39){
e.preventDefault();
$.fancybox.next();
}
}
}
});
if($.fn.mousewheel){
wrap.unbind("mousewheel.fb");
if(_2ce.length>1){
wrap.bind("mousewheel.fb",function(e,_2eb){
e.preventDefault();
if(busy||_2eb===0){
return;
}
if(_2eb>0){
$.fancybox.prev();
}else{
$.fancybox.next();
}
});
}
}
if(!_2cd.showNavArrows){
return;
}
if((_2cd.cyclic&&_2ce.length>1)||_2cc!==0){
_2c7.show();
}
if((_2cd.cyclic&&_2ce.length>1)||_2cc!=(_2ce.length-1)){
_2c8.show();
}
},_2ec=function(){
var href,_2ed;
if((_2ce.length-1)>_2cc){
href=_2ce[_2cc+1].href;
if(typeof href!=="undefined"&&href.match(_2d1)){
_2ed=new Image();
_2ed.src=href;
}
}
if(_2cc>0){
href=_2ce[_2cc-1].href;
if(typeof href!=="undefined"&&href.match(_2d1)){
_2ed=new Image();
_2ed.src=href;
}
}
},_2ee=function(){
_2c5.css("overflow",(_2cd.scrolling=="auto"?(_2cd.type=="image"||_2cd.type=="iframe"||_2cd.type=="swf"?"hidden":"auto"):(_2cd.scrolling=="yes"?"auto":"visible")));
if(!$.support.opacity){
_2c5.get(0).style.removeAttribute("filter");
wrap.get(0).style.removeAttribute("filter");
}
$("#fancybox-title").show();
if(_2cd.hideOnContentClick){
_2c5.one("click",$.fancybox.close);
}
if(_2cd.hideOnOverlayClick){
_2c3.one("click",$.fancybox.close);
}
if(_2cd.showCloseButton){
_2c6.show();
}
_2ea();
$(window).bind("resize.fb",$.fancybox.center);
if(_2cd.centerOnScroll){
$(window).bind("scroll.fb",$.fancybox.center);
}else{
$(window).unbind("scroll.fb");
}
if($.isFunction(_2cd.onComplete)){
_2cd.onComplete(_2ce,_2cc,_2cd);
}
busy=false;
_2ec();
},_2ef=function(pos){
var _2f0=Math.round(_2d5.width+(_2d6.width-_2d5.width)*pos),_2f1=Math.round(_2d5.height+(_2d6.height-_2d5.height)*pos),top=Math.round(_2d5.top+(_2d6.top-_2d5.top)*pos),left=Math.round(_2d5.left+(_2d6.left-_2d5.left)*pos);
wrap.css({"width":_2f0+"px","height":_2f1+"px","top":top+"px","left":left+"px"});
_2f0=Math.max(_2f0-_2cd.padding*2,0);
_2f1=Math.max(_2f1-(_2cd.padding*2+(_2d8*pos)),0);
_2c5.css({"width":_2f0+"px","height":_2f1+"px"});
if(typeof _2d6.opacity!=="undefined"){
wrap.css("opacity",(pos<0.5?0.5:pos));
}
},_2f2=function(obj){
var pos=obj.offset();
pos.top+=parseFloat(obj.css("paddingTop"))||0;
pos.left+=parseFloat(obj.css("paddingLeft"))||0;
pos.top+=parseFloat(obj.css("border-top-width"))||0;
pos.left+=parseFloat(obj.css("border-left-width"))||0;
pos.width=obj.width();
pos.height=obj.height();
return pos;
},_2f3=function(){
var orig=_2ca.orig?$(_2ca.orig):false,from={},pos,view;
if(orig&&orig.length){
pos=_2f2(orig);
from={width:(pos.width+(_2cd.padding*2)),height:(pos.height+(_2cd.padding*2)),top:(pos.top-_2cd.padding-_2d7),left:(pos.left-_2cd.padding-_2d7)};
}else{
view=_2dc();
from={width:1,height:1,top:view[3]+view[1]*0.5,left:view[2]+view[0]*0.5};
}
return from;
},_2f4=function(){
_2c2.hide();
if(wrap.is(":visible")&&$.isFunction(_2cd.onCleanup)){
if(_2cd.onCleanup(_2ce,_2cc,_2cd)===false){
$.event.trigger("fancybox-cancel");
busy=false;
return;
}
}
_2ce=_2cb;
_2cc=_2c9;
_2cd=_2ca;
_2c5.get(0).scrollTop=0;
_2c5.get(0).scrollLeft=0;
if(_2cd.overlayShow){
if(_2d9){
$("select:not(#fancybox-tmp select)").filter(function(){
return this.style.visibility!=="hidden";
}).css({"visibility":"hidden"}).one("fancybox-cleanup",function(){
this.style.visibility="inherit";
});
}
_2c3.css({"background-color":_2cd.overlayColor,"opacity":_2cd.overlayOpacity}).unbind().show();
}
_2d6=_2dd();
_2e6();
if(wrap.is(":visible")){
$(_2c6.add(_2c7).add(_2c8)).hide();
var pos=wrap.position(),_2f5;
_2d5={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
_2f5=(_2d5.width==_2d6.width&&_2d5.height==_2d6.height);
_2c5.fadeOut(_2cd.changeFade,function(){
var _2f6=function(){
_2c5.html(tmp.contents()).fadeIn(_2cd.changeFade,_2ee);
};
$.event.trigger("fancybox-change");
_2c5.empty().css("overflow","hidden");
if(_2f5){
_2c5.css({top:_2cd.padding,left:_2cd.padding,width:Math.max(_2d6.width-(_2cd.padding*2),1),height:Math.max(_2d6.height-(_2cd.padding*2)-_2d8,1)});
_2f6();
}else{
_2c5.css({top:_2cd.padding,left:_2cd.padding,width:Math.max(_2d5.width-(_2cd.padding*2),1),height:Math.max(_2d5.height-(_2cd.padding*2),1)});
fx.prop=0;
$(fx).animate({prop:1},{duration:_2cd.changeSpeed,easing:_2cd.easingChange,step:_2ef,complete:_2f6});
}
});
return;
}
wrap.css("opacity",1);
if(_2cd.transitionIn=="elastic"){
_2d5=_2f3();
_2c5.css({top:_2cd.padding,left:_2cd.padding,width:Math.max(_2d5.width-(_2cd.padding*2),1),height:Math.max(_2d5.height-(_2cd.padding*2),1)}).html(tmp.contents());
wrap.css(_2d5).show();
if(_2cd.opacity){
_2d6.opacity=0;
}
fx.prop=0;
$(fx).animate({prop:1},{duration:_2cd.speedIn,easing:_2cd.easingIn,step:_2ef,complete:_2ee});
}else{
_2c5.css({top:_2cd.padding,left:_2cd.padding,width:Math.max(_2d6.width-(_2cd.padding*2),1),height:Math.max(_2d6.height-(_2cd.padding*2)-_2d8,1)}).html(tmp.contents());
wrap.css(_2d6).fadeIn(_2cd.transitionIn=="none"?0:_2cd.speedIn,_2ee);
}
},_2f7=function(){
tmp.width(_2ca.width);
tmp.height(_2ca.height);
if(_2ca.width=="auto"){
_2ca.width=tmp.width();
}
if(_2ca.height=="auto"){
_2ca.height=tmp.height();
}
_2f4();
},_2f8=function(){
busy=true;
_2ca.width=_2d0.width;
_2ca.height=_2d0.height;
$("<img />").attr({"id":"fancybox-img","src":_2d0.src,"alt":_2ca.title}).appendTo(tmp);
_2f4();
},_2f9=function(){
_2da();
var obj=_2cb[_2c9],href,type,_2fa,str,emb,_2fb,data;
_2ca=$.extend({},$.fn.fancybox.defaults,(typeof $(obj).data("fancybox")=="undefined"?_2ca:$(obj).data("fancybox")));
_2fa=obj.title||$(obj).title||_2ca.title||"";
if(obj.nodeName&&!_2ca.orig){
_2ca.orig=$(obj).children("img:first").length?$(obj).children("img:first"):$(obj);
}
if(_2fa===""&&_2ca.orig){
_2fa=_2ca.orig.attr("alt");
}
if(obj.nodeName&&(/^(?:javascript|#)/i).test(jq(obj).attr("href"))){
lb=jq(obj).attr("data-lightbox");
href=lb||_2ca.href||null;
}else{
href=_2ca.href||obj.href||null;
}
if(typeof href=="function"){
href=href();
}
if(_2ca.type){
type=_2ca.type;
if(!href){
href=_2ca.content;
}
}else{
if(_2ca.content){
type="html";
}else{
if(href){
if(href.match(_2d1)){
type="image";
}else{
if(href.match(_2d2)){
type="swf";
}else{
if($(obj).hasClass("iframe")){
type="iframe";
}else{
if(href.match(/#/)){
obj=href.substr(href.indexOf("#"));
type=$(obj).length>0?"inline":"ajax";
}else{
type="ajax";
}
}
}
}
}else{
type="inline";
}
}
}
_2ca.type=type;
_2ca.href=href;
_2ca.title=_2fa;
if(_2ca.autoDimensions&&_2ca.type!=="iframe"&&_2ca.type!=="swf"){
_2ca.width="auto";
_2ca.height="auto";
}
if(_2ca.modal){
_2ca.overlayShow=true;
_2ca.hideOnOverlayClick=false;
_2ca.hideOnContentClick=false;
_2ca.enableEscapeButton=false;
_2ca.showCloseButton=false;
}
if($.isFunction(_2ca.onStart)){
if(_2ca.onStart(_2cb,_2c9,_2ca)===false){
busy=false;
return;
}
}
tmp.css("padding",(_2d7+_2ca.padding+_2ca.margin));
$(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){
$(this).replaceWith(_2c5.children());
});
switch(type){
case "html":
tmp.html(_2ca.content);
_2f7();
break;
case "inline":
$("<div class=\"fancybox-inline-tmp\" />").hide().insertBefore($(obj)).bind("fancybox-cleanup",function(){
$(this).replaceWith(_2c5.children());
}).bind("fancybox-cancel",function(){
$(this).replaceWith(tmp.children());
});
$(obj).appendTo(tmp);
_2f7();
break;
case "image":
busy=false;
$.fancybox.showActivity();
_2d0=new Image();
_2d0.onerror=function(){
_2db();
};
_2d0.onload=function(){
_2d0.onerror=null;
_2d0.onload=null;
_2f8();
};
_2d0.src=href;
break;
case "swf":
str="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+_2ca.width+"\" height=\""+_2ca.height+"\"><param name=\"movie\" value=\""+href+"\"></param>";
emb="";
$.each(_2ca.swf,function(name,val){
str+="<param name=\""+name+"\" value=\""+val+"\"></param>";
emb+=" "+name+"=\""+val+"\"";
});
str+="<embed src=\""+href+"\" type=\"application/x-shockwave-flash\" width=\""+_2ca.width+"\" height=\""+_2ca.height+"\""+emb+"></embed></object>";
tmp.html(str);
_2f7();
break;
case "ajax":
_2fb=href.split("#",2);
data=_2ca.ajax.data||{};
if(_2fb.length>1){
href=_2fb[0];
if(typeof data=="string"){
data+="&selector="+_2fb[1];
}else{
data.selector=_2fb[1];
}
}
busy=false;
$.fancybox.showActivity();
_2cf=$.ajax($.extend(_2ca.ajax,{url:href,data:data,error:_2db,success:function(data,_2fc,_2fd){
if(_2cf.status==200){
tmp.html(data);
_2f7();
}
}}));
break;
case "iframe":
$("<iframe id=\"fancybox-frame\" name=\"fancybox-frame"+new Date().getTime()+"\" frameborder=\"0\" hspace=\"0\" scrolling=\""+_2ca.scrolling+"\" src=\""+_2ca.href+"\"></iframe>").appendTo(tmp);
_2f4();
break;
}
},_2fe=function(){
if(!_2c2.is(":visible")){
clearInterval(_2d3);
return;
}
$("div",_2c2).css("top",(_2d4*-40)+"px");
_2d4=(_2d4+1)%12;
},_2ff=function(){
if($("#fancybox-wrap").length){
return;
}
$("body").append(tmp=$("<div id=\"fancybox-tmp\"></div>"),_2c2=$("<div id=\"fancybox-loading\"><div></div></div>"),_2c3=$("<div id=\"fancybox-overlay\"></div>"),wrap=$("<div id=\"fancybox-wrap\"></div>"));
if(!$.support.opacity){
wrap.addClass("fancybox-ie");
_2c2.addClass("fancybox-ie");
}
_2c4=$("<div id=\"fancybox-outer\"></div>").append("<div class=\"fancy-bg\" id=\"fancy-bg-n\"></div><div class=\"fancy-bg\" id=\"fancy-bg-ne\"></div><div class=\"fancy-bg\" id=\"fancy-bg-e\"></div><div class=\"fancy-bg\" id=\"fancy-bg-se\"></div><div class=\"fancy-bg\" id=\"fancy-bg-s\"></div><div class=\"fancy-bg\" id=\"fancy-bg-sw\"></div><div class=\"fancy-bg\" id=\"fancy-bg-w\"></div><div class=\"fancy-bg\" id=\"fancy-bg-nw\"></div>").appendTo(wrap);
_2c4.append(_2c5=$("<div id=\"fancybox-inner\"></div>"),_2c6=$("<a id=\"fancybox-close\"></a>"),_2c7=$("<a href=\"javascript:;\" id=\"fancybox-left\"><span class=\"fancy-ico\" id=\"fancybox-left-ico\"></span></a>"),_2c8=$("<a href=\"javascript:;\" id=\"fancybox-right\"><span class=\"fancy-ico\" id=\"fancybox-right-ico\"></span></a>"));
_2c6.click($.fancybox.close);
_2c2.click($.fancybox.cancel);
_2c7.click(function(e){
e.preventDefault();
$.fancybox.prev();
});
_2c8.click(function(e){
e.preventDefault();
$.fancybox.next();
});
if(_2d9){
_2c3.get(0).style.setExpression("height","document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'");
_2c2.get(0).style.setExpression("top","(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'");
_2c4.prepend("<iframe id=\"fancybox-hide-sel-frame\" src=\"javascript:'';\" scrolling=\"no\" frameborder=\"0\" ></iframe>");
}
};
$.fn.fancybox=function(_300){
$(this).data("fancybox",$.extend({},_300,($.metadata?$(this).metadata():{}))).unbind("click.fb").bind("click.fb",function(e){
e.preventDefault();
if(busy){
return;
}
busy=true;
$(this).blur();
_2cb=[];
_2c9=0;
var rel=$(this).attr("rel")||"";
if(!rel||rel==""||rel==="nofollow"){
_2cb.push(this);
}else{
_2cb=$("a[rel="+rel+"], area[rel="+rel+"]");
_2c9=_2cb.index(this);
}
_2f9();
return false;
});
return this;
};
$.fancybox=function(obj){
if(busy){
return;
}
busy=true;
var opts=typeof arguments[1]!=="undefined"?arguments[1]:{};
_2cb=[];
_2c9=opts.index||0;
if($.isArray(obj)){
for(var i=0,j=obj.length;i<j;i++){
if(typeof obj[i]=="object"){
$(obj[i]).data("fancybox",$.extend({},opts,obj[i]));
}else{
obj[i]=$({}).data("fancybox",$.extend({content:obj[i]},opts));
}
}
_2cb=jQuery.merge(_2cb,obj);
}else{
if(typeof obj=="object"){
$(obj).data("fancybox",$.extend({},opts,obj));
}else{
obj=$({}).data("fancybox",$.extend({content:obj},opts));
}
_2cb.push(obj);
}
if(_2c9>_2cb.length||_2c9<0){
_2c9=0;
}
_2f9();
};
$.fancybox.showActivity=function(){
clearInterval(_2d3);
_2c2.show();
_2d3=setInterval(_2fe,66);
};
$.fancybox.hideActivity=function(){
_2c2.hide();
};
$.fancybox.next=function(){
return $.fancybox.pos(_2cc+1);
};
$.fancybox.prev=function(){
return $.fancybox.pos(_2cc-1);
};
$.fancybox.pos=function(pos){
if(busy){
return;
}
pos=parseInt(pos,10);
if(pos>-1&&_2ce.length>pos){
_2c9=pos;
_2f9();
}
if(_2cd.cyclic&&_2ce.length>1&&pos<0){
_2c9=_2ce.length-1;
_2f9();
}
if(_2cd.cyclic&&_2ce.length>1&&pos>=_2ce.length){
_2c9=0;
_2f9();
}
return;
};
$.fancybox.cancel=function(){
if(busy){
return;
}
busy=true;
$.event.trigger("fancybox-cancel");
_2da();
if(_2ca&&$.isFunction(_2ca.onCancel)){
_2ca.onCancel(_2cb,_2c9,_2ca);
}
busy=false;
};
$.fancybox.close=function(){
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
if(_2cd&&$.isFunction(_2cd.onCleanup)){
if(_2cd.onCleanup(_2ce,_2cc,_2cd)===false){
busy=false;
return;
}
}
_2da();
$(_2c6.add(_2c7).add(_2c8)).hide();
$("#fancybox-title").remove();
wrap.add(_2c5).add(_2c3).unbind();
$(window).unbind("resize.fb scroll.fb");
$(document).unbind("keydown.fb");
function _301(){
_2c3.fadeOut("fast");
wrap.hide();
$.event.trigger("fancybox-cleanup");
_2c5.empty();
if($.isFunction(_2cd.onClosed)){
_2cd.onClosed(_2ce,_2cc,_2cd);
}
_2ce=_2ca=[];
_2cc=_2c9=0;
_2cd=_2ca={};
busy=false;
};
_2c5.css("overflow","hidden");
if(_2cd.transitionOut=="elastic"){
_2d5=_2f3();
var pos=wrap.position();
_2d6={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
if(_2cd.opacity){
_2d6.opacity=1;
}
fx.prop=1;
$(fx).animate({prop:0},{duration:_2cd.speedOut,easing:_2cd.easingOut,step:_2ef,complete:_301});
}else{
wrap.fadeOut(_2cd.transitionOut=="none"?0:_2cd.speedOut,_301);
}
};
$.fancybox.resize=function(){
var c,h;
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
c=_2c5.wrapInner("<div style='overflow:auto'></div>").children();
h=c.height();
wrap.css({height:h+(_2cd.padding*2)+_2d8});
_2c5.css({height:h});
c.replaceWith(c.children());
$.fancybox.center();
};
$.fancybox.center=function(){
busy=true;
var view=_2dc(),_302=_2cd.margin,to={};
to.top=view[3]+((view[1]-((wrap.height()-_2d8)+(_2d7*2)))*0.5);
to.left=view[2]+((view[0]-(wrap.width()+(_2d7*2)))*0.5);
to.top=Math.max(view[3]+_302,to.top);
to.left=Math.max(view[2]+_302,to.left);
wrap.css(to);
busy=false;
};
$.fn.fancybox.defaults={padding:10,margin:20,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,minWidth:false,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.3,overlayColor:"#666",titleShow:true,titlePosition:"outside",titleFormat:null,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,onStart:null,onCancel:null,onComplete:null,onCleanup:null,onClosed:null};
$(document).ready(function(){
_2ff();
});
})(jQuery);

