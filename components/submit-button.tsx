'use client'
 
import { useFormStatus } from 'react-dom'
import { Loader2 } from "lucide-react"
import { Button, ButtonProps } from "@/components/ui/button"

 
export function SubmitButton(props: ButtonProps) {
  const { pending } = useFormStatus()
  const {children, ...newProps} = props
 
  return (
    <Button type="submit" disabled={pending} {...newProps}>
      { pending? (
        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</>
      ) : children }
    </Button>
  )
}