// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'close_tab') {
        chrome.tabs.remove(sender.tab.id);
    }
});