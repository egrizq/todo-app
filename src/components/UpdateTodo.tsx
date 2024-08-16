"use server"

import { deleteTodo, revertFinishedTodo, updateStatusTodo, updateTodoTask } from "@/db/todo";
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