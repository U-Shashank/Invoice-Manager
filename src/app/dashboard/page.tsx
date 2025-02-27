import DashboardBlocks from "@/components/DashboardBlocks"
import { signOut } from "@/utils/auth"
import { requireUser } from "@/utils/hooks"

const Dashboard = async () => {
    const session = await requireUser()
    return (
        <>
            <DashboardBlocks />
            <div className="grid gap-4 lg:grid-cols-23 md:gap-8">
                <h1 className="col-span-2"></h1>
                <h1 className="col-span-1"></h1>
            </div>
        </>
    )
}

export default Dashboard