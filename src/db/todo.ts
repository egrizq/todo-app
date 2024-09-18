"use server";

import { db } from "@/db";
import { todoTable, users } from "@/db/schema";
import { and, count, desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { todo } from "node:test";

type Actions =
  | {
      message?: string;
    }
  | undefined;

function validateTodoInput(todo: string, email: string) {
  if (!todo) {
    return {
      message: "Task should not be empty!",
    };
  }

  if (todo.length <= 4) {
    return {
      message: "Task should be more than 4 characters!",
    };
  }

  if (!email) {
    return {
      message: "User ID is missing!",
    };
  }

  return null;
}

export async function todoInsert(
  state: any,
  formData: FormData
): Promise<Actions> {
  const todo = formData.get("todo") as string;
  const email = formData.get("email") as string;

  const check = validateTodoInput(todo, email);
  if (check) return { message: check.message };

  const getUserId = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email));
  const { id } = getUserId[0];

  await db.insert(todoTable).values({
    message: todo,
    status: "todo",
    userId: id,
  });

  revalidatePath("/");
}

export async function getTodoList(email: string) {
  return await db
    .select({
      message: todoTable.message,
      id: todoTable.id,
      status: todoTable.status,
    })
    .from(todoTable)
    .fullJoin(users, eq(todoTable.userId, users.id))
    .where(and(eq(todoTable.status, "todo"), eq(users.email, email)))
    .orderBy(desc(todoTable.updatedAt));
}

export async function updateStatusTodo(id: number) {
  return await db
    .update(todoTable)
    .set({ status: "done" })
    .where(eq(todoTable.id, id));
}

export async function finishTodoList(email: string) {
  return await db
    .select({
      message: todoTable.message,
      id: todoTable.id,
      status: todoTable.status,
    })
    .from(todoTable)
    .fullJoin(users, eq(todoTable.userId, users.id))
    .where(and(eq(todoTable.status, "done"), eq(users.email, email)))
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
