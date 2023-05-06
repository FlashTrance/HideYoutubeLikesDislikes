// CONTENT SCRIPT

// receivedMessage()
// Listen for messages from popup and background script
chrome.runtime.onMessage.addListener(receivedMessage);
function receivedMessage(message, sender, sendResponse) {
	
	// BACKGROUND SCRIPT MESSAGES
	// Using the (excellent) arrive.js library w/ JQuery to wait for DOM elements prior to hiding
	$(document).arrive("ytd-segmented-like-dislike-button-renderer", function() {
		
		// Hide All
		if (message.command == "ALL") {
			hideAll();
		} 
		
		// Hide Values + Bar
		else if (message.command == "PARTIAL") {
			hideNums();
		}
	});
	
	
	// POPUP MESSAGES
	// Hide Everything switch turned on (hide all like/dislike elements)
	if (message.command == "hideAll") {
		
		// Hide All and save settings
		hideAll();
		chrome.storage.sync.set({"state": {"hideState": "ALL"}}, function() {});
	}
	
	// Hide Values Only switch turned on (hide only like/dislike values)
	else if (message.command == "hideNumbers") {
		
		// Hide Values + Bar and save settings
		hideNums();
		chrome.storage.sync.set({"state": {"hideState": "PARTIAL"}}, function() {});
	}
	
	// Both switches turned off
	else if (message.command == "showAll") {
		
		// Show All and save settings
		showAll();
		chrome.storage.sync.set({"state": {"hideState": "NONE"}}, function() {});
	}
}


// hideAll()
function hideAll() {
	
	// Hide like/dislike icons, text, and bar
	$("ytd-segmented-like-dislike-button-renderer").hide(); // Hide sentiment bar entirely
}


// hideNums()
function hideNums() {
	
	// Hide everything except upvote/downvote icons
	$("ytd-toggle-button-renderer").find(".cbox").hide()	// Hide likes number
	$("ytd-segmented-like-dislike-button-renderer").show(); // Unhide sentiment bar (in case hidden)
}


// showAll()
function showAll() {
	
	// Unhide all elements
	$("ytd-segmented-like-dislike-button-renderer").show(); // Unhide sentiment bar
	$("ytd-toggle-button-renderer").find(".cbox").show()	// Unhide likes number
}
