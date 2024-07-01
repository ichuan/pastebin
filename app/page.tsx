'use client'

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "@/components/submit-button"
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { toast } from "sonner"

export const runtime = 'edge';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function NewPastebin() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const res = await fetch('/api/pastebin', {
      body: JSON.stringify({ name, content }),
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
              <Input id="name" name="name" type="text" placeholder="Filename including extension…" autoFocus required onChange={e => setName(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" name="content" className="min-h-96" required onChange={e => setContent(e.target.value)} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <SubmitButton form="create">Save</SubmitButton>
      </CardFooter>
    </Card>
  );
}
