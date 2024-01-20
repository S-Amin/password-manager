const typingLines = document.querySelectorAll('.line')!

async function runEffects() {
    await sleep(1000)
    let l = typingLines[0]
    l.classList.remove('typing', 'animating')

    for (const currentLine of typingLines) {
        currentLine.classList.add('typing')
        const text = currentLine.getAttribute('data-text')
        if (text) {
            const textArr = text.split('')
            for (const char of textArr) {
                currentLine.innerHTML += char
                await sleep(50)
            }
        }

        const url = currentLine.getAttribute('data-href')
        if (url) currentLine.setAttribute('href', url)

        currentLine.classList.remove('typing')
    }

    l = typingLines[typingLines.length - 1]
    l.classList.add('typing', 'animating')
}

runEffects()

function sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms))
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min
}
