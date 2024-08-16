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

    return (
        <main className="container mx-auto">
            <div className="flex justify-center">
                <div className="flex flex-col w-10/12 sm:w-5/12 space-y-4 py-10">

                    <Profile name={session.user.name!} image={session.user.image!} />
                    <TodoInput email={session.user.email!} />
                    <AllTodoList email={session.user.email!} />
                    <FinishedTodoList email={session.user.email!} />

                </div>
            </div>
        </main>
    );
}
