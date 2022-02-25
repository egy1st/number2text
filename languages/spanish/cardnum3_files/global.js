// addLoadEvent enables multiple onLoad events

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

// mailPage function formats content for "Email Page"

function mailPage()
{
  mail_str = "mailto:?subject=" + document.title;
  mail_str += "&body=Hello! I thought you might be interested in this great resource for learning Spanish: " + location.href; 
  location.href = mail_str;
}

// Make sure the copyright year is current i.e. if the year is 2007 then
// the copyright date becomes 2006-2007

function setCopyright(element)
{
 var date = parseInt(element.innerHTML);
 var year = new Date().getFullYear();
 if(year > date)
         element.innerHTML = year;
 else
     element.innerHTML = date;
}

function hideShow(list) {
	if (document.getElementById(list).style.display == 'none') {
		document.getElementById(list).style.display = 'block';
	}
	else if (document.getElementById(list).style.display == 'block') {
		document.getElementById(list).style.display = 'none';
	}	
}

function collapseNesteds() {
	if (document.getElementById('secondarynav')) {
		var secondarynav = document.getElementById('secondarynav');
		// get all nested ordered lists in secondary nav
		var nestedOL = secondarynav.getElementsByTagName('ol');
		// run through 'em
		for (var i=0;i<nestedOL.length;i++) {
			nestedOL[i].style.display = 'none';
		}
		for (var i=0;i<nestedOL.length;i++) {
			if (nestedOL[i].className == 'open') {
				nestedOL[i].style.display = 'block';
			}
		}
		// get all nested unordered lists in secondary nav
		var nestedUL = secondarynav.getElementsByTagName('ul');
		// run through 'em
		for (var i=0;i<nestedUL.length;i++) {
			nestedUL[i].style.display = 'none';
		}
		for (var i=0;i<nestedUL.length;i++) {
			if (nestedUL[i].className == 'open') {
				nestedUL[i].style.display = 'block';
			}
		}
	}	
}

function collapseAll() {
	if (document.getElementById('secondarynav')) {
		var secondarynav = document.getElementById('secondarynav');
		// get all nested ordered lists in secondary nav
		var nestedOL = secondarynav.getElementsByTagName('ol');
		// run through 'em
		for (var i=0;i<nestedOL.length;i++) {
			nestedOL[i].style.display = 'none';
		}
		// get all nested unordered lists in secondary nav
		var nestedUL = secondarynav.getElementsByTagName('ul');
		// run through 'em
		for (var i=0;i<nestedUL.length;i++) {
			nestedUL[i].style.display = 'none';
		}
	}	
}

function showAll() {
	if (document.getElementById('secondarynav')) {
		var secondarynav = document.getElementById('secondarynav');
		// get all nested ordered lists in secondary nav
		var nestedOL = secondarynav.getElementsByTagName('ol');
		// run through 'em
		for (var i=0;i<nestedOL.length;i++) {
			nestedOL[i].style.display = 'block';
		}	
		// get all nested unordered lists in secondary nav
		var nestedUL = secondarynav.getElementsByTagName('ul');
		// run through 'em
		for (var i=0;i<nestedUL.length;i++) {
			nestedUL[i].style.display = 'block';
		}
	}
}

function addClass(element,value) {
	if(!element.className) {
		element.className = value;
	} else {
		newClassName = element.className;
		newClassName+= " ";
		newClassName+= value;
		element.className = newClassName;
	}
}

function stripeTables() {
	if(!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName("table");
	for (var i=0; i<tables.length; i++) {
		var odd = false;
		var rows = tables[i].getElementsByTagName("tr");
		for (var j=0; j<rows.length; j++) {
			if (odd == true) {
				addClass(rows[j],"odd");
				odd = false;
			} else {
				odd = true;
			}
		}
	}
}

function externalLinks() {
 if (!document.getElementsByTagName) return;
 var anchors = document.getElementsByTagName("a");
 for (var i=0; i<anchors.length; i++) {
  var anchor = anchors[i];
  if (anchor.getAttribute("href") &&
      anchor.getAttribute("rel") == "external")
    anchor.target = "_blank";
 }
}

addLoadEvent(function() {
	setCopyright(document.getElementById("copyright"));
	collapseNesteds();
	stripeTables();
	externalLinks();
});

function charit(name, value) {
   document.forms['accents'].elements[name].focus();
   document.forms['accents'].elements[name].value+=value;
}
