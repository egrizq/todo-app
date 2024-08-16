import { signOut } from "@/lib/auth"
import Image from "next/image"

export async function Logout() {
    return (
        <>
            <form
                className="text-center"
                action={async () => {
                    "use server"
                    await signOut({ redirectTo: "/login" })
                }}
            >
                <button type="submit">
                    <Image
                        src={"/logout.svg"}
                        width={20}
                        height={20}
                        alt="logout"
                        className="pt-1"
                    />
                </button>
            </form>
        </>
    )
}