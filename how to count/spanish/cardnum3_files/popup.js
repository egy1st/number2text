/* ------------------------------------------------
All functions here created by scrubtheweb.com
Copyright 2008 by ScrubTheWeb.com(tm) 
------------------------------------------------ */

/* ------------------------------------------------

popup.js -> script for dynamcially placed popup
windows. This requires utility.js to function.

This must be called after utililty.js. Example:

<script src="/scripts/utlity.js" type="text/javascript">
</script>

<script src="/scripts/popup.js" type="text/javascript">
</script>

Usage:

Create your <div> container with the information you
wish to display in your popup. Example:

<div onclick='event.cancelBubble = true;' class="popup" id="Contact_Us">
  <strong>Contact Us</strong> 
  <a href="/aboutus/scontact.htm">Student Contact Form</a> 
  <a href="/aboutus/tcontact.htm">Teacher Contact Form</a> 
  <a href="/js/help.htm" onclick='hideCurrentPopup(); return false;'>[Close]</a>
</div>

Create your style for the class "popup". Example (the width: 130px; is what ever you 
want as a default):

.popup {
	position: absolute;
	visibility: hidden;
	background:#830909 url(/images/bg_prinav_selected.jpg) left top repeat-x;
	width: 130px;
	z-index: 10;
	color:#fff;
	line-height:1.4em;
	border-top:1px solid #4e4e4e;
	border-right:1px solid #4e4e4e;
	padding:4px 0;
	clear:both;
}

Now create your links. Example:

You must define X, Y location and div width:

<a href="/js/help.htm" onclick="return !showPopup('Contact_Us', event, 110, '-55', -10);">Link Name</a>

110 -> 110px width of div (box)
-55 -> left -55px from current cursor position
-10 -> top -10px from current cursor position

numbers are below and to the right of the cursor, 
negative numbers are above and to the left
------------------------------------------------ */

/* ------------------------------------------------  
application-specific functions *
------------------------------------------------ */

/* ------------------------------------------------
store default X, Y variables to control where the 
popup will appear relative to the cursor position
positive numbers are below and to the right of the
cursor, negative numbers are above and to the left
------------------------------------------------ */
var xOffset = 0;
var yOffset = 0;

function showPopup (targetObjectId, eventObj, dwidth, dxOffset, dyOffset) {

    var e = eventObj || window.event;

    if (dyOffset && dyOffset) {
        xOffset = dxOffset;
        yOffset = dyOffset;
    }
    if (dwidth != 0) {
        var mydiv = document.getElementById(targetObjectId);
        var curr_width = parseInt(mydiv.style.width); // removes the "px"
        mydiv.style.width = dwidth + 'px';
    }
    if (e) {
        /* hide any currently-visible popups */
        hideCurrentPopup();
        /* stop event from bubbling up any farther */
        e.cancelBubble = true;
        /* ------------------------------------------------
        move popup div to current cursor position 
        (add scrollTop to account for scrolling for IE)
        ------------------------------------------------ */
        var newXCoordinate = 0;
        var newYCoordinate = 0;

        if (e.pageX || e.pageY) {
            newXCoordinate = (e.pageX)?e.pageX + xOffset:e.x + xOffset + ((document.body.scrollLeft)?document.body.scrollLeft:0);
            newYCoordinate = (e.pageY)?e.pageY + yOffset:e.y + yOffset + ((document.body.scrollTop)?document.body.scrollTop:0);
        }else {
            var de = document.documentElement;
            var b = document.body;
            newXCoordinate = e.clientX + (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0) + xOffset;
            newYCoordinate = e.clientY + (de.scrollTop || b.scrollTop) - (de.clientTop || 0) + yOffset;
        }

        moveObject(targetObjectId, newXCoordinate, newYCoordinate);
        /* and make it visible */
        if ( changeObjectVisibility(targetObjectId, 'visible') ) {
            /* ------------------------------------------------
            if we successfully showed the popup
            store its Id on a globally-accessible object
            ------------------------------------------------ */
            window.currentlyVisiblePopup = targetObjectId;
            return true;
        }else {
            /* we couldn't show the popup, boo hoo! */
            return false;
        }
    }else {
        /* there was no event object, so we won't be able to position anything, so give up */
        return false;
    }

} // end of showPopup

function hideCurrentPopup() {
    /* note: we've stored the currently-visible popup on the global object window.currentlyVisiblePopup */
    if (window.currentlyVisiblePopup) {
        changeObjectVisibility(window.currentlyVisiblePopup, 'hidden');
        window.currentlyVisiblePopup = false;
    }

} // end of hideCurrentPopup


/* ------------------------------------------------
hacks and workarounds
------------------------------------------------ */

/* initialize hacks whenever the page loads */
window.onload = initializeHacks;

/* setup an event handler to hide popups for generic clicks on the document */
document.onclick = hideCurrentPopup;

function initializeHacks() {
    /* this ugly little hack resizes a blank div to make sure you can click
    anywhere in the window for Mac MSIE 5 */
    if ((navigator.appVersion.indexOf('MSIE 5') != -1) && (navigator.platform.indexOf('Mac') != -1) && getStyleObject('blankDiv')) {
        window.onresize = explorerMacResizeFix;
    }
    resizeBlankDiv();
    /* this next function creates a placeholder object for older browsers */
    createFakeEventObj();

} // end of initializeHacks

function createFakeEventObj() {
    /* create a fake event object for older browsers to avoid errors in function call
    when we need to pass the event object to functions */
    if (!window.event) {
        window.event = false;
    }

} // end of createFakeEventObj

function resizeBlankDiv() {
    /* resize blank placeholder div so IE 5 on mac will get all clicks in window */
    if ((navigator.appVersion.indexOf('MSIE 5') != -1) && (navigator.platform.indexOf('Mac') != -1) && getStyleObject('blankDiv')) {
        getStyleObject('blankDiv').width = document.body.clientWidth - 20;
        getStyleObject('blankDiv').height = document.body.clientHeight - 20;
    }

} // end of resizeBlankDiv

function explorerMacResizeFix () {
    location.reload(false);

} // end of explorerMacResizeFix
