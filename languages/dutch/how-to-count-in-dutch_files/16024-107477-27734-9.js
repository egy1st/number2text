document.write( "<style>" );
document.write( ".selectOptional {display:none;}" );
document.write( ".headline_blockAD_____29270 {position:absolute;left:0px;top:12px;width:300px;height:25px;font-family:Arial Black, sans-serif;color:#ffffff;font-size:20px;line-height:24px;font-weight:normal;text-align:center;}" );
document.write( ".tagline_blockAD_____29270 {position:absolute;left:12px;top:40px;width:270px;height:40px;font-family:sans-serif;color:#ffffff;font-size:13px;text-align:center;}" );
document.write( ".question_blockAD_____29270 {position:absolute;left:22px;top:85px;width:255px;height:95px;border:none;font-size:13px;}" );
document.write( ".selection_blockAD_____29270 {position:absolute;left:18px;top:175px;width:266px;height:22px;border:solid 1px transparent;font-size:13px;}" );
document.write( ".submit_rectangleAD_____29270 {position:absolute;left:142px;top:210px;width:138px;height:30px;background-color:transparent;border:none;cursor:pointer;}" );
document.write( ".text_link_blockAD_____29270 {position:absolute;left:px;top:0px;width:0px;height:0px;}" );
document.write( ".padlock_blockAD_____29270 {position:absolute;left:px;top:0px;width:0px;height:0px;}" );
document.write( "#selection_listAD_____29270 {text-align:left;position:absolute;border:solid 1px #999999;padding-left:3px;left:18px;top:175px;width:266px;height:20px;z-index:1;background-color:#ffffff;overflow-x:hidden;overflow:hidden;}" );
document.write( "#selection_list_itemAD_____29270 {position:absolute;left:0;top:0;z-index:2;background-color:#ffffff;width:266px;border:dotted 1px #999999;display:none;font-size:15px;height:18px;}" );
document.write( "#selection_list_btnAD_____29270 {position:absolute;padding:1px;left:1px;top:-1px;width:266px;height:18px;z-index:3;background-color:transparent;border:dotted 1px #999999;overflow:hidden;}" );
document.write( ".selection_list_optionAD_____29270 {font-size:15px;height:19px;margin-bottom:3px;cursor:pointer;}" );
document.write( "</style>" );
(function () {
var IEAD_____29270 = document.all;
var ClickTrackingAD_____29270 = "%c";
var RedirectURLAD_____29270 = '**redirecturl**';
var same_windowAD_____29270 = false;
var clickallAD_____29270 = false;
var mediaplexAD_____29270 = true;
var test_interstitialAD_____29270 = '';
var question_prefixAD_____29270 = '';

var debugAD_____29270 = false;

function _gelAD_____29270(id) {
  return document.getElementById(id + 'AD_____29270');
}

function goWrapperAD_____29270() {
  if (clickallAD_____29270) {
    submittedAD_____29270(_gelAD_____29270('theForm'));
  }
}

function noBubbleAD_____29270(e) {
  if (IEAD_____29270) {
    window.event.cancelBubble = true;
  } 
  if (!e) {
    e = window.event;
  }
  if (e.cancelBubble) {
    e.cancelBubble = true;
  } else {
    e.stopPropagation();
  } 
}

function haveQuestionAD_____29270() {
  var q = '';
  var it = _gelAD_____29270('question');
  var it2 = _gelAD_____29270('prompt');
  if (it && it2) {
    if (it.value && it.value != it2.value) {
      q = it.value;
    } else {
      it.value = '';
    }
  }
  return q;
}

var durlAD_____29270 = '';
var ridAD_____29270 = '';
var jcltAD_____29270 = '';

function setLandingPageAD_____29270() {
  var url = (durlAD_____29270 || 'http://www.justanswer.com/sip/computer?jclt=Homework+Help&r=dd|dummies&FID={FID}&TP=normal-tutor-dummies-300x250&JPRC=1&JPAF=gadget');
  var args = getArgsAD_____29270();
  if (args['url']) {
    url = args['url'];
  }
  var q = haveQuestionAD_____29270();
  if (q) {
    url = 'http://www.justanswer.com/gadget-landing.aspx?jclt=Homework+Help&r=dd|dummies&FID={FID}&TP=normal-tutor-dummies-300x250&JPRC=1&JPAF=gadget&question={QUESTION}';
  } 

  if (ridAD_____29270) {
    url.replace(/dd|dummies/g, encodeURIComponent(ridAD_____29270));
    var exp = new RegExp("{" + 'REFID' + "}", 'g');
    url = url.replace(exp, ridAD_____29270);
  }
  url = url.replace(/{QUESTION}/g, encodeURIComponent(question_prefixAD_____29270 + q));
  try { 
    url = url.replace(/{ANSW_CATS}/, encodeURIComponent(answ_cats ? '|' + answ_cats : ''));
  } catch(err) {
    url = url.replace(/{ANSW_CATS}/, '');
  }

  var tp = 'normal-{CAT}-{WxH}';
  var fid = '13';
  var sel = _gelAD_____29270('fid');
  if (sel) {
    var n = (sel.selectedIndex >= 0 ? sel.selectedIndex : 0);
    if (sel.options) {
      fid = sel.options[n].value;
    } else {
      fid = sel.value;
    }
  }
  url = url.replace(/{FID}/g, fid);
  url = url.replace(/{TP}/g, tp);
  if (jcltAD_____29270) {
    url += '&jclt=' + encodeURIComponent(jcltAD_____29270);
  }

  if (location.href.indexOf('echo3.net') < 0) {
    test_interstitialAD_____29270 = '';
  }

  if (mediaplexAD_____29270 && 'http://ad.doubleclick.net/click;h=v8/3c47/3/0/*/p;254723456;0-0;1;30891361;4307-300/250;47099597/47115775/1;;~sscs=?' != ('<mp' + 'vc/>')) {
    url = 'http://ad.doubleclick.net/click;h=v8/3c47/3/0/*/p;254723456;0-0;1;30891361;4307-300/250;47099597/47115775/1;;~sscs=?http://altfarm.mediaplex.com/ad/ck/16024-107477-27734-9?mpt=1333029161861?mpre=' + encodeURIComponent(url);
  } else {
    var redir = '';
    if (RedirectURLAD_____29270 == '**' + 'redirecturl**') {
      RedirectURLAD_____29270 = '';
    }

    try {
      var ar = (document.location.href.split('?')[1]).split('&');
      redir = (ar[2].split('=')[1] || RedirectURLAD_____29270 || test_interstitialAD_____29270);
    } catch (err) {
      redir = (RedirectURLAD_____29270 || test_interstitialAD_____29270);
    }

    if (redir.indexOf('http') == 0) {
      url = redir + encodeURIComponent(url);
    }
  
    if (ClickTrackingAD_____29270 != ('%' + 'c')) {
      url = ClickTrackingAD_____29270 + encodeURIComponent(url);
    }
  }

  return url;
}

function submittedAD_____29270(frm) {
  var url = setLandingPageAD_____29270();
  if (debugAD_____29270 && document.location.href.indexOf('echo3.net') >= 0) {
    if (!confirm(url)) {
      return;
    }
  }

  if (!same_windowAD_____29270 || clickallAD_____29270) {
    frm.target = (same_windowAD_____29270 ? '_top' : '_blank');
    frm.action = url;
    frm.submit();
  } else {
    top.location.href = url;
  }
}

function clearQuestionAD_____29270(it) {
  if (it) {
    var it2 = _gelAD_____29270('prompt');
    if (it2) {
      if (it.value == it2.value) {
        it.value = '';
      }
    }
  }
}

var arHeadlinesAD_____29270 = new Array("Ask a Tutor Online", null);
var contextualAD_____29270 = false;
var sizingAD_____29270 = false;
var sel_closed_hAD_____29270 = '20px';
var sel_opened_hAD_____29270 = 0;
var selection_pendingAD_____29270 = false;
var selection_timerIDAD_____29270 = null;
var headline_timerIDAD_____29270 = null;
var headline_rotateAD_____29270 = false;
var headline_idxAD_____29270 = 0;
var headline_loopAD_____29270 = false;

function isBAAD_____29270() {
  var topdomain = '';
  var sites = 'lawyers.comlawyer.comlaw.cornell.edudrugs.comdrugtalk.combettermedicine.comrightdiagnosis.comhealthcentral.comhealthcommunities.comhealthsquare.comcarcomplaints.comteamintegra.netbimmerwerks.comtaurusclub.com8thcivic7thgenhondapreludeonlineodysseyownersclub.comgencoupe.comforteforums.commazda3forums.comsr20forum.comyoursciontc.comsuzuki-forums.compriusonline.comdummies.commanualsonline.comfixya.comretrevo.comaskbobrankin.comhowtogeek.comtechguy.orgthegalaxytabforum.comslatedroid.comgalaxys2forums.comgalaxynexusforum.netincredible2forum.comatrix4gforum.commyiphone4.orgwp7forum.comnokian8forum.comevo4gforum.nethtcdesireforum.commygalaxytab.netnexussforum.netwonderhowto.combrighthub.comhighdefdigest.comhighdefforum.combensbargains.netwirelessforums.orghealth.com';
  try {
    var ar = (document.domain || '').split('.');
    while (ar.length > 2) {
      ar.shift();
    }
    topdomain = ar.join('.');
  } catch(err) {
  }
  return (sites.indexOf(topdomain) >= 0 ? true : false);
}
    
function setOpacityAD_____29270(it, n) {
  if (it) {
    if (n > 100) {
      n = 100;
    }
    if (IEAD_____29270) {
      it.style.zoom = 1;
      if (n == 100) {
        it.style.filter = '';
      } else {
        it.style.filter = 'alpha(opacity=' + n + ')';
      }
    }
    it.style.opacity = n/100;
    it.style.MozOpacity = n/100;
    it.opacity = n;
  }
}

function fadeInAD_____29270(id, fx) {
  var it = _gelAD_____29270(id);
  if (it) {
    if (it.opa < 100) {
      it.opa += 10;
      setOpacityAD_____29270(it, it.opa);
      setTimeout(function () {fadeInAD_____29270(id, fx)}, 40);
    } else if (fx) {
      fx();
    }
  }
}

function fadeOutAD_____29270(id, fx) {
  var it = _gelAD_____29270(id);
  if (it) {
    if (it.opa > 0) {
      it.opa -= 10;
      setOpacityAD_____29270(it, it.opa);
      setTimeout(function () {fadeOutAD_____29270(id, fx)}, 40);
    } else if (fx) {
      fx();
    }
  }
}

function rotateHeadlineAD_____29270() {
  if (headline_timerIDAD_____29270 != null) {
    clearTimeout(headline_timerIDAD_____29270);
  }
  if (arHeadlinesAD_____29270.length > 2) {
    var last = false;
    headline_idxAD_____29270++;
    if (headline_idxAD_____29270 >= arHeadlinesAD_____29270.length || arHeadlinesAD_____29270[headline_idxAD_____29270] == null) {
      last = true;
      if (headline_loopAD_____29270) {
        headline_idxAD_____29270 = 0;
      } else {
        headline_idxAD_____29270 = arHeadlinesAD_____29270.length - 2;
      }
    }

    var it = _gelAD_____29270('headline');
    if (it) {
      if (headline_idxAD_____29270 < 0 || headline_idxAD_____29270 >= (arHeadlinesAD_____29270.length - 1)) {
        headline_idxAD_____29270 = 0;
      }
      it.opa = 100;
      if (last && !headline_loopAD_____29270) {
        it.innerHTML = arHeadlinesAD_____29270[headline_idxAD_____29270];
      } else {
        fadeOutAD_____29270('headline', function(){it.innerHTML = arHeadlinesAD_____29270[headline_idxAD_____29270];fadeInAD_____29270('headline', null);});
      }
    }
    if (!last || headline_loopAD_____29270) {
      headline_timerIDAD_____29270 = setTimeout(function(){rotateHeadlineAD_____29270();}, 3 * 1000);
    }
  }
}

function getArgsAD_____29270() {
  var params = {};
  var paramString = window.location.search.substring(1);
  if (paramString) {
    var pairs = paramString.split('&');
    for (var i = 0; i < pairs.length; i++) {
      var p = pairs[i].split('=');
      var paramval = '';
      var decodedName = decodeURIComponent(p[0]);
      if (decodedName.length > 0) {
        if (p.length > 1) {
          paramval = decodeURIComponent(p[1]);
        }
        params[decodedName] = paramval;
      }
    }
  }
  return params;
}

function setValueAD_____29270(id, given) {
  var it = _gelAD_____29270(id);
  if (it) {
    if (it.type == 'text' || it.type == 'hidden') {
      it.value = (given || '');
    } else if (it.type && it.type.indexOf('select') >= 0) {
      for (var i in it.options) {
        if (it.options[i].value == given) {
          it.selectedIndex = i;
          break;
        }
      }
    } else {
      it.innerHTML = (given || '');
    }
  }
}

function closeSelAD_____29270(delay) {
  if (selection_timerIDAD_____29270) {
    clearTimeout(selection_timerIDAD_____29270);
    selection_timerIDAD_____29270 = null;
  }
  if (delay || selection_pendingAD_____29270 || sizingAD_____29270) {
    selection_timerIDAD_____29270 = setTimeout(function(){closeSelAD_____29270();}, (delay ? delay : 1500));
  } else {
    var it = _gelAD_____29270('selection_list');
    if (it) {
      if (it.style.height != sel_closed_hAD_____29270) {
        toSizeAD_____29270('selection_list', {h:parseInt(sel_closed_hAD_____29270)});
        it.style.paddingTop = 0;
      }
    }
  }
}

function hiSelAD_____29270(it) {
  it.style.backgroundColor = '#0000cc';
  it.style.color = '#ffffff';
  selection_pendingAD_____29270 = true;
}

function loSelAD_____29270(it) {
  it.style.backgroundColor = '#ffffff';
  it.style.color = '#000000';
  selection_pendingAD_____29270 = false;
}

function toSizeAD_____29270(id, sz) {
  var it = _gelAD_____29270(id);
  if (it) {
    var again = false;
    if (!isNaN(sz.h)) {
      var hpx = parseInt(it.style.height);
      if (isNaN(hpx)) {
        it.style.height = sz.h + 'px';
      } else {
        var dh = Math.abs(hpx - sz.h);
        if (dh > 1) {
          var dy = 18; 
          if (dy > dh) {
            dy = 1;
          }
          //hpx += (hpx < sz.h ? dy : (hpx > sz.h  ? 0 - dy : 0));
          hpx += (hpx < sz.h ? dy : 0 - dy);
          it.style.height = hpx + 'px';
          again = true;
        }
      }
    }

    if (again) {
      sizingAD_____29270 = true;
      setTimeout(function(){toSizeAD_____29270(id, sz);}, 40);
    } else {
      sizingAD_____29270 = false;
    }
  }
}

function selAD_____29270(it) {
  var sel = _gelAD_____29270('fid');
  var div = _gelAD_____29270('selection_list');
  var item = _gelAD_____29270('selection_list_item');
  if (sel && div && item) {
    for (var i in sel.options) {
      if (sel.options[i].text == it.innerHTML) {
        sel.selectedIndex = i;
        item.innerHTML = it.innerHTML;
        item.style.display = 'block';
        item.style.height = sel_closed_hAD_____29270;
        div.style.paddingTop = '1px';
        div.scrollTop = 0;
        _gelAD_____29270('selection_list_btn').style.display = 'block';
        div.style.height = sel_closed_hAD_____29270;
        toSizeAD_____29270('selection_list', {h:parseInt(sel_closed_hAD_____29270)});
        break;
      }
    }
  }
}

function bootAD_____29270(args) {
  if (args['headline']) {
    setValueAD_____29270('headline', args['headline']);
  }
  if (args['headline_font_size']) {
    var it = _gelAD_____29270('headline');
    if (it) {
      it.style.fontSize = args['headline_font_size'];
    }
  }
  if (args['headline_style']) {
    var it = _gelAD_____29270('headline');
    if (it) {
      try { 
        it.style = args['headline_style'];
      } catch(err) {
        it.cssText = args['headline_style'];
      }
    }
  }

  if (args['tagline']) {
    setValueAD_____29270('tagline', args['tagline']);
  }
  if (args['tagline_style']) {
    var it = _gelAD_____29270('tagline');
    if (it) {
      try { 
        it.style = args['tagline_style'];
      } catch(err) {
        it.cssText = args['tagline_style'];
      }
    }
  }

  if (args['destination_url']) {
    durlAD_____29270 = args['destination_url'];
  }

  if (args['referral_id']) {
    ridAD_____29270 = args['referral_id'];
  }

  if (args['jclt']) {
    jcltAD_____29270 = args['jclt'];
  }

  if (args['fid']) {
    setValueAD_____29270('fid', args['fid']);
  }

  if (args['display']) {
    var it = _gelAD_____29270('wrapper');
    if (it) {
      it.style.display = args['display'];
    }
  }

  if (args['options']) {
    var it = _gelAD_____29270('fid');
    if (it) {
      it.options.length = 0;
      var opts = args['options'].split(';');
      var idx = 0;
      for (var i in opts) {
        if (opts[i]) { 
          var ar = new Array();
          try { 
            ar = opts[i].split('|');
          } catch(err) {
          }
          if (ar.length == 2) {
            var opt = new Option(ar[1], ar[0], (idx == 0 ? true : false), false);
            it.options[idx++] = opt;
          }
        }
      }
    }
  }
}

function load_scriptAD_____29270(script_url) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.charset = 'UTF-8';
  script.src = script_url;
  var head = (document.getElementsByTagName('head')[0] || document.documentElement);
  head.insertBefore(script, head.firstChild);
}

function initAD_____29270() {

  var args = getArgsAD_____29270();
  bootAD_____29270(args);

  if (headline_rotateAD_____29270) {
    headline_timerIDAD_____29270 = setTimeout(function(){rotateHeadlineAD_____29270();}, 3 * 1000);
  }

  var script_url = site_url = '';
  script_url = 'http://just-answer.appspot.com/ac?';
  script_url += '&uq=' + encodeURIComponent('AD_____29270');
  script_url += '&sz=' + encodeURIComponent('300x250');
  try {
    script_url += '&title=' + encodeURIComponent(document.title || '');
    script_url += '&site=' + encodeURIComponent(top.location.hostname);
    script_url += '&rdomain=' + encodeURIComponent(document.domain);
  } catch(err) {
  }

  try {
    // answ_cats defined in this page?
    if (answ_cats) {
      var it = _gelAD_____29270('wrapper');
      if (it) {
        it.style.display = 'none';
        script_url += '&cid=' + encodeURIComponent(answ_cats);
        load_scriptAD_____29270(script_url);
        return;
      }
    }
  } catch(err) {
  }

  try {
    if (window != window.top) {
      // we are in an iframe
      var head = (document.getElementsByTagName('head')[0] || document.documentElement);
      head.innerHTML = '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>' + head.innerHTML;
      var db = document.getElementsByTagName('body')[0];
      db.style.border = 'none';
      db.style.margin = '0';
      db.style.padding = '0';
    }
    site_url = (args['site_url'] || top.location.href || 'http://' + document.domain || '');
  } catch(err) {
    site_url = (args['site_url'] || '');
  }

  if (site_url) {
    if (contextualAD_____29270 || isBAAD_____29270()) {
      var it = _gelAD_____29270('wrapper');
      if (it) {
        it.style.display = (false ? 'none' : 'block');
        var clues = site_url;
        script_url += '&urid=' + encodeURIComponent('contextual');
        script_url += '&cid=' + encodeURIComponent(clues.substr(0, 1024));
        load_scriptAD_____29270(script_url);
        return;
      }
    }
  }
}

window.onbeforeunload = function () {
  //
}

if (!window._gelAD_____29270) {
  window._gelAD_____29270 = _gelAD_____29270;
}
if (!window.goWrapperAD_____29270) {
  window.goWrapperAD_____29270 = goWrapperAD_____29270;
}
if (!window.noBubbleAD_____29270) {
  window.noBubbleAD_____29270 = noBubbleAD_____29270;
}
if (!window.bootAD_____29270) {
  window.bootAD_____29270 = bootAD_____29270;
}
if (!window.initAD_____29270) {
  window.initAD_____29270 = initAD_____29270;
}
if (!window.clearQuestionAD_____29270) {
  window.clearQuestionAD_____29270 = clearQuestionAD_____29270;
}
if (!window.submittedAD_____29270) {
  window.submittedAD_____29270 = submittedAD_____29270;
}
if (!window.selAD_____29270) {
  window.selAD_____29270 = selAD_____29270;
}
if (!window.hiSelAD_____29270) {
  window.hiSelAD_____29270 = hiSelAD_____29270;
}
if (!window.loSelAD_____29270) {
  window.loSelAD_____29270 = loSelAD_____29270;
}
if (!window.submittedAD_____29270) {
  window.submittedAD_____29270 = submittedAD_____29270;
}
if (!window.toSizeAD_____29270) {
  window.toSizeAD_____29270 = toSizeAD_____29270;
}
if (!window.closeSelAD_____29270) {
  window.closeSelAD_____29270 = closeSelAD_____29270;
}
})();

document.write( "<div id=\"wrapperAD_____29270\" style=\"color:#000000;font-family:Arial,sans-serif;display:block;position:relative;width:300px;height:250px;overflow:hidden;background-color:transparent;background-image:url(http://gadgets.justanswer.com/ja/assets/300x250-bdummiesv3-bgnd-nodd.png?v0);background-repeat:no-repeat;padding:0;margin:0;line-height:normal;\" onclick=\"goWrapperAD_____29270();\">" );
document.write( "<div id=\"selection_listAD_____29270\" style=\"overflow:hidden;display:none;\"></div>" );
document.write( "<div id=\"headlineAD_____29270\" class=\"headline_blockAD_____29270\"  style=\"overflow:hidden;font-size:19px\">Ask a Tutor Online</div>" );
document.write( "<div id=\"taglineAD_____29270\" class=\"tagline_blockAD_____29270\" style=\"overflow:hidden;\">12 Tutors are Online Now.<br /> Ask a Question.  Get Tutoring Help ASAP.</div>" );
document.write( "<div id=\"text_linkAD_____29270\" class=\"text_link_blockAD_____29270\" style=\"overflow:hidden;\"></div>" );
document.write( "<form id=\"theFormAD_____29270\" target=\"_top\" method=\"POST\" onsubmit=\"submittedAD_____29270(this);return false;\">" );
document.write( "<input type=\"hidden\" id=\"rAD_____29270\" name=\"r\" value=\"dd|dummies\" /><input type=\"hidden\" id=\"JPRCAD_____29270\" name=\"JPRC\" value=\"1\" />" );
document.write( "<textarea style=\"display:none;\" id=\"promptAD_____29270\">Type your question here...</textarea>" );
function stopcursorAD_____29270() {
  var it = document.getElementById('cursorAD_____29270');
  if (it) {
    if (it.style.display != 'none') {
      it.style.display = 'none';
    }
  }
  it = document.getElementById('questionAD_____29270');
  if (it) {
    if (it.style.display != 'block') {
      it.style.display = 'block';
    }
  }
}
setTimeout(stopcursorAD_____29270, 15 * 1000);

document.write( "<div id=\"cursorAD_____29270\" class=\"question_blockAD_____29270\" style=\";font-family:Arial,sans-serif;overflow-x:hidden;overflow-y:auto;;padding:2px;text-align:left;\" onmouseover=\"this.style.display='none';document.getElementById('questionAD_____29270').style.display='block';\"" );
document.write( ">Type your question here...<img align=\"top\" src=\"http://gadgets.justanswer.com/ja/assets/cursor.gif\" width=\"12\" height=\"13\" alt=\"\" title=\"\" /></div><textarea id=\"questionAD_____29270\" name=\"question\" " );
document.write( "  class=\"question_blockAD_____29270\" style=\";font-family:Arial,sans-serif;overflow-x:hidden;overflow-y:auto;display:none;;text-align:left;\" maxlength=\"1000\" lang=\"en-US\"" );
document.write( "  onkeyup=\"if (this.value.length > 1000) {this.value = this.value.substr(0, 1000);}\"" );
document.write( "  onmousedown=\"clearQuestionAD_____29270(this);this.focus()\"" );
document.write( ">Type your question here...</textarea><input type=\"hidden\" id=\"fidAD_____29270\" name=\"fid\" value=\"13\" /><div class=\"click300x250AD_____29270\"><input id=\"submitButtonAD_____29270\" type=\"submit\" class=\"submit_rectangleAD_____29270\" value=\" \"/></div>" );
document.write( "</form>" );
document.write( "</div>" );
var it = _gelAD_____29270('question');
if (it) {
  it.onclick = noBubbleAD_____29270;
} 
var it = _gelAD_____29270('fid');
if (it) {
  it.onclick = noBubbleAD_____29270;
}
var it = _gelAD_____29270('submitButton');
if (it) {
  it.onclick = noBubbleAD_____29270;
}
var it = _gelAD_____29270('selection_list');
if (it) {
  it.onclick = noBubbleAD_____29270;
}
initAD_____29270();

