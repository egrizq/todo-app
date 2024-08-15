"use server";

import { db } from "@/db";
import { todoTable } from "@/db/schema";
import { count, desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type Actions =
  | {
      message?: string;
    }
  | undefined;

export async function todoInsert(
  state: any,
  formData: FormData
): Promise<Actions> {
  const todo = formData.get("todo") as string;

  if (todo === "" || todo.length === 0) {
    return {
      message: "Should not be an empty data!",
    };
  }

  await db.insert(todoTable).values({ message: todo, status: "todo" });

  revalidatePath("/");
}

export async function getTodoList() {
  return await db
    .select({
      message: todoTable.message,
      id: todoTable.id,
      status: todoTable.status,
    })
    .from(todoTable)
    .where(eq(todoTable.status, "todo"))
    .orderBy(desc(todoTable.updatedAt));
}

export async function updateStatusTodo(id: number) {
  return await db
    .update(todoTable)
    .set({ status: "done" })
    .where(eq(todoTable.id, id));
}

export async function finishTodoList() {
  return await db
    .select({
      message: todoTable.message,
      id: todoTable.id,
      status: todoTable.status,
    })
    .from(todoTable)
    .where(eq(todoTable.status, "done"))
    .orderBy(desc(todoTable.updatedAt));
}

export async function revertFinishedTodo(id: number) {
  return await db
    .update(todoTable)
    .set({ status: "todo" })
    .where(eq(todoTable.id, id));
}

export async function deleteTodo(id: number) {
  return await db.delete(todoTable).where(eq(todoTable.id, id));
}

export async function updateTodoTask(message: string, id: number) {
  return await db
    .update(todoTable)
    .set({ message: message })
    .where(eq(todoTable.id, id));
}

export async function countTask() {
  const todoCount = await db
    .select({
      count: count(todoTable.id),
    })
    .from(todoTable)
    .where(eq(todoTable.status, "todo"));

  const doneCount = await db
    .select({
      count: count(todoTable.id),
    })
    .from(todoTable)
    .where(eq(todoTable.status, "done"));

  return {
    todoCount: todoCount[0].count,
    doneCount: doneCount[0].count,
  };
}
