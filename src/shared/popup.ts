import { PassConfigStorage } from './storage.ts'
import { UIMode } from './types.ts'
import { FormStore } from './formStore.ts'
import { PassGeneratorService } from './passGeneratorService.ts'
import { ExtensionService } from '../extension/extension-worker.ts'

onOpen()

function onOpen() {
    const uiMode: UIMode = getEnv()
    addUIMode(uiMode)
    const form = new FormStore(
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

    if (getEnv() === 'EXTENSION') {
        new ExtensionService(form.domain, form.loginId)
    }

    registerInfoView()
}

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

function addUIMode(uiMode) {
    const body = document.getElementsByTagName('body')[0]
    body.classList.add(uiMode)
}

function getEnv(): UIMode {
    if (typeof chrome !== 'undefined') {
        return chrome.tabs ? 'EXTENSION' : 'WEB'
    }
    return 'WEB'
}
