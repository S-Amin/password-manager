import { MESSAGE_TYPE, type MessagePayload } from '../shared/types.ts'
import { FormFinderService } from './webscraper-service.ts'

chrome.runtime.onMessage.addListener(
    (msg: MessagePayload, _sender, sendResponse) => {
        switch (msg.type) {
            case MESSAGE_TYPE.REQUEST_LOGIN_ID:
                sendResponse({ loginId: getLoginId() })
                break

            default:
                break
        }
        return true
    }
)

function getDomainUrl(url: string) {
    const urlObj = new URL(url)
    console.log(urlObj)
}

const scraper = new FormFinderService()

function getLoginId() {
    const passInput = document.querySelector(
        'input[type="password" i]'
    )! as HTMLInputElement

    const loginId = scraper.searchIn(passInput)
    if (!loginId) return ''

    return (loginId as HTMLInputElement).value
}
