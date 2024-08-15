import { getTodoList } from "@/auth/todo";
import { TodoAction } from "./TodoAction";

async function AllTodoList() {
    const todoItems = await getTodoList();

    return (
        <div className="mx-2 space-y-3">
            <p className="font-semibold text-2xl">{todoItems.length === 0 ? "" : "Task"}</p>

            <div className="mx-5 space-y-2">
                {todoItems.map((item) => (
                    <TodoAction key={item.id} item={item} />
                ))}
            </div>

        </div>
    );
};


export default AllTodoList;