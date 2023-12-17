import { passGenerator } from "./pass-generator";
import { ExtensionService } from "../extension/extension-worker";
import { PassConfigStorage, StoredConfig } from "./storage";
import { PassConfig, UIMode } from "./types";

let generatedPass = "";
const uiMode: UIMode = chrome.tabs ? "EXTENSION" : "WEB";

const genBtn = document.getElementById("generateBtn")!;
const copyBtn = document.getElementById("copy")!;
const saveConfigBtn = document.getElementById("saveConfig")!;
const secretKey = document.getElementById("secretKey");
const domainInput = document.getElementById("domain")! as HTMLInputElement;
const loginIdInput = document.getElementById("loginId")! as HTMLInputElement;
const variantInput = document.getElementById("variant")! as HTMLInputElement;
const passLength = document.getElementById("passLength")! as HTMLInputElement;
const passPreview = document.getElementById("pass")! as HTMLInputElement;
const passConfigInput = document.getElementById(
  "passConfig"
)! as HTMLSelectElement;

onOpen();

/*--  Can be added to react on user typing --*/
// passName.addEventListener("input", eventHandler);
// passUsage.addEventListener("input", eventHandler);

function registerHandlers(store: PassConfigStorage) {
  copyBtn.addEventListener("click", copyHandler);
  saveConfigBtn.addEventListener("click", () => saveConfigBtnHandler(store));
  genBtn.addEventListener("click", genPassHandler);
  passLength.addEventListener("change", genPassHandler);
  variantInput.addEventListener("change", genPassHandler);
  passConfigInput.addEventListener("change", (e) =>
    loadPassConfigHandler(e, store)
  );
}

function genPassHandler() {
  generatedPass = "";
  const secret = (secretKey as any).value;
  const domain = domainInput.value;
  const loginId = loginIdInput.value;
  const length = passLength.value;
  const variant = +variantInput.value;
  generatedPass =
    passGenerator(secret, { domain, loginId, length }, variant) || "NONE";
  passPreview.innerText = generatedPass;
  variantInput.value = `${variant}`;
}

function onOpen() {
  const configStorage = new PassConfigStorage(uiMode);

  let extensionService: ExtensionService;
  if (chrome.tabs) {
    extensionService = new ExtensionService(domainInput, loginIdInput);
  }
  try {
    addUIMode();
    registerHandlers(configStorage);
    addInputRules([domainInput, loginIdInput]);

    // the subscription will be executed at the end of the function because of async load
    configStorage.subscribe("LIST_LOADED", loadAllPassConfig);
  } catch (e) {
    console.error(e);
  }
}

function addUIMode() {
  const body = document.getElementsByTagName("body")[0];
  body.classList.add(uiMode);
}

function copyHandler() {
  navigator.clipboard.writeText(generatedPass).catch((err) => {
    console.error("copy to clipboard has an error: ", err);
  });
}

async function loadPassConfigHandler(event: any, store: PassConfigStorage) {
  const configString = event.target.value;
  const config = store.getConfig(configString);

  domainInput.value = config.domain;
  loginIdInput.value = config.loginId;
  variantInput.value = config.variant || "0";
  passLength.value = config.length || "";
}

function loadAllPassConfig(configs?: StoredConfig[]) {
  if (!configs?.length) return;
  passConfigInput.innerHTML =
    "<option selected disabled hidden>Select password</option>";
  for (const config of configs) {
    passConfigInput.appendChild(new Option(config.value, config.key));
  }
}

function saveConfigBtnHandler(store: PassConfigStorage) {
  const config: PassConfig = {
    domain: domainInput.value,
    loginId: loginIdInput.value,
    variant: variantInput.value,
    length: passLength.value,
  };

  store.addConfig(config);
}

function addInputRules(inputs: HTMLInputElement[]) {
  for (const input of inputs) {
    // only lower case value
    input.addEventListener("change", (e) => {
      input.value = input.value.toLowerCase();
    });
  }
}

// chrome.storage.local.get(
