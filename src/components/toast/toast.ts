import style from './toast.scss'

const template = document.createElement('template')
template.innerHTML = `
<div id='toast-body'>
    <p id='message'></p>
</div>
`

export class ToastMessage extends HTMLElement {
    public static tagName = 'my-toast'

    static get observedAttributes() {
        return ['message', 'visible']
    }

    private messageTag: any = null
    constructor() {
        super()

        // Set the default message
        this.message = 'Welcome to our website!'
    }

    // Getter and setter for the message property
    get message() {
        return this.getAttribute('message') || 'Welcome to our website!'
    }

    set message(value) {
        this.setAttribute('message', value)
    }

    // Called when the element is added to the DOM
    connectedCallback() {
        this.render()
    }

    // Called when the attribute is changed
    attributeChangedCallback(name: string, oldVal: string, newVal: string) {
        if (oldVal === newVal) {
            return
        }
        if (name === 'message') {
            this.messageTag.innerHTML = this.message
        }
    }

    // Render the component
    render() {
        this.createUI()
    }

    private createUI() {
        // attach to the Shadow DOM
        const root = this.attachShadow({ mode: 'open' })
        this.addStyleToShadowDom(root)
        root.appendChild(template.content.cloneNode(true))
        this.messageTag = root.querySelector('#message')!
        this.messageTag.innerHTML = this.message
    }

    private addStyleToShadowDom(root: ShadowRoot) {
        const styleSheet = new CSSStyleSheet()
        styleSheet.replaceSync(style)
        root.adoptedStyleSheets = [styleSheet]
    }

    // private showToast() {}

    // private autoClose() {}
}

window.customElements.define(ToastMessage.tagName, ToastMessage)
