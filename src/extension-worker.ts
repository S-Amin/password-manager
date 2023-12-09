import { MESSAGE_TYPE, type MessagePayload } from "./types";
import { removeWhiteSpace } from "./utils";

export class ExtensionService {
  constructor(
    private domain: HTMLInputElement,
    private loginId: HTMLInputElement
  ) {
    this.init();
  }

  public init() {
    this.loadDataFromPage();
  }

  private async loadDataFromPage() {
    const { url } = await this.getCurrentTab();
    const username = await this.getUsername();
    const { hostname } = new URL(url || "");
    const dRgx = /[^\.]+\.{1}[^\.]+$/;
    const domain = dRgx.exec(hostname);
    if (domain) this.domain.value = removeWhiteSpace(domain[0]);
    this.loginId.value = removeWhiteSpace(username);
  }

  private async getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    // console.log({ tab });
    return tab;
  }

  private async getUsername() {
    const tab = await this.getCurrentTab();
    const msg: MessagePayload = { type: MESSAGE_TYPE.REQUEST_LOGIN_ID };
    if (tab.id) {
      const res = await chrome.tabs.sendMessage(tab.id, msg);

      return res.loginId;
    }
  }
}
