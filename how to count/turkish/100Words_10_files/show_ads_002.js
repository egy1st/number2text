	var adnet_publisher_id = wr_publisher_id;
	var adnet_format = wr_format;
	if (typeof wr_width != 'undefined') adnet_width = wr_width;
	if (typeof wr_height != 'undefined') adnet_height = wr_height;
	if (typeof wr_channel_id != 'undefined') adnet_channel_id = wr_channel_id;
	adnet_format=adnet_format.replace('textimage-', '');
	adnet_format=adnet_format.replace('text-', '');
	
	var script_tag = 'script';
	document.write('<'+script_tag+' src="http://adnet-media.net/js/loader/standard.js" type="text/javascript"></'+script_tag+'>');
