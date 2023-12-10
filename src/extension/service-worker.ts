/* Pop up request to get info of the Tab */
chrome.runtime.onMessage.addListener(async (msg, _sender, sendResponse) => {
  if (msg.type === "tabInfo") {
    let queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    sendResponse({ tab });
  }
  return true;
});
