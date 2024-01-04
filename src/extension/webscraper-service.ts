export class FormFinderService {
    private counter = 0
    private MaxSearch = 100

    public searchIn(parent: ParentNode | null): Element | undefined {
        if (!parent || !parent.parentNode || this.counter === this.MaxSearch) {
            this.counter = 0
            return
        }

        this.counter++

        const siblings = Array.from(parent.parentNode.children)
            .filter((sibling) => sibling !== parent)
            .reverse()

        for (const sibling of siblings) {
            const input = this.findInput(sibling)
            if (input) {
                this.counter = 0
                return input
            }
        }

        return this.searchIn(parent.parentNode)
    }

    private findInput(node: Element): Element | undefined {
        const childrenCollection = node.querySelectorAll(
            'input[type="text"], input[type="email"], input[type="tel"]'
        )

        const children = Array.from(childrenCollection).reverse()

        if (children.length > 0) {
            return children[0]
        }
    }
}
