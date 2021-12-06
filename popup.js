// EXTENSION POPUP

// Popup buttons
let hideAll = document.getElementById('hideAll');
let hideNums = document.getElementById('hideNumbers');

// Get/set switch states from Chrome storage
chrome.storage.sync.get("allSwitch", function(switchState) {
	hideAll.checked = switchState.allSwitch.checked;
})

chrome.storage.sync.get("valuesSwitch", function(switchState) {
	hideNums.checked = switchState.valuesSwitch.checked;
})


// ONCLICK EVENTS

// onClick hideAll switch
hideAll.onclick = function() {
	
	// Message to send to content script
	let msg = {command: ""};
	
	// Save switch state settings
	chrome.storage.sync.set({"allSwitch": {"checked": hideAll.checked}}, function() {});
	
	// Set message based on switch turned on or off
	if (hideAll.checked === true) {
		
		hideNums.checked = false;
		chrome.storage.sync.set({"valuesSwitch": {"checked": false}}, function() {});
		
		msg = {command: "hideAll"}
	} else if (hideAll.checked === false) {
		
		msg = {command: "showAll"};
	}
	
	// Get current tab
	let params = {url: "*://*.youtube.com/*"};
	chrome.tabs.query(params, gotTabs);
	
	// Send message to content script
	function gotTabs(activeTabs) {
		for (var i=0; i<activeTabs.length; i++) {
			chrome.tabs.sendMessage(activeTabs[i].id, msg);
		}
	}
}


// onClick hideNumbers switch
hideNums.onclick = function() {
	
	// Message to send to content script
	let msg = {command: ""};
	
	// Save switch state settings
	chrome.storage.sync.set({"valuesSwitch": {"checked": hideNums.checked}}, function() {
			console.log('Saved');
	});
	
	// Set message based on switch turned on or off
	if (hideNums.checked === true) {
		
		hideAll.checked = false;
		chrome.storage.sync.set({"allSwitch": {"checked": false}}, function() {});
		
		msg = {command: "hideNumbers"}
	} else if (hideNums.checked === false) {
		
		msg = {command: "showAll"};
	}
	
	// Get current tab
	let params = {url: "*://*.youtube.com/*"};
	chrome.tabs.query(params, gotTabs);
	
	// Send message to content script
	function gotTabs(activeTabs) {
		for (var i=0; i<activeTabs.length; i++) {
			chrome.tabs.sendMessage(activeTabs[i].id, msg);
		}
	}
}