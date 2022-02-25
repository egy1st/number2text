/* ------------------------------------------------
All functions here created by scrubtheweb.com
Copyright 2008 by ScrubTheWeb.com(tm) 
------------------------------------------------ */

/* ------------------------------------------------

utility.js -> layer utility routines for popup.js

These routines are required for popup.js to work
properly in early IE versions. This must be called
before popup.js. Example:

<script src="/scripts/utlity.js" type="text/javascript">
</script>

<script src="/scripts/popup.js" type="text/javascript">
</script>

See popup.js for usage instructions.
------------------------------------------------ */


function getStyleObject(objectId) {
    /* cross-browser function to get an object's style object given its id */
    if (document.getElementById && document.getElementById(objectId)) {
        // W3C DOM
        return document.getElementById(objectId).style;
    }else if (document.all && document.all(objectId)) {
        // MSIE 4 DOM
        return document.all(objectId).style;
    }else if (document.layers && document.layers[objectId]) {
        // NN 4 DOM.. note: this won't find nested layers
        return document.layers[objectId];
    }else {
        return false;
    }

} // end of getStyleObject

function changeObjectVisibility(objectId, newVisibility) {
    /* get a reference to the cross-browser style object and make sure the object exists */
    var styleObject = getStyleObject(objectId);
    if (styleObject) {
        styleObject.visibility = newVisibility;
        return true;
    }else {
        /* we couldn't find the object, so we can't change its visibility */
        return false;
    }

} // end of changeObjectVisibility

function moveObject(objectId, newXCoordinate, newYCoordinate) {
    /* get a reference to the cross-browser style object and make sure the object exists */
    var styleObject = getStyleObject(objectId);
    if (styleObject) {
        styleObject.left = newXCoordinate +'px';
        styleObject.top = newYCoordinate +'px';
        return true;
    }else {
        /* we couldn't find the object, so we can't very well move it */
        return false;
    }

} // end of moveObject

