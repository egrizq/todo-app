import AllTodoList from "@/components/ListData";
import FinishedTodoList from "@/components/FinishedTodo";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Profile } from "@/components/Profile";
import { TodoInput } from "@/components/InputToDo";

export default async function Home() {
    const session = await auth()

    if (!session?.user) {
        redirect(`/login`);
    }
    const { email, name, image } = session.user

    return (
        <main className="container mx-auto">
            <div className="flex justify-center">
                <div className="flex flex-col w-10/12 sm:w-9/12 md:w-9/12 lg:w-6/12 xl:w-5/12 space-y-4 py-10">

                    <Profile name={name!} image={image!} />
                    <TodoInput email={email!} />
                    <AllTodoList email={email!} />
                    <FinishedTodoList email={email!} />

                </div>
            </div>
        </main>
    );
}
