import { TaskCard } from "./TaskCard";
import { useGlobalStore } from "../stores/globalStore";

export const Tasks = () => {
    const { tasks, tagOptions, page } = useGlobalStore();
    const tasksPerPage = 15;

    tasks.slice(0, page * tasksPerPage - 1);

    return (
        <div className="task-board__tasks">
            {tasks.map((task, index) => {
                let toRender: boolean = true;

                if (!tagOptions.get(task.priority)) {
                    toRender = false;
                }

                task.tags.forEach((element) => {
                    if (!tagOptions.get(element)) {
                        toRender = false;
                    }
                });

                return toRender ? <TaskCard key={index} task={task} /> : null;
            })}
        </div>
    );
};
