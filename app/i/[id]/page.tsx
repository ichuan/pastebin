'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getDateString, getLanguageByFilename } from "@/app/utils"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { PastebinWithTs } from "@/app/definitions"
import CopyToClipBoard from "@/components/copy-to-clipboard"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark, coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from "next-themes"



export const runtime = 'edge'


const Detail = ({ pastebin }: { pastebin: PastebinWithTs }) => {
    const language = getLanguageByFilename(pastebin.name)
    const { theme, setTheme } = useTheme()
    return (
        <Card>
            <CardHeader className="space-y-0 flex flex-row justify-between">
                <div className="grid gap-2">
                    <CardTitle>{pastebin.name}</CardTitle>
                    <CardDescription>Created at {getDateString(pastebin.ts)}</CardDescription>
                </div>
                <div><CopyToClipBoard value={pastebin.content} /></div>
            </CardHeader>
            <CardContent>
                <SyntaxHighlighter language={language} style={theme === 'dark' ? coldarkDark : coldarkCold} wrapLongLines={true} customStyle={{ background: 'inherit', padding: 0, margin: 0 }}>
                    {pastebin.content}
                </SyntaxHighlighter>
            </CardContent>
        </Card>
    )
}


export default function PastebinDetail({ params }: { params: { id: string } }) {
    const [pastebin, setPastebin] = useState({} as PastebinWithTs)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchItem = async () => {
            const res = await fetch(`/api/pastebin/${params.id}`);
            if (res.ok) {
                setPastebin(await res.json())
                setLoading(false)
            } else {
                const data: { error: string } = await res.json()
                toast('Error', { description: data.error })
            }

        }
        fetchItem().catch((e) => {
            toast('Error', { description: e })
        })
    }, [params.id])
    return loading ? (
        <Skeleton className="h-[400px] w-full rounded-xl" />
    ) : (
        <Detail pastebin={pastebin} />
    )
}