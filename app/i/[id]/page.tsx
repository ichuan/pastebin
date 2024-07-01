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
import { getDateString } from "@/app/utils"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { PastebinWithTs } from "@/app/definitions"
import CopyToClipBoard from "@/components/copy-to-clipboard"

export const runtime = 'edge'


const Detail = ({ pastebin }: { pastebin: PastebinWithTs }) => {
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
                <pre className="text-wrap">{pastebin.content}</pre>
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
    return (
        <div className="container max-w-screen-xl items-center mt-4">
            {loading ? (
                <Skeleton className="h-[400px] w-full rounded-xl" />
            ) : (
                <Detail pastebin={pastebin} />
            )}
        </div>
    )
}