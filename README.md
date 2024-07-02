# Pastebin
A simple pastebin. This is a [Next.js](https://nextjs.org/) project bootstrapped with [`c3`](https://developers.cloudflare.com/pages/get-started/c3).

## Getting Started

```bash
# run dev
npm run dev
# run cloudflare preview (do it before deploy)
npm run preview
# deploy using wrangler
npm run deploy
# or auto deploy by integrate with github upon git push
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Cloudflare integration

### KV

Login to Cloudflare and create a [KV](https://developers.cloudflare.com/kv/get-started/), then replace the `[[kv_namespaces]]` in `wrangler.toml`.

### Captcha (Turnstile)

Create a [Turnstile](https://developers.cloudflare.com/turnstile/).

1. For site key, edit `app/consts.ts` and replace `TURNSTILE_SITEKEY`
2. For secret key, create a file named `.dev.vars` with `TURNSTILE_SECRETKEY="0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"`. Also add that environment variable in your 'Workers & Pages' settings in Cloudflare
