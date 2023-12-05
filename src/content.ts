import { MESSAGE_TYPE, type MessagePayload } from "./types";

chrome.runtime.onMessage.addListener(
  (msg: MessagePayload, _sender, sendResponse) => {
    switch (msg.type) {
      case MESSAGE_TYPE.REQUEST_LOGIN_ID:
        sendResponse({ loginId: getLoginId() });
        break;

      default:
        break;
    }
    return true;
  }
);

function getDomainUrl(url: string) {
  const urlObj = new URL(url);
  console.log(urlObj);
}

function getLoginId() {
  const loginId = document.querySelector(
    "input[type=email]"
  )! as HTMLInputElement;

  return loginId.value;
}
