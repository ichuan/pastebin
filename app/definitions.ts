export type Pastebin = {
  name: string;
  content: string;
}

export type PastebinWithCaptcha = Pastebin & { captchaToken: string }

export type PastebinWithTs = Pastebin & { ts: number }
