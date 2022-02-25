//NOTE:  NO PROTOTYPE IN ADS.JS!  (because of /mobile)
if (!window.Scribd) var Scribd = new Object();
if (!Scribd.Ads) Scribd.Ads = new Object();

if (!Scribd.Ads.use_gpt) Scribd.Ads.use_gpt = false;
if (Scribd.Ads.enabled) {
  Scribd.Ads.attributes = {};
  Scribd.Ads.max_between_page = 21;

  Scribd.Ads.addAttribute = function(name, value) {
    if (value !== undefined) {
      var attributes = Scribd.Ads.attributes[name] = Scribd.Ads.attributes[name] || [];
      
      if(value instanceof Array)
        attributes.push.apply(attributes, value);
      else
        attributes.push(value);

      if (!Scribd.Ads.use_gpt) {
        //note: some of these values are arrays.  Despite 
        //?google_debug's behavior, these array targetings
        //work as we expect (eg: we target ANY of the values in 
        // array value)
        GA_googleAddAttr(name, attributes);
      }
      
    }
  };


  // abstraction for refershUnit objects...
  Scribd.Ads.RefreshUnit = function(name) {
    var self, params;
    self = Scribd.Ads.RefreshUnit.all[name] = this;
    
    params = Scribd.Ads.setupIframeUnit(name);
    this.width = params.size[0];
    this.height = params.size[1];
    this.url_params = params.url_params;
    this.name = name;
    this.isOver = false;
    this.timesRefreshed = 0;
    this.lastRefreshed = 0;
    this.timer = null;
    
    Scribd.Ads.observeUserActivity();
    document.write('<div id="' + name + '_container" class="hideable_ad"></div>');

    //setup hover watching
    // only have 'observe' when not in mobile.
    if( this.container().observe ) {
      this.container().observe('mouseenter', function() {
        self.isOver = true;
      }).observe('mouseleave', function() {
        self.isOver = false;
      });
    } else {
      self.isOver = false;
    }
    
    this.setNextRefresh();
  };

  Scribd.Ads.RefreshUnit.prototype = {
    container: function() {
      return document.getElementById(this.name + '_container');
    },
    getDuration: function() {
      if(this._duration)
        return this._duration;
      else
        return Scribd.Ads.refreshInterval * 1000;
    },
    resetDuration: function() {
      delete(this._duration);
      return this.getDuration();
    },
    
    duration: function(newDuration) {
      if(typeof(newDuration) === 'number') {
        if (newDuration < 1000)
          newDuration *= 1000;
        //set the duration
        this._duration = newDuration;
        this.setNextRefresh();
        //and reset the timer
      }
      return this.getDuration();
    },
    
    stopRefreshing: function() {
      clearTimeout(this.timer);
      delete(this.timer);
    },
    
    setNextRefresh: function() {
      var timeLeft, self;
      this.stopRefreshing();
      self = this;
      //is it time yet?

      timeLeft = this.duration() - ((new Date()).getTime() - this.lastRefreshed);
      if(timeLeft <= 0) {
        this.refresh();
        timeLeft = 10000 //timeout for ad loading
      }
   
      
      this.timer = setTimeout(function() { self.setNextRefresh(); }, timeLeft);
    },

    refresh: function() {
      //throw refresh in here...
      if ((Scribd.Ads.userIsActive || !Scribd.Ads.trackEngagement) &&
        !this.isOver) {
        //invalidating lastRefreshed, which should be set from ad_refresher
        this.resetDuration();
        this.lastRefreshed = null;
        Scribd.Ads.replaceIframe(this.name, this.width, this.height, this.url_params);
      }
    },
    
    //called from ad_refresher
    iframeLoaded:  function() {
      this.lastRefreshed = (new Date).getTime();
      this.timesRefreshed += 1;
    }
  };

  Scribd.Ads.RefreshUnit.get = Scribd.Ads.RefreshUnit.all = {};

  Scribd.Ads.adUnits = {};
  Scribd.Ads.addUnit = function(unit_name) {
    var node_id = unit_name + '_container';
    Scribd.Ads.adUnits[unit_name] = node_id;
    document.write('<div class="hideable_ad" id="' + node_id + '">');
    if (Scribd.Ads.use_gpt) {
      googletag.cmd.push(function() {
        googletag.display(node_id);
      });
    } else {
      GA_googleAddSlot("ca-pub-7291399211842501", unit_name);
      GA_googleFillSlot(unit_name);
    }
    document.write('</div>');
  };


  Scribd.Ads.betweenUnitForPage = function(page_num) {
    var name;
    if (page_num == 1)
      return ['Doc_Between_Top_FullBanner_468x60', [468, 60]];
    else if (page_num % 2 == 1 && page_num <= 21)
      return ['Doc_Between_Leaderboard_BTF_728x90_' + page_num, [728, 90]];
  };

  Scribd.Ads.addBetweenPageUnit = function(page_num) {
    if (Scribd.Ads.attributes['UserState'].indexOf('In') >= 0 && !Scribd.Ads.attributes['FBRecent'][0])
      return;

    if (navigator.userAgent.match(/iPad/i))
      return;

    //hack to make mcdonalds work
    if (page_num == 1)
      Scribd.Ads.addUnit('Doc_Between_Leaderboard_BTF_679x779');
    if (page_num == 2)
      Scribd.Ads.addUnit('Doc_Between_Leaderboard_BTF_679x250');

    var unit = Scribd.Ads.betweenUnitForPage(page_num);
    if (!unit) return;
    var name = unit[0];
    Scribd.Ads.addUnit(name);

  };

  Scribd.Ads.setupIframeUnit = function(name) {
    var url_params, size;
    url_params = 'ad_unit=' + escape(name);
    size = name.match(/.*_(\d+)x(\d+)$/)
               .slice(1)
               .map(function(f){return parseInt(f);});


    return { size: size, url_params: url_params };
  };

  Scribd.Ads.addPassbackUnit = function(name, replacingName) {
    var params = Scribd.Ads.setupIframeUnit(name);
    Scribd.Ads.replaceIframe(replacingName, params.size[0], params.size[1], params.url_params, 0);
  };

  Scribd.Ads.addRefreshUnit = function(name) {
    return new Scribd.Ads.RefreshUnit(name);
  };

  Scribd.Ads.replaceIframe = function(name, width, height, url_params) {
    var iframe, container, interval;
    container = document.getElementById(name + '_container');
    if(container && container.hasChildNodes())
      container.parentNode.replaceChild(container.clone(false), container);
    
    iframe = document.createElement('iframe');
    iframe.width = width;
    iframe.height = height;
    iframe.scrolling = 'no';
    iframe.frameBorder = 0;
    iframe.marginWidth = 0;
    iframe.marginHeight = 0;
    iframe.allowTransparency = true;
    iframe.src = '/ad_refresher.html#' + url_params;
    container.appendChild(iframe);
  };

  var get_server_option = function(name, default_value) {
    if (typeof Scribd.ServerOptions == 'undefined' || eval('typeof Scribd.ServerOptions.' + name) == 'undefined')
      return default_value;

    return eval('Scribd.ServerOptions.' + name);
  };

  Scribd.Ads.trackEngagement = false;
  Scribd.Ads.userIsActive = false;
  Scribd.Ads.inactivityTimer = null;
  Scribd.Ads.idleTimeBeforeInactive = get_server_option('ad_refresh_idle_time_before_inactive', 60);
  Scribd.Ads.refreshInterval = get_server_option('ad_refresh_interval', 60);
  Scribd.Ads.delayBeforeTrackingEngagement = get_server_option('ad_refresh_engagement_tracking_delay', 0);

  setTimeout(function() {
    Scribd.Ads.trackEngagement = true;
  }, Scribd.Ads.delayBeforeTrackingEngagement * 1000);

  Scribd.Ads.onUserActivity = function() {
    Scribd.Ads.userIsActive = true;
    clearTimeout(Scribd.Ads.inactivityTimer);
    Scribd.Ads.inactivityTimer = setTimeout(Scribd.Ads.onUserInactivity, Scribd.Ads.idleTimeBeforeInactive * 1000);
  };

  Scribd.Ads.onUserInactivity = function() {
    Scribd.Ads.userIsActive = false;
  };

  Scribd.Ads.observingUserActivity = false;

  Scribd.Ads.observeUserActivity = function() {
    if (!Scribd.Ads.observingUserActivity) {
      Scribd.Ads.onUserActivity(); // we consider them active to start off
      document.observe('mousemove', Scribd.Ads.onUserActivity);
      Event.observe(window, 'scroll', Scribd.Ads.onUserActivity);
      Scribd.Ads.observingUserActivity = true;
    }
  };

  Scribd.Ads.onViewModeChange = function(new_mode, old_mode) {
    if (old_mode == 'scroll')
      $$('.between_page_ads').each(function(ad) { ad.hide(); });
    if (new_mode == 'scroll')
      $$('.between_page_ads').each(function(ad) { ad.show(); });
  };

  if (typeof docManager !== 'undefined') {
      docManager.addEvent('viewmodeChanged', Scribd.Ads.onViewModeChange);
  }

  Scribd.Ads.launchVideo = function(timeout) {
    timeout = timeout || 60000;//default to one minute on page
    var interstitial = new __adaptv__.ads.VideoInterstitial();
    interstitial.setAdConfig(
      { key         :'scribd' });
    interstitial.setOptions({ 
        title             : 'Advertisement'
      , classNamePrefix   : 'adaptv-interstitial'
      , backgroundOpacity : 0.7
      , escapeToClose     : true
      , hasCloseButton    : true
      , coverPage         : false // whether to show page immadiately when we call show (before ad is loaded)
      , timeout_ms        : null  // timeout to ad server
      , loadOnView        : 1     // how many page views before we show this 
      , timeCap           : '1s'   // max show once every 10 minutes
      , viewCap           : 1     // max show once every 1 view
    });
    setTimeout(function() {
      interstitial.show();  
    }, timeout);
  };
} else {
  // if ads disabled, lets remove functionality from all those methods...
  (function() {
    var resetThese = [ 'addAttribute', 'addRefreshUnit', 'addUnit','addBetweenPageUnit', 'launchVideo'];
    var doNothing = function() {};
    for(var i = resetThese.length - 1; i >= 0; i -= 1) {
      Scribd.Ads[resetThese[i]] = doNothing;
    }
  })();     
}