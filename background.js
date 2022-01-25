let color = "#3AA757";

chrome.runtime.onInstalled.addListener( () => {
    chrome.storage.sync.set({color})
    console.log(`Default backgorund color set to ${color}`);
    
});