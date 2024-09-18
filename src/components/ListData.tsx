import { getTodoList } from "@/db/todo";
import { TodoAction } from "./TodoAction";

async function AllTodoList(data: { email: string }) {
    const todoItems = await getTodoList(data.email);

    return (
        <div className="space-y-3 pt-2">
            <div className="flex justify-between">
                {todoItems.length === 0 ? null :
                    <>
                        <p className="font-semibold text-base sm:text-xl md:text-2xl">
                            Task
                        </p>

                        <div className="flex flex-row text-sm">
                            <div className="p-1 bg-red-400 rounded-l-md">
                                Todo
                            </div>
                            <div className="p-1 bg-red-500 rounded-r-md">
                                {todoItems.length}
                            </div>
                        </div>
                    </>
                }
            </div>

            <div className="ml-4 text-sm sm:text-sm md:text-base lg:text-lg space-y-2">
                {todoItems.map((item) => (
                    <TodoAction key={item.id} item={item} />
                ))}
            </div>

        </div>
    );
};


export default AllTodoList;