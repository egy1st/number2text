var waspJSinit = waspJSinit || false;
if (!waspJSinit){
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//                                                      ///////
//                      Wasp JS                         ///////
//                   Version 1.0.6a                     ///////
//                                                      ///////
//         Available at http://www.wimpyplayer.com      ///////
//                  2002-2009 plaino                    ///////
//                                                      ///////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//                                                      ///////
//                USE AT YOUR OWN RISK                  ///////
//                                                      ///////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//                                                      ///////
//                       OPTIONS                        ///////
//                                                      ///////
//   WARNING: Wasp Publisher always overwrites wasp.js  ///////
//   when outputting files. If you make any changes     ///////
//   to this file then decide to use Wasp Publisher     ///////
//   at a later time, your changes will get             ///////
//   over-written.                                      ///////
//                                                      ///////
//   You may want to edit the "source" wasp.js file,    ///////
//   which is located in the same folder                ///////
//   as Wasp Publisher.exe.                             ///////
//                                                      ///////
///////////////////////////////////////////////////////////////
//                                                      ///////
//   Options set in this file will be used              ///////
//   if not defined in the HTML codes used              ///////
//   to display the player                              ///////
//                                                      ///////
///////////////////////////////////////////////////////////////

// Enter your registration code here:
var wimpyReg			= "";

// The following should refer to a filename only, not a full URL. 
// We've provided this option so that you can change the file name if needed.
var wimpySwfBasename	= "wasp.swf";
var wimpyJSbasename		= "wasp.js"
var waspConfBasename	= "waspConfigs.xml";
var flashversion		= "8";

/*****************************************
*
*			DEFUALT OPTIONS
*
******************************************/
var defaultWimpyConfigs = new Object();
defaultWimpyConfigs.waspSwf		= wimpySwfBasename;
defaultWimpyConfigs.waspJS		= wimpyJSbasename;
defaultWimpyConfigs.r			= wimpyReg;
defaultWimpyConfigs.pageColor	= "000000";
defaultWimpyConfigs.pw			= "320";
defaultWimpyConfigs.ph			= "255";
defaultWimpyConfigs.cl			= "";
defaultWimpyConfigs.vd			= "";
defaultWimpyConfigs.vs			= "";
defaultWimpyConfigs.vo			= "";
defaultWimpyConfigs.h			= "";
defaultWimpyConfigs.f			= "";
defaultWimpyConfigs.fk			= "";
defaultWimpyConfigs.tl			= "";
defaultWimpyConfigs.wm			= "";
defaultWimpyConfigs.wa			= "";
defaultWimpyConfigs.wu			= "";
defaultWimpyConfigs.ww			= "";
defaultWimpyConfigs.l			= "";
defaultWimpyConfigs.la			= "";
defaultWimpyConfigs.lu			= "";
defaultWimpyConfigs.lw			= "";
defaultWimpyConfigs.v			= "";
defaultWimpyConfigs.b			= "";
defaultWimpyConfigs.a			= "";
defaultWimpyConfigs.s			= "";
defaultWimpyConfigs.t			= "";
defaultWimpyConfigs.oc			= "";
defaultWimpyConfigs.ou			= "";
defaultWimpyConfigs.is			= "";
defaultWimpyConfigs.im			= "";
defaultWimpyConfigs.hp			= "";
defaultWimpyConfigs.hy			= "";
defaultWimpyConfigs.hu			= "";
defaultWimpyConfigs.hk			= "";
defaultWimpyConfigs.hi			= "";
defaultWimpyConfigs.hl			= "";
defaultWimpyConfigs.hc			= "";
defaultWimpyConfigs.hv			= "";
defaultWimpyConfigs.hs			= "";
defaultWimpyConfigs.hf			= "";

/************************************************
*
*
*            Event Handler Functions 
*               (Experts only!)
*
*
*
**************************************************/

// Only when enableWaspEvents is set to TRUE, will the handler events be enabled:
var enableWaspEvents = false;

// This function is pinged when Wimpy is ready and able to accept JavaScript calls / interaction.
// NOTE: See also wimpy_amReady_ask
function handleWaspInit(retval){

	// Your code here:

	// NOTE: The following code is used for example purposes:
	alert("Wasp is ready: \n" + retval);

}

// This function gets pinged when the track begins.
function handleTrackLaunched(returnedObject){

	// Your code here:


	// NOTE: The following code is used for example purposes:
	var retText = 'Track Launched. \n';
	retText += 'Track data should be visible in next alert message.';
	alert(retText);
	alertObject(returnedObject);

}

// This function gets pinged when the play button is clicked.
function handleTrackStarted(returnedObject){

	// Your code here:


	// NOTE: The following code is used for example purposes:
	var retText = 'Track Started. \n';
	retText += 'Track data should be visible in next alert message.';
	alert(retText);
	alertObject(returnedObject);

}

// This function gets pinged when the pause or stop button is clicked.
function handleTrackStopped(returnedObject){

	// Your code here:


	// NOTE: The following code is used for example purposes:
	var retText = 'Track Stopped. \n';
	retText += 'Track data should be visible in next alert message.';
	alert(retText);
	alertObject(returnedObject);

}

// This function gets pinged each time a track finnishes playing.
function handleTrackDone(returnedObject){
	
	// Your code here:

	// NOTE: The following code is used for example purposes:
	var retText = 'Track Done. \n';
	retText += 'Track data should be visible in next alert message.';
	alert(retText);
	alertObject(returnedObject);

}

// This function gets pinged when the video window is clicked.
function handleTrackWindowClick(returnedObject){

	// Your code here:


	// NOTE: The following code is used for example purposes:
	var retText = 'Window Clicked. \n';
	retText += 'Track data should be visible in next alert message.';
	alert(retText);
	alertObject(returnedObject);

}

// This function gets pinged when the link button is clicked.
function handleTrackLinkClick(returnedObject){

	// Your code here:


	// NOTE: The following code is used for example purposes:
	var retText = 'Link Button Clicked. \n';
	retText += 'Track data should be visible in next alert message.';
	alert(retText);
	alertObject(returnedObject);

}
/************************************************
*
*
*
*           Do not edit below here
*
*
*
**************************************************/

var wimpyUserAgent = navigator.appName.indexOf("Microsoft");
var ajaxPlaylist = true;
var fsMode;
var instanceIDdefault = "1"; 

function wasp(instanceID, theBkgdColor, theWidth, theHeight, theMediaFile, thePosterGraphic, theConfFile){
	var theMediaFile = theMediaFile || "";
	var thePosterGraphic = thePosterGraphic || "";
	var theConfFile = theConfFile || "";
	var theWaspSWF = "";
	var temp = "";
	var mediaPath = "";
	var queryString = getQueryString();

	if(queryString['f']){
		theMediaFile = queryString['f'];
		if(queryString['im']){
			thePosterGraphic = queryString['im'];
		}
	} else if(queryString['c']){
		theConfFile = queryString['c'];
	}

	// check conf first, then media
	if(theConfFile != ""){
		mediaPath = theConfFile;
	}
	if(theMediaFile != ""){
		mediaPath = theMediaFile;
	}

	if(mediaPath.substr(0,2) == "__"){
		mediaPath = decode(mediaPath.substring(3,mediaPath.length));
	}

	var Otemp = path_parts(mediaPath);

	var tackSlash = "/";
	if(Otemp.basepath == "" || Otemp.basepath.substr(-1) == "/"){
		tackSlash = "";
	}
	if(Otemp.extension == "mp4" || Otemp.extension == "m4a" || Otemp.extension == "3gp" || Otemp.extension == "aac"){
		flashversion = "9";
	}
	var theWaspSWF = Otemp.basepath + tackSlash + wimpySwfBasename;
	if(defaultWimpyConfigs.waspSwf && defaultWimpyConfigs.waspSwf != wimpySwfBasename){
		theWaspSWF = defaultWimpyConfigs.waspSwf;
	}
	/*
	// use both
	video.flv, conf.xml

	// use conf only
	"", conf.xml

	// use common conf
	video.flv, ""
	*/

	
	
	var Oconf = new Object();
	Oconf.instanceID = instanceID;
	Oconf.waspSwf = theWaspSWF;
	Oconf.pw = theWidth;
	Oconf.ph = theHeight;

	if(theConfFile == ""){
		Oconf.c = waspConfBasename;
	} else {
		Oconf.c = theConfFile;
	}

	if(theMediaFile != ""){
		Oconf.f = theMediaFile;
	}

	if(thePosterGraphic != ""){
		Oconf.im = thePosterGraphic
	}
	
	Oconf.pageColor = theBkgdColor;

	// get this page URL
	var thisPage = window.location.href || document.location.href;

	Otemp = path_parts(thisPage);
	Oconf.fp = Otemp.filepath
	
	writeWasp(Oconf);

}

function decode(data) {
	var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	if(data.substr(-1) != "=") data += "=";
	var out = "", c1, c2, c3, e1, e2, e3, e4;
	for (var i = 0; i < data.length; ) {
		e1 = tab.indexOf(data.charAt(i++));
		e2 = tab.indexOf(data.charAt(i++));
		e3 = tab.indexOf(data.charAt(i++));
		e4 = tab.indexOf(data.charAt(i++));
		c1 = (e1 << 2) + (e2 >> 4);
		c2 = ((e2 & 15) << 4) + (e3 >> 2);
		c3 = ((e3 & 3) << 6) + e4;
		out += String.fromCharCode(c1);
		if (e3 != 64) out += String.fromCharCode(c2);
		if (e4 != 64) out += String.fromCharCode(c3);
	}
	return unescape(out);
}

function writeWasp(configsIN){
	
	var theConfigObject	= configsIN || "";
	
	
	for(var prop in defaultWimpyConfigs){
		theConfigObject[prop] = theConfigObject[prop] || defaultWimpyConfigs[prop];
	}


	if(theConfigObject.pageColor.substring(0,1) != "#"){
		theConfigObject.pageColor = "#" + theConfigObject.pageColor;
	}

	var uniqueID		= theConfigObject.instanceID || instanceIDdefault;

	// <![CDATA[
	var so = new SWFObject(theConfigObject.waspSwf, "wasp" + uniqueID, theConfigObject.pw, theConfigObject.ph, flashversion, theConfigObject.pageColor);
	theConfigObject["instanceID"] = "";
	theConfigObject["wimpyHTMLpageTitle"] = "";
	theConfigObject["waspJS"] = "";
	theConfigObject["waspSwf"] = "";
	theConfigObject["pw"] = "";
	theConfigObject["ph"] = "";
	theConfigObject["pageColor"] = "";

	for(var prop in theConfigObject){
		var val = encodeURI(theConfigObject[prop]);
		if(val != ""){
			so.addVariable(prop, val);
		}
	}
	so.addParam("scale", "noscale");
	so.addParam("salign", "lt");
	so.addParam("allowScriptAccess", "always");
	so.addParam("allowFullScreen", "true");
	so.addParam("menu", "false");
	so.addParam("wmode", "opaque");
	so.write("waspTarget" + uniqueID);
	// ]]>
}


/************************************************
 *
 *
 *           Utilities
 *
 *
 *
 **************************************************/
function randomNumber(minNum, maxNum) {
	return (minNum + Math.floor(Math.random() * (maxNum - minNum + 1)));
}
function path_parts(thePathURL) {

	var Oret = new Object();
	Oret.query = "";
	Oret.filename = "";
	Oret.extension = "";
	Oret.basename = "";
	Oret.basepath = "";
	Oret.filepath = "";
	if(thePathURL){
		Oret.query = "";
		var temp = thePathURL.split("?");
		var thePath	= temp[0];
		if(temp.length > 1){
			Oret.query = temp[1];
		}
		if(thePath.lastIndexOf("/") == thePath.length-1){
			thePath = thePath.substr(0, thePath.length-1);
		}
		var filepathA = thePath.split("/");
		var filename = filepathA.pop();
		var filepathB = filename.split(".");
		var extension = "";
		if (filepathB.length > 1) {
			extension = filepathB.pop();
		}
		var basename = filepathB.join(".");
		if(extension == ""){
			filepathA.push(filename);
		}
		var mybasepath = filepathA.join("/");
		
		if(mybasepath.length > 0){
			mybasepath = mybasepath + "/";
		}
		//Oret.query = 
		Oret.filename = filename;
		Oret.extension = extension;
		Oret.basename = basename;
		Oret.basepath = mybasepath;
		Oret.filepath = thePath;
	}
	return Oret;
}
function getQueryString(){
	var qsParm = new Array();
	var q = window.location.search || document.location.hash;
	var query = q.substring(1);
	var parms = query.split('&');
	for (var i=0; i<parms.length; i++) {
		var pos = parms[i].indexOf('=');
		if (pos > 0) {
			var key = parms[i].substring(0,pos);
			var val = parms[i].substring(pos+1);
			qsParm[key] = val;
		}
	}
	return qsParm;
}
function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function alertObject(returnedObject){
	var retText = "";
	for(var prop in returnedObject){
		var value = returnedObject[prop];
		if(typeof(value) == "object"){
			for(var itemProp in value){
				retText += + itemProp + " : " + value[itemProp] + "\n";
			}
		} else {
			retText += prop + " : " + value + "\n";
		}
	}
	alert(retText);
}
/************************************************
 *
 *  Event Notifiers
 *
 *	Do not edit these functions.
 *
 *	Wimpy calls these functions as needed to inform 
 *	the "handler functions" (above) of an event.
 *
 ************************************************/
function wasp_amReady(retval){
	if(enableWaspEvents == true){
		handleWaspInit(retval);
	}
}

function wasp_trackLaunched(returnedObject){
	if(enableWaspEvents == true){
		handleTrackLaunched(returnedObject);
	}
}
function wasp_trackStarted(returnedObject){
	if(enableWaspEvents == true){
		handleTrackStarted(returnedObject);
	}
}
function wasp_trackStopped(returnedObject){
	if(enableWaspEvents == true){
		handleTrackStopped(returnedObject);
	}
}
function wasp_trackDone(returnedObject){
	if(enableWaspEvents == true){
		handleTrackDone(returnedObject);
	}
}
function wasp_windowClick(returnedObject){
	if(enableWaspEvents == true){
		handleTrackWindowClick(returnedObject);
	}
}
function wasp_linkClick(returnedObject){
	if(enableWaspEvents == true){
		handleTrackLinkClick(returnedObject);
	}
}
function wasp_load(IDin, theMediaFile, thePoster, startPlaying){
	var instanceID = ("wasp" + IDin) || instanceIDdefault;
	if (wimpyUserAgent != -1) {
		return window[instanceID].js_wasp_load(theMediaFile, thePoster, startPlaying);
	} else {
		return document[instanceID].js_wasp_load(theMediaFile, thePoster, startPlaying);
	}
}
function wasp_play(IDin){
	var instanceID = ("wasp" + IDin) || instanceIDdefault;
	if (wimpyUserAgent != -1) {
		return window[instanceID].js_wasp_play();
	} else {
		return document[instanceID].js_wasp_play();
	}
}
function wasp_stop(IDin){
	var instanceID = ("wasp" + IDin) || instanceIDdefault;
	if (wimpyUserAgent != -1) {
		return window[instanceID].js_wasp_stop();
	} else {
		return document[instanceID].js_wasp_stop();
	}
}
function wasp_pause(IDin){
	var instanceID = ("wasp" + IDin) || instanceIDdefault;
	if (wimpyUserAgent != -1) {
		return window[instanceID].js_wasp_pause();
	} else {
		return document[instanceID].js_wasp_pause();
	}
}
function wasp_prev(IDin){
	var instanceID = ("wasp" + IDin) || instanceIDdefault
	if (wimpyUserAgent != -1) {
		return window[instanceID].js_wasp_prev();
	} else {
		return document[instanceID].js_wasp_prev();
	}
}
function wasp_share(IDin){
	var instanceID = ("wasp" + IDin) || instanceIDdefault
	if (wimpyUserAgent != -1) {
		return window[instanceID].js_wasp_share();
	} else {
		return document[instanceID].js_wasp_share();
	}
}
function wasp_fullscreen(IDin){
	alert("yo");
	var instanceID = ("wasp" + IDin) || instanceIDdefault
	if (wimpyUserAgent != -1) {
		return window[instanceID].js_wasp_fullscreen();
	} else {
		return document[instanceID].js_wasp_fullscreen();
	}
}
function wasp_amReady_ask(IDin){
	var instanceID = ("wasp" + IDin) || instanceIDdefault
	if (wimpyUserAgent != -1) {
		return window[instanceID].js_wasp_amReady_ask();
	} else {
		return document[instanceID].js_wasp_amReady_ask();
	}
}
function wasp_setVolume(IDin, thePercent){
	var instanceID = ("wasp" + IDin) || instanceIDdefault
	if (wimpyUserAgent != -1) {
		return window[instanceID].js_wasp_setVolume(thePercent);
	} else {
		return document[instanceID].js_wasp_setVolume(thePercent);
	}
}
function wasp_setLoopTrackState(IDin, theState){
	var instanceID = ("wasp" + IDin) || instanceIDdefault
	// off, on
	if (wimpyUserAgent != -1) {
		return window[instanceID].js_wasp_setLoopTrackState(theState);
	} else {
		return document[instanceID].js_wasp_setLoopTrackState(theState);
	}
}
function wasp_setMuteState(IDin, theState){
	var instanceID = ("wasp" + IDin) || instanceIDdefault
	// off, on
	if (wimpyUserAgent != -1) {
		return window[instanceID].js_wasp_setMuteState(theState);
	} else {
		return document[instanceID].js_wasp_setMuteState(theState);
	}
}
function wasp_getPlayheadPercent(IDin){
	var instanceID = ("wasp" + IDin) || instanceIDdefault
	if (wimpyUserAgent != -1) {
		return window[instanceID].js_wasp_getPlayheadPercent();
	} else {
		return document[instanceID].js_wasp_getPlayheadPercent();
	}
}
function wasp_getPlayheadSeconds(IDin){
	var instanceID = ("wasp" + IDin) || instanceIDdefault
	if (wimpyUserAgent != -1) {
		return window[instanceID].js_wasp_getPlayheadSeconds();
	} else {
		return document[instanceID].js_wasp_getPlayheadSeconds();
	}
}
function wasp_setPlayheadPercent(IDin, thePercent){
	var instanceID = ("wasp" + IDin) || instanceIDdefault
	if (wimpyUserAgent != -1) {
		return window[instanceID].js_wasp_setPlayheadPercent(thePercent);
	} else {
		return document[instanceID].js_wasp_setPlayheadPercent(thePercent);
	}
}
function wasp_setPlayheadSeconds(IDin, theSeconds){
	var instanceID = ("wasp" + IDin) || instanceIDdefault
	if (wimpyUserAgent != -1) {
		return window[instanceID].js_wasp_setPlayheadSeconds(theSeconds);
	} else {
		return document[instanceID].js_wasp_setPlayheadSeconds(theSeconds);
	}
}
function wasp_getLoadPercent(IDin){
	var instanceID = ("wasp" + IDin) || instanceIDdefault
	var retval = "";
	if (wimpyUserAgent != -1) {
		retval = window[instanceID].js_wasp_getLoadPercent();
	} else {
		retval = document[instanceID].js_wasp_getLoadPercent();
	}
	return retval;
}
function wasp_getLoadState(IDin){
	var instanceID = ("wasp" + IDin) || instanceIDdefault
	var retval = "";
	if (wimpyUserAgent != -1) {
		return window[instanceID].js_wasp_getLoadState();
	} else {
		return document[instanceID].js_wasp_getLoadState();
	}
	return retval;
}
function wasp_getPlayerState(IDin){
	var instanceID = ("wasp" + IDin) || instanceIDdefault
	var retval = "";
	if (wimpyUserAgent != -1) {
		return window[instanceID].js_wasp_getPlayerState();
	} else {
		return document[instanceID].js_wasp_getPlayerState();
	}
	return retval;
}
function wasp_memory_clear(IDin){
	var instanceID = ("wasp" + IDin) || instanceIDdefault;
	var retval = "";
	if (wimpyUserAgent != -1) {
		retval = window[instanceID].js_wasp_memory_clear();
	} else {
		retval = document[instanceID].js_wasp_memory_clear();
	}
	return retval;
}
/**
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
/**
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;
}