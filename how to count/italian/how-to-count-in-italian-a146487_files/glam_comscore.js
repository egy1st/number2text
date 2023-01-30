var glam_beacon = {c1:2,c2:"6035233",c3:"",c4:"",c5:"",c6:"",c15:""};
if ( window == window.top) {
glam_beacon.c7 = window.location.href;
glam_beacon.c4 = window.location.href;
} else if ( window.GlamGetAffiliateInfo ){
glam_beacon.c7 = GlamGetAffiliateInfo('home_url');
glam_beacon.c4 = GlamGetAffiliateInfo('home_url');
}
COMSCORE.beacon(glam_beacon);
