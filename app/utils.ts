import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz', 5)

export function getUniqueID() {
    return nanoid()
}

export const httpError = (reason: string, status: number = 400) => {
  return Response.json({error: reason}, {status})
}

export const getDateString = (d: number | Date) => {
    if (typeof d === 'number') {
        d = new Date(d)
    }
    return `${d.getUTCFullYear()}/${d.getUTCMonth()+1}/${d.getUTCDate()} ${d.getUTCHours()}:${d.getUTCMinutes()} (UTC)`
}