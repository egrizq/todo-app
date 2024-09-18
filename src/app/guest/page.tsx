"use client";

import { useOptimistic, useRef, useState } from "react";

type Item = {
    id: number;
    item: string;
}

export default function Guest() {
    let initialItems: Item[] = [
        { id: 1, item: "pulpen" },
        { id: 2, item: "penghapus" },
        { id: 3, item: "pensil" },
        { id: 4, item: "penggaris" },
    ]
    const [items, setItems] = useState<Item[]>(initialItems)
    const formRef = useRef<HTMLFormElement>(null)

    const [optimisticItems, addOptimisticUpdate] = useOptimistic(
        items,
        (state: Item[], newItem: string) => [
            ...state,
            { id: Date.now(), item: newItem }
        ]
    )

    const addItems = async (formData: FormData) => {
        const item = formData.get("item") as string;
        const newItem = { id: Date.now(), item };
        addOptimisticUpdate(item)
        formRef.current?.reset()

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setItems((currentItems) => [...currentItems, newItem]);
        } catch (error) {
            // Handle error (e.g., show error message)
            console.error('Failed to add todo:', error);
        }
    }

    return (
        <>
            <form ref={formRef} action={addItems} className="space-x-4 py-5 mx-5">

                <input
                    name="item"
                    placeholder="New task..."
                    className="border border-black rounded-md py-1 px-2 w-3/12"
                />

                <button type="submit" className="py-1 px-2 border border-black rounded-md">add</button>

            </form>

            <ul className="list-disc">
                {optimisticItems.map(data => (
                    <li key={data.id} className="mx-10">
                        {data.item}
                    </li>
                ))}
            </ul>
        </>
    )
}
