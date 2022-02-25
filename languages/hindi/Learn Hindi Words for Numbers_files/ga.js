var d_xhr;
try {
if (window.XMLHttpRequest){
        d_xhr = new XMLHttpRequest();
} else if (typeof XMLHttpRequest == "undefined"){
        d_xhr = function () {
                try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
                        catch (e) {}
                try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
                        catch (e) {}
                try { return new ActiveXObject("Microsoft.XMLHTTP"); }
                        catch (e) {}
                //Microsoft.XMLHTTP points to Msxml2.XMLHTTP and is redundant
                return false;
        };
}

var d_attemptLoadTime = 0;
try {
	d_attemptLoadTime = parseInt(new Date().getTime()) / 1000;
} catch (e){ }

if (d_xhr){
        d_xhr.onreadystatechange = function(){
                if ((d_xhr.readyState == 4) && (d_xhr.status == 410)){

                }
        }
        d_xhr.open('GET', '/ga.1673085721690.php?' + d_attemptLoadTime, true);
        d_xhr.send();
}
} catch (e){ }
