/*get_cookies.js|click_tracker.js|jquery.jcarousellite.pauseOnHover.min.js|google_custom_ad_sets_com_35.js|search.js|header_section_more.js|ga_social_tracking.js|openimage.js*/ function getCookie(c_name){
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name)
	    {
	    return unescape(y);
	    }
	  }
} $(function(){
	$('a').click(function(){
		
		var hostname = '';
		var source = '';
		var destination = '';
		var link_text = '';
		
		thehostname = window.location.hostname;
		thepathname = window.location.pathname;
		
		source = thehostname + thepathname
		
		if($(this).attr('href')){
			destination = $(this).attr('href');
		}else if($(this).attr('onclick')){
			destination = $(this).attr('onclick');
		}else if($(this).attr('area')){
			destination = $(this).attr('area');
		}
		
		link_text = $(this).text();
		
		$.post("http://www.suite101.com/click_tracker.cfm", { source:source, destination:destination, link_text:link_text });
		
	});
}); (function($){$.fn.jCarouselLite=function(o){o=$.extend({btnPrev:null,btnNext:null,btnGo:null,mouseWheel:false,auto:null,speed:200,easing:null,vertical:false,circular:true,visible:3,start:0,scroll:1,pauseOnHover:false,beforeStart:null,afterEnd:null},o||{});return this.each(function(){var running=false,animCss=o.vertical?"top":"left",sizeCss=o.vertical?"height":"width";var div=$(this),ul=$("ul",div),tLi=$("li",ul),tl=tLi.size(),v=o.visible,paused=0;if(o.circular){ul.prepend(tLi.slice(tl-v-1+1).clone()).append(tLi.slice(0,v).clone());o.start+=v}o.pauseOnHover?ul.hover(function(){paused=1},function(){paused=0}):"";var li=$("li",ul),itemLength=li.size(),curr=o.start;div.css("visibility","visible");li.css({overflow:"hidden","float":o.vertical?"none":"left"});ul.css({margin:"0",padding:"0",position:"relative","list-style-type":"none","z-index":"1"});div.css({overflow:"hidden",position:"relative","z-index":"2",left:"0px"});var liSize=o.vertical?height(li):width(li);var ulSize=liSize*itemLength;var divSize=liSize*v;li.css({width:li.width(),height:li.height()});ul.css(sizeCss,ulSize+"px").css(animCss,-(curr*liSize));div.css(sizeCss,divSize+"px");if(o.btnPrev){$(o.btnPrev).click(function(){return go(curr-o.scroll)})}if(o.btnNext){$(o.btnNext).click(function(){return go(curr+o.scroll)})}if(o.btnGo){$.each(o.btnGo,function(i,val){$(val).click(function(){return go(o.circular?o.visible+i:i)})})}if(o.mouseWheel&&div.mousewheel){div.mousewheel(function(e,d){return d>0?go(curr-o.scroll):go(curr+o.scroll)})}if(o.auto){setInterval(function(){go(curr+o.scroll)},o.auto+o.speed)}function vis(){return li.slice(curr).slice(0,v)}function go(to){if(!running&&!paused){if(o.beforeStart){o.beforeStart.call(this,vis())}if(o.circular){if(to<=o.start-v-1){ul.css(animCss,-((itemLength-(v*2))*liSize)+"px");curr=to==o.start-v-1?itemLength-(v*2)-1:itemLength-(v*2)-o.scroll}else{if(to>=itemLength-v+1){ul.css(animCss,-((v)*liSize)+"px");curr=to==itemLength-v+1?v+1:v+o.scroll}else{curr=to}}}else{if(to<0||to>itemLength-v){return}else{curr=to}}running=true;ul.animate(animCss=="left"?{left:-(curr*liSize)}:{top:-(curr*liSize)},o.speed,o.easing,function(){if(o.afterEnd){o.afterEnd.call(this,vis())}running=false});if(!o.circular){$(o.btnPrev+","+o.btnNext).removeClass("disabled");$((curr-o.scroll<0&&o.btnPrev)||(curr+o.scroll>itemLength-v&&o.btnNext)||[]).addClass("disabled")}}return false}})};function css(el,prop){return parseInt($.css(el[0],prop))||0}function width(el){return el[0].offsetWidth+css(el,"marginLeft")+css(el,"marginRight")}function height(el){return el[0].offsetHeight+css(el,"marginTop")+css(el,"marginBottom")}})(jQuery); /* GCA - google custom ads */

var global_google_ads = new Array;
var gca = new Object ;
gca.ad_classes = '' ;
gca.ad_set_classes = '' ;
gca.ad_set_box_classes = '' ;
gca.ad_width = 336 ;
gca.start_pos = 0 ;
gca.ad_style = 1 ;

function google_ad_request_done(google_ads) { // called by google syndication script include
	if (google_ads.length == 0) {
		return;
	}

	global_google_ads = google_ads;
	return;
}

function gca_process_ad_unit(ad_index) {
	var s = '' ;
	switch(gca.ad_style) {
		case 1 :   // vertical - main block & below article
			s += 	
					'<div style="width:' + gca.ad_width + 'px; ">' +
					'<a href="' + global_google_ads[i].url + '" target="_blank">' +
						global_google_ads[i].line1 + 
					'</a>' +
					'<br/>' +
					'<span class="g_ad_topSpacer_text">' + global_google_ads[i].line2 + 
					' ' +
					global_google_ads[i].line3 + '</span>' + 
					'<br /> <a href="' + global_google_ads[i].url + '" target="_blank" style="text-decoration:none; font-size:13px; color:#0E774A; font-weight:normal">' + 
						global_google_ads[i].visible_url + 
					'</a>' + 
					'</div>' +
					'<br/>';
				
		break ;

		case 2 :   // horizontal 
			s += 	
					'<div style="width:' + gca.ad_width + 'px; float:left;">' +
						'<a href="' + global_google_ads[i].url + '" target="_blank">' +
							global_google_ads[i].line1 + 
						'</a>' + 
						'<br/>' +
						global_google_ads[i].line2 + 
						' ' +
						global_google_ads[i].line3 + 
						'<br/>' +
						'<a href="' + global_google_ads[i].url + '" target="_blank" style=" text-decoration:none; color:green; font-size:9pt; font-weight:normal;">' + 
							global_google_ads[i].visible_url + 
						'</a>' +
					'</div>';
				
		break ;
		
		case 3 :   // horizontal 
			s += 	
					'<li>' +
						'<a href="' + global_google_ads[i].url + '" target="_blank" style="font-weight:bold;">' +
							global_google_ads[i].line1 + 
						'</a>' + 

						global_google_ads[i].line2 + 
						' ' +
						global_google_ads[i].line3 + 
						'<br/>' +
						'<a href="' + global_google_ads[i].url + '" target="_blank">' + 
							global_google_ads[i].visible_url + 
						'</a>' +
					'</li>';
				
		break ;

		case 4 :   // horizontal mid article (interstitial)
			s += 	
					'<div style="margin:10px 0">' +
						'<a href="' + global_google_ads[i].url + '" target="_blank">' +
							global_google_ads[i].line1 + 
						'</a>' + ' ' +
						'<span class="g_ad_topSpacer_text">' + global_google_ads[i].line2 + 
						' ' +
						global_google_ads[i].line3 + '</span> ' +
						'<a href="' + global_google_ads[i].url + '" target="_blank" style="text-decoration:none; font-size:13px; color:#0E774A; font-weight:normal">' + 
							global_google_ads[i].visible_url + 
						'</a>' +
					'</div>';
				
		break ;
		
		case 5 :   // horizontal news
			s += 	
					'<div style="width:' + gca.ad_width + 'px; float:left; margin-bottom:10px;">' +
						'<a href="' + global_google_ads[i].url + '" target="_blank">' +
							global_google_ads[i].line1 + 
						'</a>' + 
						'<br/>' +
						global_google_ads[i].line2 + 
						' ' +
						global_google_ads[i].line3 + 
						'<br/>' +
						'<a href="' + global_google_ads[i].url + '" target="_blank" style=" text-decoration:none; color:green; font-size:9pt; font-weight:normal;">' + 
							global_google_ads[i].visible_url + 
						'</a>' +
					'</div>';
				
		break ;
		
		case 6 :   // horizontal ads break before url
			s += 	
					'<div style="margin-bottom:10px">' +
						'<a href="' + global_google_ads[i].url + '" target="_blank">' +
							global_google_ads[i].line1 + 
						'</a>' + ' ' +
						'<span class="g_ad_topSpacer_text">' + global_google_ads[i].line2 + 
						' ' +
						global_google_ads[i].line3 + '</span> <br/>' +
						'<a href="' + global_google_ads[i].url + '" target="_blank" style="text-decoration:none; font-size:13px; color:#0E774A; font-weight:normal">' + 
							global_google_ads[i].visible_url + 
						'</a>' +
					'</div>';
				
		break ;
		
		case 7 :   // url next to ad title
			s += 	
					'<div style="margin-bottom:10px">' +
						'<a href="' + global_google_ads[i].url + '" target="_blank">' +
							global_google_ads[i].line1 + 
						'</a>' + ' ' +
						'<a href="' + global_google_ads[i].url + '" target="_blank" style="text-decoration:none; font-size:13px; color:#0E774A; font-weight:normal">' + 
							global_google_ads[i].visible_url + 
						'</a>' + '<br>' + 
						'<span class="g_ad_topSpacer_text">' + global_google_ads[i].line2 + 
						' ' +
						global_google_ads[i].line3 + '</span> ' +
						
					'</div>';
				
		break ;
		
		case 8 :   // extra space for 'ads by google'
			s += 	
					'<div style="margin:10px 0px">' +
						'<a href="' + global_google_ads[i].url + '" target="_blank">' +
							global_google_ads[i].line1 + 
						'</a>' + ' ' +
						'<span class="g_ad_topSpacer_text">' + global_google_ads[i].line2 + 
						' ' +
						global_google_ads[i].line3 + '</span> ' +
						'<a href="' + global_google_ads[i].url + '" target="_blank" style="text-decoration:none; font-size:13px; color:#0E774A; font-weight:normal">' + 
							global_google_ads[i].visible_url + 
						'</a>' +
					'</div>';
				
		break ;
		
		case 9 :   // case 7 + 8 
			s += 	
					'<div style="margin:10px 0px">' +
						'<a href="' + global_google_ads[i].url + '" target="_blank">' +
							global_google_ads[i].line1 + 
						'</a>' + ' ' +
						'<a href="' + global_google_ads[i].url + '" target="_blank" style="text-decoration:none; font-size:13px; color:#0E774A; font-weight:normal">' + 
							global_google_ads[i].visible_url + 
						'</a>' + '<br>' + 
						'<span class="g_ad_topSpacer_text">' + global_google_ads[i].line2 + 
						' ' +
						global_google_ads[i].line3 + '</span> ' +
						
					'</div>';
				
		break ;
		
	} 
	
	
	return s ;
} 


function gca_process_ad_units(ad_count) { 
	var s = '';
	var for_start = -1;
	var for_end = 0;
	if (global_google_ads.length >= gca.start_pos) {
		for_start = gca.start_pos;
		if (global_google_ads.length >= gca.start_pos+ad_count) {
			for_end = gca.start_pos+ad_count ;
			gca.start_pos += ad_count ;
		} else {
			for_end = global_google_ads.length ;
			gca.start_pos += global_google_ads.length - gca.start_pos ;
		}
	}

	if (for_start >= 0) {
		for(i=for_start; i < for_end; ++i) {
			s += gca_process_ad_unit(i) ;
		}
	}
	
	gca.ad_classes = '' ;
	return s ;
}

function gca_display_ad_set(s) { 
	document.write(s);
}
function gca_display_nav_ad_set(s) { 
	document.write(s);
}

function gca_process_ad_set_label(s) {  
	s = '<div><a href=\"' + google_info.feedback_url + '\" style="font-size:8pt;color:#000000;text-decoration:none; font-weight:normal;" target="_blank">Ads by Google</a></div>' + 
	'<div class="g_ad_bottomSpacer_small g_ad_topSpacer ' + gca.ad_set_box_classes + '" >' +
			s +
		'</div>';	
	gca.ad_set_box_classes = '' ;  //default for next time
	return s ;
}
function gca_process_nav_ad_set_label(s) {  //style="padding-bottom:' + gca.ad_container_pad + 'px"
	s = '<div class="adsbygoogle_label"><a href=\"' + google_info.feedback_url + '\" target="_blank"><span style="color:#373737;">Ads by Google</span></a></div>' +
		'<ul>' +
			s +
		'</ul>' ; 	
	gca.ad_set_box_classes = '' ;  //default for next time
	return s ;
}



function gca_process_ad_set_container(s) {
	s = '<div class="' + gca.ad_set_classes + '">' +
			s +
		'</div>' ;
	gca.ad_set_classes = '' ;
	return s ;
}
function gca_process_nav_ad_set_container(s) {
	s = '<div class="nav">' +
			s +
		'</div>' ;
	gca.ad_set_classes = '' ;
	return s ;
}


function create_google_ad_set(ad_count) { 
	var s = gca_process_ad_units(ad_count) ; 
	
	if (s != '') {
		s = gca_process_ad_set_label(s);
		s = gca_process_ad_set_container(s);
		gca_display_ad_set(s);
	}
	
}
function create_google_nav_ad_set(ad_count) { 
	var s = gca_process_ad_units(ad_count) ; 
	
	if (s != '') {
		s = gca_process_nav_ad_set_label(s);
		s = gca_process_nav_ad_set_container(s);
		gca_display_nav_ad_set(s);
	}
	
} function chooseType(id){
	document.getElementById('searchTypeValue').value = id;
	document.getElementById('searchTypeMenu_1').className = '';
	document.getElementById('searchTypeMenu_2').className = '';
	document.getElementById('searchTypeMenu_'+id).className = 'checked';
	document.getElementById('searchTypeIcon').src = 'http://graphics.suite101.com/icon_searchfilter_'+id+'.gif';
	toggleSearchTypes();
}

function toggleSearchTypes(){
	var id = document.getElementById('searchTypeValue').value;
	if(document.getElementById('searchTypes').style.visibility != 'visible'){
		document.getElementById('searchTypeIcon').src = 'http://graphics.suite101.com/icon_searchfilter_'+id+'_active.gif';
		document.getElementById('searchTypes').style.visibility = 'visible';
	}else{
		document.getElementById('searchTypeIcon').src = 'http://graphics.suite101.com/icon_searchfilter_'+id+'.gif';
		document.getElementById('searchTypes').style.visibility = 'hidden';
	}
} $(document).ready(function(){
	$("#section_more").click(function(){
		$("#section_more_nav").slideToggle("slow");
		$(this).toggleClass("active"); return false;
	});	 	
	$("#topic_more").click(function(){
		$("#topic_more_nav").slideToggle("slow");
		$(this).toggleClass("active"); return false;
	});	 	 
}); // Copyright 2011 Google Inc. All Rights Reserved.

/**
 * @fileoverview A simple script to automatically track Facebook and Twitter
 * buttons using Google Analytics social tracking feature.
 * @author api.nickm@google.com (Nick Mihailovski)
 */


/**
 * Namespace.
 * @type {Object}.
 */
var _ga = _ga || {};


/**
 * Ensure global _gaq Google Analytics queue has been initialized.
 * @type {Array}
 */
var _gaq = _gaq || [];


/**
 * Helper method to track social features. This assumes all the social
 * scripts / apis are loaded synchronously. If they are loaded async,
 * you might need to add the nextwork specific tracking call to the
 * a callback once the network's script has loaded.
 * @param {string} opt_pageUrl An optional URL to associate the social
 *     tracking with a particular page.
 * @param {string} opt_trackerName An optional name for the tracker object.
 */
_ga.trackSocial = function(opt_pageUrl, opt_trackerName) {
  _ga.trackFacebook(opt_pageUrl, opt_trackerName);
  _ga.trackTwitter(opt_pageUrl, opt_trackerName);
};


/**
 * Tracks Facebook likes, unlikes and sends by suscribing to the Facebook
 * JSAPI event model. Note: This will not track facebook buttons using the
 * iFrame method.
 * @param {string} opt_pageUrl An optional URL to associate the social
 *     tracking with a particular page.
 * @param {string} opt_trackerName An optional name for the tracker object.
 */
_ga.trackFacebook = function(opt_pageUrl, opt_trackerName) {
  var trackerName = _ga.buildTrackerName_(opt_trackerName);
  try {
    if (FB && FB.Event && FB.Event.subscribe) {
      FB.Event.subscribe('edge.create', function(targetUrl) {
        _gaq.push([trackerName + '_trackSocial', 'facebook', 'like',
            targetUrl, opt_pageUrl]);
      });
      FB.Event.subscribe('edge.remove', function(targetUrl) {
        _gaq.push([trackerName + '_trackSocial', 'facebook', 'unlike',
            targetUrl, opt_pageUrl]);
      });
      FB.Event.subscribe('message.send', function(targetUrl) {
        _gaq.push([trackerName + '_trackSocial', 'facebook', 'send',
            targetUrl, opt_pageUrl]);
      });
    }
  } catch (e) {}
};


/**
 * Returns the normalized tracker name configuration parameter.
 * @param {string} opt_trackerName An optional name for the tracker object.
 * @return {string} If opt_trackerName is set, then the value appended with
 *     a . Otherwise an empty string.
 * @private
 */
_ga.buildTrackerName_ = function(opt_trackerName) {
  return opt_trackerName ? opt_trackerName + '.' : '';
};


/**
 * Tracks everytime a user clicks on a tweet button from Twitter.
 * This subscribes to the Twitter JS API event mechanism to listen for
 * clicks coming from this page. Details here:
 * http://dev.twitter.com/pages/intents-events#click
 * This method should be called once the twitter API has loaded.
 * @param {string} opt_pageUrl An optional URL to associate the social
 *     tracking with a particular page.
 * @param {string} opt_trackerName An optional name for the tracker object.
 */
_ga.trackTwitter = function(opt_pageUrl, opt_trackerName) {
  var trackerName = _ga.buildTrackerName_(opt_trackerName);
  try {
    if (twttr && twttr.events && twttr.events.bind) {
      twttr.events.bind('tweet', function(event) {
        if (event) {
          var targetUrl; // Default value is undefined.
          if (event.target && event.target.nodeName == 'IFRAME') {
            targetUrl = _ga.extractParamFromUri_(event.target.src, 'url');
          }
          _gaq.push([trackerName + '_trackSocial', 'twitter', 'tweet',
            targetUrl, opt_pageUrl]);
        }
      });
    }
  } catch (e) {}
};


/**
 * Extracts a query parameter value from a URI.
 * @param {string} uri The URI from which to extract the parameter.
 * @param {string} paramName The name of the query paramater to extract.
 * @return {string} The un-encoded value of the query paramater. underfined
 *     if there is no URI parameter.
 * @private
 */
_ga.extractParamFromUri_ = function(uri, paramName) {
  if (!uri) {
    return;
  }
  var uri = uri.split('#')[0];  // Remove anchor.
  var parts = uri.split('?');  // Check for query params.
  if (parts.length == 1) {
    return;
  }
  var query = decodeURI(parts[1]);

  // Find url param.
  paramName += '=';
  var params = query.split('&');
  for (var i = 0, param; param = params[i]; ++i) {
    if (param.indexOf(paramName) === 0) {
      return unescape(param.split('=')[1]);
    }
  }
  return;
}; function openImage(image_id,path)
	{
	var winHeight = 730;
	var winWidth = 860;
	var top = ((screen.height-winHeight)/2)-30;
	var left = ((screen.width-winWidth)/2)-20;
	var imageWindow = window.open('http://' + path + '/view_image.cfm/'+image_id,'imageWindow','top='+top+',left='+left+',screenX='+top+',screenY='+left+',height='+winHeight+',width='+winWidth+',toolbar=0,location=0,menubar=0,directories=0,resizable=1,scrollbars=1')
	imageWindow.focus();
	} 