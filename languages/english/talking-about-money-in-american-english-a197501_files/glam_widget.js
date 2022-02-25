if ( ! window.glam_dart_ord ) {
    window.glam_dart_ord = Math.random()*10000000000000000;
}

document.write('<scr' +
               /* 'ipt type="text/javascript" language="JavaScript" src="http://www2.glam.com/app/site/affiliate/viewChannelModule.act?mName=getAdJs&affiliateId=' + */
               'ipt type="text/javascript" language="JavaScript" src="http://www35.glam.com/gad/glamadapt_jsrv.act?ga_adsrv=auto;affiliateId=' +
               window.glam_affiliate_id  +
               ';sz=888x10' +
               ';fn=' + window.glam_module_function +
               ';mid=' + window.glam_module_id +
               ';ord=' + window.glam_dart_ord + '"><' +
               '/sc' + 'ript>');
