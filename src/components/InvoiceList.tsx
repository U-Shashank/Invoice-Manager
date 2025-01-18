import InvoiceActions from "./InvoiceActions"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

const InvoiceList = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV-0001</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>$100.00</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>12/12/2021</TableCell>
          <TableCell className="text-right">
            <InvoiceActions />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-0002</TableCell>
          <TableCell>Jane Doe</TableCell>
          <TableCell>$200.00</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>12/12/2021</TableCell>
          <TableCell className="text-right">
            <InvoiceActions />
          </TableCell>
        </TableRow>
        </TableBody>
    </Table>
  )
}

export default InvoiceList