function toggleHiddenDiv(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
        if (element.className == 'hidden_div') {
            element.className = 'visible_div';
        }
        else if (element.className == 'visible_div') {
            element.className = 'hidden_div';
        }
        else {
        	alert('Invalid class name for element ' + elementId);
        }
    }
    else {
        alert('Unable to find element ' + elementId);
    }
}

function toggleDisplay(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
        if (element.style.display == 'block' || element.style.display == '') {
            element.style.display = 'none';
        }
        else if (element.style.display == 'none') {
            element.style.display = 'block';
        }
        else {
        	alert('Invalid display value for element ' + elementId + ': ' + element.style.display);
        }
    }
    else {
        alert('Unable to find element ' + divId);
    }
}

function getRadioButtonValue(radioButton) {
	for (i=0; i<radioButton.length; i++) {
		if (radioButton[i].checked == true) {
			return radioButton[i].value;
		}
	}
	return '';
}

function array_index_of(p_array, p_element) {
	for (var i = 0; i < p_array.length; i++) {
		if (p_array[i] == p_element) {
			return i;
		}
	}
	return -1;
}

function array_contains(p_array, p_element) {
	if (array_index_of(p_array, p_element) >= 0) {
		return true;
	}
	return false;
}

/**
 * This function processes the favorites action response and displays a message
 * 
 * @param data
 * @return
 */
function processFavoritesJson(data){
	if (data.success){
		if($('#favoritesLink').text() == 'Like'){
			favoritesAction = 'remove';
			$('#favoritesLink').text('Unlike');
		}
		else {
			favoritesAction = 'add';
			$('#favoritesLink').text('Like');
		}
	}
	else{
		if (data.message != null){
			alert(data.message);
		}
	}
}
