import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"


export default function ToolTip({ onClick, trigger, tooltip }: { onClick: () => void, trigger: React.ReactElement, tooltip: React.ReactElement | string }): any {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="px-2 py-2 h-8" variant="ghost" onClick={onClick}>{trigger}</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}