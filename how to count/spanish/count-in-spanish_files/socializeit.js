var socializeit = function(options) {
  if (!options || !options.domain) {
    throw new Error('Error: must pass socializeit a domain (e.g. socializeit({domain:"www.example.com"})).')
  }

  if (!options.pack) options.pack = 1; //set a default value for whoever is using old version
  
  var d = document,
      l = d.location,
      e = encodeURIComponent,
      u = e(l.href),
      t = e(d.title),
      domain = options.domain,
      urlroot = 'http://www.'+domain+'/objects/';

  
  var sitesConfig = {
        'google':      {name: 'Google', 
			            img: {1: urlroot+'google.gif'},
			            url: 'http://www.google.com/bookmarks/mark?op=edit&bkmk='+ u +'&title=' +t},
		'buzz':        {name: 'Buzz',
				        img: {1: urlroot+'yahoobuzz1.gif'},
				       url: 'http://buzz.yahoo.com/submit?submitUrl='+ u +'&t=' + t},
		'facebook':    {name: 'Facebook',
		                img: {1: urlroot+'Facebook.jpg',
		    	              2: urlroot+'share-on-facebook.gif'},
		                url: 'http://www.facebook.com/sharer.php?u='+ u +'&t=' + t},
		'myspace':     {name: 'Myspace',
		                img: {1: urlroot+'myspace.gif'},
		                url: 'http://www.myspace.com/Modules/PostTo/Pages/?u='+ u +'&t=' + t},
	    'stumbleupon': {name: 'StumbleUpon', 
	                    img: {1: urlroot+'StumbleUpon.jpg'},
	                    url: 'http://www.stumbleupon.com/submit?url=' + u + '&title=' + t},
	    'technorati':  {name: 'Technorati',
	                    img: {1: urlroot+'Technorati.jpg'},
	                    url: 'http://technorati.com/faves/?add=' + u},
	    'delicious':   {name: 'del.icio.us',
	                    img: {1: urlroot+'del.jpg'},
	                    url: 'http://del.icio.us/post?v=4&noui&jump=close&url=' + u + '&title=' + t},
	    'twitter':     {name: 'Twitter',
					    img: {1: urlroot+'twitter.gif',
					          2: urlroot+'tweet-this.gif'},
					    url: 'http://twitter.com/home?status=Reading%20about%20this:%20'+t+'%20-%20' + u}
	     };
  
    var sites = [];
    if (options.pack == 1) {
        sites = [sitesConfig.google, sitesConfig.buzz, sitesConfig.facebook, sitesConfig.myspace, 
	             sitesConfig.stumbleupon, sitesConfig.technorati, sitesConfig.delicious, sitesConfig.twitter];
    }
    else
    {
        sites = [sitesConfig.facebook,sitesConfig.twitter];  
	  
    }
    
    arguments.callee.getURL = function(which) {
    
	  for (var i=0, ilen=sites.length; i<ilen; i++) {
      var site = sites[i];
      if (site.name == which) {
        return site.url;
      }
    }
  };
  

  var html = '';
  var midpoint = Math.floor((sites.length-1)/2);
  var pack = options.pack;
  var colspan = (pack == 1) ? (midpoint+3) : 5;
  var rowspan = (pack == 1) ? 'rowspan="2"' : '';
  

	  html = '<table  align="center" style="border: 1px solid #ccc;border-collapse:separate; padding:2px;width:480px;"><tbody><tr><td '+rowspan+' style="white-space:nowrap;"><strong>Share this page:&nbsp;</strong>';
	  if (options.whatIsThisUrl) {
	    html += '<br><div id="whatsthis" style="font-size:11px;"><a href="#" onclick="window.open\(\''+options.whatIsThisUrl+'\',\'sharer\',\'toolbar=0,status=0,width=700,height=500,resizable=yes,scrollbars=yes\'\); return false;">What\'s This?</a></div';
	  }
	  html += '</td>';
	  // visually want two rows of links
	  
	  var iCols= ((2 + midpoint) <ilen) ? 2 + midpoint : ilen;
	  for (var i=0, ilen=sites.length; i<ilen; i++) {
	    var site = sites[i].name;
	    var imgURL = sites[i].img[pack];
	    var url = sites[i].url;
	    html += '<td><a href="#share_on_'+site+'" onclick="window.open(socializeit.getURL(\''+site+'\'), \'sharer\', \'toolbar=0,status=0,width=700,height=500,resizable=yes,scrollbars=yes\');return false;"><img src="'+imgURL+'" alt="'+site+'" style="border:0"></a></td>';
	    if ((i == midpoint) && (i+1)<ilen && pack == 1) {
	      html += '</tr><tr>';
	    }
	  }
	  html += '</tr>';
	    
  // pay it forward
  if (options.payItText) {
     var id = 'socializeit' + (new Date()).getTime() + Math.floor(Math.random() * 1e7)
     html += '<tr><td colspan="'+colspan+'" style="background:'+options.szColor+';padding:1em;"><p style="text-align:center;margin-top:0;margin-bottom:0;"><a href="#pay_it_forward" onclick="document.getElementById(\''+id+'\').style.display=(document.getElementById(\''+id+'\').style.display == \'block\') ? \'none\' : \'block\';return false;">' +
             options.payItText + '</a></p><div style="display:none;" id="'+id+'"><p>Would you prefer to share this page with others by linking to it?</p>'+
             '<ol><li>Click on the HTML link code below.</li><li>Copy and paste it, adding a note of your own, into your blog, a Web page, forums, a blog comment, your Facebook account, or anywhere that someone would find this page valuable.</li></ol><form action="#"><div style="text-align:center"><textarea cols="50" rows="2" onclick="this.select();">&lt;a href="'+l+'"&gt;'+d.title+'&lt;/a&gt;</textarea></div></form></div></td></tr>';
  }
  html += '</tbody></table>';
  
  document.writeln(html);
};

