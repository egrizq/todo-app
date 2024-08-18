import { countTask, finishTodoList } from "@/db/todo";
import Image from "next/image";
import { Revert } from "./UpdateTodo";

async function FinishedTodoList(data: { email: string }) {
    const todoItems = await finishTodoList(data.email);
    const { doneCount } = await countTask(data.email);

    return (
        <div className="space-y-3">

            <div className="flex justify-between">
                <p className="font-semibold text-base sm:text-xl md:text-2xl">
                    {todoItems.length === 0 ? "" : "Finished Task"}
                </p>

                {todoItems.length === 0 ? null :
                    <div className="flex flex-row text-sm">
                        <div className="p-1 bg-emerald-300 rounded-l-md">
                            Done
                        </div>
                        <div className=" p-1 bg-emerald-400 rounded-r-md">
                            {doneCount}
                        </div>
                    </div>
                }
            </div>

            <div className="mx-3 space-y-1">

                {todoItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center"
                    >

                        <form
                            action={Revert}
                            className="flex flex-row w-full"
                        >

                            <input name="id" value={item.id!} type="hidden" readOnly />

                            <button type="submit" className="px-1 w-1/12">
                                <Image
                                    src={"/refresh.svg"}
                                    width={25}
                                    height={20}
                                    alt={item.message!}
                                    className="transition-transform duration-150 ease-in-out transform hover:scale-125"
                                />
                            </button>

                            <p className="w-11/12 text-sm sm:text-base md:text-base lg:text-lg"><s>{item.message}</s></p>
                        </form>
                    </div>
                ))}

            </div>

        </div>
    );
};


export default FinishedTodoList;