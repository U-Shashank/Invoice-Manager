"use client"

import { CalendarIcon } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Calendar } from "./ui/calendar"
import { Textarea } from "./ui/textarea"
import { formatCurrency } from "@/utils/currencyFormat"
import SubmitButton from "./SubmitButton"
import { useActionState, useState } from "react"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { invoiceSchema } from "@/utils/zodSchema"
import { editInvoice } from "@/actions"
import { Prisma } from "@prisma/client"

interface iAppProps {
    data: Prisma.InvoiceGetPayload<{}>
}

const EditInvoice = ({ data }: iAppProps) => {

    const [lastResult, action] = useActionState(editInvoice, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: invoiceSchema
            })
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput"
    })

    const [selectedDate, setSelectedDate] = useState(data.date)
    const [rate, setRate] = useState(data.invoiceItemRate.toString())
    const [quantity, setQuantity] = useState(data.invoiceItemQuantity.toString())
    const [currency, setCurrency] = useState(data.currency)

    const calcualteTotal = (Number(quantity) || 0) * (Number(rate) || 0)
    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardContent className="p-6">
                <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
                    <input type="hidden" name={fields.date.name} value={selectedDate.toISOString()} />
                    <input type="hidden" name={fields.total.name} value={calcualteTotal} />
                    <input type="hidden" name="id" value={data.id} />
                    <div className="flex flex-col gap-1 w-fit mb-6">
                        <div className="flex items-center gap-4">
                            <Badge variant="secondary">Draft</Badge>
                            <Input
                                name={fields.invoiceName.name}
                                key={fields.invoiceName.key}
                                defaultValue={data.invoiceName}
                                placeholder="Test 123"
                            />
                        </div>
                        <p className="text-sm text-red-500">{fields.invoiceName.errors}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <Label>Invoice No.</Label>
                            <div className="flex">
                                <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">#</span>
                                <Input
                                    name={fields.invoiceNumber.name}
                                    key={fields.invoiceNumber.key}
                                    defaultValue={data.invoiceNumber}
                                    className="rounded-l-none"
                                    placeholder="5"
                                />
                            </div>
                            <p className="text-sm text-red-500">{fields.invoiceNumber.errors}</p>
                        </div>
                        <div>
                            <Label>Currency</Label>
                            <Select
                                name={fields.currency.name}
                                key={fields.currency.key}
                                defaultValue="INR"
                                onValueChange={(value) => setCurrency(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="SelectCurrency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USD">United States Dollar -- USD</SelectItem>
                                    <SelectItem value="EUR">Euro -- EUR</SelectItem>
                                    <SelectItem value="INR">Indian Rupee -- INR</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-red-500">{fields.currency.errors}</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <Label>From</Label>
                            <div className="space-y-2">
                                <Input
                                    name={fields.fromName.name}
                                    key={fields.fromName.key}
                                    placeholder="Your Name"
                                    defaultValue={data.fromName}
                                />
                                <p className="text-sm text-red-500">{fields.fromName.errors}</p>
                                <Input
                                    name={fields.fromEmail.name}
                                    key={fields.fromEmail.key}
                                    placeholder="Your Email"
                                    defaultValue={data.fromEmail}
                                />
                                <p className="text-sm text-red-500">{fields.fromEmail.errors}</p>
                                <Input
                                    name={fields.fromAddress.name}
                                    key={fields.fromAddress.key}
                                    placeholder="Your Address"
                                    defaultValue={data.fromAddress}
                                />
                                <p className="text-sm text-red-500">{fields.fromAddress.errors}</p>
                            </div>
                        </div>
                        <div>
                            <Label>To</Label>
                            <div className="space-y-2">
                                <Input
                                    name={fields.clientName.name}
                                    key={fields.clientName.key}
                                    defaultValue={data.clientName}
                                    placeholder="Client Name"
                                    />
                                <p className="text-sm text-red-500">{fields.clientName.errors}</p>
                                <Input
                                    name={fields.clientEmail.name}
                                    key={fields.clientEmail.key}
                                    defaultValue={data.clientEmail}
                                    placeholder="Client Email"
                                    />
                                <p className="text-sm text-red-500">{fields.clientEmail.errors}</p>
                                <Input
                                    name={fields.clientAddress.name}
                                    key={fields.clientAddress.key}
                                    defaultValue={data.clientAddress}
                                    placeholder="Client Address"
                                />
                                <p className="text-sm text-red-500">{fields.clientAddress.errors}</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <div>
                                <Label>Date</Label>
                            </div>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="secondary" className="w-[280px] text-left justify-start">
                                        <CalendarIcon />
                                        {
                                            selectedDate ? (
                                                new Intl.DateTimeFormat("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric"
                                                }).format(selectedDate)

                                            ) : "Pick a date"
                                        }
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar mode="single" selected={selectedDate}
                                        onSelect={(date) => setSelectedDate(date || new Date())} fromDate={new Date()} />
                                </PopoverContent>
                            </Popover>
                            <p className="text-sm text-red-500">{fields.date.errors}</p>
                        </div>
                        <div>
                            <Label>Invoice Due</Label>
                            <Select
                                name={fields.dueDate.name}
                                key={fields.dueDate.key}
                                defaultValue={data.dueDate.toString()}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select due date" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Due on Receipt</SelectItem>
                                    <SelectItem value="15">Next 15</SelectItem>
                                    <SelectItem value="30">Next 30</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-red-500">{fields.dueDate.errors}</p>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
                            <p className="col-span-6">Description</p>
                            <p className="col-span-2">Quantity</p>
                            <p className="col-span-2">Rate</p>
                            <p className="col-span-2">Amount</p>
                        </div>

                        <div className="grid grid-cols-12 gap-4 mb-4">
                            <div className="col-span-6">
                                <Textarea
                                    name={fields.invoiceItemDescription.name}
                                    key={fields.invoiceItemDescription.key}
                                    defaultValue={data.invoiceItemDescription}
                                    placeholder="Item name & description"
                                />
                                <p className="text-red-500 text-sm">
                                    {fields.invoiceItemDescription.errors}
                                </p>
                            </div>
                            <div className="col-span-2">
                                <Input
                                    name={fields.invoiceItemQuantity.name}
                                    key={fields.invoiceItemQuantity.key}
                                    type="number"
                                    placeholder="0"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                                <p className="text-red-500 text-sm">
                                    {fields.invoiceItemQuantity.errors}
                                </p>
                            </div>
                            <div className="col-span-2">
                                <Input
                                    name={fields.invoiceItemRate.name}
                                    key={fields.invoiceItemRate.key}
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    type="number"
                                    placeholder="0"
                                />
                                <p className="text-red-500 text-sm">
                                    {fields.invoiceItemRate.errors}
                                </p>
                            </div>
                            <div className="col-span-2">
                                <Input
                                    value={formatCurrency({
                                        amount: calcualteTotal,
                                        currency: currency as any,
                                    })}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <div className="w-1/3">
                            <div className="flex justify-between py-2">
                                <span>Subtotal</span>
                                <span>
                                    {formatCurrency({
                                        amount: calcualteTotal,
                                        currency: currency as any,
                                    })}
                                </span>
                            </div>
                            <div className="flex justify-between py-2 border-t">
                                <span>Total ({currency})</span>
                                <span className="font-medium underline underline-offset-2">
                                    {formatCurrency({
                                        amount: calcualteTotal,
                                        currency: currency as any,
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label>Note</Label>
                        <Textarea
                            name={fields.note.name}
                            key={fields.note.key}
                            defaultValue={data.note ?? undefined}
                            placeholder="Add your Notes right here..."
                        />
                        <p className="text-red-500 text-sm">{fields.note.errors}</p>
                    </div>

                    <div className="flex items-center justify-end mt-6">
                        <div>
                            <SubmitButton text="Update Invoice" />
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default EditInvoice