interface InputParts<T> {
    loginInput: T
    domainInput: T
    masterPassInput: T
    passLengthInput: T
    variantInput: T
}

interface BtnParts<T> {
    generateBtn: T
    resetBtn: T
    copyBtn: T
    saveBtn: T
}

interface EventHandler {
    [type: string]: () => void
}

type FromStorePartsId = InputParts<string> & BtnParts<string>

export class FormStore {
    private formPartsElm: InputParts<HTMLInputElement> & BtnParts<HTMLElement> =
        {} as any

    constructor(private formPartsId: FromStorePartsId) {
        this.getElements()
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

    public resetForm() {
        for (const [_, p] of Object.entries(this.formPartsElm)) {
            if (p instanceof HTMLInputElement) {
                p.value = ''
            }
        }
    }

    private getElements() {
        for (const [k, id] of Object.entries(this.formPartsId)) {
            this.formPartsElm[k] = document.getElementById(id)
        }
    }
}
