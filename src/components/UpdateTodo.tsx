"use server"

import { countTask, deleteTodo, revertFinishedTodo, updateStatusTodo, updateTodoTask } from "@/auth/todo";
import { revalidatePath } from "next/cache";

export async function UpdateTodo(id: number) {
    await updateStatusTodo(id)
    revalidatePath("/")
}

export async function Revert(formData: FormData) {
    const id = formData.get("id") as string;
    await revertFinishedTodo(Number(id));
    revalidatePath("/");
}

export async function DeleteTodo(formData: FormData) {
    const id = formData.get("id") as string;
    await deleteTodo(Number(id));
    revalidatePath("/");
}

export async function updateTodoMessage(formData: FormData) {
    const id = formData.get("id") as string;
    const msg = formData.get("message") as string;
    await updateTodoTask(msg, Number(id));
    revalidatePath("/");
}

export async function GetCountTask() {
    const { todoCount, doneCount } = await countTask();

    return (
        <>
            <div className="flex flex-row justify-center text-sm pt-3 space-x-2">
                <div className="flex flex-row">
                    <div className="p-1 bg-red-400 rounded-l-md">
                        ToDo
                    </div>
                    <div className=" p-1 bg-red-500 rounded-r-md">
                        {todoCount}
                    </div>
                </div>

                <div className="flex flex-row">
                    <div className="p-1 bg-emerald-300 rounded-l-md">
                        Finish
                    </div>
                    <div className=" p-1 bg-emerald-400 rounded-r-md">
                        {doneCount}
                    </div>
                </div>
            </div>

        </>
    )
}