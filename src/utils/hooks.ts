import { redirect } from "next/navigation"
import { auth } from "./auth"

const requireUser = async () => {
    const session = await auth()

    if(!session?.user) {
        redirect("/login")
    }

    return session
}

export { requireUser }