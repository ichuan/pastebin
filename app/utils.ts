import { customAlphabet } from 'nanoid'
import { Lancelot } from 'next/font/google'
import * as consts from './consts'

const nanoid = customAlphabet('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz', 5)

export function getUniqueID() {
    return nanoid()
}

export const httpError = (reason: string, status: number = 400) => {
    return Response.json({ error: reason }, { status })
}

export const getDateString = (d: number | Date) => {
    if (typeof d === 'number') {
        d = new Date(d)
    }
    return `${d.getUTCFullYear()}/${d.getUTCMonth() + 1}/${d.getUTCDate()} ${d.getUTCHours()}:${d.getUTCMinutes()} (UTC)`
}

export const getLanguageByFilename = (filename: string) => {
    if (consts.EXACT_FILENAME_LANGUAGE.hasOwnProperty(filename)) {
        return consts.EXACT_FILENAME_LANGUAGE[filename]
    }
    const pos = filename.lastIndexOf('.')
    if (pos === -1) {
        if (consts.LANGUAGES.has(filename)) {
            return filename;
        }
    } else {
        return getLanguageByFileExtension(filename.substring(pos + 1))
    }
    return 'text'
}

export const getLanguageByFileExtension = (extension: string) => {
    return consts.FILE_EXT_TO_LANGUAGE.hasOwnProperty(extension) ? consts.FILE_EXT_TO_LANGUAGE[extension] : 'text'
}

export const downloadText = (name: string, text: string) => {
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = name.indexOf('.') === -1 ? `${name}.txt` : name
    link.href = url
    link.click()
}

export const verifyCaptcha = async (token: string) => {
    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
    const res = await fetch(url, { method: 'POST', body: `secret=${encodeURIComponent(consts.TURNSTILE_SECRETKEY)}&response=${encodeURIComponent(token)}`, headers: { 'content-type': 'application/x-www-form-urlencoded' } })
    const data: { success: boolean } = await res.json()
    return data.success
}