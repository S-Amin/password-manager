export const MESSAGE_TYPE = {
    REQUEST_LOGIN_ID: 'REQUEST_LOGIN_ID',
} as const

export interface MessagePayload {
    type: keyof typeof MESSAGE_TYPE
}

export interface PassConfig {
    domain: string
    loginId: string
    variant?: string
    length?: string
}

export type UIMode = 'EXTENSION' | 'WEB'
