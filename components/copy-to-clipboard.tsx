import { Copy, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import Tooltip from "@/components/tooltip"

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
        <Tooltip onClick={setClipboard} trigger={copied ? (
            <Check size={14} />
        ) : (
            <Copy size={14} />
        )} tooltip={'Copy content to clipboard'}>

        </Tooltip>
    )
}
