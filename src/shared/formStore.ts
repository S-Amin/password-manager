import { PassGeneratorService } from './passGeneratorService.ts'
import { PassConfigStorage, StoredConfig } from './storage.ts'
import { PassConfig } from './types.ts'

interface InputParts<T> {
    loginInput: T
    domainInput: T
    masterPassInput: T
    passLengthInput: T
    variantInput: T
}

interface BtnParts<T> {
    toggleMasterPassVisibility: T
    generateBtn: T
    resetBtn: T
    copyBtn: T
    saveBtn: T
}

interface ElementParts<T> {
    passPreview: T
}

interface SelectParts<T> {
    passConfigList: T
}

type FromStorePartsId = InputParts<string> &
    BtnParts<string> &
    ElementParts<string> &
    SelectParts<string>

export class FormStore {
    private partsElm: InputParts<HTMLInputElement> &
        BtnParts<HTMLElement> &
        ElementParts<HTMLElement> &
        SelectParts<HTMLSelectElement> = {} as any

    private generatedPass: string | null = ''

    constructor(
        private formPartsId: FromStorePartsId,
        private passGeneratorService: PassGeneratorService,
        private passConfigStorage: PassConfigStorage
    ) {
        try {
            this.selectElementsFromDom()
            this.bindCopyHandler()
            this.bindResetHandler()
            this.bindInputRules()
            this.bingToggleMasterPassVisibility()
            this.bindGenerateBtn()
            this.bindVariantInput()
            this.bindPassLengthInput()
            this.bindPassConfigList()
            this.bindSaveBtn()

            this.passConfigStorage.subscribe(
                'LIST_LOADED',
                this.loadAllPassConfig.bind(this)
            )
        } catch (err) {
            console.error(err)
        }
    }

    get domain() {
        return this.partsElm['domainInput']
    }
    get loginId() {
        return this.partsElm['loginInput']
    }
    get passLength() {
        return this.partsElm['passLengthInput']
    }
    get variant() {
        return this.partsElm['variantInput']
    }
    get masterPass() {
        return this.partsElm['masterPassInput']
    }
    get passConfigList() {
        return this.partsElm['passConfigList']
    }
    get allParts() {
        return this.partsElm
    }

    private selectElementsFromDom() {
        for (const [k, id] of Object.entries(this.formPartsId)) {
            ;(this.partsElm as any)[k] = document.getElementById(id)
        }
    }

    private bindCopyHandler() {
        this.partsElm['copyBtn'].addEventListener('click', () => {
            navigator.clipboard
                .writeText(this.generatedPass || '')
                .catch((err) => {
                    console.error('Error while copying to clipboard: ', err)
                })
        })
    }

    private bindResetHandler() {
        this.partsElm['resetBtn'].addEventListener('click', () => {
            for (const [_, elm] of Object.entries(this.partsElm)) {
                if (elm instanceof HTMLInputElement) {
                    elm.value = elm.min
                }
            }
            this.partsElm['passPreview'].innerHTML = ''
        })
    }

    private bindInputRules() {
        for (const input of [this.domain, this.loginId]) {
            input.addEventListener('change', () => {
                input.value = input.value.toLowerCase()
            })
        }
    }

    private bingToggleMasterPassVisibility() {
        this.partsElm['toggleMasterPassVisibility'].addEventListener(
            'click',
            () => {
                const iconBtn = this.partsElm['toggleMasterPassVisibility']

                const newType =
                    this.masterPass.type === 'text' ? 'password' : 'text'
                this.masterPass.type = newType

                const visibleIcon = iconBtn.querySelector('#visibleIcon')
                const hiddenIcon = iconBtn.querySelector('#hiddenIcon')
                switch (newType) {
                    case 'password':
                        visibleIcon?.classList.add('hideElm')
                        hiddenIcon?.classList.remove('hideElm')
                        break

                    case 'text':
                        visibleIcon?.classList.remove('hideElm')
                        hiddenIcon?.classList.add('hideElm')
                        break
                }
            }
        )
    }

    private generatePass() {
        const pass = this.passGeneratorService.passGenerator(this)
        this.generatedPass = pass
        this.partsElm['passPreview'].innerText = pass || ''
    }

    private bindGenerateBtn() {
        this.partsElm['generateBtn'].addEventListener('click', () => {
            this.generatePass()
        })
    }

    private bindVariantInput() {
        this.variant.addEventListener('change', () => {
            this.generatePass()
        })
    }

    private bindPassLengthInput() {
        this.passLength.addEventListener('change', () => {
            this.generatePass()
        })
    }

    private bindPassConfigList() {
        this.passConfigList.addEventListener('change', (e: any) => {
            const value = e.target.value
            this.loadPassConfig(value)
        })
    }

    private bindSaveBtn() {
        this.partsElm['saveBtn'].addEventListener('click', () =>
            this.savePassConfig()
        )
    }

    private loadPassConfig(configStr: string) {
        const config = this.passConfigStorage.getConfig(configStr)
        this.domain.value = config.domain
        this.loginId.value = config.loginId
        this.passLength.value = config.length
        this.variant.value = config.variant
    }

    private savePassConfig() {
        const config: PassConfig = {
            domain: this.domain.value,
            loginId: this.loginId.value,
            variant: this.variant.value,
            length: this.passLength.value,
        }

        this.passConfigStorage.addConfig(config)
    }

    private loadAllPassConfig(configs?: StoredConfig[]) {
        if (!configs?.length) return
        this.passConfigList.innerHTML =
            '<option selected disabled hidden>Select password</option>'
        for (const config of configs) {
            this.passConfigList.appendChild(
                new Option(config.value, config.key)
            )
        }
    }
}
