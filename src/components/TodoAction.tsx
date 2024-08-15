"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { UpdateTodo, DeleteTodo, updateTodoMessage } from "./UpdateTodo";
import Image from "next/image";

interface TypeTodo {
    message: string;
    id: number;
    status: string;
}

export function TodoAction(item: { item: TypeTodo }) {
    let status = item.item.status === "todo" ? false : true

    const [isEdit, setIsEdit] = useState(false);
    const [isChecked, setIsChecked] = useState(status);

    const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    }

    const [todoMessage, setTodoMessage] = useState(item.item.message);
    const handleUpdateTask = (event: ChangeEvent<HTMLInputElement>) => {
        setTodoMessage(event.target.value);
    };

    useEffect(() => {
        if (isChecked) {
            UpdateTodo(item.item.id);
        }
    }, [isChecked])

    return (
        <>
            <div
                key={item.item.id}
                className="flex items-center text-xl relative group">

                {isEdit ?
                    <div className="w-full flex flex-row space-x-1">
                        <button
                            className="transition-transform duration-150 ease-in-out transform hover:scale-125"
                            onClick={() => setIsEdit(isChecked)}
                        >
                            <Image
                                src={"/cancel_editt.svg"}
                                width={20}
                                height={20}
                                alt="cancel"
                            />
                        </button>

                        <form
                            className="w-11/12 flex flex-row items-center border-b border-gray-300 space-x-2"
                            onSubmit={(e: FormEvent<HTMLFormElement>) => {
                                e.preventDefault();
                                updateTodoMessage(new FormData(e.currentTarget));
                                setIsEdit(isChecked);
                            }}
                        >

                            <input
                                className="w-full"
                                type="text"
                                name="message"
                                value={todoMessage}
                                onChange={handleUpdateTask}
                            />

                            <input
                                type="hidden"
                                name="id"
                                value={item.item.id}
                                readOnly
                            />
                        </form>
                    </div>

                    : // seperator

                    <div className="flex flex-row items-center w-10/12 space-x-2">
                        <input
                            type="checkbox"
                            name="check"
                            checked={isChecked}
                            onChange={handleCheckBox}
                            className="accent-emerald-500/25 w-5 h-5"
                        />

                        <label htmlFor="check">
                            {isChecked ? <s>{item.item.message}</s> : item.item.message}
                        </label>
                    </div>
                }

                {isEdit ?
                    null :
                    <div className="flex flex-row absolute right-0 opacity-0 space-x-2 group-hover:opacity-100 transition-opacity duration-150 ease-in-out items-center text-base">
                        <DeleteAction id={item.item.id} />

                        <button
                            onClick={() => setIsEdit(!isChecked)}
                            className="hover:bg-black hover:text-white border-black border items-center px-2 pb-1 rounded-md"
                        >
                            Edit
                        </button>
                    </div>
                }
            </div>
        </>
    )
}

const DeleteAction = (id: { id: number }) => {
    return (
        <>
            <form action={DeleteTodo}>
                <input name="id" value={id.id} type="hidden" readOnly />

                <button
                    type="submit"
                    className="hover:bg-red-600 bg-red-500 text-white px-2 pb-1 rounded-md"
                >
                    x
                </button>
            </form>
        </>
    )
}