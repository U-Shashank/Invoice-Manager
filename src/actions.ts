"use server"

import { requireUser } from "@/utils/hooks"
import { invoiceSchema, onboardingSchema } from "./utils/zodSchema"
import { parseWithZod } from "@conform-to/zod"
import prisma from "./utils/db"
import { redirect } from "next/navigation"
import { emailClient } from "./utils/mailtrap"
import { formatCurrency } from "./utils/currencyFormat"

export const onboardUser = async (prevState: any, formData: FormData) => {
    const session = await requireUser()

    const submission = parseWithZod(formData, {
        schema: onboardingSchema
    })

    if (submission.status !== "success") {
        return submission.reply()
    }

    const data = await prisma.user.update({
        where: {
            id: session.user?.id
        },
        data: {
            firstName: submission.value.firstName,
            lastName: submission.value.lastName,
            address: submission.value.address
        }
    })

    return redirect("/dashboard")
}

export const createInvoice = async (prevState: any, formData: FormData) => {
    const session = await requireUser()

    const submission = parseWithZod(formData, {
        schema: invoiceSchema
    })

    if (submission.status !== "success") {
        return submission.reply()
    }

    const data = await prisma.invoice.create({
        data: {
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            currency: submission.value.currency,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromEmail: submission.value.fromEmail,
            fromName: submission.value.fromName,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            invoiceName: submission.value.invoiceName,
            invoiceNumber: submission.value.invoiceNumber,
            note: submission.value.note,
            status: submission.value.status,
            total: submission.value.total,
            userId: session.user?.id
        }
    })

    const sender = {
        email: "hello@invoicemanager.shashankupadhyay.dev",
        name: "Invoice Manager"
    }

    emailClient.send({
        from: sender,
        to: [{ email: submission.value.clientEmail }],
        template_uuid: "e7d1f8a8-9388-4f26-bd8a-82ea376f08f8",
        template_variables: {
            "clientName": submission.value.clientName,
            "invoiceNumber": submission.value.invoiceNumber,
            "dueDate": new Intl.DateTimeFormat('en-US', {
                dateStyle: "long",
            }).format(new Date(submission.value.dueDate)),
            "totalAmount": formatCurrency({ amount: submission.value.total, currency: submission.value.currency as any }),
            "invoiceLink": `http://localhost:3000/api/invoice/${data.id}`

        }
    })

    return redirect("/dashboard/invoices")
}

export const editInvoice = async (prevState: any, formData: FormData) => {
    const session = await requireUser()

    const submission = parseWithZod(formData, {
        schema: invoiceSchema
    })

    if (submission.status !== "success") {
        return submission.reply()
    }

    const data = await prisma.invoice.update({
        where: {
            id: formData.get("id") as string,
            userId: session.user?.id
        },
        data: {
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            currency: submission.value.currency,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromEmail: submission.value.fromEmail,
            fromName: submission.value.fromName,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            invoiceName: submission.value.invoiceName,
            invoiceNumber: submission.value.invoiceNumber,
            note: submission.value.note,
            status: submission.value.status,
            total: submission.value.total,
        }
    })

    const sender = {
        email: "hello@invoicemanager.shashankupadhyay.dev",
        name: "Invoice Manager"
    }

    emailClient.send({
        from: sender,
        to: [{ email: submission.value.clientEmail }],
        template_uuid: "b55135fc-e504-4863-854d-2e5e377da8c4",
        template_variables: {
            "clientName": submission.value.clientName,
            "invoiceNumber": submission.value.invoiceNumber,
            "dueDate": new Intl.DateTimeFormat('en-US', {
                dateStyle: "long",
            }).format(new Date(submission.value.dueDate)),
            "totalAmount": formatCurrency({ amount: submission.value.total, currency: submission.value.currency as any }),
            "invoiceLink": `http://localhost:3000/api/invoice/${data.id}`

        }
    })

    return redirect("/dashboard/invoices")
}

export const deleteInvoice = async (invoiceId: string) => {
    const session = await requireUser();

    const data = await prisma.invoice.delete({
        where: {
            userId: session.user?.id,
            id: invoiceId,
        },
    });

    return redirect("/dashboard/invoices");
}

export const markAsPaid = async (invoiceId: string) => {
    const session = await requireUser();

    const data = await prisma.invoice.update({
        where: {
            userId: session.user?.id,
            id: invoiceId,
        },
        data: {
            status: "PAID",
        },
    });

    return redirect("/dashboard/invoices");
}