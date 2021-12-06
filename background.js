// BACKGROUND SCRIPT

// onInstalled
chrome.runtime.onInstalled.addListener (function() {
	
	// Set default state values in storage
	chrome.storage.sync.set({"state": {"hideState": "NONE"}}, function() {});
	chrome.storage.sync.set({"allSwitch": {"checked": false}}, function() {});
	chrome.storage.sync.set({"valuesSwitch": {"checked": false}}, function() {});
	
	// Using declarativeContent API, when page changes check if host is www.youtube.com, if so activate extension button
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			
			// Use PageStateMatcher to check pageUrl
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {hostEquals: 'www.youtube.com'}
			})],
			
			// Show page action from manifest
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});


// onUpdated (tab updated)
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		
	// Get hidden state from storage, send to content script
	chrome.storage.sync.get("state", function(currentState) {	
		chrome.tabs.sendMessage(tabId, {command: currentState.state.hideState});
	})	
});
