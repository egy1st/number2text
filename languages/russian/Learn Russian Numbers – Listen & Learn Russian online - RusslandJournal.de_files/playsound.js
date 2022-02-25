// http://msdn.microsoft.com/coding4fun/web/misc/article.aspx?articleid=1525816&title=Creating+Loud+Websites

if (window.attachEvent)
    window.attachEvent("onload", setupPlaySound);
else
    window.addEventListener("load", setupPlaySound, false); 


function setupPlaySound()
{
    if (navigator.appName == "Microsoft Internet Explorer")
    {
        var snd = document.createElement("bgsound");
        document.getElementsByTagName("body")[0].appendChild(snd);
        
        playSound = function(url)
        {
        
            snd.src = url;
        }
    }
    else
    {
        playSound = function(url)
        {
            var obj = document.createElement("object");
            obj.width="0px";
            obj.height="0px";
            obj.type = "audio/x-wav";
            obj.data = url;
            
            var body = document.getElementsByTagName("body")[0];
            body.appendChild(obj);
        }
    }
}