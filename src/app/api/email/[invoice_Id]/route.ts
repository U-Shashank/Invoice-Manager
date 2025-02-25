import prisma from "@/utils/db";
import { requireUser } from "@/utils/hooks"
import { emailClient } from "@/utils/mailtrap";
import { NextResponse } from "next/server";

const POST = async (_request: Request, {
  params,
}: {
  params: Promise<{ invoice_Id: string }>;
}) => {
    try {
    const session = await requireUser();
    const { invoice_Id } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoice_Id,
        userId: session.user?.id
      },
      select: {
        clientEmail: true,
        invoiceNumber: true,
        clientName: true,
      }
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@invoicemanager.shashankupadhyay.dev",
      name: "Invoice Manager"
    };

    emailClient.send({
      from: sender,
      to: [{ email: invoiceData.clientEmail }],
      template_uuid: "a517d409-3840-440b-a118-52ce13837d62",
      template_variables: {
        "first_name": invoiceData.clientName
      }

    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Failed to send email reminder" }, { status: 500 });
  }
};

export { POST };