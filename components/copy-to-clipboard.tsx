import { Clipboard, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


function setClipboard(text: string) {
    navigator.clipboard.writeText(text)
}

export default function CopyToClipBoard({ value }: { value: string }) {
    const [copied, setCopied] = useState(false)

    const setClipboard = () => {
        navigator.clipboard.writeText(value)
        setCopied(true)
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild><Button className="px-2 py-2 h-8" variant="ghost" onClick={setClipboard}>
                    {copied ? (
                        <Check size={14} />
                    ) : (
                        <Clipboard size={14} />
                    )}
                </Button></TooltipTrigger>
                <TooltipContent>
                    <p>Copy content to clipboard</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>


    )
}