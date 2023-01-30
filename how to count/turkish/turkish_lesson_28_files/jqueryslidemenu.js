/*********************
//* jQuery Multi Level CSS Menu #2- By Dynamic Drive: http://www.dynamicdrive.com/
//* Last update: Nov 7th, 08': Limit # of queued animations to minmize animation stuttering
//* Menu avaiable at DD CSS Library: http://www.dynamicdrive.com/style/
*********************/

//Specify full URL to down and right arrow images (23 is padding-right to add to top level LIs with drop downs):
var arrowimages={down:['downarrowclass', '/tc_skin_red_2col_rightmenu/img/down.gif', 23], right:['rightarrowclass', '/tc_skin_red_2col_rightmenu/img/right.gif']};

var jqueryslidemenu={

animateduration: {over: 400, out: 200}, //duration of slide in/ out animation, in milliseconds

buildmenu:function(menuid, arrowsvar){
	jQuery(document).ready(function($){
		var $mainmenu=$("#"+menuid+">ul");
		var $headers=$mainmenu.find("ul").parent();
		$headers.each(function(i){
			var $curobj=$(this);
			var $subul=$(this).find('ul:eq(0)');
			this._dimensions={w:this.offsetWidth, h:this.offsetHeight, subulw:$subul.outerWidth(), subulh:$subul.outerHeight()};
			this.istopheader=$curobj.parents("ul").length==1? true : false;
			$subul.css({top:this.istopheader? this._dimensions.h+"px" : 0});
			$curobj.children("a:eq(0)").css(this.istopheader? {paddingRight: arrowsvar.down[2]} : {}).append(
				'<img src="'+ (this.istopheader? arrowsvar.down[1] : arrowsvar.right[1])
				+'" class="' + (this.istopheader? arrowsvar.down[0] : arrowsvar.right[0])
				+ '" style="border:0;" />'
			);
			var timeoutId = 0;
			$curobj.hover(
				function(e){
					var activeLi = this;
					var activeLiJq = $(this);
					timeoutId = window.setTimeout(function(){
						var $targetul=activeLiJq.children("ul:eq(0)");
						activeLi._offsets={left:activeLiJq.offset().left, top:activeLiJq.offset().top};
						var menuleft=activeLi.istopheader? 0 : activeLi._dimensions.w;
						menuleft=(activeLi._offsets.left+menuleft+activeLi._dimensions.subulw>$(window).width())? (activeLi.istopheader? -activeLi._dimensions.subulw+activeLi._dimensions.w : -activeLi._dimensions.w) : menuleft;
						if ($targetul.queue().length<=1) //if 1 or less queued animations
							$targetul.css({left:menuleft+"px", width:activeLi._dimensions.subulw+'px'}).slideDown(jqueryslidemenu.animateduration.over);
					}, 300);
				},
				function(e){
					window.clearTimeout(timeoutId);
					var $targetul=$(this).children("ul:eq(0)");
					$targetul.slideUp(jqueryslidemenu.animateduration.out);
				}
			); //end hover
		}); //end $headers.each()
		$mainmenu.find("ul").css({display:'none', visibility:'visible'});
	}); //end document.ready
}
};

//build menu with ID="myslidemenu" on page:
jqueryslidemenu.buildmenu("myslidemenu", arrowimages);