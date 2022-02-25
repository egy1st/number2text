var mode = "java";
var baseURL = "http://008.free-counters.co.uk/count-082.pl";
var GlobStr = '?count='+count;
GlobStr = GlobStr+'&type='+type;
GlobStr = GlobStr+'&digits='+digits;
GlobStr = GlobStr+'&prog='+prog;
GlobStr = GlobStr+'&statslink='+statslink;
GlobStr = GlobStr+'&sitelink='+sitelink;
GlobStr = GlobStr+'&cntvisible='+cntvisible;
GlobStr = GlobStr+'&mode='+mode;

document.write('<script language=JavaScript src='+baseURL+GlobStr+'></script>');

