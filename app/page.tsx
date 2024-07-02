'use client'

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { SubmitButton } from "@/components/submit-button"
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { toast } from "sonner"
import { TURNSTILE_SITEKEY, FILENAME_MAX_SIZE, CONTENT_MAX_SIZE } from "./consts"
import { Turnstile, TurnstileTheme } from '@marsidev/react-turnstile'
import { useTheme } from "next-themes"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const runtime = 'edge';


export default function NewPastebin() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [challengeSucess, setChallengeSuccess] = useState(false)
  const [captchaLoaded, setCaptchaLoaded] = useState(false)
  const [captchaToken, setCaptchaToken] = useState('')
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const res = await fetch('/api/pastebin', {
      body: JSON.stringify({ name, content, captchaToken }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const id = await res.text()
    if (!res.ok) {
      return toast('Error', { description: id })
    }
    toast('Pastebin created', { description: 'Copy the url to share this pastebin' })
    router.push(`/i/${id}`)
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create a new pastebin</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="create" method="post" onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" placeholder="Filename including extension…" maxLength={FILENAME_MAX_SIZE} autoFocus required onChange={e => setName(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" name="content" className="min-h-96" maxLength={CONTENT_MAX_SIZE} required onChange={e => setContent(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <input type="hidden" name="captcha" value={captchaToken} />
              <Turnstile className={`rounded-md ${captchaLoaded ? '' : 'hidden'}`} options={{ theme: theme as TurnstileTheme }} siteKey={TURNSTILE_SITEKEY} onSuccess={(token) => { setCaptchaToken(token); setChallengeSuccess(true) }} onWidgetLoad={() => setCaptchaLoaded(true)} />
              <Skeleton className={`h-[65px] w-[300px] rounded-md ${captchaLoaded ? 'hidden' : ''}`} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <SubmitButton form="create" disabled={!challengeSucess}>Save</SubmitButton>
      </CardFooter>
    </Card>
  );
}
