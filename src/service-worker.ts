// chrome.tabs.onActivated.addListener(async (actInfo) => {
//   console.log({ actInfo });
//   const tab = await chrome.tabs.get(actInfo.tabId);
//   console.log({ tab });
//   const response = await chrome.tabs.sendMessage(tab.id, {
//     url: tab.url,
//     id: tab.id,
//   });

//   // do something with response here, not outside the function
//   console.log({ response });
// });

/* Pop up request to get info of the Tab */
chrome.runtime.onMessage.addListener(async (msg, _sender, sendResponse) => {
  if (msg.type === "tabInfo") {
    let queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    sendResponse({ tab });
  }
  return true;
});
