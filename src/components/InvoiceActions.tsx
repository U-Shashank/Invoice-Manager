import { CheckCircle, DownloadCloudIcon, Mail, MoreHorizontal, Pencil, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import Link from "next/link"

const InvoiceActions = () => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button size="icon" variant="secondary">
                <MoreHorizontal className="size-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
                <Link href="">
                    <Pencil size="4"  className="mr-2" /> Edit Invoice
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="">
                    <DownloadCloudIcon size="4"  className="mr-2" /> Download Invoice
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="">
                    <Mail size="4"  className="mr-2" /> Remainder Email
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="">
                    <Trash size="4"  className="mr-2" /> Delete Invoice
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="">
                    <CheckCircle size="4"  className="mr-2" /> Mark as Paid
                </Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default InvoiceActions