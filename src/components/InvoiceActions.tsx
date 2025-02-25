"use client"

import { CheckCircle, DownloadCloudIcon, Mail, MoreHorizontal, Pencil, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import Link from "next/link"
import { toast } from "sonner"

interface iAppProps {
    id: string
    status: string
}

const InvoiceActions = ({ id, status }: iAppProps) => {
    const handleSendRemainder = () => {
        toast.promise(fetch(`http://localhost:3000/api/email/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            }
        }), {
            loading: 'Sending remainder email...',
            success: 'Reaminder email Sent',
            error: 'Failed to send email'
        })
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary">
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/invoices/${id}`}>
                        <Pencil size="4" className="mr-2" /> Edit Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`http://localhost:3000/api/invoice/${id}`} target="_blank">
                        <DownloadCloudIcon size="4" className="mr-2" /> Download Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSendRemainder}>
                    <Mail size="4" className="mr-2" /> Remainder Email
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/invoices/${id}/delete`}>
                        <Trash size="4" className="mr-2" /> Delete Invoice
                    </Link>
                </DropdownMenuItem>
                {status !== "PAID" && (
                    <DropdownMenuItem asChild>
                        <Link href={`/dashboard/invoices/${id}/paid`}>
                            <CheckCircle className="size-4 mr-2" /> Mark as Paid
                        </Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default InvoiceActions