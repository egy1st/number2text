function addChar(chr) {
	document.dictionaryModuleForm.word.value += chr;
	document.dictionaryModuleForm.word.focus();
}

var highlightedText = '';
var timeid;

function getHighlighted(e) {
	highlightedText = (document.all) ? document.selection.createRange().text : document.getSelection();
	highlightedText += '';
	if(highlightedText.length > 0) {
		var i = 0;
		var temp = '';
		for(i=0; i<highlightedText.length; i++) {
			if (highlightedText.charCodeAt(i) == 304) {
				// we have an i
				highlightedText = highlightedText.substring(0, i) + '%DD' + highlightedText.substring(i+1, highlightedText.length);
			}
			else if (highlightedText.charCodeAt(i) == 350) {
				// we have a S
				highlightedText = highlightedText.substring(0, i) + '%DE' + highlightedText.substring(i+1, highlightedText.length);
			}
			else if (highlightedText.charCodeAt(i) == 286) {
				// we have a G
				highlightedText = highlightedText.substring(0, i) + '%D0' + highlightedText.substring(i+1, highlightedText.length);
			}
			else if (highlightedText.charCodeAt(i) == 287) {
				// we have a G
				highlightedText = highlightedText.substring(0, i) + '%F0' + highlightedText.substring(i+1, highlightedText.length);
			}
			else if (highlightedText.charCodeAt(i) == 351) {
				// we have a S
				highlightedText = highlightedText.substring(0, i) + '%FE' + highlightedText.substring(i+1, highlightedText.length);
			}
			else if (highlightedText.charCodeAt(i) == 305) {
				// we have an I
				highlightedText = highlightedText.substring(0, i) + '%FD' + highlightedText.substring(i+1, highlightedText.length);
			}
		}
		window.open( "http://www.turkishdictionary.net/?word="+highlightedText+"", "turkish_dictionary");
		return true;
	} else {
		return false;
	}
}

document.ondblclick = getHighlighted;
