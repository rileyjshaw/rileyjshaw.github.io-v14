var tagInput = document.getElementById('tagField'), 
	theUL = document.getElementById('instafeed'),
	credit = document.getElementById('author'),
	tagName = 'planewindow',
	feed;

var allowedKeys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';

updateTags = function(tagVal) {
	window.location.href = "#";

	credit.style.visibility = 'hidden';

	theUL.innerHTML = '';

    feed = new Instafeed({
        clientId: '20f367dd6c384940808e1e8b7b11000e',
        resolution: 'standard_resolution',
        get: 'tagged',
    	tagName: tagVal,
    	sortBy: 'most-liked',
        template: '<li style="background-image: url({{image}})"></li>',
        error: noImgFound,
        after: unhideCredit
    });

	feed.run();
}
unhideCredit = function() {
	credit.style.visibility = 'visible';
}

txtFieldBlur = function(inp) {
	if(inp.value === '')
		inp.value = inp.defaultValue;
	inp.style.color = '#bbb';
}
txtFieldFocus = function(inp) {
	if(inp.value === inp.defaultValue)
		inp.value = '';
	inp.style.color = '#1c4b71';
}
txtFieldEntry = function(e) {
    var k = document.all ? parseInt(e.keyCode) : parseInt(e.which);
    if (k != 13 && k != 8 && k != 0) {
        if ((e.ctrlKey == false) && (e.altKey == false)) {
        return (allowedKeys.indexOf(String.fromCharCode(k)) != -1);
        } else {
        return true;
        }
    } else {
        return true;
    }
}
noImgFound = function() {
	alert("We couldn't find any images with that tag :(");
	window.location.href = "#modal";
}


var IE = document.all?true:false; //Is it IE?

if(IE) {
	tagInput.attachEvent('onblur', function(){txtFieldBlur(this)});
	tagInput.attachEvent('onfocus', function(){txtFieldFocus(this)});
//	tagInput.attachEvent('onkeypress', function(){return txtFieldEntry(event)});
	window.attachEvent('onload', function(){updateTags(tagName)});
} else {
	tagInput.addEventListener('blur', function(){txtFieldBlur(this)}, false);
	tagInput.addEventListener('focus', function(){txtFieldFocus(this)}, false);
//	tagInput.addEventListener('keypress', function(){return txtFieldEntry(event)}, false);
	window.addEventListener('load', function(){updateTags(tagName)}, false);
}

//overwrite input text text text entry

tagInput.onkeypress = function(event) {event = event || window.event; return txtFieldEntry(event)};