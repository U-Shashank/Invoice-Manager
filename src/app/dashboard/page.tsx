import { signOut } from "@/utils/auth"
import { requireUser } from "@/utils/hooks"

const Dashboard = async () => {
    const session = await requireUser()
    return (
        <>
            <div>Dashboard</div>
            <form
                action={async () => {
                    "use server"
                    await signOut()
                }}
            >
                <button type="submit">Sign Out</button>
            </form>
        </>
    )
}

export default Dashboard