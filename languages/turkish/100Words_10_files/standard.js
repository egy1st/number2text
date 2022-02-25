
adnet = window.adnet || {};

(function(){

	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}
	adnet.fn_createCookie = createCookie;

	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	adnet.fn_readCookie = readCookie;
	

	function randomString(string_length) {
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var randomstring = '';
		for (var i=0; i<string_length; i++) {
			var rnum = Math.floor(Math.random() * chars.length);
			randomstring += chars.substring(rnum,rnum+1);
		}
		return randomstring;
	}
	
	function qhash(str)
	{
		var codes = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
		var ncodes = codes.length-1;
		
		var regs = [0,0,0,0,0,0,0,0];
		var nregs = regs.length;
		
		var j = 0;
		for(var i=str.length-1;i>=0;i--)
		{
			var c = str.charCodeAt(i);
			
			regs[j]+=c;
			j++;
			if (j>=nregs) j=0;
		}
		
		var ret = '';
		var j = str.length & 7;
		for(var i=0;i<nregs;i++)
		{
			var c = regs[j++] & 255;//0xff;
			ret += codes[c & ncodes];
			ret += codes[(c >> 4) & ncodes];
			if (j>=nregs) j=0;
		}
		
		return ret;
	}
	
	function normaliseUrl(url)
	{
		if (url.indexOf('?')==-1) return url;
			
		var parts = url.split('?');
		url = parts[0];
		var qs = parts[1];
		qs = parse_qs(qs);
		
		delete(qs['sid']);
		delete(qs['gclid']);
		delete(qs['utm_source']);
		delete(qs['utm_medium']);
		delete(qs['utm_term']);
		delete(qs['utm_content']);
		delete(qs['utm_campaign']);
		delete(qs['session']);
		delete(qs['session_id']);
		delete(qs['sessionId']);
		delete(qs['adnet_admin']);
		delete(qs['adnet_new_ads']);
		
		url = url+form_qs(qs);
		
		return url;
	}
	
	
	function strip_non_alapha(str)
	{
		var r = new RegExp('[^a-zA-Z0-9]+', 'g');
		return str.replace(r, ' ').replace(/[\s]+/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}
	
	function form_qs(obj)
	{
		var qs = [];
		
		for(key in obj)
		{
			qs.push(key+'='+encodeURIComponent(obj[key]));
		}

		return (qs.length) ? '?'+qs.sort().join('&') : '';
	}
	
	function parse_qs(qs)
	{
		var parts = qs.split('&');
		var obj = {};
		
		for(var i=0;i<parts.length;i++)
		{
			var tparts = parts[i].split('=');
			var key = tparts[0];
			var value = tparts[1] || '';
			obj[key] = decodeURIComponent(value);
		}
		
		return obj;
	}

	//var domain = 'adnet-media.net';	
	var domain = 'ads.adnet-media.net';
	if (window.location.host == 'adnetmedia.local') domain = 'adnetmedia.local';
		
	// Session
	var sess_id = readCookie('adnet_sess_id');
	if (sess_id == null) 
	{
		sess_id = randomString(16);
		createCookie('adnet_sess_id', sess_id,  7);
	}
	
	// Correlator
	if (!adnet.correlator) {
		adnet.correlator = sess_id+randomString(16);
	}
	
	// Unit index
	if (!adnet.unit_index) adnet.unit_index=0;
	adnet.unit_index++;
	
	// Geo location
	/*if (!adnet.geo) adnet.geo = readCookie('adnet_geo');
	if (!adnet.geo) {
		// Load geo
		adnet.geo = 'XX';
		var script_tag = 'script';
		document.write('<'+script_tag+' src="http://'+domain+'/ads/geo/?sess='+sess_id+'" type="text/javascript"></'+script_tag+'>');
	}*/
	adnet.geo='XX';
	
	// Url and page hash
	if (!adnet.page_url)
	{
		// Use top window if framed (accessed by referer)
		//var is_framed = (typeof adnet_is_framed != 'undefined') ? adnet_is_framed : (top.location!=location); // false
		
		//if (window.location.hostname=='www.traveladvertising.com') is_framed = true;
		
		var _url = (document.referrer && (top.location!=location)) ? document.referrer : window.location.protocol+'//'+window.location.hostname+window.location.pathname+window.location.search;
		//var _url = (is_framed && document.referrer && (top.location!=location)) ? document.referrer : window.location.protocol+'//'+window.location.hostname+window.location.pathname+window.location.search;
		adnet.page_url = normaliseUrl(_url);
		
		if (typeof adnet_page_url != 'undefined') adnet.page_url = adnet_page_url;
		adnet.page_hash = qhash(adnet.page_url);
	}
	
	// Ad unit id
	if (typeof adnet_placement_id == 'undefined') adnet_placement_id = '';
	
	
	//
	// 	Admin script
	//
	var admin_mode = readCookie('adnet_admin_mode');
	adnet.console_loaded = adnet.console_loaded || false;
	if (admin_mode || window.location.href.indexOf('adnet_admin')!=-1) 
	{
		if (!adnet.console_loaded)
		{ 
			var script_tag = 'script';
			document.write('<'+script_tag+' src="http://adnet-media.net/publisher/console/?hash='+adnet.page_hash+'" type="text/javascript"></'+script_tag+'>');
		}
		createCookie('adnet_admin_mode', admin_mode || 1);
		adnet.console_loaded = true;
	}
	//
	//
	//
	
	
	//
	// Ad query parameters
	//
	var params = {};
	params.pg = adnet.page_hash;
	params.url = adnet.page_url;
	params.cor = adnet.correlator;
	params.ui = adnet.unit_index;
	params.geo = adnet.geo;
	params.pi = adnet_placement_id;
	params.pub=adnet_publisher_id;
	if (typeof adnet_channel_id != 'undefined') params.ch = adnet_channel_id;
	if ((typeof adnet_keywords == 'undefined') || (adnet_keywords == '')) adnet_keywords = strip_non_alapha(document.title);
	params.keywords = adnet_keywords;
	if (typeof adnet_page_no_crawl!='undefined') params.no_crawl=1;
	if (typeof adnet_backend!='undefined') params.be=adnet_backend;
	if (typeof adnet_frontend!='undefined') params.fe=adnet_frontend;
	
	// Display params
	if (typeof adnet_display_params=='object') {
		for(key in adnet_display_params) {
			var value = adnet_display_params[key];
			key = 'xdp['+key+']';
			params[key] = value;
		}
	}
	
	// Filters
	if (typeof adnet_filters!='undefined') {
		if (adnet_filters['list']) params.f_list=adnet_filters['list'];
		if (adnet_filters['adv']) params.f_adv=adnet_filters['adv'];
		if (adnet_filters['tags']) params.f_tags=adnet_filters['tags'];
	}
	
	if (params.pi=='95b91e5edee3a8c8'){
		if (adnet_width==430) adnet_width = 398;
	}
	
	/*if (adnet.page_url=='http://www.worldtravelguide.net/france' || adnet.page_url=='http://www.worldtravelguide.net/italy' || adnet.page_url=='http://www.worldtravelguide.net/croatia'){
		if (adnet_width==430) adnet_width = 396;
	}*/
	
	// Size
	if ((typeof adnet_width != 'undefined') && (typeof adnet_height != 'undefined')){
		adnet_size = adnet_width+'x'+adnet_height;
	} else {
		adnet_size = adnet_format;
		var parts = adnet_format.split("x");
		adnet_width = parts[0];
		adnet_height = parts[1];
	}
	params.size = adnet_size;
	params.format = adnet_format;
	params.rand = Math.floor(Math.random() * 4);
	
	
	//var iframe_src = 'http://'+domain+'/ads/render/adbox/'+form_qs(params);
	//if (adnet_publisher_id=='a154c01937867a1e0fdd5121071d9f19' || adnet_publisher_id=='03cf5065beafa703' || adnet_publisher_id=='wr' || adnet_publisher_id=='fbc5bb76a58c5ca4') iframe_src = 'http://'+domain+'/lw/ads.php'+form_qs(params);
	
	var iframe_src = 'http://'+domain+'/lw/ads.php'+form_qs(params);
	
	var frame_id = 'AdnetFR'+Math.round(Math.random()*9999);
	var nul = '';
	
	//document.write('<div style="overflow:hidden;width: '+adnet_width+'px;height: '+adnet_height+'px;">');
	
	if (params.pi=='95b91e5edee3a8c8'){
		document.write('<style>.block-block-widget-deals-adnet-rotator-en-centre-column{float:left;}</style>');
	}
	
	document.write('<ifra'+nul+'me id="'+frame_id+'" name="'+frame_id+'"  src="'+iframe_src+'" allowtransparency="true" style="width:'+adnet_width+'px; height:'+adnet_height+'px;border:0px;overflow-x:hidden;overflow-y:hidden;overflow:hidden;" frameborder="0" framescrolling="0" scrolling="no"></ifr'+nul+'ame>');
	//document.write('<ifra'+nul+'me id="'+frame_id+'" name="'+frame_id+'"  src="'+iframe_src+'" style="width:'+adnet_width+'px; height:'+adnet_height+'px;border: 0px;margin:0;padding:0;" frameborder="0" framescrolling="0" scrolling="no"></ifr'+nul+'ame>');
	//document.write('</div>');
	
	// Dispose of one time config params
	window.adnet_width=undefined;
	window.adnet_height=undefined;
	window.adnet_size=undefined;
	window.adnet_format=undefined;
	window.adnet_channel_id=undefined;
	window.adnet_backend=undefined;
	window.adnet_frontend=undefined;
	window.adnet_placement_id=undefined;
	window.adnet_display_params=undefined;
})();