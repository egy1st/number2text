boonity={site:null,options:{},dyn_color:{},deployed_host:"payload.yieldbuild.com",get_url:function(_1){
if(boonity.is_deployed()&&(boonity.site==1491||boonity.site==1686)){
boonity.deployed_host="newpayload.yieldbuild.com";
}
var _2="http://"+boonity.host()+"/ad/inline"+"?url="+boonity.clean_uri_field(window.location)+"&is_framed="+boonity.in_cross_iframe()+"&can_cookie="+boonity.can_cookie()+"&site_id="+boonity.site+"&loc="+_1+"&rnd="+boonity.rand_int()+"&layout="+yieldbuild_layout+"&channel="+yieldbuild_channel+"&category="+yieldbuild_category+boonity.url_options();
if(document.referrer){
_2+="&referrer="+boonity.clean_uri_field(document.referrer);
}
if(this.options.dynamic_bg){
_2+="&dyn_bg="+this.options.dynamic_bg;
}
if(this.options.dynamic_ti){
_2+="&dyn_ti="+this.options.dynamic_ti;
}
if(this.options.dynamic_txt){
_2+="&dyn_txt="+this.options.dynamic_txt;
}
if(this.options.force_baseline=="true"){
_2+="&force_baseline="+this.options.force_baseline;
}
return _2;
},get_iframe_url:function(_3){
var _4=boonity.get_canon("boonity_ads");
if(_4[_3]&&_4[_3].length>0){
if(boonity.site==5&&_3!="sub_rate_it"){
boonity.options.google_channels=(boonity.is_refresh)?"9638158787":"0384787205";
}
return "http://"+boonity.host()+"/ad/iframe?"+"ag_id="+boonity.get_canon("ag_id")+"&site_id="+boonity.site+"&location="+_3+"&ft="+_4[_3+"_ft"]+boonity.url_options();
}
return "http://hubpages.com/i/s.gif";
},find_element:function(_5,_6){
while(_5.parentNode&&(!_5.tagName||!_6(_5))){
_5=_5.parentNode;
}
return _5;
},set_canon_ref:function(){
if(window.boonity_canon){
return;
}
if(parent==window){
window.boonity_canon={};
}else{
try{
if(!parent.boonity_canon){
parent.boonity_canon={};
}
window.boonity_canon=parent.boonity_canon;
}
catch(e){
}
if(!window.boonity_canon){
window.boonity_canon={};
}
}
},get_canon:function(_7){
boonity.set_canon_ref();
if(typeof window.boonity_canon[_7]!="undefined"){
return window.boonity_canon[_7];
}
return false;
},set_canon:function(_8,_9){
boonity.set_canon_ref();
window.boonity_canon[_8]=_9;
},merge_canon:function(_a,_b){
var _c=boonity.get_canon(_a);
if(!_c){
boonity.set_canon(_a,_b);
}else{
for(var _d in _b){
_c[_d]=_b[_d];
}
}
},get_tracker:function(){
var tr=boonity.get_canon("boonity_tracker");
if(tr&&document.referrer){
tr+="&referrer="+boonity.clean_uri_field(document.referrer);
}
return tr;
},get_ads:function(){
return this.get_canon("boonity_ads");
},get_opt:function(_f){
if(boonity.options[_f]){
return "&"+_f+"="+boonity.options[_f];
}
return "";
},no_log:function(){
return boonity.get_canon("boonity_no_log");
},url_options:function(){
var _10="";
_10+=boonity.get_opt("cj_pid");
_10+=boonity.get_opt("google_adclient");
_10+=boonity.get_opt("google_channels");
_10+=boonity.get_opt("pubcenter_channels");
_10+=boonity.get_opt("microsoft_pg");
if(_10.length>0){
_10+="&options=1";
}
return _10;
},fetch_ads:function(_11){
boonity.set_canon("started_fetch",window);
if(!boonity.options.dynamic_bg){
var _12=null;
var _13=boonity.last_dom_node();
var _14=boonity.find_element(_13,function(ele){
var bg=boonity.get_current_style(ele).backgroundColor;
return (bg&&bg!="transparent");
});
if(_14){
_12=boonity.get_current_style(_14).backgroundColor;
if(_12){
_12=_12.replace(/\#/,"");
boonity.options.dynamic_bg=_12;
}
}
}
if(!boonity.options.dynamic_ti){
this.options.dynamic_ti=boonity.top_color("a","00f");
}
if(!boonity.options.dynamic_txt){
this.options.dynamic_ti=boonity.top_color("p","000");
}
if(!boonity.get_ads()){
document.write("<sc"+"ri"+"pt src=\""+boonity.get_url(_11)+"\" type=\"text/javascript\"> </sc"+"ript>");
}
},top_color:function(_17,_18){
var _19=_18;
try{
var _1a={};
var _1b=0;
var _1c=document.getElementsByTagName(_17);
for(i=0;i<_1c.length;i++){
var _1d=boonity.get_current_style(_1c[i]).color;
if(!_1a[_1d]){
_1a[_1d]=1;
}else{
_1a[_1d]+=1;
}
if(_1b<_1a[_1d]){
_19=_1d;
_1b=_1a[_1d];
}
}
_19=_19.replace(/\#/,"");
}
catch(e){
}
return _19;
},get_current_style:function(ele){
var _1f=false;
if(ele&&ele.nodeType!=9){
if(document.defaultView){
_1f=document.defaultView.getComputedStyle(ele,"");
}else{
_1f=ele.currentStyle;
}
}
return _1f;
},last_dom_node:function(){
var pos;
pos=document;
while(pos.lastChild&&pos.lastChild.nodeType==1){
pos=pos.lastChild;
}
return pos;
},refetch_ads:function(){
var _21=document.getElementsByTagName("head")[0];
if(!_21){
_21=document.body;
}
script=document.createElement("script");
script.id="boonity_refetch_"+boonity.rand_int();
script.type="text/javascript";
script.src=boonity.get_url("");
_21.appendChild(script);
},refresh:function(){
if(boonity.options.ajax){
boonity.is_refresh=true;
boonity.refetch_ads();
}
},refresh_iframes:function(){
for(i=0;i<boonity_iframes.length;i++){
dyn_bg_color=boonity.get_current_style(_22).backgroundColor;
var _23=boonity.last_dom_node();
var _22=boonity.find_element(_23,function(ele){
var bg=boonity.get_current_style(ele).backgroundColor;
return (bg&&bg!="transparent");
});
if(_22){
dyn_bg_color=boonity.get_current_style(_22).backgroundColor;
if(dyn_bg_color){
dyn_bg_color=dyn_bg_color.replace(/\#/,"");
boonity.options.dynamic_bg="Ti-"+dyn_bg_color;
}
}
}
if(!boonity.get_ads()){
document.write("<sc"+"ri"+"pt src=\""+boonity.get_url(location)+"\" type=\"text/javascript\"> </sc"+"ript>");
}
},get_current_style:function(ele){
var _27=false;
if(ele&&ele.nodeType!=9){
if(document.defaultView){
_27=document.defaultView.getComputedStyle(ele,"");
}else{
_27=ele.currentStyle;
}
}
return _27;
},last_dom_node:function(){
var pos;
pos=document;
while(pos.lastChild&&pos.lastChild.nodeType==1){
pos=pos.lastChild;
}
return pos;
},refetch_ads:function(){
var _29=document.getElementsByTagName("head")[0];
if(!_29){
_29=document.body;
}
script=document.createElement("script");
script.id="boonity_refetch_"+boonity.rand_int();
script.type="text/javascript";
script.src=boonity.get_url("");
_29.appendChild(script);
},refresh:function(){
if(boonity.options.ajax){
boonity.is_refresh=true;
boonity.refetch_ads();
}
},refresh_iframes:function(){
for(i=0;i<boonity_iframes.length;i++){
var _2a=document.getElementById(boonity_iframes[i][0]);
if(_2a){
var _2b=boonity_iframes[i][1];
_2a.src=boonity.get_iframe_url(_2b);
_2a.width=local_ads[_2b+"_width"];
_2a.height=local_ads[_2b+"_height"];
}
}
var _2c="http://"+boonity.evhost()+"/log/event/"+boonity.site+"/"+boonity.get_canon("boonity_token")+"/"+boonity.get_canon("ag_id")+".gif";
boonity.assure_fimg(_2c);
},render_ad:function(){
if(!boonity.get_ads()){
var _2d=boonity.get_canon("started_fetch");
if(_2d&&_2d!=window){
setTimeout("window.location.reload();",1000);
}else{
boonity.fetch_ads(boonity_loc);
}
return;
}
boonity.render_pre_tracker();
var _2e=boonity.get_ads();
var _2f=_2e[boonity_loc];
if(boonity.options.ajax){
if(boonity.is_refresh){
boonity.refresh_iframes();
}else{
boonity.render_iframe();
}
}else{
if(_2f&&_2f.length>0){
document.write(_2f);
boonity.render_quantcast();
boonity.reveal_wrapper(boonity_loc);
}else{
if(_2f==null){
var url="http://"+boonity.host()+"/refill/refill?"+"url="+boonity.clean_uri_field(window.location)+"&site_id="+boonity.site+"&location="+boonity_loc+"&layout="+yieldbuild_layout+"&inline=true";
}
}
}
boonity.mark_ad_rendered(boonity_loc);
boonity.render_site_info_iframe(boonity_loc);
if(typeof yieldbuild_refill!="undefined"){
if(top){
if(top.postMessage){
top.postMessage("YB!"+yieldbuild_refill,"*");
}
}
}
},mark_ad_rendered:function(_31){
var _32=boonity.get_ads();
_32[_31+"_shown"]=true;
var _33=0;
var _34=0;
for(var key in _32){
if(key.search(/_loc_id$/)!=-1){
_34++;
}
if(key.search(/_shown$/)!=-1){
_33++;
}
}
if(_33==_34){
}
},render_pre_tracker:function(){
if(boonity.site!=1){
return;
}
var _36=boonity.get_tracker();
if(_36&&!boonity.no_log()&&!boonity.get_canon("boonity_pre_tracker")){
boonity.assure_fimg("http://"+boonity.evhost()+_36.replace("locs=c-","locs=d-"));
boonity.set_canon("boonity_pre_tracker",true);
}
},render_tracker:function(){
var _37=boonity.get_tracker();
if(_37&&!boonity.no_log()){
boonity.assure_fimg("http://"+boonity.evhost()+boonity.update_tracker_with_actives(_37)+boonity.get_page_time_tracker());
boonity.set_canon("boonity_tracker",false);
}
},get_page_time_tracker:function(){
if(typeof boonity_page_start_time!="undefined"){
return "&loadtime="+(new Date().getTime()-boonity_page_start_time.getTime());
}
return "";
},render_quantcast:function(){
if(!boonity.get_canon("boonity_rendered_quantcast")){
_qoptions={qacct:"p-40hb1Sup4Jk_U"};
document.write("<"+"script type=\"text/javascript\" src=\"http://edge.quantserve.com/quant.js\" "+">"+"</"+"script"+">");
boonity.set_canon("boonity_rendered_quantcast",1);
}
},split_tracker:function(_38){
return _38.match(/^(.*locs=c-)([^&]+)(\&?.*)$/);
},update_tracker_with_actives:function(_39){
var m=boonity.split_tracker(_39);
if(!m){
return _39;
}
var _3b=boonity.get_ad_statuses();
var _3c=boonity.get_dfp_spots();
var _3d=m[2].split("-");
var _3e=m[1];
for(var i=0;i<_3d.length;i++){
var _40=_3d[i].split(":")[0]|0;
var _41=_3d[i].split(":")[1]|0;
var _42;
var _43=_3b[_40];
if(typeof _43=="undefined"){
if(_3c[_40]){
_41="98";
_42="1";
}else{
_42="2";
}
}else{
if(_43){
_42="1";
}else{
_42="0";
}
}
for(var j=i+1;j<_3d.length;j++){
var _45=_3d[j].split(":")[0]|0;
if(_45==_40){
_42="4";
}
}
if(i>0){
_3e+="-";
}
_3e+=_40+":"+_41+":"+_42;
}
if(m[3]){
_3e+=m[3];
}
return _3e;
},get_dfp_spots:function(){
var doc=window.parent.document;
var _47=new Array();
var _48=doc.getElementsByTagName("div");
for(var i=0;i<_48.length;i++){
var d=_48[i];
var _4b=boonity.dfp_name(d);
if(_4b){
var _4c=boonity.get_ads()[_4b+"_loc_id"];
if(_4c){
_47[_4c]=true;
}
}
}
return _47;
},dfp_name:function(d){
var m=d.id.match(/_hub_([0-9a-z_]+)_\d+X\d+/i);
if(m){
return m[1];
}
return null;
},get_ad_statuses:function(){
var _4f=new Array();
boonity.add_ad_statuses_for_document(window.parent.document,_4f);
var _50;
try{
_50=parent.document.getElementsByTagName("iframe");
}
catch(e){
_50=window.document.getElementsByTagName("iframe");
}
for(var i=0;i<_50.length;i++){
var f=_50[i];
try{
var _53=f.contentWindow||f.contentDocument;
boonity.add_ad_statuses_for_document(_53.document,_4f);
}
catch(e){
}
}
return _4f;
},add_ad_statuses_for_document:function(doc,_55){
var _56=doc.getElementsByTagName("div");
for(var i=0;i<_56.length;i++){
var d=_56[i];
var m=d.id.match(/boonity_([0-9a-z_]+)/);
if(m){
var _5a=m[1];
var _5b=boonity.div_has_ad(d);
var _5c=boonity.get_ads()[_5a+"_loc_id"];
if(_5c){
_55[_5c]=_5b;
}
}
}
return _55;
},div_has_ad:function(obj){
if((obj.nodeName=="IMG"||obj.nodeName=="IFRAME"||obj.nodeName=="OBJECT"||obj.nodeName=="EMBED")&&obj.height&&obj.height>1){
return true;
}
if(obj.nodeName=="SCRIPT"){
var sib=obj.nextSibling;
if(!sib){
sib=obj.parentNode.nextSibling;
}
if(sib){
if(boonity.div_has_ad(sib)){
return true;
}
}
}
if(obj.hasChildNodes()){
for(var i=0;i<obj.childNodes.length;i++){
var _60=obj.childNodes[i];
if(boonity.div_has_ad(_60)){
return true;
}
}
}
return false;
},render_site_info_iframe:function(_61){
if(window.location.search.search(/boonity_site_info_scrape=1/)!=-1){
document.write("<div id=\"boonity_"+_61+"\"><iframe src=\"http://www.google.com/\" width=\"120\" height=\"3\" border=\"0\" frameborder=\"0\">&nbsp;</iframe></div>");
}
},render_iframe:function(){
if(boonity_loc&&boonity.get_canon("ag_id")){
var _62="b_if_"+boonity_loc;
var _63=boonity.get_iframe_url(boonity_loc);
var _64="<if"+"r"+"ame src=\""+_63+"\" id=\""+_62+"\" name=\""+_62+"\""+" width=\""+boonity.get_ads()[boonity_loc+"_width"]+"px\""+" height=\""+boonity.get_ads()[boonity_loc+"_height"]+"px\""+" frameborder=\"0\" scrolling=\"no\" hspace=\"0\" vspace=\"0\""+" marginheight=\"0\" marginwidth=\"0\"></iframe>";
document.write(_64);
boonity_iframes.push([_62,boonity_loc]);
}
},get_wrapper:function(_65){
var _66=document.getElementById(_65+"_wrapper");
return (_66)?_66:false;
},reveal_wrapper:function(_67){
var _68=boonity.get_wrapper(_67);
if(_68){
_68.style.display="";
}
},click_img_url:function(ele,_6a){
var _6b="http://"+boonity.evhost()+"/log/event/"+boonity.site+"/"+boonity.get_canon("boonity_token")+"/"+boonity.get_canon("ag_id")+".gif?"+"t_id="+_6a+"&category="+boonity.get_canon("boonity_category")+"&channel="+yieldbuild_channel+"&rnd="+boonity.rand_int();
if(ele){
if(ele.boon_loc_id){
_6b+="&locs="+ele.boon_loc_id;
}else{
if(ele.boon_loc){
_6b+="&locs="+ele.boon_loc;
}else{
if(ele.boon_rebased||ele.boon_not_supported_ad){
return false;
}else{
return false;
}
}
}
}
return _6b;
},log_feedback:function(ele,_6d){
boonity.current_ad_element=null;
if(!boonity.logging_feedback&&!boonity.no_log()){
boonity.logging_feedback=true;
var _6e=boonity.get_canon("click_count")||0;
if(_6d){
_6d+="&cc="+_6e;
}else{
_6d="cc="+_6e;
}
if(_6e<3){
if(ele.ft_id&&boonity.get_canon("ag_id")){
var _6f=boonity.click_img_url(ele,ele.ft_id);
if(_6f&&_6d){
_6f+="&"+_6d;
}
boonity.assure_fimg(_6f);
}
if(window.urchinTracker){
urchinTracker("/analytics/yieldbuild_click");
}
}
this.set_cookie_click_count(_6e);
setTimeout("boonity.logging_feedback = false",4000);
}
return false;
},get_cookie_click_count:function(){
var _70=0;
try{
var _71="boon_ct=";
var ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){
var _74=ca[i];
while(_74.charAt(0)==" "){
_74=_74.substring(1,_74.length);
}
if(_74.indexOf(_71)==0){
_70=parseInt(_74.substring(_71.length,_74.length));
}
}
_70++;
}
catch(e){
}
boonity.set_canon("click_count",_70);
},set_cookie_click_count:function(_75){
var _76=new Date();
_76.setTime(_76.getTime()+(10*60*1000));
document.cookie="boon_ct="+_75+"; expires="+_76.toGMTString()+"; path=/";
boonity.set_canon("click_count",_75);
},attach_onclicks:function(_77){
var els=document.getElementsByTagName(_77);
for(var i=0,_7a=0,ele=null;ele=els[i];i++){
_7a=boonity.determine_ft(ele);
if(_7a){
boonity.set_onclick_logger(ele,_7a);
}
}
},set_onclick_logger:function(ele,_7d){
ele.ft_id=_7d;
boonity.add_event(ele,"click",function(){
boonity.log_feedback(ele,"ev=click");
});
if(ele.tagName=="IFRAME"){
boonity.add_event(ele,"focus",boonity.onfocus_handler);
ele.onmouseover=function(){
boonity.current_ad_element=ele;
};
ele.onblur=ele.onmouseout=function(){
boonity.current_ad_element=null;
};
}
},onfocus_handler:function(e){
e=e||window.event;
if(boonity.current_ad_element){
boonity.log_feedback(this,"ev=focus");
}else{
boonity.log_feedback(this,"ev=focus_no_ele");
}
return false;
},onunload_handler:function(e){
e=e||window.event;
if(boonity.current_ad_element){
boonity.log_feedback(boonity.current_ad_element,"ev=unload");
}
},keydown_handler:function(e){
e=e||window.event;
if(e&&e.keyCode&&(e.keyCode==166||e.keyCode==167)){
boonity.current_ad_element=false;
}
return false;
},message_handler:function(e){
if(e.data.indexOf("YB!")!=0){
return;
}
var _82=e.data.slice(3);
var _83=boonity.get_canon("boonity_tracker");
if(_83&&!boonity.no_log()){
var m=boonity.split_tracker(_83);
if(m&&m.length>2){
_83=m[1]+m[2]+"-"+_82;
if(m[3]){
_83+=m[3];
}
boonity.set_canon("boonity_tracker",_83);
}
}
},titanium_init:function(){
var _85;
try{
_85=parent.document.getElementsByTagName("iframe");
}
catch(e){
_85=window.document.getElementsByTagName("iframe");
}
try{
for(var i=0;i<_85.length;i++){
var f=_85[i];
if(!f.boon_rebased&&boonity.is_trackable_network(f)){
var div=f.previousSibling;
if(!div){
div=f.parentNode;
}
var _89=4;
while(div){
if(div.nodeType==1&&div.id&&((div.id.indexOf("boonity_")==0)||(boonity.dfp_name(div)))){
f.boon_loc=div.id.replace(/boonity_/,"");
f.boon_loc_id=boonity.get_ads()[f.boon_loc+"_loc_id"];
break;
}
var _8a=div.previousSibling;
if(!_8a&&_89>0){
_8a=div.parentNode;
_89--;
}
div=_8a;
}
f.boon_rebased=true;
}else{
f.boon_not_supported_ad=true;
}
}
}
catch(e){
}
},init:function(){
boonity.titanium_init();
boonity.set_canon_ref();
boonity.attach_onclicks("iframe");
boonity.attach_onclicks("a");
boonity.render_tracker();
boonity.get_cookie_click_count();
},hookem:function(){
if(window.hooked||boonity.no_log()){
return;
}
window.hooked=true;
boonity.add_event(window,"load",boonity.init);
boonity.current_ad_element=null;
boonity.add_event(window,"beforeunload",boonity.onunload_handler);
boonity.add_event(window,"unload",boonity.onunload_handler);
boonity.add_event(document,"keydown",boonity.keydown_handler);
boonity.add_event(window,"message",boonity.message_handler);
},host:function(){
return (boonity.is_deployed())?boonity.deployed_host:(boonity.options.js_server||boonity.deployed_host);
},evhost:function(){
return (boonity.is_deployed())?"ev.yieldbuild.com":(boonity.options.log_server||boonity.host());
},is_deployed:function(){
return ("1"=="1");
},_uVoid:function(){
return;
},assure_fimg:function(_8b){
var _8c=new Image(1,1);
_8c.src=_8b;
_8c.onload=function(){
boonity._uVoid();
};
return _8c;
},is_lu:function(url){
return (url.search(/\&format=(fp_al_lp|(.*)_0ads_al(_s)?)\&/)!=-1);
},is_adsense:function(url){
return ((url.indexOf("googlesyndication.com")>-1)||(url.indexOf("doubleclick.net")>-1));
},is_ypn:function(url){
return (url.indexOf("overture.com")>-1)&&(url.search(/ypn/)!=-1);
},is_pub_center:function(url){
return ((url.indexOf(".msn.com")>-1)||(url.indexOf("ac2.microsoft.com")>-1));
},is_ybc:function(url){
return (url.indexOf("ybc.yieldbuild.com")>-1);
},is_cj:function(url){
return (url.indexOf("jdoqocy.com")!=-1);
},is_pulse:function(url){
return (boonity.is_ybc(url)&&url.indexOf("feed=pulse360")>-1);
},is_dfp:function(ele){
var m=ele.id.match(/google_ads_iframe_([0-9a-z_]+)_hub/);
if(m){
return true;
}
return false;
},is_chitika:function(ele,_97){
if(ele&&ele.src=="about:blank"&&ele.contentEditable){
if(boonity.is_chitika_present()){
if(ele.ft_id==9){
return true;
}
var pre=ele.previousSibling;
var nex=ele.nextSibling;
if(pre&&pre.nodeName=="SCRIPT"&&pre.src.indexOf("chitika.net")>-1){
return true;
}
if(nex&&nex.nodeName=="IFRAME"&&nex.src=="about:blank"){
return true;
}
if(_97){
boon_det_chitika=function(){
boon_det_chitika.retries-=1;
if(boonity.is_chitika(ele.previousSibling)){
var _9a=ele.previousSibling.ft_id=9;
boonity.set_onclick_logger(ele.previousSibling,_9a);
boonity.titanium_init();
}else{
if(boon_det_chitika.retries>0){
setTimeout(boon_det_chitika,500);
}
}
};
boon_det_chitika.retries=6;
setTimeout(boon_det_chitika,500);
}
}
}
return false;
},is_chitika_present:function(){
return (typeof window["ch_loaded"]!="undefined");
},is_trackable_network:function(ele){
var url=ele.src;
return boonity.is_adsense(url)||boonity.is_ypn(url)||boonity.is_pub_center(url)||boonity.is_chitika(ele)||boonity.is_pulse(url)||boonity.is_dfp(ele);
},extract_ft:function(url){
var m=url.match(/\&ft=([^&]*)/);
if(m&&m.length>1){
return [1];
}else{
return 0;
}
},determine_ft:function(ele){
if(ele.tagName=="IFRAME"){
var url=ele.src;
if(boonity.is_adsense(url)){
return boonity.is_lu(url)?5:2;
}else{
if(boonity.is_ypn(url)){
return 6;
}else{
if(boonity.is_pub_center(url)){
return 7;
}else{
if(boonity.is_chitika(ele,true)){
return 9;
}else{
if(boonity.is_pulse(url)){
return 20;
}else{
if(boonity.is_dfp(ele)){
return 98;
}else{
if(url.indexOf(boonity.host())>-1){
return boonity.extract_ft(url);
}
}
}
}
}
}
}
}else{
if(ele.tagName=="A"){
var url=ele.href;
if(boonity.is_cj(url)){
return 4;
}
}
}
return 0;
},add_event:function(obj,_a2,fn){
if(obj.addEventListener){
obj.addEventListener(_a2,fn,false);
}else{
if(obj.attachEvent){
obj["e"+_a2+fn]=fn;
obj[_a2+fn]=function(){
obj["e"+_a2+fn](window.event);
};
obj.attachEvent("on"+_a2,obj[_a2+fn]);
}
}
},clean_uri_field:function(_a4){
var _a5=new String(_a4);
var pat=/[^\w$\-_.+!^*'(),{}|~[\]<>#%";\/\\?:@&=]/g;
_a5=_a5.replace(pat,"");
return encodeURIComponent(_a5);
},in_cross_iframe:function(){
var _a7=false;
try{
_a7=(window.top.location.host!=window.location.host);
}
catch(e){
var msg=e.toString();
if(typeof e.message!="undefined"){
msg=e.message;
}
_a7=msg.indexOf("Permission denied")>=0;
}
return _a7;
},can_cookie:function(){
var _a9="boon_test_cookie=a; Domain=.yieldbuild.com;";
document.cookie=_a9;
var _aa=(document.cookie.indexOf(_a9)!=-1);
document.cookie=_a9+" expires=Fri, 27 Jul 2001 02:47:11 UTC";
return _aa;
},rand_int:function(){
return Math.floor(Math.random()*10000);
}};
if(typeof yieldbuild_site!="undefined"){
boonity_site=yieldbuild_site;
}else{
if(typeof yieldbuild_client!="undefined"){
boonity_site=yieldbuild_client;
}else{
if(typeof boonity_client!="undefined"){
boonity_site=boonity_client;
}
}
}
if(typeof yieldbuild_loc!="undefined"){
boonity_loc=yieldbuild_loc;
}
if(typeof yieldbuild_options!="undefined"){
boonity_options=yieldbuild_options;
}
if(typeof boonity_iframes=="undefined"){
boonity_iframes=[];
}
if(typeof yieldbuild_layout=="undefined"){
yieldbuild_layout="";
}
if(typeof boonity_hpads_user_id=="undefined"){
yieldbuild_channel="0";
}else{
yieldbuild_channel=boonity_hpads_user_id;
}
if(typeof boonity_hpads_category=="undefined"){
yieldbuild_category="";
}else{
yieldbuild_category=boonity_hpads_category;
}
if(boonity_site,boonity_loc){
boonity.site=boonity_site;
if(typeof boonity_options!="undefined"){
boonity.options=boonity_options;
}
if(typeof yieldbuild=="undefined"){
yieldbuild=boonity;
}
if(typeof yieldbuild_refill=="undefined"){
boonity.render_ad(boonity_loc);
}
}
if(!document.body.hooked){
boonity.hookem();
}

