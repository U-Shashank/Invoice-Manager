"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react"

const SubmitButton = ({text} : {text: string}) => {
  const {pending} = useFormStatus();  
  return (
    pending ? (
        <Button disabled><Loader2 className="size-4 mr-2 animate-spin"/>Please wait...</Button>
    )
    :
    (
        <Button type="submit" className="w-full">{text}</Button>
    )
  )
}

export default SubmitButton