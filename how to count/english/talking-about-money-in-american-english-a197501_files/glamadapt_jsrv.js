
 
 
 
 
 
 
 
 
 
 
 
 
  
  
 


   
   
 
      
   
   
      
   
   
      
   
  
  


      
   



/* Generated on : Wed Mar 28 2012 21:06:59 PDT */


/* ga_adb=ade;ga_srv=normal;;ga_plf=---- */


function GlamAdaptSetInfo(gvar, gval) {
 if ( ! window.glam_adapt_info ) {
  window.glam_adapt_info = new Object();
 }
 window.glam_adapt_info[gvar]=gval;
}
function GlamAdaptGetInfo(gvar) {
 if ( window.glam_adapt_info && window.glam_adapt_info[gvar]) {
  return window.glam_adapt_info[gvar];
 }
 return null;
}
if ( ! window.GlamGetAffiliateInfo ) {
 window.GlamGetAffiliateInfo = function(pName) {
  var glam_info = new Object();
  var glam_affiliate_vars = 'js_mode=show;_ge_=8^2^aa155ee90a2556f31e63f7e5b88bbd4f;sid=115755133329604455211;browser=None;co=EG;dma=None;;;afid=1626525305;zone=/;ga_adsrv=auto;affiliateId=1626525305;sz=888x10;fn=GlamLogoCallback;mid=204571626;ord=2283379853985719.5;_g_cv=2;';
  var vars = glam_affiliate_vars.split(";");
  for (var i=0;i<vars.length;i++) {
   var pair = vars[i].split("=");
   if ( pair[1] ) { glam_info[pair[0]] = pair[1]; }
  }
  return ( glam_info[pName] ? glam_info[pName] : null);
 }
}
GlamAdaptSetInfo('srv_ad_id', 0);

GlamAdaptSetInfo('country_code', 'EG');

GlamAdaptSetInfo('city', 'CAIRO');

GlamAdaptSetInfo('bw', '257');



 /* srv_ad_id = 0 */
 
window.glamadapt_js_kvs = 'js_mode=show;_ge_=8^2^aa155ee90a2556f31e63f7e5b88bbd4f;sid=115755133329604455211;browser=None;co=EG;dma=None;;;afid=1626525305;zone=/;ga_adsrv=auto;affiliateId=1626525305;sz=888x10;fn=GlamLogoCallback;mid=204571626;ord=2283379853985719.5;_g_cv=2;';

document.write('<scr' + 'ipt type="text/javascript" language="JavaScript" src="' +
                 'http://www35f.glam.com/ade/default/GlamSelectDefaultAds.js' +
                 '"><' + '/sc' + 'ript>');
 

 
  
 

