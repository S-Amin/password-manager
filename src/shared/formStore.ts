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

type FromStorePartsId = InputParts<string> & BtnParts<string>

export class FormStore {
    private formPartsElm: InputParts<HTMLInputElement> & BtnParts<HTMLElement> =
        {} as any

    private generatedPass: string = ''

    constructor(private formPartsId: FromStorePartsId) {
        try {
            this.selectElementsFromDom()
            this.bindCopyHandler()
            this.bindResetHandler()
            this.bindInputRules()
            this.bingToggleMasterPassVisibility()
        } catch (err) {
            console.error(err)
        }
    }

    get domain() {
        return this.formPartsElm['domainInput']
    }
    get loginId() {
        return this.formPartsElm['loginInput']
    }
    get passLength() {
        return this.formPartsElm['passLengthInput']
    }
    get variant() {
        return this.formPartsElm['variantInput']
    }
    get masterPass() {
        return this.formPartsElm['masterPassInput']
    }
    get allParts() {
        return this.formPartsElm
    }

    private selectElementsFromDom() {
        for (const [k, id] of Object.entries(this.formPartsId)) {
            this.formPartsElm[k] = document.getElementById(id)
        }
    }

    private bindCopyHandler() {
        this.formPartsElm['copyBtn'].addEventListener('click', () => {
            navigator.clipboard.writeText(this.generatedPass).catch((err) => {
                console.error('Error while copying to clipboard: ', err)
            })
        })
    }

    private bindResetHandler() {
        this.formPartsElm['resetBtn'].addEventListener('click', () => {
            for (const [_, p] of Object.entries(this.formPartsElm)) {
                if (p instanceof HTMLInputElement) {
                    p.value = ''
                }
            }
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
        this.formPartsElm['toggleMasterPassVisibility'].addEventListener(
            'click',
            () => {
                const elm = this.formPartsElm['toggleMasterPassVisibility']
                const currentType = this.masterPass.type
                const newType = currentType === 'text' ? 'password' : 'text'
                this.formPartsElm['masterPassInput'].type = newType

                const visibleIcon = elm.querySelector('#visibleIcon')
                const hiddenIcon = elm.querySelector('#hiddenIcon')
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
}
