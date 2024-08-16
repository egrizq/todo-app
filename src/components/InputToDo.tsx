'use client';

import { todoInsert } from "@/db/todo";
import { useFormState, useFormStatus } from "react-dom";
import { useRef } from 'react';

export function TodoInput(data: { email: string }) {
    const [state, action] = useFormState(todoInsert, undefined)
    const ref = useRef<HTMLFormElement>(null)

    const handleSubmit = async (formData: FormData) => {
        await action(formData);
        ref.current?.reset();
    };

    return (
        <>
            <form
                ref={ref}
                action={handleSubmit}>

                <input
                    name="email"
                    value={data.email}
                    className="border border-black p-2"
                    type="hidden"
                    readOnly
                />

                <input
                    name="todo"
                    placeholder="New task..."
                    className="border-y border-l border-black rounded-l-md py-1 px-2 w-11/12"
                />

                <SubmitButton />
            </form>

            {state?.message && (
                <p className="text-sm text-red-500 text-center">{state.message}</p>
            )}

        </>
    )
}

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className="w-1/12 border-y border-r border-black bg-gray-950 hover:bg-gray-900 rounded-r-md text-white py-1 px-2"
        >
            {pending ? "⌛" : "+"}
        </button>
    )
}