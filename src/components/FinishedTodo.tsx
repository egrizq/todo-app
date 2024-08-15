import { finishTodoList } from "@/auth/todo";
import Image from "next/image";
import { Revert } from "./UpdateTodo";

async function FinishedTodoList() {
    const todoItems = await finishTodoList();

    return (
        <div className="space-y-3">
            <p className="mx-2 font-semibold text-2xl">
                {todoItems.length === 0 ? "" : "Finished Task"}
            </p>

            <div className="mx-5 space-y-1">

                {todoItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center text-xl"
                    >

                        <form
                            action={Revert}
                            className="flex flex-row"
                        >

                            <input name="id" value={item.id} type="hidden" readOnly />

                            <button type="submit" className="px-1">
                                <Image
                                    src={"/refresh.svg"}
                                    width={25}
                                    height={20}
                                    alt={item.message}
                                    className="transition-transform duration-150 ease-in-out transform hover:scale-125"
                                />
                            </button>

                            <p><s>{item.message}</s></p>
                        </form>
                    </div>
                ))}

            </div>

        </div>
    );
};


export default FinishedTodoList;