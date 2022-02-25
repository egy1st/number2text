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

    /* */ jsonData = {"reactions": [], "reactions_limit": 10, "ordered_highlighted": [], "posts": {"333188609": {"edited": false, "author_is_moderator": false, "from_request_user": false, "up_voted": false, "can_edit": false, "ip": "", "last_modified_date": null, "dislikes": 0, "raw_message": "Hi Abdul,\n\nYou can check this link: http://www.brighthub.com/education/languages/media/p/66836.aspx\n\nAll the Best!", "has_replies": false, "vote": false, "votable": true, "last_modified_by": null, "real_date": "2010-03-21_19:46:07", "date": "2 years ago", "message": "<p>Hi Abdul,</p>\n\n<p>You can check this link: <a href=\"http://www.brighthub.com/education/languages/media/p/66836.aspx\" rel=\"nofollow\">http://www.brighthub.com/educa...</a></p>\n\n<p>All the Best!</p>", "approved": true, "is_last_child": false, "author_is_founder": false, "can_reply": true, "likes": 0, "user_voted": null, "num_replies": 0, "down_voted": false, "is_first_child": false, "has_been_anonymized": false, "highlighted": false, "parent_post_id": null, "depth": 0, "points": 0, "user_key": "brighthub-3e231326b094752a9ea6278639d2fef0", "author_is_creator": true, "email": "", "killed": false, "is_realtime": false}, "333188613": {"edited": false, "author_is_moderator": false, "from_request_user": null, "up_voted": false, "can_edit": false, "ip": "", "last_modified_date": null, "dislikes": 0, "raw_message": "I want to know the hindi number names from 100 to 1,000,00,00", "has_replies": false, "vote": false, "votable": true, "last_modified_by": null, "real_date": "2010-08-03_04:04:06", "date": "1 year ago", "message": "<p>I want to know the hindi number names from 100 to 1,000,00,00</p>", "approved": true, "is_last_child": false, "author_is_founder": false, "can_reply": true, "likes": 0, "user_voted": null, "num_replies": 0, "down_voted": false, "is_first_child": false, "has_been_anonymized": false, "highlighted": false, "parent_post_id": null, "depth": 0, "points": 0, "user_key": "28f0cf8c9b149f13d131bbdb45ee3d4b", "author_is_creator": false, "email": "", "killed": false, "is_realtime": false}, "333188587": {"edited": false, "author_is_moderator": false, "from_request_user": null, "up_voted": false, "can_edit": false, "ip": "", "last_modified_date": null, "dislikes": 0, "raw_message": "6.1,2.1,6.1,8.1,2.1 plies in numbers se kya name bnega btaye, thank you", "has_replies": false, "vote": false, "votable": true, "last_modified_by": null, "real_date": "2010-01-10_16:26:09", "date": "2 years ago", "message": "<p>6.1,2.1,6.1,8.1,2.1 plies in numbers se kya name bnega btaye, thank you</p>", "approved": true, "is_last_child": false, "author_is_founder": false, "can_reply": true, "likes": 0, "user_voted": null, "num_replies": 0, "down_voted": false, "is_first_child": false, "has_been_anonymized": false, "highlighted": false, "parent_post_id": null, "depth": 0, "points": 0, "user_key": "2cc503bb45408b27cec5c6fc2772a781", "author_is_creator": false, "email": "", "killed": false, "is_realtime": false}, "333188590": {"edited": false, "author_is_moderator": false, "from_request_user": null, "up_voted": false, "can_edit": false, "ip": "", "last_modified_date": null, "dislikes": 0, "raw_message": "I WANT TO KNOW THE NUMBER NAMES FROM 20 TO 40.", "has_replies": false, "vote": false, "votable": true, "last_modified_by": null, "real_date": "2010-02-01_02:17:54", "date": "2 years ago", "message": "<p>I WANT TO KNOW THE NUMBER NAMES FROM 20 TO 40.</p>", "approved": true, "is_last_child": false, "author_is_founder": false, "can_reply": true, "likes": 0, "user_voted": null, "num_replies": 0, "down_voted": false, "is_first_child": false, "has_been_anonymized": false, "highlighted": false, "parent_post_id": null, "depth": 0, "points": 0, "user_key": "cc766a8f9739afb607a60e12b3f7aa89", "author_is_creator": false, "email": "", "killed": false, "is_realtime": false}, "333188597": {"edited": false, "author_is_moderator": false, "from_request_user": null, "up_voted": false, "can_edit": false, "ip": "", "last_modified_date": null, "dislikes": 0, "raw_message": "how much is theen sou penthees", "has_replies": false, "vote": false, "votable": true, "last_modified_by": null, "real_date": "2010-03-05_21:47:48", "date": "2 years ago", "message": "<p>how much is theen sou penthees</p>", "approved": true, "is_last_child": false, "author_is_founder": false, "can_reply": true, "likes": 0, "user_voted": null, "num_replies": 0, "down_voted": false, "is_first_child": false, "has_been_anonymized": false, "highlighted": false, "parent_post_id": null, "depth": 0, "points": 0, "user_key": "15c18aaba350f195e37a25e69ba3fc7a", "author_is_creator": false, "email": "", "killed": false, "is_realtime": false}, "333188605": {"edited": false, "author_is_moderator": false, "from_request_user": false, "up_voted": false, "can_edit": false, "ip": "", "last_modified_date": null, "dislikes": 0, "raw_message": "Hi Anup,\n\nteen sau penthees is 335. Teen sau - three hundred and penthes is thirty five. \n\nAll the best!", "has_replies": false, "vote": false, "votable": true, "last_modified_by": null, "real_date": "2010-03-21_19:23:50", "date": "2 years ago", "message": "<p>Hi Anup,</p>\n\n<p>teen sau penthees is 335. Teen sau - three hundred and penthes is thirty five. </p>\n\n<p>All the best!</p>", "approved": true, "is_last_child": false, "author_is_founder": false, "can_reply": true, "likes": 0, "user_voted": null, "num_replies": 0, "down_voted": false, "is_first_child": false, "has_been_anonymized": false, "highlighted": false, "parent_post_id": null, "depth": 0, "points": 0, "user_key": "brighthub-3e231326b094752a9ea6278639d2fef0", "author_is_creator": true, "email": "", "killed": false, "is_realtime": false}}, "ordered_posts": [333188613, 333188609, 333188605, 333188597, 333188590, 333188587], "realtime_enabled": true, "ready": true, "mediaembed": [], "has_more_reactions": false, "realtime_paused": true, "integration": {"receiver_url": "", "hide_user_votes": false, "reply_position": false, "disqus_logo": false}, "highlighted": {}, "reactions_start": 0, "media_url": "http://mediacdn.disqus.com/1332966743", "users": {"28f0cf8c9b149f13d131bbdb45ee3d4b": {"username": "saurabh", "tumblr": "", "about": "", "display_name": "saurabh", "url": "http://disqus.com/guest/28f0cf8c9b149f13d131bbdb45ee3d4b/", "registered": false, "remote_id": null, "linkedin": "", "blog": "", "remote_domain": "", "points": null, "facebook": "", "avatar": "http://mediacdn.disqus.com/1332966743/images/noavatar32.png", "delicious": "", "is_remote": false, "verified": false, "flickr": "", "twitter": "", "remote_domain_name": ""}, "brighthub-3e231326b094752a9ea6278639d2fef0": {"username": "brighthub-3e231326b094752a9ea6278639d2fef0", "tumblr": "", "about": "", "display_name": "Meetu", "url": "http://disqus.com/brighthub-3e231326b094752a9ea6278639d2fef0/", "registered": true, "remote_id": "Meetu", "linkedin": "", "blog": "http://www.brighthub.com/members/meetu.aspx", "remote_domain": 1258, "points": 1, "facebook": "", "avatar": "http://mediacdn.disqus.com/1332966743/images/noavatar32.png", "delicious": "", "is_remote": true, "verified": false, "flickr": "", "twitter": "", "remote_domain_name": "Bright Hub"}, "15c18aaba350f195e37a25e69ba3fc7a": {"username": "anup", "tumblr": "", "about": "", "display_name": "anup", "url": "http://disqus.com/guest/15c18aaba350f195e37a25e69ba3fc7a/", "registered": false, "remote_id": null, "linkedin": "", "blog": "", "remote_domain": "", "points": null, "facebook": "", "avatar": "http://mediacdn.disqus.com/1332966743/images/noavatar32.png", "delicious": "", "is_remote": false, "verified": false, "flickr": "", "twitter": "", "remote_domain_name": ""}, "2cc503bb45408b27cec5c6fc2772a781": {"username": "prakash", "tumblr": "", "about": "", "display_name": "prakash", "url": "http://disqus.com/guest/2cc503bb45408b27cec5c6fc2772a781/", "registered": false, "remote_id": null, "linkedin": "", "blog": "", "remote_domain": "", "points": null, "facebook": "", "avatar": "http://mediacdn.disqus.com/1332966743/images/noavatar32.png", "delicious": "", "is_remote": false, "verified": false, "flickr": "", "twitter": "", "remote_domain_name": ""}, "cc766a8f9739afb607a60e12b3f7aa89": {"username": "ABDUL BASITH", "tumblr": "", "about": "", "display_name": "ABDUL BASITH", "url": "http://disqus.com/guest/cc766a8f9739afb607a60e12b3f7aa89/", "registered": false, "remote_id": null, "linkedin": "", "blog": "", "remote_domain": "", "points": null, "facebook": "", "avatar": "http://mediacdn.disqus.com/1332966743/images/noavatar32.png", "delicious": "", "is_remote": false, "verified": false, "flickr": "", "twitter": "", "remote_domain_name": ""}}, "user_unapproved": {}, "messagesx": {"count": 0, "unread": []}, "thread": {"voters_count": 0, "offset_posts": 0, "slug": "learning_numbers_in_hindi", "paginate": true, "num_pages": 1, "days_alive": 0, "moderate_none": false, "voters": {}, "total_posts": 6, "realtime_paused": true, "queued": false, "pagination_type": "append", "user_vote": null, "likes": 0, "num_posts": 6, "closed": false, "per_page": 20, "id": 441669361, "killed": false, "moderate_all": false}, "forum": {"use_media": false, "avatar_size": 32, "apiKey": "n7hB6xkySIp5XYk3pf6VpbY76elX1txP5zFNVBkCZCW1sSpZLmBpZJ46pMQ9ZK0b", "features": {"support_priority": true, "achievements": true, "logs": true, "realtime": true, "partner_key": true, "multiauthor_moderation": true, "reports": true, "dtpl_editor": true, "analytics": true, "sso": true, "multisite_admin": true}, "comment_max_words": 0, "mobile_theme_disabled": false, "is_early_adopter": true, "login_buttons_enabled": false, "streaming_realtime": false, "reply_position": false, "id": 631991, "default_avatar_url": "http://mediacdn.disqus.com/1332966743/images/noavatar32.png", "template": {"url": "http://mediacdn.disqus.com/1332966743/uploads/themes/dsq24e27b869b66e9e62724bd7725d5d9c1.js?0", "mobile": {"url": "http://mediacdn.disqus.com/1332966743/uploads/themes/mobile/theme.js", "css": "http://mediacdn.disqus.com/1332966743/uploads/themes/mobile/theme.css"}, "api": "1.0", "name": "Bright Hub", "css": "http://mediacdn.disqus.com/1332966743/uploads/themes/dsq24e27b869b66e9e62724bd7725d5d9c1.css?0"}, "max_depth": 3, "ranks_enabled": false, "lastUpdate": 1326128506, "linkbacks_enabled": false, "allow_anon_votes": true, "revert_new_login_flow": false, "stylesUrl": "http://mediacdn.disqus.com/uploads/styles/63/1991/brighthub.css", "show_avatar": true, "reactions_enabled": false, "disqus_auth_disabled": false, "name": "Bright Hub ", "language": "en", "mentions_enabled": true, "url": "brighthub", "allow_anon_post": true, "thread_votes_disabled": false, "hasCustomStyles": true, "moderate_all": false}, "settings": {"realtimeHost": "qq.disqus.com", "uploads_url": "http://media.disqus.com/uploads", "ssl_media_url": "https://securecdn.disqus.com/1332966743", "realtime_url": "http://rt.disqus.com/forums/realtime-cached.js", "facebook_app_id": "52254943976", "minify_js": true, "recaptcha_public_key": "6LdKMrwSAAAAAPPLVhQE9LPRW4LUSZb810_iaa8u", "read_only": false, "facebook_api_key": "52254943976", "juggler_url": "http://juggler.services.disqus.com", "realtimePort": "80", "debug": false, "disqus_url": "http://disqus.com", "media_url": "http://mediacdn.disqus.com/1332966743"}, "ranks": {"brighthub-3e231326b094752a9ea6278639d2fef0": null}, "request": {"sort": "hot", "is_authenticated": false, "user_type": "anon", "subscribe_on_post": 0, "missing_perm": null, "user_id": null, "remote_domain_name": "", "remote_domain": "", "is_verified": false, "profile_url": "", "username": "", "is_global_moderator": false, "sharing": {}, "timestamp": "2012-03-28_22:22:06", "is_moderator": false, "ordered_unapproved_posts": [], "unapproved_posts": {}, "forum": "brighthub", "is_initial_load": true, "display_username": "", "points": null, "has_email": false, "moderator_can_edit": false, "is_remote": false, "userkey": "", "page": 1}, "context": {"use_twitter_signin": false, "use_fb_connect": false, "show_reply": true, "active_switches": ["bespin", "community_icon", "embedapi", "google_auth", "mentions", "new_facebook_auth", "new_thread_create", "realtime_cached", "show_captcha_on_links", "ssl", "static_reply_frame", "static_styles", "statsd_created", "upload_media", "use_rs_paginator_60m"], "sigma_chance": 10, "use_google_signin": false, "switches": {"olark_admin_addons": true, "listactivity_replies": true, "discovery_preview_users": true, "es_index_threads": true, "use_master_for_api": true, "google_auth": true, "discovery_best_comment": true, "html_email": true, "moderate_ascending": true, "community_icon": true, "realtime_cached": true, "google_analytics": true, "olark_admin_packages": true, "static_styles": true, "firehose": true, "stats": true, "show_unapproved": true, "firehose_gnip_http": true, "transitional_sessions": true, "discovery_redirect_event": true, "show_captcha_on_links": true, "statsd_created": true, "bespin": true, "olark_support": true, "firehose_gnip": true, "firehose_pubsub": true, "olark_addons": true, "new_facebook_auth": true, "limit_get_posts_days_30d": true, "edits_to_spam": true, "juggler_enabled": true, "discovery_network": true, "phoenix": true, "phoenix_reputation": true, "new_thread_create": true, "use_impermium": true, "upload_media": false, "vip_read_slave": true, "embedapi": true, "ssl": true, "es_index_posts_discovery": true, "usertransformer_reputation": true, "fingerprint": true, "send_to_impermium": true, "firehose_push": true, "theme_editor_disabled": true, "firehose_message_db_lookup": true, "listactivity_replies_30d": true, "realtime": true, "phoenix_optout": true, "statsd.timings": true, "train_impermium": true, "firehose_pubsub_throttle": true, "git_themes": true, "new_moderate": true, "use_rs_paginator_60m": true, "redis_threadcount": true, "mentions": true, "olark_install": true, "static_reply_frame": true}, "forum_facebook_key": "", "use_yahoo": false, "subscribed": false, "active_gargoyle_switches": ["discovery_best_comment", "discovery_network", "discovery_preview_users", "discovery_redirect_event", "edits_to_spam", "es_index_posts_discovery", "es_index_threads", "fingerprint", "firehose", "firehose_gnip", "firehose_gnip_http", "firehose_message_db_lookup", "firehose_pubsub", "firehose_pubsub_throttle", "firehose_push", "git_themes", "google_analytics", "html_email", "juggler_enabled", "limit_get_posts_days_30d", "listactivity_replies", "listactivity_replies_30d", "moderate_ascending", "new_moderate", "olark_addons", "olark_admin_addons", "olark_admin_packages", "olark_install", "olark_support", "phoenix", "phoenix_optout", "phoenix_reputation", "realtime", "redis_threadcount", "send_to_impermium", "show_captcha_on_links", "show_unapproved", "stats", "statsd.timings", "theme_editor_disabled", "train_impermium", "transitional_sessions", "use_impermium", "use_master_for_api", "usertransformer_reputation", "vip_read_slave"], "realtime_speed": 15000, "use_openid": false}}; /* */
    /* __extrajson__ */
    cookieMessages = {"user_created": null, "post_has_profile": null, "post_twitter": null, "post_not_approved": null}; session = {"url": null, "name": null, "email": null};
    jsonData.forum.template = {"url": "http://mediacdn.disqus.com/1332966743/uploads/themes/dsq24e27b869b66e9e62724bd7725d5d9c1.js?0", "mobile": {"url": "http://mediacdn.disqus.com/1332966743/uploads/themes/mobile/theme.js", "css": "http://mediacdn.disqus.com/1332966743/uploads/themes/mobile/theme.css"}, "api": "1.0", "name": "Bright Hub", "css": "http://mediacdn.disqus.com/1332966743/uploads/themes/dsq24e27b869b66e9e62724bd7725d5d9c1.css?0"};
    jsonData.context.active_gargoyle_switches = ["discovery_best_comment", "discovery_network", "discovery_preview_users", "discovery_redirect_event", "edits_to_spam", "es_index_posts_discovery", "es_index_threads", "fingerprint", "firehose", "firehose_gnip", "firehose_gnip_http", "firehose_message_db_lookup", "firehose_pubsub", "firehose_pubsub_throttle", "firehose_push", "git_themes", "google_analytics", "html_email", "juggler_enabled", "limit_get_posts_days_30d", "listactivity_replies", "listactivity_replies_30d", "moderate_ascending", "new_moderate", "olark_addons", "olark_admin_addons", "olark_admin_packages", "olark_install", "olark_support", "phoenix", "phoenix_optout", "phoenix_reputation", "realtime", "redis_threadcount", "send_to_impermium", "show_captcha_on_links", "show_unapproved", "stats", "statsd.timings", "theme_editor_disabled", "train_impermium", "transitional_sessions", "use_impermium", "use_master_for_api", "usertransformer_reputation", "vip_read_slave"];
    jsonData.context.active_switches = ["bespin", "community_icon", "embedapi", "google_auth", "mentions", "new_facebook_auth", "new_thread_create", "realtime_cached", "show_captcha_on_links", "ssl", "static_reply_frame", "static_styles", "statsd_created", "upload_media", "use_rs_paginator_60m"];
    jsonData.context.all_switches = {"olark_admin_addons": true, "listactivity_replies": true, "discovery_preview_users": true, "es_index_threads": true, "use_master_for_api": true, "google_auth": true, "discovery_best_comment": true, "html_email": true, "moderate_ascending": true, "community_icon": true, "realtime_cached": true, "google_analytics": true, "olark_admin_packages": true, "static_styles": true, "firehose": true, "stats": true, "show_unapproved": true, "firehose_gnip_http": true, "transitional_sessions": true, "discovery_redirect_event": true, "show_captcha_on_links": true, "statsd_created": true, "bespin": true, "olark_support": true, "firehose_gnip": true, "firehose_pubsub": true, "olark_addons": true, "new_facebook_auth": true, "limit_get_posts_days_30d": true, "edits_to_spam": true, "juggler_enabled": true, "discovery_network": true, "phoenix": true, "phoenix_reputation": true, "new_thread_create": true, "use_impermium": true, "upload_media": true, "vip_read_slave": true, "embedapi": true, "ssl": true, "es_index_posts_discovery": true, "usertransformer_reputation": true, "fingerprint": true, "send_to_impermium": true, "firehose_push": true, "theme_editor_disabled": true, "firehose_message_db_lookup": true, "listactivity_replies_30d": true, "realtime": true, "phoenix_optout": true, "statsd.timings": true, "train_impermium": true, "firehose_pubsub_throttle": true, "git_themes": true, "new_moderate": true, "use_rs_paginator_60m": true, "redis_threadcount": true, "mentions": true, "olark_install": true, "static_reply_frame": true};

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

DISQUS.jsonData.context.csrf_token = '3cc8abe13225e0ef0ee105eddb746f01';

DISQUS.jsonData.urls = {
    login: 'http://disqus.com/profile/login/',
    logout: 'http://disqus.com/logout/',
    upload_remove: 'http://brighthub.disqus.com/thread/learning_numbers_in_hindi/async_media_remove/',
    request_user_profile: 'http://disqus.com/AnonymousUser/',
    request_user_avatar: 'http://mediacdn.disqus.com/1332966743/images/noavatar92.png',
    verify_email: 'http://disqus.com/verify/',
    remote_settings: 'http://brighthub.disqus.com/_auth/embed/remote_settings/',
    edit_profile_window: 'http://disqus.com/embed/profile/edit/',
    embed_thread: 'http://brighthub.disqus.com/thread.js',
    embed_vote: 'http://brighthub.disqus.com/vote.js',
    embed_thread_vote: 'http://brighthub.disqus.com/thread_vote.js',
    embed_thread_share: 'http://brighthub.disqus.com/thread_share.js',
    embed_queueurl: 'http://brighthub.disqus.com/queueurl.js',
    embed_hidereaction: 'http://brighthub.disqus.com/hidereaction.js',
    embed_more_reactions: 'http://brighthub.disqus.com/more_reactions.js',
    embed_subscribe: 'http://brighthub.disqus.com/subscribe.js',
    embed_highlight: 'http://brighthub.disqus.com/highlight.js',
    embed_block: 'http://brighthub.disqus.com/block.js',
    update_moderate_all: 'http://brighthub.disqus.com/update_moderate_all.js',
    update_days_alive: 'http://brighthub.disqus.com/update_days_alive.js',
    show_user_votes: 'http://brighthub.disqus.com/show_user_votes.js',
    forum_view: 'http://brighthub.disqus.com/learning_numbers_in_hindi',
    cnn_saml_try: 'http://disqus.com/saml/cnn/try/',
    realtime: DISQUS.jsonData.settings.realtime_url,
    thread_view: 'http://brighthub.disqus.com/thread/learning_numbers_in_hindi/',
    twitter_connect: DISQUS.jsonData.settings.disqus_url + '/_ax/twitter/begin/',
    yahoo_connect: DISQUS.jsonData.settings.disqus_url + '/_ax/yahoo/begin/',
    openid_connect: DISQUS.jsonData.settings.disqus_url + '/_ax/openid/begin/',
    googleConnect: DISQUS.jsonData.settings.disqus_url + '/_ax/google/begin/',
    community: 'http://brighthub.disqus.com/community.html',
    admin: 'http://brighthub.disqus.com/admin/moderate/',
    moderate: 'http://brighthub.disqus.com/admin/moderate/',
    moderate_threads: 'http://brighthub.disqus.com/admin/moderate-threads/',
    settings: 'http://brighthub.disqus.com/admin/settings/',
    unmerged_profiles: 'http://disqus.com/embed/profile/unmerged_profiles/',
    juggler: DISQUS.jsonData.settings.juggler_url,

    channels: {
        def:      'http://disqus.com/default.html', /* default channel */
        auth:     'https://disqus.com/embed/login.html',
        tweetbox: 'http://disqus.com/forums/integrations/twitter/tweetbox.html?f=brighthub',
        edit:     'http://brighthub.disqus.com/embed/editcomment.html'
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
