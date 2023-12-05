import { passGenerator } from "./pass-generator";
import { ExtensionService } from "./extension-worker";
import { PassConfigStorage, StoredConfig } from "./storage";

let generatedPass = "";
const genBtn = document.getElementById("generateBtn")!;
const copyBtn = document.getElementById("copy")!;
const saveConfigBtn = document.getElementById("saveConfig")!;
const secretKey = document.getElementById("secretKey");
const domain = document.getElementById("domain")! as HTMLInputElement;
const loginId = document.getElementById("loginId")! as HTMLInputElement;
const variantInput = document.getElementById("variant")! as HTMLInputElement;
const passPreview = document.getElementById("pass")! as HTMLInputElement;
const passConfig = document.getElementById("passConfig")! as HTMLSelectElement;

onOpen();

/*--  Can be added to react on user typing --*/
// passName.addEventListener("input", eventHandler);
// passUsage.addEventListener("input", eventHandler);

function registerHandlers(store: PassConfigStorage) {
  genBtn.addEventListener("click", () => genPassHandler());
  copyBtn.addEventListener("click", copyHandler);
  saveConfigBtn.addEventListener("click", () => saveConfigBtnHandler(store));
  variantInput.addEventListener("change", () =>
    genPassHandler(+variantInput.value)
  );
  passConfig.addEventListener("change", (e) => loadPassConfigHandler(e, store));
}

function genPassHandler(variant = 1) {
  if (!variant) {
    passPreview.value = null;
    return;
  }
  generatedPass = "";
  const secret = (secretKey as any).value;
  const usage = domain.value;
  const name = loginId.value;
  generatedPass = passGenerator(secret, { name, usage }, variant) || "NONE";
  passPreview.value = generatedPass;
  variantInput.value = `${variant}`;
}

function onOpen() {
  const configStorage = new PassConfigStorage(chrome.tabs ? "ext" : "web");

  let extensionService: ExtensionService;
  if (chrome.tabs) {
    extensionService = new ExtensionService(domain, loginId);
  }
  try {
    registerHandlers(configStorage);
    addInputRules([domain, loginId]);

    // the subscription will be executed at the end of the function because of async load
    configStorage.subscribe("LIST_LOADED", loadAllPassConfig);

    // loadAllPassConfig(configStorage.configs);
  } catch (e) {
    console.error(e);
  }
}

function copyHandler() {
  navigator.clipboard.writeText(generatedPass).catch((err) => {
    console.error("copy to clipboard has an error: ", err);
  });
}

async function loadPassConfigHandler(event: any, store: PassConfigStorage) {
  const configString = event.target.value;
  const config = store.getConfig(configString);

  domain.value = config.domain;
  loginId.value = config.loginId;
  variantInput.value = config.variantInput;
}

function loadAllPassConfig(configs?: StoredConfig[]) {
  if (!configs.length) return;
  passConfig.innerHTML =
    "<option selected disabled hidden>Select password</option>";
  for (const config of configs) {
    passConfig.appendChild(new Option(config.value, config.key));
  }
}

function saveConfigBtnHandler(store: PassConfigStorage) {
  const config = {
    domain: domain.value,
    loginId: loginId.value,
    variantInput: variantInput.value,
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
