import { auth, signIn } from "@/lib/auth"
import Image from "next/image"
import { redirect } from "next/navigation";

export default async function SignIn() {
    const session = await auth()

    if (session?.user) {
        redirect(`/`);
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen">

                <div className="container mx-auto">
                    <div className="flex justify-center ">

                        <div className="flex flex-col border border-gray-300 rounded-md p-3 w-4/12">

                            <div className="flex justify-center pb-3">
                                <p className="w-3/12 text-center border border-zinc-200 px-2 py-1 rounded-md text-sm">
                                    Start-ToDo
                                </p>
                            </div>

                            <p className="text-center text-3xl">
                                Your success story begins now! Join us!
                            </p>

                            <form
                                className="flex justify-center pt-8"
                                action={async () => {
                                    "use server"
                                    await signIn("google", { redirectTo: "/" })
                                }}
                            >
                                <button
                                    className="border border-gray-500 px-2 py-1 rounded-md hover:bg-black hover:text-white"
                                    type="submit"
                                >
                                    <div className="flex flex-row space-x-2">
                                        <Image
                                            src={"/google.svg"}
                                            width={25}
                                            height={25}
                                            alt="google icon"
                                        />

                                        <p>Sign In with Google</p>
                                    </div>
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 