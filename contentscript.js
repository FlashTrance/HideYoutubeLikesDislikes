// CONTENT SCRIPT

// receivedMessage()
// Listen for messages from popup and background script
chrome.runtime.onMessage.addListener(receivedMessage);
function receivedMessage(message, sender, sendResponse) {
	
	// BACKGROUND SCRIPT MESSAGES
	// Using the (excellent) arrive.js library w/ JQuery to wait for DOM elements prior to hiding
	$(document).arrive("ytd-toggle-button-renderer.style-scope.ytd-menu-renderer.force-icon-button", function() {
		
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
	$("ytd-toggle-button-renderer.style-scope.ytd-menu-renderer.force-icon-button").hide();      // Icons + Numbers
	$("ytd-sentiment-bar-renderer").hide();                                                      // Sentiment Bar
}


// hideNums()
function hideNums() {
	
	// Hide everything except upvote/downvote icons
	$("ytd-sentiment-bar-renderer").hide();                                                      // Sentiment Bar
	$("yt-formatted-string.style-scope.ytd-toggle-button-renderer.style-default-active").hide(); // Likes #
	$("yt-formatted-string.style-scope.ytd-toggle-button-renderer.style-text").hide();           // Dislikes #
	$("ytd-toggle-button-renderer.style-scope.ytd-menu-renderer.force-icon-button").show();      // Show (Unhide) Icons
}


// showAll()
function showAll() {
	
	$("ytd-toggle-button-renderer.style-scope.ytd-menu-renderer.force-icon-button").show();      // Icons
	$("yt-formatted-string.style-scope.ytd-toggle-button-renderer.style-default-active").show(); // Likes #
	$("yt-formatted-string.style-scope.ytd-toggle-button-renderer.style-text").show();           // Dislikes #
	$("ytd-sentiment-bar-renderer").show();                                                      // Sentiment Bar
}