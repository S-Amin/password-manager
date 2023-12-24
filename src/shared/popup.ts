import { ExtensionService } from '../extension/extension-worker.ts'
import { PassConfigStorage } from './storage.ts'
import { UIMode } from './types.ts'
import { FormStore } from './formStore.ts'
import { PassGeneratorService } from './passGeneratorService.ts'

const uiMode: UIMode = chrome.tabs ? 'EXTENSION' : 'WEB'

new FormStore(
    {
        loginInput: 'loginId',
        domainInput: 'domain',
        masterPassInput: 'masterPass',
        passLengthInput: 'passLength',
        variantInput: 'variant',
        generateBtn: 'generateBtn',
        resetBtn: 'resetFrom',
        copyBtn: 'copy',
        saveBtn: 'saveConfig',
        toggleMasterPassVisibility: 'showHidePass',
        passPreview: 'passPreview',
        passConfigList: 'passConfigList',
    },
    new PassGeneratorService(),
    new PassConfigStorage(uiMode)
)

registerInfoView()
addUIMode()

function registerInfoView() {
    document.querySelectorAll('.floatingIcon').forEach((elm) => {
        elm.addEventListener('click', (e) => {
            const infoId = (e.target as HTMLElement).dataset.target
            if (!infoId) return
            const targetInfo = document.getElementById(infoId)
            if (!targetInfo) return
            targetInfo.scrollIntoView({ behavior: 'smooth' })
            targetInfo.classList.add('text-white')
            setTimeout(() => {
                targetInfo.classList.remove('text-white')
            }, 5000)
        })
    })
}

// function onOpen() {
//     const configStorage = new PassConfigStorage(uiMode)

//     let extensionService: ExtensionService
//     if (chrome.tabs) {
//         extensionService = new ExtensionService(domainInput, loginIdInput)
//     }
//     try {
//         addUIMode()
//         registerHandlers(configStorage)
//         addInputRules([domainInput, loginIdInput])

//         // the subscription will be executed at the end of the function because of async load
// configStorage.subscribe('LIST_LOADED', loadAllPassConfig)
//     } catch (e) {
//         console.error(e)
//     }
// }

function addUIMode() {
    const body = document.getElementsByTagName('body')[0]
    body.classList.add(uiMode)
}
