import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { getUniqueID, httpError } from '@/app/utils'
import { Pastebin } from '@/app/definitions'

export const runtime = 'edge'

export async function POST(request: NextRequest) {

  const params: Pastebin = await request.json()
  if (!params.name || !params.content) {
    return httpError('Invalid params')
  }
  const KV = getRequestContext().env.pastebin
  const getNewId = async () => {
    while (true) {
      let id = getUniqueID()
      if (!await KV.get(id)) {
        return id
      }
      console.error(`Conflict id: ${id}`)
    }
  }
  const id = await getNewId()
  const item = JSON.stringify({name: params.name, content: params.content, ts: (new Date).getTime()})
  await KV.put(id, item)
  return new Response(id)
}
