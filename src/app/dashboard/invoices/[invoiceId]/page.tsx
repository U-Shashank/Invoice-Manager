import EditInvoice from "@/components/EditInvoice";
import prisma from "@/utils/db";
import { requireUser } from "@/utils/hooks";
import { notFound } from "next/navigation";

const getData = async (invoiceId: string, userId: string) => {
    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: userId
        }
    })

    if(!data) {
        return notFound();
    }

    return data;
}

type Params = Promise<{ invoiceId: string }>

const EditInvoiceRoute = async ({ params }: {params: Params}) => {
    const { invoiceId } = await params
    const session = await requireUser()
    const data = await getData(invoiceId, session.user?.id!)
    return (
        <EditInvoice data={data}/>
    )
}

export default EditInvoiceRoute;