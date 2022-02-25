/*jslint evil:true */
/**
 * Dynamic thread loader
 *
 * 
 *  * 
 * 
 * 
*/

// 
var DISQUS;
if (!DISQUS || typeof DISQUS == 'function') {
    throw "DISQUS object is not initialized";
}
// 

// json_data and default_json django template variables will close
// and re-open javascript comment tags

(function () {
    var jsonData, cookieMessages, session, key;

    /* */ jsonData = {"reactions": [], "reactions_limit": 10, "ordered_highlighted": [], "posts": {}, "ordered_posts": [], "realtime_enabled": false, "ready": true, "mediaembed": [], "has_more_reactions": false, "realtime_paused": true, "integration": {"receiver_url": "", "hide_user_votes": false, "reply_position": false, "disqus_logo": false}, "highlighted": {}, "reactions_start": 0, "media_url": "http://mediacdn.disqus.com/1332966743", "users": {}, "user_unapproved": {}, "messagesx": {"count": 0, "unread": []}, "thread": {"voters_count": 0, "offset_posts": 0, "slug": "how_to_count_in_russian_for_dummies", "paginate": true, "num_pages": 0, "days_alive": 0, "moderate_none": false, "voters": {}, "total_posts": 0, "realtime_paused": true, "queued": false, "pagination_type": "append", "user_vote": null, "likes": 0, "num_posts": 0, "closed": false, "per_page": 80, "id": 437600571, "killed": false, "moderate_all": false}, "forum": {"use_media": true, "avatar_size": 32, "apiKey": "XQ5Dg1rHgPOGegzh1Y2SDnsDUo0jEWkMKtQ1JOMQT2cp8RjqLvSHTV7kvmEjdrjU", "features": {}, "comment_max_words": 0, "mobile_theme_disabled": false, "is_early_adopter": false, "login_buttons_enabled": false, "streaming_realtime": false, "reply_position": false, "id": 977994, "default_avatar_url": "http://mediacdn.disqus.com/1332966743/images/noavatar32.png", "template": {"url": "http://mediacdn.disqus.com/1332966743/uploads/themes/7884a9652e94555c70f96b6be63be216/theme.js?252", "mobile": {"url": "http://mediacdn.disqus.com/1332966743/uploads/themes/mobile/theme.js", "css": "http://mediacdn.disqus.com/1332966743/uploads/themes/mobile/theme.css"}, "api": "1.1", "name": "Houdini", "css": "http://mediacdn.disqus.com/1332966743/uploads/themes/7884a9652e94555c70f96b6be63be216/theme.css?252"}, "max_depth": 0, "ranks_enabled": false, "lastUpdate": 1323191532, "linkbacks_enabled": false, "allow_anon_votes": true, "revert_new_login_flow": false, "stylesUrl": "http://mediacdn.disqus.com/uploads/styles/97/7994/wiley-dummies.css", "show_avatar": true, "reactions_enabled": false, "disqus_auth_disabled": false, "name": "Dummies", "language": "en", "mentions_enabled": false, "url": "wiley-dummies", "allow_anon_post": true, "thread_votes_disabled": false, "hasCustomStyles": true, "moderate_all": false}, "settings": {"realtimeHost": "qq.disqus.com", "uploads_url": "http://media.disqus.com/uploads", "ssl_media_url": "https://securecdn.disqus.com/1332966743", "realtime_url": "http://rt.disqus.com/forums/realtime-cached.js", "facebook_app_id": "52254943976", "minify_js": true, "recaptcha_public_key": "6LdKMrwSAAAAAPPLVhQE9LPRW4LUSZb810_iaa8u", "read_only": false, "facebook_api_key": "52254943976", "juggler_url": "http://juggler.services.disqus.com", "realtimePort": "80", "debug": false, "disqus_url": "http://disqus.com", "media_url": "http://mediacdn.disqus.com/1332966743"}, "ranks": {}, "request": {"sort": "newest", "is_authenticated": false, "user_type": "anon", "subscribe_on_post": 0, "missing_perm": null, "user_id": null, "remote_domain_name": "", "remote_domain": "", "is_verified": false, "profile_url": "", "username": "", "is_global_moderator": false, "sharing": {}, "timestamp": "2012-03-28_21:37:55", "is_moderator": false, "ordered_unapproved_posts": [], "unapproved_posts": {}, "forum": "wiley-dummies", "is_initial_load": true, "display_username": "", "points": null, "has_email": false, "moderator_can_edit": false, "is_remote": false, "userkey": "", "page": 1}, "context": {"use_twitter_signin": false, "use_fb_connect": false, "show_reply": true, "active_switches": ["bespin", "community_icon", "embedapi", "google_auth", "mentions", "new_facebook_auth", "new_thread_create", "realtime_cached", "show_captcha_on_links", "ssl", "static_reply_frame", "static_styles", "statsd_created", "upload_media", "use_rs_paginator_60m"], "sigma_chance": 10, "use_google_signin": false, "switches": {"olark_admin_addons": true, "listactivity_replies": true, "discovery_preview_users": true, "es_index_threads": true, "use_master_for_api": true, "google_auth": true, "discovery_best_comment": true, "html_email": true, "moderate_ascending": true, "community_icon": true, "realtime_cached": true, "google_analytics": true, "olark_admin_packages": true, "static_styles": true, "firehose": true, "stats": true, "firehose_gnip_http": true, "transitional_sessions": true, "discovery_redirect_event": true, "show_captcha_on_links": true, "statsd_created": true, "bespin": true, "olark_support": true, "firehose_gnip": true, "firehose_pubsub": true, "olark_addons": true, "new_facebook_auth": true, "limit_get_posts_days_30d": true, "edits_to_spam": true, "juggler_enabled": true, "discovery_network": true, "phoenix": true, "phoenix_reputation": true, "new_thread_create": true, "use_impermium": true, "upload_media": true, "vip_read_slave": true, "embedapi": true, "ssl": true, "es_index_posts_discovery": true, "usertransformer_reputation": true, "fingerprint": true, "send_to_impermium": true, "firehose_push": true, "theme_editor_disabled": true, "firehose_message_db_lookup": true, "listactivity_replies_30d": true, "realtime": true, "phoenix_optout": true, "statsd.timings": true, "train_impermium": true, "firehose_pubsub_throttle": true, "git_themes": true, "new_moderate": true, "use_rs_paginator_60m": true, "redis_threadcount": true, "mentions": true, "olark_install": true, "static_reply_frame": true}, "forum_facebook_key": "", "use_yahoo": false, "subscribed": false, "active_gargoyle_switches": ["discovery_best_comment", "discovery_network", "discovery_preview_users", "discovery_redirect_event", "edits_to_spam", "es_index_posts_discovery", "es_index_threads", "fingerprint", "firehose", "firehose_gnip", "firehose_gnip_http", "firehose_message_db_lookup", "firehose_pubsub", "firehose_pubsub_throttle", "firehose_push", "git_themes", "google_analytics", "html_email", "juggler_enabled", "limit_get_posts_days_30d", "listactivity_replies", "listactivity_replies_30d", "moderate_ascending", "new_moderate", "olark_addons", "olark_admin_addons", "olark_admin_packages", "olark_install", "olark_support", "phoenix", "phoenix_optout", "phoenix_reputation", "realtime", "redis_threadcount", "send_to_impermium", "show_captcha_on_links", "stats", "statsd.timings", "theme_editor_disabled", "train_impermium", "transitional_sessions", "use_impermium", "use_master_for_api", "usertransformer_reputation", "vip_read_slave"], "realtime_speed": 15000, "use_openid": false}}; /* */
    /* __extrajson__ */
    cookieMessages = {"user_created": null, "post_has_profile": null, "post_twitter": null, "post_not_approved": null}; session = {"url": null, "name": null, "email": null};

    DISQUS.jsonData = jsonData;
    DISQUS.jsonData.cookie_messages = cookieMessages;
    DISQUS.jsonData.session = session;

    if (DISQUS.useSSL) {
        DISQUS.useSSL(DISQUS.jsonData.settings);
    }

    // The mappings below are for backwards compatibility--before we port all the code that
    // accesses jsonData.settings to DISQUS.settings

    var mappings = {
        debug:                'disqus.debug',
        minify_js:            'disqus.minified',
        read_only:            'disqus.readonly',
        recaptcha_public_key: 'disqus.recaptcha.key',
        facebook_app_id:      'disqus.facebook.appId',
        facebook_api_key:     'disqus.facebook.apiKey'
    };

    var urlMappings = {
        disqus_url:    'disqus.urls.main',
        media_url:     'disqus.urls.media',
        ssl_media_url: 'disqus.urls.sslMedia',
        realtime_url:  'disqus.urls.realtime',
        uploads_url:   'disqus.urls.uploads'
    };

    if (DISQUS.jsonData.context.switches.realtime_setting_change) {
        urlMappings.realtimeHost = 'realtime.host';
        urlMappings.realtimePort = 'realtime.port';
    }
    for (key in mappings) {
        if (mappings.hasOwnProperty(key)) {
            DISQUS.settings.set(mappings[key], DISQUS.jsonData.settings[key]);
        }
    }

    for (key in urlMappings) {
        if (urlMappings.hasOwnProperty(key)) {
            DISQUS.jsonData.settings[key] = DISQUS.settings.get(urlMappings[key]);
        }
    }
}());

DISQUS.jsonData.context.csrf_token = '21bc467119200cb06806902fa8e2f5b0';

DISQUS.jsonData.urls = {
    login: 'http://disqus.com/profile/login/',
    logout: 'http://disqus.com/logout/',
    upload_remove: 'http://wiley-dummies.disqus.com/thread/how_to_count_in_russian_for_dummies/async_media_remove/',
    request_user_profile: 'http://disqus.com/AnonymousUser/',
    request_user_avatar: 'http://mediacdn.disqus.com/1332966743/images/noavatar92.png',
    verify_email: 'http://disqus.com/verify/',
    remote_settings: 'http://wiley-dummies.disqus.com/_auth/embed/remote_settings/',
    edit_profile_window: 'http://disqus.com/embed/profile/edit/',
    embed_thread: 'http://wiley-dummies.disqus.com/thread.js',
    embed_vote: 'http://wiley-dummies.disqus.com/vote.js',
    embed_thread_vote: 'http://wiley-dummies.disqus.com/thread_vote.js',
    embed_thread_share: 'http://wiley-dummies.disqus.com/thread_share.js',
    embed_queueurl: 'http://wiley-dummies.disqus.com/queueurl.js',
    embed_hidereaction: 'http://wiley-dummies.disqus.com/hidereaction.js',
    embed_more_reactions: 'http://wiley-dummies.disqus.com/more_reactions.js',
    embed_subscribe: 'http://wiley-dummies.disqus.com/subscribe.js',
    embed_highlight: 'http://wiley-dummies.disqus.com/highlight.js',
    embed_block: 'http://wiley-dummies.disqus.com/block.js',
    update_moderate_all: 'http://wiley-dummies.disqus.com/update_moderate_all.js',
    update_days_alive: 'http://wiley-dummies.disqus.com/update_days_alive.js',
    show_user_votes: 'http://wiley-dummies.disqus.com/show_user_votes.js',
    forum_view: 'http://wiley-dummies.disqus.com/how_to_count_in_russian_for_dummies',
    cnn_saml_try: 'http://disqus.com/saml/cnn/try/',
    realtime: DISQUS.jsonData.settings.realtime_url,
    thread_view: 'http://wiley-dummies.disqus.com/thread/how_to_count_in_russian_for_dummies/',
    twitter_connect: DISQUS.jsonData.settings.disqus_url + '/_ax/twitter/begin/',
    yahoo_connect: DISQUS.jsonData.settings.disqus_url + '/_ax/yahoo/begin/',
    openid_connect: DISQUS.jsonData.settings.disqus_url + '/_ax/openid/begin/',
    googleConnect: DISQUS.jsonData.settings.disqus_url + '/_ax/google/begin/',
    community: 'http://wiley-dummies.disqus.com/community.html',
    admin: 'http://wiley-dummies.disqus.com/admin/moderate/',
    moderate: 'http://wiley-dummies.disqus.com/admin/moderate/',
    moderate_threads: 'http://wiley-dummies.disqus.com/admin/moderate-threads/',
    settings: 'http://wiley-dummies.disqus.com/admin/settings/',
    unmerged_profiles: 'http://disqus.com/embed/profile/unmerged_profiles/',
    juggler: DISQUS.jsonData.settings.juggler_url,

    channels: {
        def:      'http://disqus.com/default.html', /* default channel */
        auth:     'https://disqus.com/embed/login.html',
        tweetbox: 'http://disqus.com/forums/integrations/twitter/tweetbox.html?f=wiley-dummies',
        edit:     'http://wiley-dummies.disqus.com/embed/editcomment.html'
    }
};


// 
//     
DISQUS.jsonData.urls.channels.reply = 'http://mediacdn.disqus.com/1332966743/build/system/reply.html';
DISQUS.jsonData.urls.channels.upload = 'http://mediacdn.disqus.com/1332966743/build/system/upload.html';
DISQUS.jsonData.urls.channels.sso = 'http://mediacdn.disqus.com/1332966743/build/system/sso.html';
DISQUS.jsonData.urls.channels.facebook = 'http://mediacdn.disqus.com/1332966743/build/system/facebook.html';
//     
// 
