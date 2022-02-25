document.write('');

if(typeof(dartCallbackObjects) == "undefined")
  var dartCallbackObjects = new Array();
if(typeof(dartCreativeDisplayManagers) == "undefined")
  var dartCreativeDisplayManagers = new Object();
if(typeof(dartMotifAds) == "undefined")
  var dartMotifAds = new Array();
if(!self.dartLoadedGlobalTemplates_67_05) {
  self.dartLoadedGlobalTemplates_67_05 = {};
}
if(self.dartLoadedGlobalTemplates_67_05["@GT_TYPE@"]) {
  self.dartLoadedGlobalTemplates_67_05["@GT_TYPE@"].isLoaded = true;
}

function RichMediaCore_67_05() {
  this.CREATIVE_TYPE_EXPANDING = "ExpandingFlash";
  this.CREATIVE_TYPE_FLOATING = "FloatingFlash";
  this.CREATIVE_TYPE_INPAGE = "InpageFlash";
  this.CREATIVE_TYPE_MULTI_FLOATING = "MultiFloatingFlash";
  this.CREATIVE_TYPE_INPAGE_WITH_FLOATING = "InpageFlashFloatingFlash";
  this.CREATIVE_TYPE_FLOATING_WITH_REMINDER = "FloatingFlashReminderFlash";
  this.CREATIVE_TYPE_INPAGE_WITH_OVERLAY = "InpageFlashOverlayFlash";
  this.ASSET_TYPE_FLOATING = "Floating";
  this.ASSET_TYPE_INPAGE = "Inpage";
  this.ASSET_TYPE_EXPANDING = "Expanding";
  this.ASSET_TYPE_REMINDER = "Reminder";
  this.ASSET_TYPE_OVERLAY = "Overlay";
  this.STANDARD_EVENT_DISPLAY_TIMER = "DISPLAY_TIMER";
  this.STANDARD_EVENT_INTERACTION_TIMER = "INTERACTION_TIMER";
  this.STANDARD_EVENT_INTERACTIVE_IMPRESSION = "EVENT_USER_INTERACTION";
  this.STANDARD_EVENT_FULL_SCREEN_VIDEO_PLAYS = "";
  this.STANDARD_EVENT_FULL_SCREEN_VIDEO_COMPLETES = "";
  this.STANDARD_EVENT_FULL_SCREEN_AVERAGE_VIEW_TIME = "";
  this.STANDARD_EVENT_MANUAL_CLOSE = "EVENT_MANUAL_CLOSE";
  this.STANDARD_EVENT_BACKUP_IMAGE = "BACKUP_IMAGE_IMPRESSION";
  this.STANDARD_EVENT_EXPAND_TIMER = "EXPAND_TIMER";
  this.STANDARD_EVENT_VIDEO_PLAY = "EVENT_VIDEO_PLAY";
  this.STANDARD_EVENT_VIDEO_VIEW_TIMER = "EVENT_VIDEO_VIEW_TIMER";
  this.STANDARD_EVENT_VIDEO_VIEW_COMPLETE = "EVENT_VIDEO_COMPLETE";
  this.STANDARD_EVENT_VIDEO_INTERACTION = "EVENT_VIDEO_INTERACTION";
  this.STANDARD_EVENT_VIDEO_PAUSE = "EVENT_VIDEO_PAUSE";
  this.STANDARD_EVENT_VIDEO_MUTE = "EVENT_VIDEO_MUTE";
  this.STANDARD_EVENT_VIDEO_REPLAY = "EVENT_VIDEO_REPLAY";
  this.STANDARD_EVENT_VIDEO_MIDPOINT = "EVENT_VIDEO_MIDPOINT";
  this.STANDARD_EVENT_VIDEO_FULLSCREEN = "";
  this.STANDARD_EVENT_VIDEO_STOP = "EVENT_VIDEO_STOP";
  this.STANDARD_EVENT_VIDEO_UNMUTE = "EVENT_VIDEO_UNMUTE";
  this.STANDARD_EVENT_FULLSCREEN = "EVENT_FULLSCREEN";
  this.STANDARD_EVENT_DYNAMIC_CREATIVE_IMPRESSION = "DYNAMIC_CREATIVE_IMPRESSION";
  this.STANDARD_EVENT_HTML5_CREATIVE_IMPRESSION = "HTML5_CREATIVE_IMPRESSION";
};
RichMediaCore_67_05.prototype.isPageLoaded = false;
RichMediaCore_67_05.prototype.csiTimes = new Object();
RichMediaCore_67_05.prototype.setCsiEventsRecordedDuringBreakout = function(creative) {
  if(creative.gtStartLoadingTime != undefined)
    this.csiTimes["gb"] = creative.gtStartLoadingTime;
};
RichMediaCore_67_05.prototype.csiHasValidStart = function(creative) {
  return ((creative.csiAdRespTime >= 0) && (creative.csiAdRespTime < 1e5));
};
RichMediaCore_67_05.prototype.shouldReportCsi = function(creative) {
  
  return this.csiHasValidStart(creative) || (Math.floor(Math.random() * 1001) == 1);
};
RichMediaCore_67_05.prototype.shouldCsi = function(asset, creativeType) {
  switch (creativeType) {
    case this.CREATIVE_TYPE_INPAGE_WITH_FLOATING:
      return asset.assetType == this.ASSET_TYPE_INPAGE;
    case this.CREATIVE_TYPE_FLOATING_WITH_REMINDER:
      return asset.assetType == this.ASSET_TYPE_FLOATING;
    case this.CREATIVE_TYPE_INPAGE_WITH_OVERLAY:
      return asset.assetType == this.ASSET_TYPE_INPAGE;
    default: return true;
  }
};
RichMediaCore_67_05.prototype.trackCsiEvent = function(event) {
  this.csiTimes[event] = new Date().getTime();
};
RichMediaCore_67_05.prototype.getCsiServer = function() {
  return (self.location.protocol &&
      self.location.protocol.toString().toLowerCase() == 'https:') ?
        "https://static.doubleclick.net" : "http://static.2mdn.net";
};
RichMediaCore_67_05.prototype.reportCsi = function(creative) {
  if (!creative.previewMode && this.shouldReportCsi(creative)) {
    var url = this.getCsiServer() + "/csi/d?s=rmad&v=2&rt=";
    var beginTimes = "";
    var intervals = "";
    for(var event in this.csiTimes) {
      var loadingTime = (this.csiTimes[event] - creative.csiBaseline);
      url += event + "." + (loadingTime > 0 ? loadingTime : 0) + ",";
      if (event == "pb" || event == "gb" || event == "fb" ) {
        beginTimes += event + "." + (loadingTime > 0 ? loadingTime : 0) + ",";
      }
    }
    url = url.replace(/\,$/, '');
    var plcrLoadingTime = this.csiTimes["pe"] - this.csiTimes["pb"];
    var gtLoadingTime = this.csiTimes["ge"] - this.csiTimes["gb"];
    var flashLoadingTime = this.csiTimes["fe"] - this.csiTimes["fb"];
    intervals = "pl." + (plcrLoadingTime > 0 ? plcrLoadingTime : 0) + ","
        + "gl." + (gtLoadingTime > 0 ? gtLoadingTime : 0) + ","
        + "fl." + (flashLoadingTime > 0 ? flashLoadingTime : 0);
    url += "&irt=" + beginTimes.replace(/\,$/, '') + "&it=" + intervals;
    var regEx = new RegExp(/(.*\/\/)/);
    url += "&adi=asd_" + creative.adServer.replace(regEx, '')
          + ",csd_" + creative.mediaServer.replace(regEx, '')
          + ",gt_" + creative.globalTemplateJs.replace(/(.*\/)/, '');
    if (this.csiHasValidStart(creative)) {
      url += "&srt=" + creative.csiAdRespTime;
    }
    this.trackUrl(url, true, creative.previewMode);
  }
};
RichMediaCore_67_05.prototype._isValidStartTime = function(startTime) {
  return this._isValidNumber(startTime);
};
RichMediaCore_67_05.prototype._convertDuration = function(duration) {
  if(duration) {
    duration = duration.toString().toUpperCase();
    switch(duration) {
    case "AUTO": return "AUTO";
    case "NONE": return 0;
    default: return (this._isValidNumber(duration) ? eval(duration) : 0);
    }
  }
  return 0;
};
RichMediaCore_67_05.prototype.convertUnit = function(pos) {
  if(pos != "") {
    pos = pos.toLowerCase().replace(new RegExp("pct", "g"), "%");
    if(pos.indexOf("%") < 0 && pos.indexOf("px") < 0 && pos.indexOf("pxc") < 0)
      pos += "px";
  }
  return pos;
};
RichMediaCore_67_05.prototype._isValidNumber = function(num) {
  var floatNum = parseFloat(num);
  if(isNaN(floatNum) || floatNum < 0)
    return false;
  return (floatNum == num);
};
RichMediaCore_67_05.prototype.writeSurveyURL = function(creative) {
  if(!creative.previewMode && creative.surveyUrl.length > 0) {
    document.write('<scr' + 'ipt src="' + creative.surveyUrl + '" language="JavaScript"></scr' + 'ipt>');
  }
};
RichMediaCore_67_05.prototype.postPublisherData = function(creative, publisherURL) {
  if(!creative.previewMode && this.isInterstitialCreative(creative) && publisherURL != "") {
    var postImg = new Image();
    postImg.src = publisherURL;
  }
};
RichMediaCore_67_05.prototype.isInterstitialCreative = function(creative) {
  return (creative.type == this.CREATIVE_TYPE_FLOATING
          || creative.type == this.CREATIVE_TYPE_FLOATING_WITH_REMINDER
          || creative.type == this.CREATIVE_TYPE_MULTI_FLOATING);
};
RichMediaCore_67_05.prototype.isBrowserComplient = function(plugin) {
  
  return ((this.isAndroid() && this.getAndroidOSVersion() > 2.1) || ((this.isInternetExplorer() || this.isFirefox() || this.isSafari() || this.isChrome()) && (this.isWindows() || this.isMac()))) && plugin > 0 && this.getPluginInfo() >= plugin;
};
RichMediaCore_67_05.prototype.shouldDisplayFloatingAsset = function(duration) {
  return !this.isInternetExplorer() || this._convertDuration(duration) || this.getIEVersion() >= 5.5;
};
RichMediaCore_67_05.prototype.isWindows = function() {
  return (navigator.appVersion.indexOf("Windows") != -1);
};
RichMediaCore_67_05.prototype.isFirefox = function() {
  var appUserAgent = navigator.userAgent.toUpperCase();
  if(appUserAgent.indexOf("GECKO") != -1) {
    if(appUserAgent.indexOf("FIREFOX") != -1) {
      var version = parseFloat(appUserAgent.substr(appUserAgent.lastIndexOf("/") + 1));
      return (version >= 1);
    }
    else if(appUserAgent.indexOf("NETSCAPE") != -1) {
      version = parseFloat(appUserAgent.substr(appUserAgent.lastIndexOf("/") + 1));
      return (version >= 8);
    } else {
      return false;
    }
  }
  else {
    return false;
  }
};
RichMediaCore_67_05.prototype.isSafari = function() {
  var br = "Safari";
  var index = navigator.userAgent.indexOf(br);
  var appVendor = (navigator.vendor != undefined) ? navigator.vendor.toUpperCase() : "";
  return (navigator.appVersion.indexOf(br) != -1)
      && parseFloat(navigator.userAgent.substring(index + br.length + 1)) >= 312.6
      && (appVendor.indexOf("APPLE") != -1 || (this.isAndroid() && appVendor.indexOf("GOOGLE") != -1));
};
RichMediaCore_67_05.prototype.isChrome = function() {
  var appUserAgent = navigator.userAgent.toUpperCase();
  var appVendor = (navigator.vendor != undefined) ? navigator.vendor.toUpperCase() : "";
  return (appUserAgent.indexOf("CHROME") != -1) && (appVendor.indexOf("GOOGLE") != -1);
};
RichMediaCore_67_05.prototype.isMac = function() {
  return (navigator.appVersion.indexOf("Mac") != -1);
};
RichMediaCore_67_05.prototype.isInternetExplorer = function() {
  return (navigator.appVersion.indexOf("MSIE") != -1 && navigator.userAgent.indexOf("Opera") < 0);
};
RichMediaCore_67_05.prototype.isIPhone = function() {
  return (navigator.userAgent.toUpperCase().indexOf("IPHONE") != -1);
};
RichMediaCore_67_05.prototype.isIPad = function() {
  return (navigator.userAgent.toUpperCase().indexOf("IPAD") != -1);
};
RichMediaCore_67_05.prototype.isAndroid = function() {
  return (navigator.userAgent.toUpperCase().indexOf("ANDROID") != -1);
};
RichMediaCore_67_05.prototype.getAndroidOSVersion = function() {
  var osIndex = navigator.userAgent.toUpperCase().indexOf("ANDROID");
  var indexStr = navigator.userAgent.substring(osIndex + "ANDROID".length + 1);
  return parseFloat(indexStr);
};
RichMediaCore_67_05.prototype.getAndroidBrowserVersion = function() {
  var versionIndex = navigator.userAgent.toUpperCase().indexOf("VERSION");
  var versionStr = navigator.userAgent.substring(versionIndex + "VERSION".length + 1);
  return parseFloat(versionStr);
};
RichMediaCore_67_05.prototype.getIEVersion = function() {
  var version = 0;
  if(this.isInternetExplorer()) {
    var key = "MSIE ";
    var index = navigator.appVersion.indexOf(key) + key.length;
    var subString = navigator.appVersion.substr(index);
    version = parseFloat(subString.substring(0, subString.indexOf(";")));
  }
  return version;
};
RichMediaCore_67_05.prototype.getFirefoxVersion = function() {
  var versionIndex = navigator.userAgent.toUpperCase().indexOf("FIREFOX") + "FIREFOX".length + 1;
  return parseFloat(navigator.userAgent.substring(versionIndex));
};
RichMediaCore_67_05.prototype.getSafariVersion = function() {
  var versionIndex = navigator.userAgent.toUpperCase().indexOf("VERSION") + "VERSION".length + 1;
  return parseFloat(navigator.userAgent.substring(versionIndex));
};
RichMediaCore_67_05.prototype.getChromeVersion = function() {
  var versionIndex = navigator.userAgent.toUpperCase().indexOf("CHROME") + "CHROME".length + 1;
  return parseFloat(navigator.userAgent.substring(versionIndex));
};
RichMediaCore_67_05.prototype.isHTML5SupportedBrowser = function() {
   return !!document.createElement('canvas').getContext;
};
RichMediaCore_67_05.prototype.getPluginInfo = function() {
  return (this.isInternetExplorer() && this.isWindows()) ? this._getIeWindowsFlashPluginVersion() : this._detectNonWindowsFlashPluginVersion();
};
RichMediaCore_67_05.prototype._detectNonWindowsFlashPluginVersion = function() {
  var flashVersion = 0;
  var key = "Shockwave Flash";
  if(navigator.plugins && (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins[key])) {
    var version2Offset = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
    var flashDescription = navigator.plugins[key + version2Offset].description;
    var keyIndex = flashDescription.indexOf(key) + (key.length+1);
    var dotIndex = flashDescription.indexOf(".");
    var majorVersion = flashDescription.substring(keyIndex, dotIndex);
    var descArray = flashDescription.split(" ");
    var minorVersion = (parseInt(descArray[descArray.length - 1].replace(new RegExp("[A-Za-z]", "g"), "")));
    if(isNaN(minorVersion)) {
      minorVersion = "0";
    }
    flashVersion = parseFloat(majorVersion + "." + minorVersion);
    if(flashVersion > 6.0 && flashVersion < 6.65) {
      flashVersion = 0 ;
    }
  }
  return flashVersion;
};
RichMediaCore_67_05.prototype._getIeWindowsFlashPluginVersion = function() {
  var versionStr = "";
  var flashVersion = 0;
  var versionArray = new Array();
  var tempArray = new Array();
  var lineFeed = "\r\n";
  var defSwfVersion = 0;
  var str = 'swfVersion = '+ defSwfVersion + lineFeed +
    'mtfIsOk = ' + false + lineFeed +
    'On Error Resume Next' + lineFeed +
    'set motifSwfObject = CreateObject(\"ShockwaveFlash.ShockwaveFlash\")' + lineFeed +
    'mtfIsOk = IsObject(motifSwfObject)' + lineFeed +
    'if mtfIsOk = true then' + lineFeed +
    'swfVersion = motifSwfObject.GetVariable(\"$version\")' + lineFeed +
    'end if' + lineFeed + '';
  window.execScript(str, "VBScript");
  if(mtfIsOk) {
    versionStr = swfVersion;
    tempArray = versionStr.split(" ");
    if(tempArray.length > 1) {
      versionArray = tempArray[1].split(",");
      var versionMajor = versionArray[0];
      var versionRevision = versionArray[2];
      if(versionMajor > 9 && versionArray.length > 3) {
        versionRevision = versionArray[versionArray.length - 1];
      }
      flashVersion = parseFloat(versionMajor + "." + versionRevision);
    }
  }
  return flashVersion;
};
RichMediaCore_67_05.prototype.trackBackupImageEvent = function(adserverUrl) {
  var activityString = "eid1=9;ecn1=1;etm1=0;";
  var timeStamp = new Date();
  var postImage = document.createElement("IMG");
  postImage.src = adserverUrl + "&timestamp=" + timeStamp.getTime() + ";" + activityString;
};
RichMediaCore_67_05.prototype.trackUrl = function(url, createElement, previewMode) {
  if (previewMode || url == "") {
    return;
  }
  if (createElement) {
    var postImage = document.createElement("IMG");
    postImage.style.visibility = "hidden";
    postImage.style.width = "0px";
    postImage.style.height = "0px";
    postImage.src = url;
    postImage.onload = function() {
      this.parentNode.removeChild(this);
    }
    document.body.appendChild(postImage);
  }
  else {
    document.write('<IMG SRC="'+ url + '" style="display:none" onload="this.parentNode.removeChild(this)" width="0px" height="0px" alt="">');
  }
};
RichMediaCore_67_05.prototype.logThirdPartyImpression = function(creative) {
  this.trackUrl(creative.thirdPartyImpUrl, false, creative.previewMode);
};
RichMediaCore_67_05.prototype.logThirdPartyBackupImageImpression = function(creative, createElement) {
  this.trackUrl(creative.thirdPartyBackupImpUrl, createElement, creative.previewMode);
};
RichMediaCore_67_05.prototype.logThirdPartyRMImpression = function(creative, createElement) {
  this.trackUrl(creative.thirdPartyFlashDisplayUrl, createElement, creative.previewMode);
};
RichMediaCore_67_05.prototype.isPartOfArrayPrototype = function(subject) {
  for(var prototypeItem in Array.prototype) {
    if(prototypeItem == subject) {
      return true;
    }
  }
  return false;
};
RichMediaCore_67_05.prototype.toObject = function(variableName) {
  try {
    if(document.layers) {
      return (document.layers[variableName]) ? eval(document.layers[variableName]) : null;
    }
    else if(document.all && !document.getElementById) {
      return (eval("window." + variableName)) ? eval("window." + variableName) : null;
    }
    else if(document.getElementById && document.body.style) {
      return (document.getElementById(variableName)) ? eval(document.getElementById(variableName)) : null;
    }
  } catch(e){}
  return null;
};
RichMediaCore_67_05.prototype.getCallbackObjectIndex = function(obj) {
  for(var i = 0; i < dartCallbackObjects.length; i++) {
    if(dartCallbackObjects[i] == obj)
      return i;
  }
  dartCallbackObjects[dartCallbackObjects.length] = obj;
  return dartCallbackObjects.length - 1;
};
RichMediaCore_67_05.prototype.registerPageLoadHandler = function(handler, obj) {
  var callback = this.generateGlobalCallback(handler, obj);
  if ((document.readyState && document.readyState == "complete")
          || (this.isFirefox() && this.isPageLoaded)) {
    callback();
    return;
  }
  if (this.isInternetExplorer()) {
    self.attachEvent("onload", callback);
  } else {
    self.addEventListener("load", callback, true);
  }
};
RichMediaCore_67_05.prototype.pageLoaded = function() {
  RichMediaCore_67_05.prototype.isPageLoaded = true;
};
RichMediaCore_67_05.prototype.registerPageUnLoadHandler = function(handler, obj) {
  var callback = this.generateGlobalCallback(handler, obj);
  if(this.isInternetExplorer() && this.isWindows()) {
    self.attachEvent("onunload", callback);
  }
  else if(this.isFirefox() || this.isSafari() || this.isChrome()) {
    self.addEventListener("unload", callback, true);
  }
};
RichMediaCore_67_05.prototype.registerTimeoutHandler = function(timeout, handler, obj) {
  window.setTimeout(this.generateGlobalCallback(handler, obj), timeout);
};
RichMediaCore_67_05.prototype.createFunction = function(name, ownerObject, args) {
  var fun = "dartCallbackObjects[" + this.getCallbackObjectIndex(ownerObject) + "]." + name + "(";
  for(var i = 0; i < args.length; i++) {
    fun += "dartCallbackObjects[" + this.getCallbackObjectIndex(args[i]) + "]";
    if(i != (args.length - 1))
      fun += ",";
  }
  fun += ")";
  return new Function(fun);
};
RichMediaCore_67_05.prototype.generateGlobalCallback = function(handler, obj) {
  if(obj) {
    var index = this.getCallbackObjectIndex(obj);
    handler = "if(dartCallbackObjects["+ index +"] != null) dartCallbackObjects["+ index +"]." + handler;
  }
  return new Function(handler);
};
RichMediaCore_67_05.prototype.registerEventHandler = function(event, element, handler, obj) {
  var callback = this.generateGlobalCallback(handler, obj);
  if(this.isInternetExplorer() && this.isWindows()) {
    self.attachEvent("on" + event, callback);
  }
  else if(this.isFirefox() || this.isSafari() || this.isChrome()) {
    element.addEventListener(event, callback, false);
  }
};
RichMediaCore_67_05.prototype.scheduleCallbackOnLoad = function(callback) {
  var onloadCheckInterval = 200;
  if(window.document.readyState.toLowerCase() == "complete")
    eval(callback);
  else
    this.registerTimeoutHandler(onloadCheckInterval, "scheduleCallbackOnLoad('" + callback + "')", this);
};
RichMediaCore_67_05.prototype.getStyle = function(obj) {
  if(window.getComputedStyle)
    return window.getComputedStyle(obj, "");
  else if(obj.currentStyle)
    return obj.currentStyle;
  else
    return obj.style;
};
RichMediaCore_67_05.prototype.getWindowDimension = function() {
  var dimension = new Object();
  if(document.documentElement && document.compatMode == "CSS1Compat") {
    dimension.width = document.documentElement.clientWidth;
    dimension.height = document.documentElement.clientHeight;
  } else if(document.body && (document.body.clientWidth || document.body.clientHeight) && !this.isSafari()) {
    dimension.width = document.body.clientWidth;
    dimension.height = document.body.clientHeight;
  } else if(typeof(window.innerWidth) == 'number') {
    dimension.width = window.innerWidth;
    dimension.height = window.innerHeight;
  }
  return dimension;
};
RichMediaCore_67_05.prototype.getScrollbarPosition = function() {
  var scrollPos = new Object();
  scrollPos.scrollTop = 0;
  scrollPos.scrollLeft = 0;
  if(typeof(window.pageYOffset) == 'number') {
    scrollPos.scrollTop = window.pageYOffset;
    scrollPos.scrollLeft = window.pageXOffset;
  } else if(document.body && (document.body.scrollLeft || document.body.scrollTop)) {
    scrollPos.scrollTop = document.body.scrollTop;
    scrollPos.scrollLeft = document.body.scrollLeft;
  } else if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
    scrollPos.scrollTop = document.documentElement.scrollTop;
    scrollPos.scrollLeft = document.documentElement.scrollLeft;
  }
  return scrollPos;
};
RichMediaCore_67_05.prototype.isInFriendlyIFrame = function() {
  return this.isWindowAccessible(self.parent);
};
RichMediaCore_67_05.prototype.isWindowAccessible = function(win) {
 try {
  win.document.body;
  return true;
 } catch(e) {
  return false;
 }
};
RichMediaCore_67_05.prototype.isInMsnFriendlyIFrame = function() {
  return (typeof(inDapIF) != "undefined" && inDapIF);
};
RichMediaCore_67_05.prototype.isInAolFriendlyIFrame = function() {
  return (typeof(inFIF) != "undefined" && inFIF);
};
RichMediaCore_67_05.prototype.isInMsnAjaxEnvironment = function() {
  return (typeof(inDapMgrIf) != "undefined" && inDapMgrIf);
};
RichMediaCore_67_05.prototype.isInYahooFriendlyIFrame = function() {
  return (typeof(isAJAX) != "undefined" && isAJAX);
};
RichMediaCore_67_05.prototype.isInClientPreviewIFrame = function() {
  if(typeof(StudioPreviewResponse) != "undefined") {
    return !(new StudioPreviewResponse()).isAdslotDetected;
  } else {
    return false;
  }
};
RichMediaCore_67_05.prototype.isInAdSenseIFrame = function() {
  return (typeof(IN_ADSENSE_IFRAME) != "undefined") && IN_ADSENSE_IFRAME;
};
RichMediaCore_67_05.prototype.isInWinLiveAPIPlatform = function() {
  try {
    return window["$WLXRmAd"] || (window.parent && window.parent["$WLXRmAd"]);
  } catch (e) {
    return false;
  }
};
RichMediaCore_67_05.prototype.isInYahooCrossDomainIframe = function() {
  try {
    return (window.Y && Y.SandBox) ? Y.SandBox.vendor || null : null;
  } catch (e) {
    return false;
  }
};
RichMediaCore_67_05.prototype.checkDimension = function(dim) {
  if (typeof dim == "number") {
    return dim + "px";
  } else {
    return dim + (dim != "" && dim != "auto" && dim.indexOf("px") < 0 ? "px" : "");
  }
};
RichMediaCore_67_05.prototype.setFlashVariable = function(asVersion, flashObject, variableName, value) {
  if (asVersion == 1) {
    flashObject.SetVariable("_root." + variableName, value);
  } else {
    if (!flashObject.changeInputVariable) {
      this.createExternalInterfaceCallbackAccessor(flashObject, "changeInputVariable");
    }
    flashObject.changeInputVariable(variableName, value);
  }
};
RichMediaCore_67_05.prototype.getFlashVariable = function(asVersion, flashObject, variableName) {
  if (asVersion == 1) {
    return flashObject.GetVariable("_root." + variableName);
  } else {
    if (!flashObject.getFlashVariable) {
      this.createExternalInterfaceCallbackAccessor(flashObject, "getFlashVariable");
    }
    return flashObject.getFlashVariable(variableName);
  }
};
RichMediaCore_67_05.prototype.createExternalInterfaceCallbackAccessor = function(flashObject, methodName) {
  if (flashObject[methodName]) return;
  flashObject[methodName] = function() {
    return this.CallFunction(
        '<invoke name="' + methodName + '" returntype="javascript">' +
            __flash__argumentsToXML(arguments, 0) + '</invoke>');
  };
};
RichMediaCore_67_05.prototype.getSalign = function(expandedWidth, expandedHeight, offsetTop, offsetLeft, offsetRight, offsetBottom) {
  var salign = "";
  if (offsetTop == 0 && offsetBottom != expandedHeight) {
    salign += "T";
  } else if (offsetTop != 0 && offsetBottom == expandedHeight) {
    salign += "B";
  }
  if (offsetLeft == 0 && offsetRight != expandedWidth) {
    salign += "L";
  } else if (offsetLeft != 0 && offsetRight == expandedWidth) {
    salign += "R";
  }
  if ((salign == "T" || salign == "B") && (offsetLeft != 0 || offsetRight != expandedWidth)) {
    return "";
  }
  if ((salign == "L" || salign == "R") && (offsetTop != 0 || offsetBottom != expandedHeight)) {
    return "";
  }
  return salign;
};
RichMediaCore_67_05.prototype.usesSalignForExpanding = function(salign, wmode) {
  return ( (this.isMac() && (this.isSafari() || this.isFirefox()))
           || (this.isWindows() && this.isFirefox() && wmode.toLowerCase() == "window") ) && salign.length > 0;
};
RichMediaCore_67_05.prototype.unclipFlashObject = function(asset, width, height, isHTML5) {
  this.clipFlashObject(asset, width, height, "auto", "auto", "auto", "auto", isHTML5);
};


RichMediaCore_67_05.prototype.clipFlashObject = function(asset, width, height, offsetTop, offsetRight, offsetBottom, offsetLeft, isHTML5) {
  width        = this.checkDimension(width);
  height       = this.checkDimension(height);
  offsetTop    = this.checkDimension(offsetTop);
  offsetRight  = this.checkDimension(offsetRight);
  offsetBottom = this.checkDimension(offsetBottom);
  offsetLeft   = this.checkDimension(offsetLeft);
  var isSafariMac = this.isMac() && this.isSafari();
  if (isHTML5 || (!(isSafariMac && (this.getSafariVersion() > 5
      || asset.pushContents)) && this.usesSalignForExpanding(
          asset.salign, asset.wmode))) {
    var assetId = (isHTML5 ? "IFRAME_" : "FLASH_") + asset.variableName;
    var assetElement = this.toObject(assetId);
    if (assetElement) {
      assetElement.style.width = width;
      assetElement.style.height = height;
      assetElement.width = width;
      assetElement.height = height;
      assetElement.style.marginLeft = offsetLeft == "auto" ? "0px" : offsetLeft;
      assetElement.style.marginTop = offsetTop == "auto" ? "0px" : offsetTop;
    }
  }
  var expDiv = this.toObject("DIV_" + asset.variableName);
  if (expDiv) {
    
    if (isSafariMac) {
      expDiv.style.height = height;
      expDiv.style.width = width;
    }
    expDiv.style.clip = "rect(" + offsetTop + " " + offsetRight + " " + offsetBottom + " " + offsetLeft + ")";
  }
  
  if (asset.pushContents && this.getIEVersion() >= 8) {
    this.redrawIE8ForPushdown();
  }
};
RichMediaCore_67_05.prototype.redrawIE8ForPushdown = function() {
  var bodyStyle = document.body.style.display;
  document.body.style.display = 'block';
  document.body.style.display = bodyStyle;
};
RichMediaCore_67_05.prototype.getSitePageUrl = function(creative) {
  if (creative.type == this.CREATIVE_TYPE_INPAGE_WITH_OVERLAY) {
    return "";
  }
  if (creative.previewMode) {
    return creative.livePreviewSiteUrl;
  } else {
    if (creative.type == this.CREATIVE_TYPE_INPAGE && creative.servingMethod == "i") {
      return self.document.referrer;
    } else {
      return self.location.href;
    }
  }
};
RichMediaCore_67_05.prototype.getElementPosition = function(obj) {
  var adPosition = new Object();
  if(obj.getBoundingClientRect) {
    adPosition.left = obj.getBoundingClientRect().left;
    adPosition.top = obj.getBoundingClientRect().top;
  } else {
    adPosition.left = 0;
    adPosition.top = 0;
    if (obj.offsetParent) {
      do {
        adPosition.left += obj.offsetLeft;
        adPosition.top += obj.offsetTop;
      } while (obj = obj.offsetParent);
    }
    var windowScroll = this.getScrollbarPosition();
    adPosition.top -= windowScroll.scrollTop;
    adPosition.left -= windowScroll.scrollLeft;
  }
  return adPosition;
};
RichMediaCore_67_05.prototype.isFlashObjectReady = function(asVersion, flashObject, assetName) {
  if(asVersion == 1) {
    return (flashObject && (typeof(flashObject.PercentLoaded) != "undefined") && flashObject.PercentLoaded() > 0
        && this.getAsset(assetName).conduitInitialized);
  } else {
    return flashObject != null && (typeof(flashObject.changeInputVariable) != "undefined");
  }
};

RichMediaCore_67_05.prototype.getSiteHost = function(pageUrl) {
  var siteHost = "";
  if((pageUrl.length >= 7) && (pageUrl.substr(0, 7) == "http://"))
    siteHost = pageUrl.substr(7);
  else if((pageUrl.length >= 8) && (pageUrl.substr(0, 8) == "https://"))
  siteHost = pageUrl.substr(8);
  else
    siteHost = pageUrl;
  var index = siteHost.indexOf("/");
  if(index > 0)
    siteHost = siteHost.substr(0, index);
  return siteHost;
};
RichMediaCore_67_05.prototype.getSiteProtocol = function(pageUrl) {
  var siteProtocol = "";
  if((pageUrl.length >= 5) && (pageUrl.substr(0, 5) == "http:"))
    siteProtocol = "http:";
  else if((pageUrl.length >= 6) && (pageUrl.substr(0, 6) == "https:"))
  siteProtocol = "https:";
  else
    siteProtocol = "http:";
  return siteProtocol;
};

document.write('\n \n              ');

              function PlcrInfo(filename, uid) {
                this.filename = filename;
                this.uniqueId = uid;
              }
              var richMediaPlcrMap = {};
              richMediaPlcrMap["0"] = new PlcrInfo("plcr_1944840_0_1331469223496.js", "1331469223256");
              var richMediaPlcrMap_1331469223256 = richMediaPlcrMap;
              var plcrInfo_1331469223256 = richMediaPlcrMap_1331469223256["254704968"];
              if (!plcrInfo_1331469223256) {
                plcrInfo_1331469223256 = richMediaPlcrMap_1331469223256["0"];
              }
              function RichMediaCreative_1331469223256(type) {
                var core = new RichMediaCore_67_05();
                this.creativeIdentifier = "GlobalTemplate_" + "1331469223256" + (new Date()).getTime();
                this.mtfNoFlush = "".toLowerCase();
                this.globalTemplateVersion = "67_05";
                this.isInterstitial = false;
                this.mediaServer = "http://s0.2mdn.net";
                this.adServer = "http://ad-emea.doubleclick.net";
                this.adserverUrl = "http://ad-emea.doubleclick.net/activity;src=1128861;met=1;v=1;pid=78438294;aid=254704968;ko=0;cid=47004390;rid=47020658;rv=1;";
                this.stringPostingUrl = "http://ad-emea.doubleclick.net/activity;src=1128861;stragg=1;v=1;pid=78438294;aid=254704968;ko=0;cid=47004390;rid=47020658;rv=1;rn=2126318;";
                this.swfParams = 'src=1128861&rv=1&rid=47020658';
                this.renderingId = "47020658";
                this.previewMode = (("%PreviewMode" == "true") ? true : false);
                this.debugEventsMode = (("%DebugEventsMode" == "true") ? true : false);
                this.pubHideObjects = "";
                this.pubHideApplets = "";
                this.mtfInline = ("".toLowerCase() == "true");
                this.pubTop  = core.convertUnit("");
                this.pubLeft = core.convertUnit("");
                this.pubTopFloat = "";
                this.pubRightFloat = ""
                this.pubBottomFloat = ""
                this.pubLeftFloat = ""
                this.pubDuration = "";
                this.pubWMode = "";
                this.pubTopDuration = "";
                this.pubTopWMode = "";
                this.pubRightDuration = "";
                this.pubRightWMode = "";
                this.pubBottomDuration = "";
                this.pubBottomWMode = "";
                this.pubLeftDuration = "";
                this.pubLeftWMode = "";
                this.isRelativeBody = ("" == "relative") ? true : false;
                this.debugJSMode = ("" == "true") ? true : false;
                this.adjustOverflow = ("" == "true");
                this.asContext = (('' != "") ? ('&keywords=' + '') : "")
                                  + (('' != "") ? ('&latitude=' + '') : "")
                                  + (('' != "") ? ('&longitude=' + '') : "");
                this.clickThroughUrl = "http://ad-emea.doubleclick.net/click%3Bh%3Dv8/3c47/7/98/%2a/p%3B254704968%3B0-0%3B0%3B78438294%3B2321-160/600%3B47004390/47020658/1%3B%3B%7Esscs%3D%3fhttp%3A//adserver.adtech.de/adlink%7C682%7C2322037%7C0%7C154%7CAdId%3D7484109%3BBnId%3D3%3Bitime%3D985151353%3Bkey%3Dkey1%2Bkey2%2Bkey3%2Bkey4%3Blink%3D";
                this.clickN = "";
                this.type = type;
                this.uniqueId = plcrInfo_1331469223256.uniqueId;
                this.thirdPartyImpUrl = "";
                this.thirdPartyFlashDisplayUrl = "";
                this.thirdPartyBackupImpUrl = "";
                this.surveyUrl = "";
                this.googleContextDiscoveryUrl = "http://pagead2.googlesyndication.com/pagead/ads?client=dclk-3pas-query&output=xml&geo=true";
                this.livePreviewSiteUrl = "%LivePreviewSiteUrl";
                this.customScriptFileUrl = "";
                this.servingMethod = "j";
                this.mode = "Flash";
                this.isHTML5Creative = this.mode.toLowerCase().indexOf("html5") != -1;
                if(this.previewMode && this.googleContextDiscoveryUrl.indexOf("adtest=on") == -1) {
                  this.googleContextDiscoveryUrl += "&adtest=on";
                }
                this.html5PreviewFlag = "%HTML5Preview";
                this.isHTML5PreviewMode = "%HTML5Preview" == "true";
                this.forceHTML5Creative = ("" == "true") && core.isHTML5SupportedBrowser();
                
                this.restrictPreview = (this.previewMode && this.html5PreviewFlag.indexOf("HTML5Preview") < 0)
                    && ((this.mode.toLowerCase() == "html5" && !this.isHTML5PreviewMode)
                    || (this.mode.toLowerCase() == "flash" && this.isHTML5PreviewMode));
                this.macro_eenv = "j";
                this.macro_s = "N3722.mairdumont-media";
                this.macro_eaid = "254704968";
                this.macro_n = "2126318";
                this.macro_m = "2470601954108178518";
                this.macro_erid = "47020658";
                this.macro_ebuy = "6411505";
                this.macro_ecid = "47004390";
                this.macro_erv = "1";
                this.macro_epid = "78438294";
                this.macro_eadv = "1128861";
                this.macro_esid = "410004";
                this.macro_ekid = "0";
                this.requiredFlashPlayerVersion = (9 == 11)
                    ? 10.2 : 9;
              }
              eval("RichMediaCreative_"+plcrInfo_1331469223256.uniqueId+" = RichMediaCreative_1331469223256;");
              
document.write('\n          \n                  <NOSCRIPT>\n                    <A TARGET=\"_blank\" HREF=\"http://ad-emea.doubleclick.net/activity;src%3D1128861%3Bmet%3D1%3Bv%3D1%3Bpid%3D78438294%3Baid%3D254704968%3Bko%3D0%3Bcid%3D47004390%3Brid%3D47020658%3Brv%3D1%3Bcs%3Dx%3Beid1%3D199443%3Becn1%3D1%3Betm1%3D0%3B_dc_redir%3Durl%3fhttp://ad-emea.doubleclick.net/click%3Bh%3Dv8/3c47/7/98/%2a/p%3B254704968%3B0-0%3B0%3B78438294%3B2321-160/600%3B47004390/47020658/1%3B%3B%7Esscs%3D%3fhttp%3A//adserver.adtech.de/adlink%7C682%7C2322037%7C0%7C154%7CAdId%3D7484109%3BBnId%3D3%3Bitime%3D985151353%3Bkey%3Dkey1%2Bkey2%2Bkey3%2Bkey4%3Blink%3Dhttp://int.sitestat.com/panasonic/de/s?Banner.Camcorder&amp;ns_campaign=Camcorder2012Q1.Camcorder.X909.mGS&amp;ns_mchannel=banner&amp;ns_source=Banner&amp;ns_linkname=WideSky&amp;ns_fee=0&amp;ns_type=clickin&amp;ns_url=http://www.panasonic.de/html/de_DE/8573561/index.html\">\n                    <IMG SRC=\"http://s0.2mdn.net/1128861/PID_1944840_fallback_WideSky_Camcorder_HC-X909_160x600_Mtf.jpg\" width=\"160\" height=\"600\" BORDER=\"0\" alt=\"\">\n                    </A>\n                    <IMG SRC=\"http://ad-emea.doubleclick.net/activity;src=1128861;met=1;v=1;pid=78438294;aid=254704968;ko=0;cid=47004390;rid=47020658;rv=1;&timestamp=2126318;eid1=9;ecn1=1;etm1=0;\" width=\"0px\" height=\"0px\" style=\"visibility:hidden\" BORDER=\"0\"/>\n                    <IMG SRC=\"\" width=\"0px\" height=\"0px\" style=\"visibility:hidden\" BORDER=\"0\"/>\n                    <IMG SRC=\"\" width=\"0px\" height=\"0px\" style=\"visibility:hidden\" BORDER=\"0\"/>\n                  </NOSCRIPT>\n                ');

                function generateFixedFlashCode() {
                    var core = new RichMediaCore_67_05();
                    var creative = new RichMediaCreative_1331469223256(core.CREATIVE_TYPE_INPAGE);
                    if(creative.restrictPreview) {
                      return;
                    }
                    RichMediaCreative_1331469223256.prototype.csiBaseline = new Date().getTime();
                    RichMediaCreative_1331469223256.prototype.csiAdRespTime =
                        isNaN("") ? -1 : RichMediaCreative_1331469223256.prototype.csiBaseline - parseFloat("");
                    RichMediaCreative_1331469223256.prototype.globalTemplateJs = "http://s0.2mdn.net/879366/inpageGlobalTemplate_v2_67_05"
                        + (creative.debugJSMode ? "_origin" : "" ) + ".js";
                    core.logThirdPartyImpression(creative);
                    if(core.isBrowserComplient(creative.requiredFlashPlayerVersion) ||
                        (creative.isHTML5Creative && core.isHTML5SupportedBrowser())) {
                      RichMediaCreative_1331469223256.prototype.shouldDisplayFlashAsset = !creative.forceHTML5Creative
                          && core.isBrowserComplient(creative.requiredFlashPlayerVersion);
                      if(creative.customScriptFileUrl != "") {
                        document.write('<scr' + 'ipt src="' + creative.customScriptFileUrl + '" language="JavaScript"></scr' + 'ipt>');
                      }
                      var plcrJs = "http://s0.2mdn.net/1128861/" + plcrInfo_1331469223256.filename;
                      RichMediaCore_67_05.prototype.trackCsiEvent("pb");  
                      document.write('<scr' + 'ipt src="' + plcrJs + '" language="JavaScript"></scr' + 'ipt>');
                    }
                    else {
                          var altImgAltText = "";
                          document.write('<A TARGET="_blank" HREF="http://ad-emea.doubleclick.net/activity;src%3D1128861%3Bmet%3D1%3Bv%3D1%3Bpid%3D78438294%3Baid%3D254704968%3Bko%3D0%3Bcid%3D47004390%3Brid%3D47020658%3Brv%3D1%3Bcs%3Dx%3Beid1%3D199443%3Becn1%3D1%3Betm1%3D0%3B_dc_redir%3Durl%3fhttp://ad-emea.doubleclick.net/click%3Bh%3Dv8/3c47/7/98/%2a/p%3B254704968%3B0-0%3B0%3B78438294%3B2321-160/600%3B47004390/47020658/1%3B%3B%7Esscs%3D%3fhttp%3A//adserver.adtech.de/adlink%7C682%7C2322037%7C0%7C154%7CAdId%3D7484109%3BBnId%3D3%3Bitime%3D985151353%3Bkey%3Dkey1%2Bkey2%2Bkey3%2Bkey4%3Blink%3Dhttp://int.sitestat.com/panasonic/de/s?Banner.Camcorder&amp;ns_campaign=Camcorder2012Q1.Camcorder.X909.mGS&amp;ns_mchannel=banner&amp;ns_source=Banner&amp;ns_linkname=WideSky&amp;ns_fee=0&amp;ns_type=clickin&amp;ns_url=http://www.panasonic.de/html/de_DE/8573561/index.html"><IMG SRC="http://s0.2mdn.net/1128861/PID_1944840_fallback_WideSky_Camcorder_HC-X909_160x600_Mtf.jpg" width="160" height="600" BORDER=0 alt="'+ altImgAltText +'"></A>');
                        if(!creative.previewMode) {
                          core.trackBackupImageEvent(creative.adserverUrl);
                        }
                        core.logThirdPartyBackupImageImpression(creative, false);
                    }
                    core.writeSurveyURL(creative);
                }
                generateFixedFlashCode();
                
document.write('\n                ');

                    var core = new RichMediaCore_67_05();
                    if(core.isInMsnAjaxEnvironment()) {
                        window.setTimeout("document.close();", 1000);
                    }
                
document.write('\n');
