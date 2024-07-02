
export default function About() {
  return (
    <div>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">About</h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        This is a simple, open-source anonymous pastebin service. Built with Nextjs, Shacn as UI, deployed on Cloudflare.
      </p>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Features
      </h3>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>Syntax highlighting (determining language type by filename extension); also supports pure text mode (append "/raw" to the URL)</li>
        <li>Integration with Cloudflare Captcha (Turnstile)</li>
        <li>Download a pastebin</li>
      </ul>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Open Source
      </h3>
      <p className="my-6">You can get the codes here: <a href="https://github.com/ichuan/pastebin" className="font-medium text-primary underline underline-offset-4">ichuan/pastebin</a></p>
    </div>
  )
}