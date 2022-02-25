
   
   
 




 
 

function GlamAddEventListener(expression, call)
{
  if ( !window.glamadapt_event_listeners )
  {
    window.glamadapt_event_listeners = new Array();
  }
  event_listener = new Object();
  event_listener.expression = expression;
  event_listener.call = call;
  window.glamadapt_event_listeners.push(event_listener);
}


function GlamCreateSlot(afid, adsize, slotname, zone, tile)
{
  zone = ( zone ? zone : '/' );

  if ( !window.glamadapt_timer )
  {
    window.glamadapt_timer = new Date().getTime();
  }
  if ( !window.glamadapt_adslots )
  {
    window.glamadapt_adslots = {};
  }
  if ( !window.glamadapt_adscount )
  {
    window.glamadapt_adscount = 0;
  }
  if ( ! window.glamadapt_pvid )
  {
      window.glamadapt_pvid = Math.random()*10000000000000000;
  }
  if ( '1' == '1' && !window.glamadapt_reskin_created )
  {
      window.glamadapt_reskin_created = true;
      GlamCreateSlot(afid, "888x11", "reskin", zone, 999);
  }
  if ( !tile )
  {
    window.glamadapt_adscount++;
  }
  adslotObject = new Object();
  adslotObject.afid = afid;
  adslotObject.sz = adsize;
  adslotObject.slot = slotname;
  adslotObject.pos = ( tile ? tile : window.glamadapt_adscount );
  adslotObject.zone = ( zone ? zone : '/' );
  window.glamadapt_adslots["a" + adslotObject.pos] = adslotObject;
  GlamLogWithTimer('Added ' + slotname);
}


function GlamTrack(afid)
{
  GlamGetContent(afid, true, true);
}

function GlamGetAds(afid, zone)
{
  GlamGetContent(afid, false, false, ( zone ? zone : '/' ));
}


function GlamGetContent(afid, async, track_only, zone)
{
  zone = ( zone ? zone : '/' );
  var glam_host = 'www35.glam.com';
  var ga_api_tt=(window==top ? 'j' : 'i');
  var ga_api_dt='nopda';
  window.glam_affiliate_id = afid;
  var js_call = ('https:' == document.location.protocol ? 'https://s' : 'http://') +
                 (!track_only ? glam_host + '/gad/glamadapt_psrv.act' : 'www22.glam.com/gad/glamadapt_jsapi_track.act') +
                 '?;afid=' + afid + ';zone=' + ( zone.indexOf('/') > -1 ? zone : '/' + zone )+ ';ord=' + window.glamadapt_pvid + ';sz=1x1;ga_slot=yes;gszd=-;gsz=';
  for(slot in window.glamadapt_adslots)
  {
    if ( afid == window.glamadapt_adslots[slot].afid && zone == window.glamadapt_adslots[slot].zone )
    {
      js_call += window.glamadapt_adslots[slot].sz + ':' + window.glamadapt_adslots[slot].pos + '-';
    }
  }

  for(slot in window.glamadapt_adslots)
  {
    if ( afid == window.glamadapt_adslots[slot].afid && zone == window.glamadapt_adslots[slot].zone && window.glamadapt_adslots[slot].udata )
    {
      js_call += ';' + window.glamadapt_adslots[slot].udata;
    }
  }

  js_call += ';ga_api_dt=' + ga_api_dt + ';ga_api_tt=' + ga_api_tt + ';tt=' + ga_api_tt;
  js_call += ';ga_srv_log=0;ga_cli_log=1;ga_do_cli_log=yes;ga_api=iframe;_g_cv=2;';

  if ( async )
  {
   (function() {
   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
   ga.src = js_call;
   (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);
   })();
  }
  else 
  {
    document.write('<scr' + 'ipt type="text/javascript" language="JavaScript" src="' +
                   js_call  +
                   '"><' + '/sc' + 'ript>');
  }

  GlamLogWithTimer('Called GlamGetAds()' );
}

function GlamGetAdsDone()
{
  GlamLogWithTimer('GlamGetAds() done' );
  window.glamadapt_done = true;
  if ( window.glamadapt_event_listeners )
  {
    for(i in window.glamadapt_event_listeners)
    {
      if ( eval(window.glamadapt_event_listeners[i].expression) )
         eval(window.glamadapt_event_listeners[i].call);
    }
  }

}


function GlamSetSlotData(slotname, slotdata)
{
  for(slotid in window.glamadapt_adslots)
  {
    if ( window.glamadapt_adslots[slotid].slot == slotname )
    {
      window.glamadapt_adslots[slotid].udata = slotdata;
      return window.glamadapt_adslots[slotid];
    }
  }
  return null;
}


function GlamGetSlotObject(slotname)
{
  for(slotid in window.glamadapt_adslots)
  {
    if ( window.glamadapt_adslots[slotid].slot == slotname )
    {
      return window.glamadapt_adslots[slotid];
    }
  }
  return null;
}


function GlamLogWithTimer(pLog)
{
  var glamadapt_elapsed = new Date().getTime() - window.glamadapt_timer;
  if (window.console != undefined )
    console.log(glamadapt_elapsed + ': ' + pLog);
}


function GlamIsAvailable(slotname)
{
  GlamLogWithTimer('GlamIsAdAvailable() called');
  var adslot = GlamGetSlotObject(slotname);

  if ( !adslot || !adslot.show || !window.glamadapt_done )
  {
    return false;
  }
  else
    return ( adslot && adslot.nopda  ? false : true );
}


function GlamShow(slotname)
{
  if ( !window.glamadapt_reskin_shown )
  {
    window.glamadapt_reskin_shown = true;
    GlamShow('reskin');
  }
  var adslot = GlamGetSlotObject(slotname);

  if ( adslot && adslot.tt && adslot.tt == 'i' )
  {
    document.write('<ifra' + 'me id="' + adslot.reqid + '" name="' + adslot.reqid + '" ' + 
                   'width="' + adslot.width + '" height="' + adslot.height + '" ' + 
                   'frameborder="0" marginheight="0" marginwidth="0" scrolling="no" allowTransparency="true" ' +
                   'src="' + adslot.url  + ';ga_output=html;" ' +
                   '><' + '/ifra' + 'me>');
    return true;
  }
  else
  return ( adslot && adslot.show ? adslot.show() : false );
}

