
export type Pastebin = {
  name: string;
  content: string;
}

export type PastebinWithTs = Pastebin & { ts: number }
