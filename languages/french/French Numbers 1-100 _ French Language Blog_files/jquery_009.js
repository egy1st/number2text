$(document).ready(function(){

	$(document).pngFix();

	// Survey button
	/*if (window.parent == window.self) {
		var survey = document.createElement('a');
		$(survey)
			.attr({'className': 'survey-blogs', 'target': '_blank', 'href': "http://www.surveymonkey.com/s/tlonlinecv1-survey-blog"})
			.html('<img alt="" src="/images/survey-blogs.png" />')
			.appendTo('body')
			.click(function() {
				window.open($(this).attr('href'), '_blank');
				return false;
			});
	}*/

	// setup fancy dropdown
	$('#languages')
		.fadeIn(1000, function(){
			$(this).removeClass('hidden');
		})
		.find('select')
			.uniform()
			.end();

	$('#languages select').change(function(){
		if ($(this).val() != ''){
			var blogUrl = 'http://'+window.location.host+'/'+$(this).val();
			window.location = blogUrl;
		}
	});

	// clear text field onfocus
	$('input.txt').focus(function(){
		$(this).css('color', '#000');
		if (this.value == this.defaultValue){
			this.value = '';
		}
		if (this.value != this.defaultValue){
			this.select();
		}
	});
	$('input.txt').blur(function(){
		if ($.trim(this.value) == ''){
			$(this).css('color', '#333');
			this.value = (this.defaultValue ? this.defaultValue : '');
		}
	});

	// check if search term was entered
	$('#searchform').live('submit', function(){
		var field = $(this).find('input.txt'); 
		if (field.val() == 'What would you like to search for?'){
			return false;
		} else {
			return true;
		}
	});

	// top link behavior
	$('a#top')
		.hide()
		.click(scrollToTop)
		.hover(function(){
			$(this).animate({
				'bottom' : '13px'
			}, 300, 'easeOutQuad');
		}, function(){
			$(this).animate({
				'bottom' : '10px'
			}, 300, 'easeOutQuad');
		})
		.end();

	// show/hide top link based on scroll position
	var contentOffset = $('#content').offset();
	if ($(window).scrollTop() > contentOffset.top){
		$('a#top').show();
	}
	$(window).scroll(function(){
		if ($(this).scrollTop() > contentOffset.top){
			$('a#top').stop().fadeTo(500, 1);
		} else if ($(this).scrollTop() < contentOffset.top){
			$('a#top').stop().fadeTo(500, 0);
		}
	});

	// setup Twitter hovercard
	twttr.anywhere(function(T){
		T('#twitter').hovercards({
			infer: true,
			expanded: true
		});
	});

	// onready functions

	// setup archives collapse/expand functionality
	/*initArchives(function(){
		$('#archives').children('ul').fadeIn(SUB_FADE, function(){
			$(this).removeClass('hidden');
		});
	});*/

	// initialize Google Analytics
	initGA();

	// if 'slideshow' option is checked off, initialize slideshow
	/*if (blog_info['slideshow'] != '' && window.location.hostname != 'localhost'){
	initSlideshow();
	}*/
	if (blog_info['slideshow']){
		initSlideshow();
	}

});

var SLIDE_SPEED = 300,
    SUB_FADE = 1000;

// initialize slideshow
function initSlideshow(){
	getImage(1);
}

// recursively call getImage until there are no more images to load
function getImage(img){
  // retrieve language name/code, i.e. french or portuguese-brazilian
	var lang = blog_info['url_code'] ? blog_info['url_code'] : blog_info['language_name'];
	
	// setup image path
	var path = blog_info['template_dir'] + '/img/' + lang + '/' + img + '.jpg';
	
	// make ajax call to load slideshow image
	$.ajax({
		url: path,
		success: function(){
		  // if image is retrieve, append it to slideshow div
			$('<img src="' + path + '" />').appendTo('#slideshow');
			
			// increment image # and repeat
			if (img < 3){
				img++;
				getImage(img);
			} else {
				$('#slideshow').fadeIn(SUB_FADE).cycle();
			}
		},
		error: function(){
			$('#slideshow').remove();
			// no more slideshow images or there were none to begin with
			/*if ($('#slideshow img').length > 0){
				$('#slideshow').fadeIn(SUB_FADE).cycle();
			} else {
				$('#slideshow').remove();
			}*/
		}
	});
}

// manipulate archive list
function initArchives(cb){
  $('li#archives').find('ul').find('li.month').css('paddingLeft', '10px');
  var years = new Array();
  
  // add years to array
  $('li#archives').find('li.month').each(function(){
    var year = $(this).find('a').text();
    year = year.substr(year.indexOf(' ')+1, year.length);
    $(this).addClass(year);
    years.push(year);
  });
  
  // remove duplicate years
  years = $.unique(years);
  
  // add year header & detach/append month <li>'s
  for (x in years){
    var first = $('li#archives').find('li.'+years[x]+':first');
    $('<li class="year" id="'+years[x]+'"><h4>'+years[x]+'</h4><ul></ul></li>').insertBefore(first);
    $('li.'+years[x]).each(function(){
      var num = $(this).text();
      num = num.substr(num.indexOf('('), num.length);
      num = num.replace(/[\(\)]/g,'');
      $(this).removeAttr('class');
      var month = $(this).detach();
      $('li#'+years[x]).find('ul').append(month);
    });
  }
  
  // setup expand/collapse behavior
  $('li.year').not(':first').find('ul').hide();
  $('li.year:first').addClass('expanded');
  $('li.year').find('h4').click(function(){
    var year = $(this).parents('li.year');
    var months = year.find('ul');
    if (months.is(':visible')){
      year.removeClass('expanded');
      months.slideUp(SLIDE_SPEED);
    } else {
      year.addClass('expanded');
      months.slideDown(SLIDE_SPEED)
    }
  });
  
  cb();
}

// scroll back top
function scrollToTop(){
  $.scrollTo('#top-bar', {
    'duration' : 750,
    'easing' : 'easeInOutQuad'
  });
  return false;
}

// Google Analytics stuff
function initGA(){
  var language = blog_info['language_name'].charAt(0).toUpperCase() + blog_info['language_name'].slice(1);
  
  $('#bubble').click(function(){
    pushEvent('Click flag bubble', language);
  });
  
  $('#slideshow img').click(function(){
    var img = $(this).attr('src');
    pushEvent('Click slideshow image', language+' - '+img);
  });
  
  $('#branding').click(function(){
    pushEvent('Click TL logo', language);
  });
  
  $('h1 a').click(function(){
    pushEvent('Click blog title', language);
  });
  
  $('li.subscribe .btn').click(function(){
    var btn = $(this).text();
    if (btn == ''){
      btn = $(this).val();
    }
    pushEvent('Click '+btn+' button', language);
  });
  
  $('li.subscribe span.count a').click(function(){
    var service = $(this).parents('li').attr('id');
    pushEvent('Click '+service+' text link', language);
  });
  
  $('#searchform').submit(function(){
		var term = $(this).find('input.txt').val();
    pushEvent('Searched for a word/phrase', language+' - '+this.value);
  });
  
  $('#archives li.year h4').click(function(){
    var year = $(this).text();
    if ($(this).parents('li').hasClass('expanded')){
      pushEvent('Expanded archive year', language+' - '+year);
    } else {
      pushEvent('Collapsed archive year', language+' - '+year);
    }
  });
  
  $('#archives li.year a').click(function(){
    var month = $(this).text();
    pushEvent('Click archive month', language+' - '+month);
  });
  
  $('div.post-date span').click(function(){
    var obj = $(this).attr('class').split(' ');
    var label = '';
    if (obj[1]){
      label = ' - ' + obj[1];
    } else if (obj[0] == 'year'){
      label = ' - ' + $(this).text();
    }
    pushEvent('Click post '+obj[0], language+label);
  });
  
  $('#footer a.resource').click(function(){
    var obj = $(this).attr('class').split(' ');
    var action = 'Click ' + obj[1].charAt(0).toUpperCase() + obj[1].slice(1) + ' link';
    pushEvent(action, language);
  });
  
  $('#footer a.social').click(function(){
    var obj = $(this).attr('class').split(' ');
    var action = 'Click ' + obj[1].charAt(0).toUpperCase() + obj[1].slice(1) + ' icon';
    pushEvent(action, language);
  });
}
function pushEvent(action, label){
	//log(action+' | '+label);
	_gaq.push(['_trackEvent', 'Blogs', action, label]);
}
function pushView(page){
	//log(page);
	_gaq.push(['_trackPageview', page]);
}

// debugging
function log(msg){ if (window.console){ window.console.debug(msg) } }