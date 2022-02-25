// Glam Logo Modules

var logoMIDArray = new Array();
logoMIDArray['GPN'] = '204571622';
logoMIDArray['GLifetime'] = '194377769';
logoMIDArray['GBeauty'] = '204738317';
logoMIDArray['GBeautyPub'] = '5000005870';
logoMIDArray['GEnter'] = '204571626';
logoMIDArray['GEnterPub'] = '5000006249';
logoMIDArray['GFamily'] = '204571628';
logoMIDArray['GFashion'] = '204738316';
logoMIDArray['GFashionPub'] = '5000006251';
logoMIDArray['GHealth'] = '204571625';
logoMIDArray['GHealthPub'] = '5000006252';
logoMIDArray['GLiving'] = '204571624';
logoMIDArray['GLivingPub'] = '5000006261';
logoMIDArray['GNewEco'] = '5000006253';
logoMIDArray['GNewEcoPub'] = '5000006254';
logoMIDArray['GStyle'] = '204571623';
logoMIDArray['GWell'] = '206319927';
logoMIDArray['DEGPNATF'] = '216550958';
logoMIDArray['GlamBeacon'] = '220709757';
logoMIDArray['Bliss'] = '5000060747';
logoMIDArray['Foodie'] = '5000060730';
logoMIDArray['HOT'] = '204571622';

var logoURLArray = new Array();
logoURLArray['GPN'] = 'http://www.glam.com';
logoURLArray['GLifetime'] = 'http://www.glam.com';
logoURLArray['GBeauty'] = 'http://www.glam.com';
logoURLArray['GBeautyPub'] = 'http://www.glam.com';
logoURLArray['GEnter'] = 'http://www.glam.com';
logoURLArray['GEnterPub'] = 'http://www.glam.com';
logoURLArray['GFamily'] = 'http://www.glam.com';
logoURLArray['GFashion'] = 'http://www.glam.com';
logoURLArray['GFashionPub'] = 'http://www.glam.com';
logoURLArray['GHealth'] = 'http://www.glam.com';
logoURLArray['GHealthPub'] = 'http://www.glam.com';
logoURLArray['GLiving'] = 'http://www.glam.com';
logoURLArray['GLivingPub'] = 'http://www.glam.com';
logoURLArray['GNewEco'] = 'http://www.glam.com';
logoURLArray['GNewEcoPub'] = 'http://www.glam.com';
logoURLArray['GStyle'] = 'http://www.glam.com';
logoURLArray['GWell'] = 'http://www.glam.com';
logoURLArray['DEGPNATF'] = 'http://www.glam.com';
logoURLArray['DE'] = 'http://www.glam.de';
logoURLArray['FR'] = 'http://www.glammedia.fr/';
logoURLArray['CA'] = 'http://www.glam.com';
logoURLArray['JP'] = 'http://www.glam.jp';
logoURLArray['UK'] = 'http://www.glam.co.uk';
logoURLArray['AU'] = 'http://au.glam.com/';
logoURLArray['CN'] = 'http://www.glam.com.cn/';
logoURLArray['ES'] = 'http://www.glam.com.es/';
logoURLArray['KR'] = 'http://www.glam.com.kr/';
logoURLArray['Bliss'] = 'http://www.bliss.com';
logoURLArray['Foodie'] = 'http://www.foodie.com';
logoURLArray['HOT'] = 'http://www.glam.com';

// glam logo module callback function
function GlamLogoCallback(request_info){  
  
  // clickThrough
  if (window.GlamAdaptGetInfo){ 
  	switch (GlamAdaptGetInfo('country_code')) {
		case 'AT':
  			logoClickUrl = logoURLArray['DE'];
  			break;
  		case 'CH':
  			logoClickUrl = logoURLArray['DE'];
  			break;
  		case 'DE':
  			logoClickUrl = logoURLArray['DE'];
  			break;
  		case 'FR':
  			logoClickUrl = logoURLArray['FR'];
		case 'CA':
  			logoClickUrl = logoURLArray['CA'];	
  			break;
		case 'JP':			
  			logoClickUrl = logoURLArray['JP'];	
  			break;	
		case 'UK':
  			logoClickUrl = logoURLArray['UK'];	
  			break;		
		case 'AU':
  			logoClickUrl = logoURLArray['AU'];	
  			break;		
		case 'CN':
  			logoClickUrl = logoURLArray['CN'];	
  			break;		
		case 'ES':
  			logoClickUrl = logoURLArray['ES'];	
  			break;
		case 'KR':
  			logoClickUrl = logoURLArray['KR'];	
  			break;				
  		default:
  			logoClickUrl = logoURLArray[window.glam_logo_type];
  			break;
  	}
  }
  else logoClickUrl = logoURLArray[window.glam_logo_type];
  
  // logoPath, currently only for france
  logoPath = (window.glam_logo_country && window.glam_logo_country == 'FR') ? '_FR' : '';
  
  // German publishers
  logoPath = (window.glam_logo_country && window.glam_logo_country == 'DE') ? '_DE' : logoPath;  

  // grayscale flag 
  if(window.color_or_grayscale_flag == undefined){
	  flag = '';
  } else {
  	flag = window.color_or_grayscale_flag;
  }
  
  logoColor = (flag == '_gs') ? window.glam_gs_logo_color: window.glam_logo_color;	

  if(window.glam_logo_country && window.glam_logo_country != 'US' && window.glam_logo_country != 'CA' && window.glam_logo_country != 'UK'){ 
  	  if (window.glam_logo_type != 'DEGPNATF' || (window.glam_logo_type == 'DEGPNATF' && window.GlamAdaptGetInfo && GlamAdaptGetInfo('country_code') == 'DE')) {	  	
	    document.write('<a href="'+ request_info['ad_click_url'] + logoClickUrl + '" target="_blank"><img src="http://fileserver.glam.com/app/site/images/blog/' + window.glam_logo_type + logoPath + '_' + window.glam_logo_size + '_' + window.glam_logo_color + '.gif" border="0"></a>');
	  } 
  } else {
	 document.write('<a href="'+ request_info['ad_click_url'] + logoClickUrl + '" target="_blank"><img src="http://fileserver.glam.com/app/site/images/blog/' + window.glam_logo_type + logoPath + '_' + window.glam_logo_size + '_' + logoColor + flag + '.gif" border="0"></a>');
  }

  if (GlamAdaptGetInfo('country_code') != 'DE') {
	  // Comscore beacon
	  if (!window.glam_comscore_beacon && window.GlamGetAffiliateInfo && GlamGetAffiliateInfo('cs_beacon') != 'disable' ) {
	    document.write('<scr'+'ipt src="'+ (document.location.protocol == "https:" ? "https://sb" : "http://b") + '.scorecardresearch.com/beacon.js"' +'"></scr'+'ipt>');
	    document.write('<scr'+'ipt src="http://www8.glam.com/js/widgets/glam_comscore.js"></scr'+'ipt>');
	    window.glam_comscore_beacon = true;
	  }   
  }
}

// Information required for dart targeting and callback
window.glam_module_id = logoMIDArray[window.glam_logo_type];
window.glam_module_function = 'GlamLogoCallback';
document.write('<scr' + 'ipt type="text/javascript" language="JavaScript" src="http://www8.glam.com/js/glam_widget.js">' + '<' + '/sc' + 'ript>');
