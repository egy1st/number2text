//Author: SHRA
//Data: 07.07.2008
//Desc: Do some dirty ajax work

function AjaxQuery(commandQuery, param, responseFunc) {
    var url = '/utils/ajaxsupport.php?command=' + escape(commandQuery) + '&param=' + encodeURIComponent(param);
    for (var k = 3; k< arguments.length; k++) {
        I = k - 1;
        url +='&param' + I + '=' + encodeURIComponent(arguments[k]);
    }

    queryContentExecutor(url, 'GET', '', responseFunc, commandQuery);
}

function AjaxQueryPOST(commandQuery, param, responseFunc) {
    var url = '/utils/ajaxsupport.php?command=' + escape(commandQuery) + '&param=' + encodeURIComponent(param);
    var params = '';
    for (var k = 3; k< arguments.length; k++) {
        I = k - 1;
        params +='&param' + I + '=' + encodeURIComponent(arguments[k]);
    }

    queryContentExecutor(url, 'POST', params, responseFunc, commandQuery);
}

function queryContentExecutor(url, httpMethod, params, responseFunc, commandQuery) {
    var http_request = false;
    // Mozilla, Safari, ...
    if (window.XMLHttpRequest) { 
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) { http_request.overrideMimeType("text/xml"); }
    // IE
    } else if (window.ActiveXObject) { 
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) {
        alert("Can't create object of class XMLHTTP");
        return false;
    }

    switch(responseFunc.substr(0, 1)) {
    case ';':
        http_request.onreadystatechange = function() { alertContentsLoad(http_request, responseFunc.substr(1)); };
        break;
    case '!':
        http_request.onreadystatechange = function() { alertContentsMessage(http_request); };
        break;
    default:
        http_request.onreadystatechange = function() { alertContents(http_request, responseFunc, commandQuery); };
    }

    if (httpMethod == 'GET') {
        http_request.open("GET", url, true);
        http_request.send(null);
    } else if (httpMethod == 'POST') {
        http_request.open("POST", url, true);
        http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        http_request.send(params);
    }
}

function alertContentsMessage(http_request) {
    //data ready
    if (http_request.readyState == 4) { 
        //data OK result
        if (http_request.status == 200) { 
            if (http_request.responseText != '') alert(http_request.responseText);
        } else { alert("We got the problem in request time."); }
    }
}


//encode form component
function formDataEncode(tFormObject) {
    var elm = tFormObject.elements;
    var str = '', currentElm = null;
    for (var k = 0; k < elm.length; k++)
        if (elm[k].name != '') {
            currentElm = elm[k];
            if (currentElm.type == 'checkbox' && !currentElm.checked) continue;
            str += currentElm.name + '=' + encodeURIComponent(currentElm.value) + '&';
        }
    return str;
}

function alertContentsLoad(http_request, responseObj) {
    //data ready
    if (http_request.readyState == 4) { 
        //data OK result
        if (GID(responseObj) != null) {//alert('Destination object is null');
            if (http_request.status == 200) { 
                GID(responseObj).innerHTML = http_request.responseText;
            } else { 
                GID(responseObj).innerHTML = 'error code' + http_request.status;
    //            alert("We got the problem in request time."); 
            }
        }
    }
}

function alertContents(http_request, responseFunc, commandQuery) {
    //data ready
    if (http_request.readyState == 4) { 
        //data OK result
        if (http_request.status == 200) { 
            eval(responseFunc + "(commandQuery, http_request.responseText);");
        } else { alert("We got the problem in request time with http status code = " + http_request.status); }
    }
}

function GID(name) {
    return document.getElementById(name);
}

//object - class Weblink

function WEBlinkProto(srcIDset, errmess) {
    this.srcId = srcIDset;
    this.errmess = errmess;

    this.add = function() {
        var srcEl = 1;
        var obj = null;
        while((obj = GID(this.srcId + '_' + srcEl)) != null) {
            if (obj.innerHTML == '') {
                obj.style.display = 'block';
                if (arguments.length == 3) 
                    AjaxQuery('weblink.add', srcEl, ';' + this.srcId + '_' + srcEl, arguments[0], arguments[1], arguments[2]);
                else
                    AjaxQuery('weblink.add', srcEl, ';' + this.srcId + '_' + srcEl);
                break;
            } else if (obj.style.display == 'none') {
                obj.style.display = 'block';            
                break;
            }
            srcEl ++;
        }

        if (obj == null) alert(this.errmess);
//        return false;
    };
    
    this.remove = function(num) {
        var obj = GID(this.srcId + '_' + num);
        if (obj != null) {
            obj.innerHTML = '';
        }
    };
}

//object - class Embed

function embedclass(frmName, maxFields, limitExeedMess) {
    this.maxFields = maxFields;
    this.srcId = 'upload';
    this.srcEl = 1;
    this.connectedForm = frmName;
    this.limitExeedMess = limitExeedMess;

    this.add = function() {
        var preposed;
        for (k =0; k<document.forms.length; k ++) 
            if (document.forms[k].name == this.connectedForm) break;
        if (k == document.forms.length) {
            alert('Requested form is not found : ' + this.connectedForm);
            return false;
        }
        if (this.srcEl < this.maxFields) {
            preposed = this.srcEl + 1;
            var src = GID(this.srcId + '_1');
            var dst = GID(this.srcId + '_' + preposed);            
            if (dst.innerHTML == '') {
//                AjaxQuery('embed.add', preposed, 'Embed.setpage', document.forms.add_item.elements.name.value);
                var content = new String(src.innerHTML);
                content = content.replace('<span name="embedNumber">1</span>', '<span name="embedNumber">' + preposed + '</span>');
                content = content.replace('uploadphoto_1', 'uploadphoto_' + preposed);
                content = content.replace('uploadurl_1', 'uploadurl_' + preposed);
                content = content.replace('uploadcomment_1', 'uploadcomment_' + preposed);
                content = content.replace('courtesyEmbed_1', 'courtesyEmbed_' + preposed);
                content = content.replace('courtesyEmbed_1', 'courtesyEmbed_' + preposed);
                dst.innerHTML = content.replace('Embed.select(this.value, 1)', 'Embed.select(this.value, ' + preposed + ')');
            }
            document.forms[k].elements["type[]"][this.srcEl].value = '';
            this.select('', preposed);
            dst.style.display = 'block';
            this.srcEl ++;
        } else {
            alert(this.limitExeedMess);
        }
    };
    
    this.remove = function() {
        if (this.srcEl > 0) {
            for (k =0; k<document.forms.length; k ++) 
                if (document.forms[k].name == this.connectedForm) break;
            if (k == document.forms.length) {
                alert('Requested form is not found : ' + this.connectedForm);
                return false;
            }
        
            GID(this.srcId + '_' + this.srcEl).style.display = 'none';
            this.select('', this.srcEl);
            this.srcEl --;
            document.forms[k].elements["type[]"][this.srcEl].value = '';
        }
        else {
            document.forms[k].elements["type[]"][0].value = '';
            this.select('', 0);            
        }
    };
    
    this.setpage = function(command, value) {
        if (this.srcEl >= this.maxFields) return 0;
        this.srcEl ++;    
        GID(this.srcId + '_' + this.srcEl).innerHTML = value;
    };
    
    this.select = function(typeValue, index) {
        var ph  = 'uploadphoto_' + index,
            url = 'uploadurl_' + index,
            cmm = 'uploadcomment_' + index;
        switch(typeValue) {
        case '':
            GID(ph).style.display = 'none';
            GID(url).style.display = 'none';
            GID(cmm).style.display = 'none';
            break;
        case 'image':
            GID(ph).style.display = 'block';
            GID(url).style.display = 'none';
            GID(cmm).style.display = 'block';
            break;
        case 'saved_image':
        case 'flash':
            GID(ph).style.display = 'none';
            GID(url).style.display = 'block';
            GID(cmm).style.display = 'block';
        }
    };
}

/* object-class singlepage loader */
function PagerSL(command, divGID, itemID, paramValue, loadFrase, objInstanceName) {
//  constructor: 
  this.itemID = itemID;
  this.paramValue= paramValue;  
  this.ajaxCommand = command;
  this.pagerGID = divGID;
  this.CurrentPage = 0;
  this.loadFrase = loadFrase;
  this.classInstanceName = objInstanceName;
  this.changed = 0;
  this.addtionalJS = '';

  this.load = function(pageid) {
    if (pageid == 'next') pageid = 1 + this.CurrentPage;
    if (pageid == 'prev') pageid = 0 + this.CurrentPage - 1;
    this.CurrentPage = pageid;
    GID(this.pagerGID).innerHTML = '<div class="emptyItemList"><img src="/view/imgs/progress.gif"> ' + this.loadFrase + '</div>';
    AjaxQuery(this.ajaxCommand, this.itemID, this.addtionalJS + this.classInstanceName + '.setPage', pageid, this.paramValue, this.classInstanceName);
    this.changed = 0;
  };

  this.setPage = function(command, value) {
    this.changed = 0;
    GID(this.pagerGID).innerHTML = value;
  };
  
  this.update = function() {
    if (this.changed == 1) this.load(this.CurrentPage);
  }
}

/* storaging sigle page loader */
function PagerStore(command, divGID, itemID, paramValue, loadFrase, objInstanceName, formGID) {
//  constructor: 
  this.itemID = itemID; //item code
  this.paramValue= paramValue; //?
  this.ajaxCommand = command;
  this.pagerGID = divGID; //HTML container of a page
  this.CurrentPage = 0;
  this.loadFrase = loadFrase; //what to show during loading process
  this.classInstanceName = objInstanceName;//instance name for inner request
  this.changed = 0;
  this.addtionalJS = '';
  this.formGID = formGID;
  this.storedvalues = [];

  this.load = function(pageid) {
    if (pageid == 'next') pageid = 1 + this.CurrentPage;
    if (pageid == 'prev') pageid = 0 + this.CurrentPage - 1;
    this.CurrentPage = pageid;
    
    this.updateStorage();
    
    GID(this.pagerGID).innerHTML = '<div class="emptyItemList"><img src="/view/imgs/progress.gif"> ' + this.loadFrase + '</div>';
    AjaxQuery(this.ajaxCommand, this.itemID, this.addtionalJS + this.classInstanceName + '.setPage', pageid, this.paramValue, this.classInstanceName);
    this.changed = 0;
  };
  
  this.updateStorage = function() {
    var dataCollection = this.collectFormMarks(GID(this.pagerGID));
    while (AVA = dataCollection.pop()) {
        found = 0;
        for (i = this.storedvalues.length - 1; i >= 0; i--) {
            if (this.storedvalues[i][1] == AVA[1]) {
                this.storedvalues[i] = AVA;
                found = 1;
            }
        }
        if (!found) this.storedvalues.push(AVA);
    }  
  }

  this.collectFormMarks = function(obj) {
    var elms = [];
    for (var i = obj.childNodes.length - 1 ; i >= 0; i--) {
        var t = obj.childNodes[i];
        if (t.tagName == 'INPUT' && t.name == 'similarto[]') {
            elms.push([t.checked, t.value, GID(this.formGID).elements['stcomment_' + t.value].value, t.id]);
        } else {
            if (t.childNodes.length) {
                var elms_add = this.collectFormMarks(t);
                if (elms_add.length) 
                    for(j = elms_add.length - 1; j >= 0; j--) elms.push(elms_add[j]);
                
            }
        }
    }
    return elms;
  }
  
  this.prepareForSubmit = function() {
    this.updateStorage();
    params = "";
    while (AVA = this.storedvalues.pop()) {
        if (AVA[0]) {
            params +='&similarto[]=' + AVA[1] + '&stcomment_' + AVA[1] + '=' + encodeURIComponent(AVA[2]);
        }
    }
    GID(this.formGID).elements[this.classInstanceName].value = params;
  }
  
  this.setPage = function(command, value) {
    this.changed = 0;
    GID(this.pagerGID).innerHTML = value;
    
    var dataCollection = this.collectFormMarks(GID(this.pagerGID));
    while (AVA = dataCollection.pop()) {
        for (i = this.storedvalues.length - 1; i >= 0; i--) {
            if (this.storedvalues[i][1] == AVA[1]) {
                GID(AVA[3]).checked = this.storedvalues[i][0];
                GID(this.formGID).elements['stcomment_' + AVA[1]].value = this.storedvalues[i][2];
            }
        }
    }
  };
  
  this.update = function() {
    if (this.changed == 1) this.load(this.CurrentPage);
  }
}


/* object-class pager */

function Pager(pageID, command, menuID, loadID) {
//  constructor: 
  this.pageID = pageID;
  this.ajaxCommand = command;
  this.pagerMenuID = menuID;
  this.pagerLoadID = loadID;
  this.CurrentPage = 1;

  this.newPage = function(content) {
      var LP = this.CurrentPage + 1;
      var obj = GID(this.pageID + LP);
      GID(this.pagerMenuID).style.display = 'block';
      GID(this.pagerLoadID).style.display = 'none';
      blockPager = 0;
      if (content.length > 0) {
        obj.innerHTML = content;
        this.swapPages(this.CurrentPage, LP);
      } else {
        obj.innerHTML = '<div class="emptyItemList">The list is empty. No items found.</div>';
        this.swapPages(this.CurrentPage, 1);
        if (LP > 1) obj.style.display = 'none';
      }
  };

  this.nextPage = function(val) { 
    if (!blockPager) {
        var ToPage = this.CurrentPage + 1;
        var obj = GID(this.pageID + ToPage);
        if (obj == null) {
            this.swapPages(this.CurrentPage, 1);
        } else if (obj.innerHTML != "" && obj.innerHTML.indexOf('class="emptyItemList"') == -1 && obj.innerHTML.indexOf('class=emptyItemList') == -1) {
            this.swapPages(this.CurrentPage, ToPage);
        } else {
            this.loadNewPage(val, ToPage);
        } 
    }
  },

  this.loadNewPage = function(val, ToPage) { 
    blockPager = 1;
    GID(this.pagerMenuID).style.display = 'none';
    GID(this.pagerLoadID).style.display = 'block';
    AjaxQuery(this.ajaxCommand, val, 'setFrame', ToPage);
  },
  
  this.prevPage = function() {
    if (!blockPager && this.CurrentPage > 1) {
        this.swapPages(this.CurrentPage, this.CurrentPage - 1);
    }
  },

  this.swapPages = function(FromPage, ToPage) {
    if (GID(this.pageID + FromPage) != null)
        GID(this.pageID + FromPage).style.display = 'none';
    var obj = GID(this.pageID + ToPage);
    if (obj.innerHTML.indexOf('class="emptyItemList"') != -1 && obj.innerHTML.indexOf('class=emptyItemList') == -1) {
        obj.innerHTML = '<div class="emptyItemList">The list is empty. No items found.</div>';
    }
    obj.style.display = 'block';
    this.CurrentPage = ToPage;
  }

}

/* object-class kw_input */
function KW_input(name, ajFunc) {
//  constructor: 
  this.ajFunc = ajFunc;
  this.name = name;
  this.elmPoint = null;
  this.blurProtect = 0;
  
  this.deleteItem = function(ev) {
    var elmNode= ev.target || ev.srcElement;
    elmNode = this.diveNode(elmNode, 'token');
    parNode = elmNode.parentNode;
    parNode.removeChild(elmNode);
  }
  
  this.addItem = function(tar) {
    if (!tar.value.length) return true;
    var elmNode = this.diveNode(tar, 'newToken');
    var elem = document.createElement("DIV");
    elem.className = 'token';
    elem.innerHTML = '<span>' 
        + tar.value 
        + '</span> <a href="javascript: '
        + this.name 
        + 'OBJ.empty();" onclick="'
        + this.name
        + 'OBJ.deleteItem(event);">x</a><input type="hidden" name="'
        + this.name
        + '[]" value="'
        + tar.value
        + '"/>';
    par = elmNode.parentNode;
    par.insertBefore(elem, elmNode);
  }
  
  this.empty = function () {
    ;
  }
  
  this.keyboard = function(ev) {
//    ev.srcElement.style.color=Math.floor(Math.random()*16777216);
//    return true; 
    var elm = ev.target || ev.srcElement;
    var VL = elm.value;
    var KEYCODE = ev.keyCode;
    if (VL.length > 1 && VL.substring(VL.length - 1, VL.length) == ',') {
        elm.value = VL.substring(0, VL.length - 1);
        KEYCODE = 13;
    }
    
    switch (KEYCODE) {
    case 13: 
        var elmNode = this.diveNode(elm, 'kw_input');
        for (var i = elmNode.childNodes.length - 1 ; i >= 0; i--) {
            if (elmNode.childNodes[i].className == 'listBox') {
                stBox = elmNode.childNodes[i];
                break;
            }
        }

        var tg = null;
        for (var i = stBox.childNodes.length - 1; i >= 0 ; i--) {
            tg = stBox.childNodes[i];
            if (tg.className == 'select') {
                elm.value = tg.innerHTML;
/*                this.selectorHide(elm);                
                return false;*/
            }
        }        
    case 9:
        this.addItem(elm);
        this.selectorHide(elm);
        elm.value = "";
        return false;
    case 40: //down
        this.selectorDown(elm);
        break;
    case 38: //up
        this.selectorUp(elm);
        break;
    
    case 46: //delete
    case 37: //left
    case 39: //right
        break;
    case 8://backspace        
    default:
        var value = elm.value;
        if (value.length > 1) {
/*            t = elm.parentNode;
            while (t.tagName != "FORM") t = t.parentNode;
            setTimeout(this.name + 'OBJ.selectorFresh(' + value.length + ',"' + t.name  + '", "' + elm.name + '")', 500);*/
            this.selectorFresh(elm, value);
        }
    }
  }
  
  this.blurAction = function (elm) {
    if (this.blurProtect == 0) {
        this.addItem(elm);
        this.selectorHide(elm);
        elm.value = "";
    }
  }
  
  this.selectorHide = function(elmPoint) {
    var elmNode = this.diveNode(elmPoint, 'kw_input');
    
    for (var i = elmNode.childNodes.length - 1 ; i >= 0; i--) {
            if (elmNode.childNodes[i].className == 'listBox') {
            elmNode.childNodes[i].innerHTML = '';
            break;
            }
        }
  }
  
  this.selectorFresh = function(elmPoint, partStr) {
    this.elmPoint = elmPoint;
    AjaxQuery('kw_input_support', this.ajFunc, 
        this.name + 'OBJ.selectorShow', partStr, this.name + 'OBJ');
        
    var elmNode = this.diveNode(this.elmPoint, 'kw_input');
    for (var i = elmNode.childNodes.length - 1 ; i >= 0; i--) {
            if (elmNode.childNodes[i].className == 'listBox') {
            stBox = elmNode.childNodes[i];
            break;
            }
        } 
    if (stBox.innerHTML == '') stBox.innerHTML = 'Loading data...';
  }
  
  this.selectorShow = function(func, value) {
    var elmNode = this.diveNode(this.elmPoint, 'kw_input');
    for (var i = elmNode.childNodes.length - 1 ; i >= 0; i--) {
            if (elmNode.childNodes[i].className == 'listBox') {
            stBox = elmNode.childNodes[i];
            break;
            }
        } 

    stBox.innerHTML = value;
  }
  
  this.selectorDown = function(elmPoint) {
    var elmNode = this.diveNode(this.elmPoint, 'kw_input');
    for (var i = elmNode.childNodes.length - 1 ; i >= 0; i--) {
            if (elmNode.childNodes[i].className == 'listBox') {
            stBox = elmNode.childNodes[i];
            break;
            }
        }    

    var Found = 0;
    var tagsCount = 0;
    var tg = null;
    
    for (var i = 0; i < stBox.childNodes.length; i++) {
        tg = stBox.childNodes[i];
            if (tg.className == 'select') {
            Found = 1;
            if (i < stBox.childNodes.length - 1) {
                stBox.childNodes[i+2].className = 'select';
                stBox.childNodes[i].className = '';
            }
            break;
            }
        if (tg.tagName == 'A') tagsCount ++
        }

    stBox.scrollTop = Found * 25 * tagsCount;
    
    if (!Found && stBox.childNodes.length > 0) 
        stBox.childNodes[0].className = 'select';

  }
  
  this.selectorUp = function(elmPoint) {
    var elmNode = this.diveNode(this.elmPoint, 'kw_input');
    for (var i = elmNode.childNodes.length - 1 ; i >= 0; i--) {
            if (elmNode.childNodes[i].className == 'listBox') {
            stBox = elmNode.childNodes[i];
            break;
            }
        }    

    var Found = 0;
    var tagsCount = 0;
    var tg = null;
    
    for (var i = stBox.childNodes.length - 1; i >= 0 ; i--) {
        tg = stBox.childNodes[i];
            if (tg.className == 'select') {
            Found = 1;
            if (i > 1) {
                stBox.childNodes[i-2].className = 'select';
                stBox.childNodes[i].className = '';
            }
            break;
            }
        if (tg.tagName == 'A') tagsCount ++
        }

    stBox.scrollTop = (stBox.childNodes.length / 2 - Found *  tagsCount - 4) * 25;
  }

  this.selectorClick = function(obj) {
    //search input
    var elmNode = this.diveNode(this.elmPoint, 'kw_input');
    for (var i = elmNode.childNodes.length - 1 ; i >= 0; i--) {
            if (elmNode.childNodes[i].className == 'newToken') {
            stBox = elmNode.childNodes[i];
            for (var i = stBox.childNodes.length - 1 ; i >= 0; i--) {
                if (stBox.childNodes[i].tagName == 'INPUT') {
                    stBoxInput = stBox.childNodes[i];
                    stBoxInput.value = obj.innerHTML;
                    this.addItem(stBoxInput);
                    this.selectorHide(stBox);
                    stBoxInput.value = '';
                    
                }
            }      
            break;
            }
        }      
  }
  
  this.diveNode = function(startNode, className) {
    var t = startNode;
    while (t.className != className) t = t.parentNode;
    return t;
  }
}

/* object-class lister*/
function Lister(pageID) {
//  constructor: 
  this.pageID = pageID;
  this.CurrentPage = 1;

  this.prevPage = function() {
    if (this.CurrentPage > 1)
        this.swappages(this.CurrentPage, this.CurrentPage - 1);
  }

  this.nextPage = function() {
    var ToPage = this.CurrentPage + 1;
    var obj = GID(this.pageID + ToPage);
    if (obj != null) {
        this.swappages(this.CurrentPage, this.CurrentPage + 1);
    } else {
        this.swappages(this.CurrentPage, 1);
    }
  }

  this.swappages = function(oldpage, newpage) {
    GID(this.pageID + oldpage).style.display = 'none';
    GID(this.pageID + newpage).style.display = 'block';
    this.CurrentPage = newpage;
  }

}

function Toggle(name) {
    var a = GID(name);
    a.style.display = (a.style.display == 'none' ? 'block' : 'none');
}
