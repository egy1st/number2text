s = '';
s+='<style>div.widgetCalendar { border: 1px solid #888; font-size: 10px; font-family: arial; padding: 3px; clear:left; width: 120px; z-index: 10000000; display: none;}div.widgetCalendar .dayH { width: 14%; float: left; text-align: center; padding-top: 1px;}div.widgetCalendar .day { display: block; width: 15px; text-align: right;}div.widgetCalendar .monthTab { font-size: 11px; margin: 0px 0px 5px 0px; width: 50%; clear: none; float: left;}div.widgetCalendar .monthSlide { color: #000; font-weight: bold;}div.widgetCalendar .day:hover,div.widgetCalendar .monthSlide:hover { background-color:#d8dfea; cursor: pointer;}div.widgetCalendar .curr { font-weight: bolder; background-color: #D5D5D5; }div.widgetCalendar .nonM { color: #eee;}div.widgetCalendar .close { float:right; clear:both; padding:1px 5px 2px 5px; background-color: #666; margin: 0px; margin-top:-3px; margin-right:-3px; color: #fff; cursor: pointer; }div.widgetCalendar .monthSlide { width: 20%; float: left;}div#widgetCalendar1580404 { display: none;}</style><div id="widgetCalendar1580404"> <div onclick="wew_calendar_hide1580404(this)" class="close">x</div> <div class="clear"></div> <div style="text-align: center;"> <a class="monthSlide" onclick="wew_calendar_show_month1580404(this, -1);">&lt;</a> <div class="monthTab" onclick="wew_calendar_show_month1580404(this, 0);">March 2012</div> <a class="monthSlide" onclick="wew_calendar_show_month1580404(this, 1);">&gt;</a> </div> <div class="month"></div></div>';
document.write(s);
s = '';
s+='<script src="http://thisislike.com/js/ajaxquery.js"></script><style type="text/css">div#widgetServiceWheel1580404 { width: 303px; background-color: #fff; font-family:Helvetica, Arial, sans-serif; font-size: 12px; border: 0px; color: #666; }div#widgetServiceWheel1580404 * { font-family:Helvetica, Arial, sans-serif !important;}div#widgetServiceWheel1580404 .title { font-size: 22px; line-height: 26px; padding: 7px; color: #666;}div#widgetServiceWheel1580404 form { margin: 0px; padding: 0px;}div#widgetServiceWheel1580404 .content .left { background-color: #fff; width: 127px; float: left; padding: 0px; margin: 0px;}div#widgetServiceWheel1580404 .content { border: 0px; overflow-x: hidden; padding: 0px;}div#widgetServiceWheel1580404 #wew_lbContent1580404 .content { border: 0px !important; padding: 7px; font-size: 13px; line-height: 16px; text-align: left; overflow: hidden;}div#widgetServiceWheel1580404 #wew_lbContent1580404 .title { border-bottom: 1px solid #DDD; text-align: left;}div#widgetServiceWheel1580404 #wew_lbContent1580404 .backto { display: block; float:right; margin-bottom: -7px; margin-right: -7px; padding: 0px 3px; cursor: pointer; font-size:10px;}div#widgetServiceWheel1580404 #wew_lbContent1580404 .backto:hover { background-color: #666; color: #fff;}div#widgetServiceWheel1580404 .content .left .menu-item { float: right; width: 119px; background-color: #e9eaea; height: 28px; font-size: 12px; font-weight: bolder; line-height: 28px; margin: 0px -1px 4px 0px; color: #666; padding-left: 7px; cursor: pointer; text-align: left; border-right: 1px solid #e9eaea; }div#widgetServiceWheel1580404 .content .left .menu-item:hover { background-color: #f3f3f0;}div#widgetServiceWheel1580404 .content .left .active { background-color: #f3f3f0 !important; color: #000; border-top: 1px solid #DDD; border-left: 1px solid #DDD; border-bottom: 1px solid #DDD; border-right: 1px solid #f3f3f0; margin-right: -1px; z-index: 100;}div#widgetServiceWheel1580404 .content .right { float: left; width: 174px; min-height: 220px; padding: 0px 0px 20px 0px; border: 1px solid #DDD; background-color: #f3f3f0 !important;}div#widgetServiceWheel1580404 .content .right .inner { background-color: #fff !important; padding: 10px; margin: 10px;}div#widgetServiceWheel1580404 .clear { height: 1px; clear: both; font-size: 1px;}div#widgetServiceWheel1580404 .submit { background-color: #515151; height: 23px; line-height: 23px; border: 0px; padding: 0px 20px 0px 20px; color: #FFF; font-size: 11px; float: left; width: auto; cursor: pointer; margin-left: 10px;}div#widgetServiceWheel1580404 .submit:hover { background-color: #444;}div#widgetServiceWheel1580404 .inputContainerLabel { width: 111px; clear: both; float: left; margin: 7px 0px 0px 0px; font-size: 11px; text-align: left !important;}div#widgetServiceWheel1580404 .inputContainer { padding: 0px !important; margin: 0px; clear: left; float: left;}div#widgetServiceWheel1580404 .input { border: 1px solid #f5f5f5; background-color: #f5f5f5; color: #666; width: 111px; height: 21px !important; line-height: 15px; margin: 0px !important; font-size: 12px; padding: 3px;}div#widgetServiceWheel1580404 .select { border: 0px; background-color: #f5f5f5; color: #666; width: 111px; margin: 0px; font-size: 12px; padding: 3px; border: 0px;}div#widgetServiceWheel1580404 .more { font-size: 11px; color: #888; float: right; clear: both; text-decoration: none; cursor: pointer;}div#widgetServiceWheel1580404 .more:hover { text-decoration: underline;}div#widgetServiceWheel1580404 .findme { border: 1px solid #545454; margin: 7px 0px 2px 7px; width: 90%; font-size: 12px; clear: both; height: auto !important; }div#widgetServiceWheel1580404 .findme .title { background-color: #545454; padding: 5px; font-size: 12px; color: #FFF;}div#widgetServiceWheel1580404 .findme .content { background-color: #e1e1e1; font-size: 12px; padding: 5px; color: #545454;}div#widgetServiceWheel1580404 .findme .input { margin: 3px 7px 3px 3px; width: 90%; font-size:11px;}div#widgetServiceWheel1580404 #wew_lbLoading1580404 { background-color: #fff; margin: 0px; padding: 150px 0px; text-align: center; font-size: 12px;}div#widgetServiceWheel1580404 .moreOption{ display: none;}</style><div id="wew_page_1_1580404" style="display: none"> <div class="inner"> <div class="clear"></div> <div class="inputContainerLabel">Visa type:</div> <div class="inputContainer"> <select class="select" name="visa_entry" > <option value="1 entry" selected>1 entry</option><option value="2 entries" >2 entries</option><option value="3 entries" >3 entries</option><option value="multiple entries" >multiple entries</option> </select> </div> <div class="inputContainerLabel">Date from:</div> <div class="inputContainer"> <input name="visa_datefrom" type="text" class="input" value="04/04/2012" onfocus="wew_calendar_show1580404(this)" /><br /> <div class="widgetCalendar"></div> </div> <div class="inputContainerLabel">Date to:</div> <div class="inputContainer"><input name="visa_dateto" type="text" class="input" value="11/04/2012" onfocus="wew_calendar_show1580404(this)" /><br /> <div class="widgetCalendar"></div> </div> <div class="clear"></div> </div> <br /> <a class="submit" onclick="wew_lightbox1580404()">Submit</a> </div><div id="wew_page_2_1580404" style="display: none"> <div class="inner"> <div class="inputContainerLabel">City from:</div> <div class="inputContainer"> <select class="select" name="train_cityfrom" > <option value="Moscow" selected>Moscow</option><option value="St Petersburg" >St Petersburg</option><option value="Ekaterinburg" >Ekaterinburg</option><option value="Novosibirsk" >Novosibirsk</option><option value="Irkutsk" >Irkutsk</option><option value="Vladivostok" >Vladivostok</option><option value="Beijing" >Beijing</option><option value="Shanghai" >Shanghai</option> </select> </div> <div class="inputContainerLabel">City to:</div> <div class="inputContainer"> <select class="select" name="train_cityto" > <option value="Moscow" >Moscow</option><option value="St Petersburg" selected>St Petersburg</option><option value="Ekaterinburg" >Ekaterinburg</option><option value="Novosibirsk" >Novosibirsk</option><option value="Irkutsk" >Irkutsk</option><option value="Vladivostok" >Vladivostok</option><option value="Beijing" >Beijing</option><option value="Shanghai" >Shanghai</option> </select> </div> <div class="inputContainerLabel"><a href="http://trains.waytorussia.net" target="_blank">More cities &<br>Stopovers</a></div> <div class="inputContainerLabel">Travel date:</div> <div class="inputContainer"> <input type="text" name="train_date" class="input" value="04/04/2012" onfocus="wew_calendar_show1580404(this)"/><br /> <div class="widgetCalendar"></div> </div> <div class="clear"></div> </div> <br /> <a class="submit" onclick="wew_lightbox1580404()">Book Online</a> </div><div id="wew_page_3_1580404" style="display: none"> <div class="inner"> <div class="inputContainerLabel">Hotel in city:</div> <div class="inputContainer"> <select class="select" name="hotel_city" > <option value="Moscow" selected>Moscow</option><option value="St Petersburg" >St Petersburg</option><option value="Ekaterinburg" >Ekaterinburg</option><option value="Novosibirsk" >Novosibirsk</option><option value="Irkutsk" >Irkutsk</option><option value="Vladivostok" >Vladivostok</option><option value="Beijing" >Beijing</option><option value="Shanghai" >Shanghai</option> </select> </div> <div class="clear"></div> <div class="inputContainerLabel">I prefer...</div> <div class="inputContainer"> <select class="select" name="hotel_tags" > <option value="" selected></option><option value="hostel" >Hostels</option><option value="hotel" >Hotels</option> </select> </div> <div class="clear">&#160;</div> <div class="inputContainerLabel moreOption">+ tag or hotel name</div> <div class="inputContainer moreOption"> <input type="text" name="hotel_user_tags" class="input" /> </div> <div class="clear">&#160;</div> <a class="more" onclick="wew_options1580404(null);">+ more options</a> <d';
s+='iv class="clear">&#160;</div> <div class="inputContainerLabel">Check in:</div> <div class="inputContainer"> <input type="text" name="rental_datefrom" class="input" value="04/04/2012" onfocus="wew_calendar_show1580404(this)"/><br /> <div class="widgetCalendar"></div> </div> <div class="inputContainerLabel">Check out:</div> <div class="inputContainer"> <input type="text" name="rental_dateto" class="input" value="11/04/2012" onfocus="wew_calendar_show1580404(this)"/><br /> <div class="widgetCalendar"></div> </div> <div class="clear">&#160;</div> </div> <br /> <a class="submit" onclick="wew_lightbox1580404()">Book Online</a></div><div id="wew_page_5_1580404" style="display: none"> <div class="inner"> <div class="inputContainerLabel">City:</div> <div class="inputContainer"> <select class="select" name="taxi_city" > <option value="0" selected>Moscow</option><option value="1" >St Peterburg</option> </select> </div> <div class="inputContainerLabel">Book date:</div> <div class="inputContainer"> <input type="text" name="taxi_date" class="input" value="04/04/2012" onfocus="wew_calendar_show1580404(this)"/><br /> <div class="widgetCalendar"></div> </div> <div class="clear"></div> </div> <br /> <a class="submit" onclick="wew_lightbox1580404()">Book Online</a></div><div id="wew_page_6_1580404" style="display: none"> <div class="inner"> Other services: <br /> <br /> <a target="_blank" href="http://phonecards.waytorussia.net">Phonecards</a> </div></div><div id="widgetServiceWheel1580404"> <div id="wew_lbLoading1580404" style="display: none"> <img src="http://thisislike.com/view/imgs/progress.gif">&nbsp;Loading, please, wait... </div> <div id="wew_lbContent1580404" style="display: none"></div> <div id="wew_postSimlator1580404" style="display: none"></div> <div id="wew_formpage1580404"> <form action="" method="post" id="wew_form1580404"> <input type="hidden" name="active_tab" value="1" /> <input type="hidden" name="action_set" value="8" /> <input type="hidden" name="rid" value="1580404" /> <div class="content"> <div class="left" id="wew_menu1580404"> <div class="menu-item active" onclick="wew_Tabs1580404(this, 1);">Russian Visa</div><div class="menu-item" onclick="wew_Tabs1580404(this, 2);">Train Tickets</div><div class="menu-item" onclick="wew_Tabs1580404(this, 3);">Accommodation</div><div class="menu-item" onclick="wew_Tabs1580404(this, 5);">Car Transfers</div><div class="menu-item" onclick="wew_Tabs1580404(this, 6);">+ More</div> </div> <div class="right" id="wew_pageContainer1580404"> <div class="inner"> <div class="clear"></div> <div class="inputContainerLabel">Visa type:</div> <div class="inputContainer"> <select class="select" name="visa_entry" > <option value="1 entry" selected>1 entry</option><option value="2 entries" >2 entries</option><option value="3 entries" >3 entries</option><option value="multiple entries" >multiple entries</option> </select> </div> <div class="inputContainerLabel">Date from:</div> <div class="inputContainer"> <input name="visa_datefrom" type="text" class="input" value="04/04/2012" onfocus="wew_calendar_show1580404(this)" /><br /> <div class="widgetCalendar"></div> </div> <div class="inputContainerLabel">Date to:</div> <div class="inputContainer"><input name="visa_dateto" type="text" class="input" value="11/04/2012" onfocus="wew_calendar_show1580404(this)" /><br /> <div class="widgetCalendar"></div> </div> <div class="clear"></div> </div> <br /> <a class="submit" onclick="wew_lightbox1580404()">Submit</a> </div> </div> </form> </div></div>';
document.write(s);
/*calendar funcs*/

function wew_calendar_find_holder1580404(obj) {
    while (obj != null && obj.className.indexOf('inputContainer') == -1)
        obj = obj.parentNode;
    return wew_scan_childs1580404(obj, 'DIV', 'widgetCalendar');
}

function wew_cal_dS1580404(obj, value) {
    obj = wew_calendar_find_holder1580404(obj).parentNode;
    for (var i = obj.childNodes.length - 1 ; i >= 0; i--) {
        var t = obj.childNodes[i];
        if (t.tagName == 'INPUT') t.value = value;
    }
    wew_calendar_hide1580404(obj);
}

function wew_calendar_show_month1580404(obj, mn) { /* mn = +-1 */
    sliderCont = obj.parentNode;
    for (var i = sliderCont.childNodes.length - 1 ; i >= 0; i--) {
        var t = sliderCont.childNodes[i];
        if (t.className == 'monthTab') {
            mntArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            str = t.innerHTML;
            mnparts = str.split(" ");
            for (k = 0; k < mntArray.length; k++) 
                if (mnparts[0] == mntArray[k]) {
                    dtm = new Date(mnparts[1], k + mn, 1);
                    t.innerHTML = mntArray[dtm.getMonth()] + ' ' + dtm.getFullYear();
                }
        }
    }

    var nameOfClass = 'month';
    obj = obj.parentNode.parentNode;
    for (var i = obj.childNodes.length - 1 ; i >= 0; i--) {
        var t = obj.childNodes[i];
        if (t.className == nameOfClass) {
            dtm = [dtm.getMonth(), dtm.getFullYear()];
        
            dateF = new Date(dtm[1], dtm[0], 1);
            dateL = new Date(dtm[1], dtm[0] + 1, 1);
        
            wd = dateF.getDay() - 1;
            switch (wd){
            case -1:
                dateCRS = new Date(dtm[1], dtm[0], -5);
                break;
            default:
                dateCRS = new Date(dtm[1], dtm[0], 1 - wd);
            }
        
            var out = '<div class="clear">&#160;</div>';
            var nowDate = new Date();
            var nowDateStr = nowDate.getFullYear() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getDate();

            while (dateCRS.getTime() <= dateL.getTime()) {
                k = 7;
                while(k-- > 0) {
                    addStyle = nowDateStr == dateCRS.getFullYear() + '/' + (dateCRS.getMonth() + 1) + '/' + dateCRS.getDate() ? 'curr' : '';
                    if (dateCRS < dateF || dateCRS >= dateL) addStyle += ' nonM';
            
                    out += '<div class="dayH"><div onclick="wew_cal_dS1580404(this, \'' 
                        + dateCRS.getDate() + '/' + (dateCRS.getMonth() + 1) + '/' + dateCRS.getFullYear()
                        + '\')" class="day ' + addStyle + '">' + dateCRS.getDate() + '</div></div>';
                    dateCRS.setDate(dateCRS.getDate( ) + 1);
                }
                out += '<div class="clear">&#160;</div>';
            }
            t.innerHTML = out;
        }
    }
}

function wew_calendar_show1580404(obj) {
    obj = wew_calendar_find_holder1580404(obj);
    obj.innerHTML = document.getElementById('widgetCalendar1580404').innerHTML;
    slideMenu = wew_scan_childs1580404(obj, 'DIV', 'monthTab');
    wew_calendar_show_month1580404(slideMenu, 0);
    obj.style.display = 'block';
}

function wew_calendar_hide1580404(obj) {
    obj = wew_calendar_find_holder1580404(obj);
    obj.innerHTML = '';
    obj.style.display = 'none';
}

/*other funcs*/

function wew_scan_childs1580404(obj, tagName, tagClass) {
    for (var i = obj.childNodes.length - 1 ; i >= 0; i--) {
        var t = obj.childNodes[i];

        if (tagName != null && t.tagName == tagName &&
             tagClass != null && t.className == tagClass) {
            return t;
        }
        if (t.hasChildNodes() && (z = wew_scan_childs1580404(t, tagName, tagClass)) != null)  return z;
    }
    return null;
}

function wew_openbookobj1580404(e, tab_name, id, label) {
    if(!e) e = window.event;
    widg_obj = document.getElementById('wew_book_container1580404');
    
    oCanvas = document.getElementsByTagName("BODY")[0];
    if (!oCanvas.scrollTop) 
        oCanvas = document.getElementsByTagName("HTML")[0];
        
    x = e.clientX + oCanvas.scrollLeft;
    y = e.clientY + oCanvas.scrollTop;

    widg_obj.style.left = x + 'px';
    widg_obj.style.top = y + 'px';
    widg_obj.style.display = 'block';
    
    /* tab select */
    if (tab_name.length) {
        menu_obj = document.getElementById('wew_menu1580404');
        for (var i = menu_obj.childNodes.length - 1 ; i >= 0; i--) {
            var t = menu_obj.childNodes[i];
            if (t.tagName == 'DIV' && t.className.indexOf('menu-item') != -1) {
                if (t.innerHTML == tab_name) {
                    t.onclick();
                    break;
                }
            }
        }
    }
    
    /* hotel selector update */
    page_obj = document.getElementById('wew_pageContainer1580404');
    wew_selector_findupdate1580404(page_obj, 'hotel_tags', id, label);
}

function  wew_selector_findupdate1580404(obj, name_Selector, id, label) {
    for (var i = obj.childNodes.length - 1 ; i >= 0; i--) {
        var t = obj.childNodes[i];
        if (t.tagName == 'DIV' && t.hasChildNodes()) {
            if (wew_selector_findupdate1580404(t, name_Selector, id, label)) return true;
        }
        if (t.tagName == 'SELECT' && t.name == name_Selector) {
            
            var OptObj = new Option(label, 'id_' + id, true, true);
            t.options[0] = OptObj;
            return true;
        }
    }    
    return false;
}

function wew_options1580404(obj) {
    if (obj == null)
        var obj = document.getElementById('wew_pageContainer1580404');
    
    for (var i = obj.childNodes.length - 1 ; i >= 0; i--) {
        var t = obj.childNodes[i];
        if (t.hasChildNodes()) wew_options1580404(t);
        if (t.tagName == 'DIV' && t.className != null && t.className.indexOf('moreOption') != -1) 
            t.style.display = 'block';
    }
}

function wew_Tabs1580404(elm, ind) {
    var menuContainer = elm;
    while(menuContainer.className != 'menu' && menuContainer.className != 'left')
        menuContainer = menuContainer.parentNode;

    for (var i = menuContainer.childNodes.length - 1 ; i >= 0; i--) {
        var t = menuContainer.childNodes[i];
        if (t.className == 'menu-item active') t.className = 'menu-item';
    }
    document.getElementById('wew_pageContainer1580404').innerHTML = document.getElementById('wew_page_' + ind + '_' + 1580404).innerHTML;
    document.getElementById('wew_form1580404').active_tab.value = ind;
    elm.className = 'menu-item active';
}

function wew_openServices1580404() {
    GID('wew_lbContent1580404').style.display = 'none';
    GID('wew_lbLoading1580404').style.display = 'none';
    GID('wew_formpage1580404').style.display = 'block';
}

function wew_ajaxLoad1580404(command, value) {
    GID('wew_lbContent1580404').innerHTML = value;
    GID('wew_lbContent1580404').style.display = 'block';
    GID('wew_lbLoading1580404').style.display = 'none';
}

function wew_lightbox1580404() {
    GID('wew_lbContent1580404').innerHTML = formDataEncode(document.getElementById('wew_form1580404'));

    GID('wew_lbLoading1580404').style.display = 'block';
    GID('wew_formpage1580404').style.display = 'none';    
    
    var url = '/utils/widgetsupport.php?params=' + encodeURIComponent(formDataEncode(document.getElementById('wew_form1580404')));

    queryContentExecutor(url, 'GET', formDataEncode(document.getElementById('wew_form1580404')), 'wew_ajaxLoad1580404', 'todo');
}

function wew_openUrl1580404(opt, obj) {
    if (obj == null)
        var obj = document.getElementById('wew_lbOptions1580404');
    
    for (var i = obj.childNodes.length - 1 ; i >= 0; i--) {
        var t = obj.childNodes[i];
        if (t.hasChildNodes()) if (wew_openUrl1580404(opt, t)) return true;
        if (t.tagName == 'INPUT' && t.name == 'n' && t.checked) {
            if (opt == 'geturl') url = t.value;
            else url = t.attributes.getNamedItem('whythis').value;

            if (t.attributes.getNamedItem('post').value == '0') {
                window.open(url);
            } else {
                var simPostObj = document.createElement('form');
                simPostObj.action = url;
                simPostObj.method = 'post';
                simPostObj.target = '_blank';
                simPostObj.id = 'wew_simform_obj1580404';
                GID('wew_postSimlator1580404').innerHTML = '';
                GID('wew_postSimlator1580404').appendChild(simPostObj);
                onlineFormObj = GID('wew_simform_obj1580404');
                params = t.attributes.getNamedItem('params').value.split('&');
                for (k = 0; k < params.length; k ++) {
                    par = params[k].split('=');
                    inputObj = document.createElement('input');
                    inputObj.type  = 'hidden';
                    inputObj.name  = par[0];
                    inputObj.value = par[1];
                    onlineFormObj.appendChild(inputObj);
                }
                onlineFormObj.submit();
            }
            return true;
        }
    }
    
    return false;
}
