"use client";

import Image from "next/image";
import { useFormStatus } from "react-dom";

export default function FinishedButton(item: { message: string }) {
    const { pending } = useFormStatus();

    return (
        <>
            {!pending ?
                <button type="submit" className="px-1 w-1/12">
                    <Image
                        src={"/refresh.svg"}
                        width={25}
                        height={20}
                        alt={item.message!}
                        className="transition-transform duration-150 ease-in-out transform hover:scale-125"
                    />
                </button> :

                <span className="ml-1 mr-4"> ⏳</span>
            }
        </>
    )
}