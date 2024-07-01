import { getRequestContext } from '@cloudflare/next-on-pages'
import { getUniqueID, httpError } from '@/app/utils'

export const runtime = 'edge'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id
    if (!id) {
        return httpError('Invalid id')
    }
    const KV = getRequestContext().env.pastebin
    const item = await KV.get(id)
    if (!item) {
        return httpError('Invalid id')
    }
    return new Response(item, { headers: { 'Content-Type': 'application/json' } })
}