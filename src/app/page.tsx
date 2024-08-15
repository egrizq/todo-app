import AllTodoList from "@/components/ListData";
import { TodoInput } from "./form";
import FinishedTodoList from "@/components/FinishedTodo";
import { GetCountTask } from "@/components/UpdateTodo";

export default function Home() {
    return (
        <main className="container mx-auto">
            <div className="flex justify-center">
                <div className="flex flex-col w-5/12 space-y-4 py-10">

                    <div className="text-center">
                        <p className="text-3xl font-bold">TODO LIST</p>

                        <GetCountTask />
                    </div>

                    <TodoInput />

                    <AllTodoList />

                    <FinishedTodoList />
                </div>
            </div>
        </main>
    );
}
