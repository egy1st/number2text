//v27 © 2011 Tynt

Tynt=window.Tynt||[];
if(typeof Tynt.TIL=="undefined"){(function(){var Ga=function(){var i=document,j=i.body,n=i.documentElement,Y=eval("/*@cc_on!@*/false"),Z=function(a,b){for(var c="",f=0;f<b;f++)c+=a;return c},x=Z("a",50),q=(Tynt.e||"")+"ic.tynt.com",la=(Tynt.e||"")+"de.tynt.com/deb/?id="+x,y=function(){return(new Date).getTime()},p=function(a){return a.replace(/^\s+|\s+$/g,"")},M=function(a,b){for(var c in a)if(a.hasOwnProperty(c))b[c]=a[c]},A=function(a,b,c){a=i.createElement(a);M(b,a);M(c,a.style);return a},$;$=
window.addEventListener?function(a,b,c){a.addEventListener(b,c,false)}:function(a,b,c){a.attachEvent("on"+b,c)};var N=function(a,b){var c=location.hostname.split("."),f=2;do{var d=c.slice(c.length-f,c.length).join(".");i.cookie=a+";path=/;domain=."+d+";"+b;f++}while(i.cookie.indexOf(a)==-1&&f<=c.length);if(i.cookie.indexOf(a)==-1)i.cookie=a+";path=/;"+b},ma=function(a){i.readyState=="complete"?a():$(window,"load",function(){setTimeout(function(){if(typeof i.readyState=="undefined"&&!Y)i.readyState=
"complete";a()},10)})},m=function(a,b){var c=[],f=function(d,e){var h="http://"+d.replace("id="+x,"id="+Tynt.join("~"));if(h.indexOf(q+"/b/p?")>-1&&typeof Tynt.b=="string")h+="&b="+Tynt.b;var k=new Image(1,1);if(e)k.onerror=e;k.src=h};m=function(d,e){c.push([d,e])};ma(function(){m=f;for(var d=0;d<c.length;d++)m(c[d][0],c[d][1]);c=null});m(a,b)},aa=function(a){var b=[],c="",f;for(f in a)if(a.hasOwnProperty(f)){b.push(c,f,"=",a[f]);c="&"}return b.join("")},O=function(a){for(var b=0,c=a.length<100?a.length:
100,f=0;f<c;f++)b+=a.charCodeAt(f);a=Math.floor(Math.random()*3844);c=Math.abs(y()-12281184E5);return ba(c,7)+ba((b+a)%3844,2)},ca=function(a){if(a<62)return"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(this);else{var b=Math.floor(a/62);a=a-b*62;return b>=62?ca(b)+"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(a):"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(b)+"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(a)}},
ba=function(a,b){var c=ca(a);return Z("0",b-c.length)+c},da=function(a){return(a=p(a))?a.split(/\s+/i).length:0},P=p((i.title||location.hostname).toString()).replace(RegExp(location.hash,"g"),""),ea=function(){for(var a=i.getElementsByTagName("link"),b=0;b<a.length;b++)if(a[b].getAttribute("rel")&&a[b].getAttribute("rel").match("canonical")&&a[b].getAttribute("href")){a=a[b].getAttribute("href");b=location.protocol+"//"+location.host+location.pathname;var c=i.getElementsByTagName("base")[0];if(c)if(c=
c.getAttribute("href"))b=c;if(!a.match(/^http/)){if(a.charAt(0)=="/"){c=b.indexOf("/",9);if(c>-1)b=b.slice(0,c)}else{c=b.lastIndexOf("/");if(c>9)b=b.slice(0,c+1);else b+="/"}a=b+a}return a}return""},E=function(a){return a.replace(/^https?:\/\//,"")},F=function(a,b){for(var c=b+"=",f=a.split(";"),d=0;d<f.length;d++){for(var e=f[d];e.charAt(0)==" ";)e=e.substring(1,e.length);if(e.indexOf(c)==0)return e.substring(c.length,e.length)}return null},na=function(){var a=F(i.cookie,"tracertraffic"),b=encodeURIComponent(E(ea())),
c=i.location.hash;c=/tynt=/.test(c)?c.match(/tynt=?([^?&$#]*)/)[1]:false;var f=q+"/b/p?id="+x+(a?"&et="+a:"")+(c?"&a="+c:"")+"&ts="+y(),d=f+(b?"&cu="+b:""),e=d+(i.referrer?"&r="+encodeURIComponent(E(i.referrer)):"");a=e+"&t="+encodeURIComponent(P);m(a,function(){m(e,function(){m(d,function(){m(f)})})})},B=function(){var a=[];return function(b){for(var c=a.length-1;c>=0;c--)if(a[c]==b)return false;a.unshift(b);a.length>3&&a.pop();return true}},oa=B(),pa=B(),qa=function(){var a,b=function(){window.removeEventListener("blur",
b,false);Q(a);return true};return function(c){a=c.target||c.srcElement;window.removeEventListener("blur",b,false);if(a.nodeName=="IMG"&&a.parentNode.nodeName!="A"){window.addEventListener("blur",b,false);setTimeout(function(){i.removeEventListener("blur",b,false)},1E4)}return true}}(),fa=function(a){Q(a.target||a.srcElement,true)},G,ga=function(a){a=a.target||a.srcElement;G=a.nodeName=="IMG"?a:null},R=function(){var a=function(h){return typeof h.pageX=="number"?{x:h.pageX-(n.scrollLeft?n.scrollLeft:
j.scrollLeft),y:h.pageY-(n.scrollTop?n.scrollTop:j.scrollTop)}:{x:h.clientX,y:h.clientY}},b=function(h){h=a(h);return h.x<=0||h.y<=0||h.x>=j.clientWidth||h.y>=j.clientHeight},c=function(h){h=a(h);return h.x<=0||h.y<=0||h.x>=n.clientWidth||h.y>=n.clientHeight},f=function(h){return h.target.nodeName=="#document"},d=function(h){h=a(h);return h.x<=4||h.y<=4||h.x>=n.clientWidth-4||h.y>=n.clientHeight-4},e=function(h){e=navigator.userAgent.match("MSIE")?!i.compatMode||i.compatMode.indexOf("CSS")==-1?b:
c:navigator.userAgent.match("Firefox")?f:d;e(h)};return function(h){if(G&&e(h)){Q(G);G=null}return true}}(),r;if(Tynt.c)r=function(){};else{Tynt.c=true;r=function(){var a=true,b,c=function(f,d){var e={id:x,wc:da(d),c:d,f:a?1:0,t:P};M(f,e);a=false;var h=e.trace_type;delete e.trace_type;var k=e.g;delete e.g;for(var o=[],l=["id","wc","f","w","h","t","c"],s=0;s<l.length;s++){var C=l[s],t=e[C];t&&o.push([C,encodeURIComponent(t).replace(/\'/g,"%27")]);delete e[C]}for(var u in e)if(e.hasOwnProperty(u))(l=
e[u])&&o.push([u,encodeURIComponent(l).replace(/\'/g,"%27")]);e=[];s=2048-(("http://"+q+"/a/t/x#?").length+(3+k.length)+5);C=o.length;var z=t=0,v=0,S,H,T,I,J=0;for(e[J]={g:k,tp:null};t<C&&e.length<35;){S=o[t][0];u=o[t][1];T=S.length+2;H=s-T-z;if(H>0){l=u.substring(v,v+H);I=l.slice(-2).indexOf("%");if(I>-1){l=u.substring(v,v+H-2+I);z+=I+2}z+=l.length+T;v+=l.length;e[J][S]=l}else z=s;if(z>=s){e[++J]={g:k,p:J};z=0}if(v>=u.length){t++;v=0}}e[0].tp=e.length;m(q+"/b/t/"+h+"?"+aa(e[0]));for(k=1;k<e.length;k++)m(q+
"/b/x/"+h+"?"+aa(e[k]))};if(window.addEventListener){navigator.userAgent.match("Firefox/2")||j.addEventListener("copy",fa,false);window.addEventListener("mousedown",ga,false);window.addEventListener("dragleave",R,false);window.addEventListener("dragexit",R,false);i.addEventListener("contextmenu",qa,false)}else{j.attachEvent("oncopy",fa);i.getElementsByTagName("html")[0].attachEvent("ondragleave",R);j.attachEvent("onmousedown",ga)}if(i.cookie.indexOf("tracertraffic=")!=-1)if(!i.referrer||i.referrer.indexOf(location.host)==
-1)N("tracertraffic=0","expires=Thu, 01 Jan 1970 00:00:00 GMT");na();m(la);return function(f,d){if(!i.getElementById("tyntSS")){var e;if(d)e=typeof getSelection!="undefined"?getSelection().toString():i.selection.createRange().text;var h=f.src;h&&!e&&pa(h)&&c({g:O(h),trace_type:3,w:f.width,h:f.height},h);if(e&&p(e).length&&f.nodeName!="TEXTAREA"&&f.nodeName!="INPUT"){h=oa(e);var k={trace_type:1};if(h)b=O(e);k.g=b;var o=Tynt.m?Tynt.m(k,e):true;h&&o&&c(k,e)}}}}}var K=function(a){a=a.charCodeAt(0);return 3584<=
a&&a<=3711||11904<=a&&a<=12591||12688<=a&&a<=40959||63744<=a&&a<=64255||65072<=a&&a<=65103||131072<=a&&a<=173791||194560<=a&&a<=195103},ha=function(a){a=a.getElementsByTagName("script");for(var b=a.length-1;b>=0;b--){var c=a[b];c.parentNode.removeChild(c)}},g,ra=(Tynt.e||"")+"id.tynt.com",sa={t:3,p:6,w:7},w,U,V,ta=["","Attribution","Attribution Share Alike","Attribution No Derivatives","Attribution Non-Commercial","Attribution Non-Commercial Share Alike","Attribution Non-Commercial No Derivatives"],
ua=["","http://creativecommons.org/licenses/by/3.0","http://creativecommons.org/licenses/by-sa/3.0","http://creativecommons.org/licenses/by-nd/3.0","http://creativecommons.org/licenses/by-nc/3.0","http://creativecommons.org/licenses/by-nc-sa/3.0","http://creativecommons.org/licenses/by-nc-nd/3.0"],ia=function(a){a=a.match(/ixzz=?([^?$#]*)/);if(!a)return null;a=a[1].match(/&([^?$]*)/);if(Tynt.k)return Tynt.k.charAt(1);if(!a||!a[1])return null;return a[1]},W=function(a){return(a=a.match(/axzz([^?$]*)/))&&
a.length==2?a[1]:null},va=function(a){var b=ea();b=b&&g.c!==false?b:location.href;b=b.replace(/#(i|a)xzz=?(.*)$/g,"");return b+"#"+("ixzz"+a)};B=function(a){var b=new Date(y()+864E5);N("tracertraffic="+a.toString(),"expires="+b.toUTCString())};var wa=function(){var a=location.href.match(/ixzz=?([^?&$#]*)/);if(a=(a&&a.length==2?a[1]:null)||Tynt.h){var b=ia(location.href);a=q+"/b/v?g="+a+(/\?trace_owner_view/.test(location.href)?"&o=y":"")+"&id="+x+(b?"&s="+b:"")+"&r="+encodeURIComponent(E(i.referrer))+
"&ts="+y();m(a);return true}return false},xa=function(a){m(q+"/b/a?g="+a+"&id="+x+"&r="+encodeURIComponent(E(i.referrer))+"&ts="+y(),function(){})},ja=function(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},D=false,ya=function(a){if(D)return false;D=true;var b="";if(g.a){var c=va(a),f='<a style="color: #003399;" href="';b+=g.ap;if(g.st)b=b+f+c+'">'+ja(P)+"</a> ";if(g.su)b=b+f+c+'">'+ja(c)+"</a>";if(g.as.length>0)b=b+"\n<br>"+g.as+" ";if(g.cc>0)b=b+"\n<br>Under Creative Commons License: "+
f+ua[g.cc]+'">'+ta[g.cc]+"</a>"}if(g.el){if(b.length>0)b+="\n<br>";b+=g.el}if(w){if(b.length>0)b+="\n<br>";b=V?b+U+f+"http://tcr"+g.s+".tynt.com/ads/"+V+"/"+a+'">'+w+"</a>":b+U+f+"http://tcr"+g.s+".tynt.com/ads/"+w+"/"+X+"/"+a+'">'+w+"</a>"}var d,e;d=A("div",{},{overflow:"hidden",color:"#000000",backgroundColor:"#FFFFFF",textAlign:"left",textDecoration:"none",border:"none"});if(!i.selection||!i.selection.createRange){a=getSelection();if(a.toString())if(typeof a.setBaseAndExtent!="undefined"){var h=
a.getRangeAt(0);b=A("span",{innerHTML:b});if(g.t){b.innerHTML+="<br/><br/>";d.appendChild(b);d.appendChild(h.cloneContents())}else{d.appendChild(h.cloneContents());b.innerHTML="<br/><br/>"+b.innerHTML;d.appendChild(b)}ha(d);d.style.width=0.1;d.style.height=0.1;d.style.position="absolute";d.style.top="-1000px";d.style.left="-1001px";d.appendChild(i.createElement("br"));b=d.innerText.length;j.insertBefore(d,j.firstChild);if(d.innerText.length!=b)d.style.overflow="";a.selectAllChildren(d);setTimeout(function(){d.parentNode.removeChild(d);
getSelection().setBaseAndExtent(h.startContainer,h.startOffset,h.endContainer,h.endOffset);D=false},0)}else{e=A("div",{},{height:0,position:"absolute",top:"-1000px"});e.innerHTML="<br>";if(g.t){j.insertBefore(e,j.firstChild);d.innerHTML=b+"<br><br>"}else{j.appendChild(e);d.innerHTML="<br>"+b+"<br>"}e.appendChild(d);b=i.createRange();b.selectNode(d);a.addRange(b);window.setTimeout(function(){e.parentNode.removeChild(e);D=false},0)}}else{var k=n.scrollLeft||j.scrollLeft,o=n.scrollTop||j.scrollTop;e=
A("div",{},{overflow:"hidden",position:"absolute",left:k+20+"px",top:o+20+"px",width:"1px",height:"1px"});j.insertBefore(e,j.firstChild);var l=i.selection.createRange();d.innerHTML=g.t?b+"<br><br>"+l.htmlText:l.htmlText+"<br><br>"+b;ha(d);e.appendChild(i.createElement("br"));e.appendChild(d);b=j.createTextRange();b.moveToElementText(d);b.select();setTimeout(function(){j.removeChild(e);if(l.text!=""){l.select();n.scrollLeft=k;j.scrollLeft=k;n.scrollTop=o;j.scrollTop=o}D=false},0)}return true},Aa=function(a,
b){var c=true;if(g.a||w||g.el){var f;f=p(b);f=f.length>=2?K(f.charAt(0))||K(f.charAt(f.length-1))||K(f.charAt(f.length/2)):K(f);var d;if(d=g.h)a:{d=(d=za())?d.className.split(/\s+/):[];for(var e=d.length-1;e>=0;e--)if(g.h[d[e]]!==undefined){d=g.h[d[e]];break a}d=void 0}d=d;if(d!==false&&(f&&b.replace(/\s/g,"").length>=g.aw*2||!f&&da(b)>=g.aw)||d)if(g.a||w||g.el){c=ya(a.g);if(g.a)a.trace_type=0}}return c},za=function(){return!i.selection||!i.selection.createRange?function(){var a=getSelection().getRangeAt(0),
b=a.startContainer.nodeType==3?a.startContainer.parentNode:a.startContainer;return b&&p(a.toString())==p(b.textContent)?b:null}:function(){var a=i.selection.createRange(),b=a.duplicate();b.collapse(true);return(b=b.parentElement())&&p(a.text)==p(b.innerText)?b:null}}(),Ba=function(a){var b=a?864E5:-5E3;b=new Date(y()+b);i.cookie="tracerabg="+a+";path=/;expires="+b.toUTCString()},Da=function(a){var b;a:{b=i.getElementsByTagName("script");for(var c=0;c<b.length;c++)if(/\/show_afs_search\.js/i.test(b[c].src)){b=
true;break a}b=false}if(!b&&Ca(location)){Tynt.b=a||O(location.href);location.replace(location.href+"#axzz"+Tynt.b)}},Ca=function(a){if(a.hash!="")return false;if(typeof g.ba=="boolean"&&g.ba)g.ba=["/"];else if(!g.ba)return true;for(var b,c=g.ba.length-1;c>=0;c--){b=null;var f=g.ba[c],d=f.indexOf("/");if(d!=0){b=f.slice(0,d);f=f.slice(d)}if(!b||a.host==b)if(f.charAt(f.length-1)=="#"){if(a.pathname.indexOf(f.slice(0,-1))==0)return false}else if(a.pathname==f)return false}return true},Ea=function(a){g=
Tynt.i||window.tyntVariables||{};g.s=a.s||1;g.a=!(g.a==0||a.a==0);g.cc=g.cc||a.cc||0;if(g.cc>6)g.cc=0;g.b=!!(g.b||a.b);g.aw=Math.max(g.aw||8,8);if(g.a){g.ap=(g.ap||(typeof tyntAP!="undefined"?tyntAP:null)||"Read more:")+" ";g.as=g.as||(typeof tyntAS!="undefined"?tyntAS:null)||"";g.st=!!(g.st||a.st);g.su=!(g.su==0||a.su==0);g.sp=g.sp||a.sp;if(g.sp){V=g.spid;U=(g.spt||decodeURIComponent(a.spt||""))+" ";w=g.sp||decodeURIComponent(a.sp||"")}}},ka=function(){var a=i.title.indexOf("#ixzz");if(a>-1)i.title=
i.title.substring(0,a);a=i.title.indexOf("#axzz");if(a>-1)i.title=i.title.substring(0,a)},Fa=function(){for(var a=0;a<Tynt.length;a++)if(Tynt[a]&&Tynt[a].length==22)return Tynt[a];return null},L=function(a){if(!a)return{};for(var b={},c=a.substring(a.indexOf("?")+1).split("&"),f=0;f<c.length;f++){var d=c[f].split("=");if(d[0].indexOf("amp;")==0)d[0]=d[0].substring(4);b[d[0]]=d[1]}a=a.split("/");a.pop();b.scriptPathUri=a.join("/");return b}(function(){for(var a=i.getElementsByTagName("script"),b=0;b<
a.length;b++)if(/\/tracer.*\?/i.test(a[b].src))return a[b].src;return null}()),X=L.user||Fa();if(!X)throw Error("Error finding Tynt Insight userId. Please check your HTML for errors.");L.user&&Tynt.push(L.user);if(!function(){var a=/tracer=test/.test(location.href);a&&m(ra+"/script/verify/"+X);if(a)return true;if(/tracer=no_tracing/.test(location.href))return true;if(/disableTracer=/.test(location.href)){a=location.href.match(/disableTracer=([^?$]*)/)[1];var b=new Date;b.setDate(a&&a=="on"?b.getDate()+
365:b.getDate()-2);N("disableTracer=y","expires="+b.toUTCString());b=A("div",{},{zIndex:"10000",position:"absolute",top:"10%",left:"10%",width:"80%",height:"80%",backgroundColor:"white",color:"black",textAlign:"center",fontSize:"32px",paddingTop:"10%",border:"1px solid gray"});b.innerHTML="Tynt Insight has been turned "+(a&&a=="on"?"off":"on")+" in this browser.<br>You may close this window.";j.insertBefore(b,j.firstChild);return true}if(F(i.cookie,"disableTracer"))return true;return false}()){if(Y){ka();
i.attachEvent("onpropertychange",ka)}Ea(L);var Q=r();r=sa[ia(location.href)];if(wa()){r||(r=/tynt.com/.test(i.referrer)?3:1);B(r)}Tynt.m=Aa;if(g.b)if(W=W(location.href)){if("#axzz"+F(i.cookie,"tracerabg")!=location.hash){xa(W);B(2)}}else{Da(F(i.cookie,"tracerabg"));Ba(Tynt.b)}}};Tynt.TIL=function(){document.body?Ga():setTimeout(Tynt.TIL,300)}})();Tynt.TIL()};
