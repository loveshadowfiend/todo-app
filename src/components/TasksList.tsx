import { TaskCard } from "./TaskCard";
import { useGlobalStore } from "../stores/globalStore";
import { Task } from "../types/task";

export const TasksList = () => {
    const { tasks, sortOptions, tagOptions, page } = useGlobalStore();
    const tasksPerPage = 15;

    return (
        <div className="task-board__tasks">
            {tasks
                .sort((a: Task, b: Task) => {
                    const aDate: Date = new Date(a.creationDate);
                    const bDate: Date = new Date(b.creationDate);

                    if (sortOptions.get("sortDateNew")) {
                        return bDate.getTime() - aDate.getTime();
                    } else {
                        return aDate.getTime() - bDate.getTime();
                    }
                })
                .slice(0, page * tasksPerPage - 1)
                .map((task, index) => {
                    let toRender: boolean = true;

                    if (!tagOptions.get(task.priority)) {
                        toRender = false;
                    }

                    task.tags.forEach((element) => {
                        if (!tagOptions.get(element)) {
                            toRender = false;
                        }
                    });

                    return toRender ? (
                        <TaskCard key={index} task={task} />
                    ) : null;
                })}
        </div>
    );
};
