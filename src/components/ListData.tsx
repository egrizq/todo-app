import { countTask, getTodoList } from "@/db/todo";
import { TodoAction } from "./TodoAction";

async function AllTodoList(data: { email: string }) {
    const todoItems = await getTodoList(data.email);
    const { todoCount } = await countTask(data.email);

    return (
        <div className="space-y-3 pt-2">
            <div className="flex justify-between">
                <p className="font-semibold text-base sm:text-2xl">
                    {todoItems.length === 0 ? "" : "Task"}
                </p>

                {todoItems.length === 0 ? null :
                    <div className="flex flex-row text-sm">
                        <div className="p-1 bg-red-400 rounded-l-md">
                            Todo
                        </div>
                        <div className="p-1 bg-red-500 rounded-r-md">
                            {todoCount}
                        </div>
                    </div>
                }
            </div>

            <div className="ml-5 text-sm sm:text-base space-y-2">
                {todoItems.map((item) => (
                    <TodoAction key={item.id} item={item} />
                ))}
            </div>

        </div>
    );
};


export default AllTodoList;