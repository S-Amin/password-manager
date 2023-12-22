import { PassConfig, UIMode } from "./types.ts";

export type StoredConfig = { key: string; value: string };

interface Storage {
  set: (key: string, value: string) => void;
  get: (key: string) => Promise<{ [key: string]: string }>;
}

type EVENT_TYPE = "CONFIG_ADDED" | "LIST_LOADED";

interface Subscriptions {
  eventType: EVENT_TYPE;
  handler: (configs: StoredConfig[]) => void;
}

export class PassConfigStorage {
  private storage: Storage;
  private static configList: StoredConfig[] = [];
  private static subscriptions: Subscriptions[] = [];

  constructor(private env: UIMode) {
    if (this.env === "EXTENSION") {
      this.storage = {
        set: (k, v) => chrome.storage.local.set({ [k]: v }),
        get: chrome.storage.local.get,
      };
      this.getAllConfigExt();
    } else if (this.env === "WEB") {
      this.storage = {
        set: (k, v) => localStorage.setItem(k, v),
        // TODO make function run async
        get: (k) =>
          new Promise((res, _) => res({ [k]: localStorage.getItem(k) || "" })),
      };
      this.getAllConfigWeb();
    }
  }

  public subscribe(eventType: EVENT_TYPE, handler: any) {
    PassConfigStorage.subscriptions.push({ eventType, handler });
  }

  public addConfig(config: PassConfig) {
    const data = this.stringifyConfig(config);
    const name = this.getConfigName(config);
    this.storage.set(data, name);
    this.reloadConfigs();
  }

  public getConfig(key: string) {
    return this.parseConfig(key);
  }

  public getConfigName({ domain, loginId }: PassConfig) {
    return `${domain}: ${loginId.substring(0, 7)}...`;
  }

  public get configs(): StoredConfig[] {
    return PassConfigStorage.configList;
  }

  private signalSubscribers(eventType: EVENT_TYPE) {
    for (const sub of PassConfigStorage.subscriptions) {
      if (sub.eventType === eventType) sub.handler(this.configs);
    }
  }

  private stringifyConfig({ domain, loginId, variant, length }: PassConfig) {
    return `${domain};${loginId};${variant};${length || ""}`.toLowerCase();
  }

  private parseConfig(data: string): PassConfig {
    const [domain, loginId, variant, length] = data.split(";");
    return { domain, loginId, variant, length };
  }

  private isEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }

  private reloadConfigs() {
    if (this.env === "EXTENSION") this.getAllConfigExt();
    else if (this.env === "WEB") this.getAllConfigWeb();
  }

  private getAllConfigExt() {
    chrome.storage.local.get().then((list: any) => {
      const keys = Object.keys(list);
      PassConfigStorage.configList = keys.map((key) => ({
        key,
        value: list[key],
      }));
      this.signalSubscribers("LIST_LOADED");
    });
  }

  private getAllConfigWeb() {
    setTimeout(() => {
      const keys = Object.keys(localStorage);

      PassConfigStorage.configList = keys.map((key) => ({
        key,
        value: localStorage[key],
      }));
      this.signalSubscribers("LIST_LOADED");
    }, 0);
  }
}
