import React from "react";
import { Task } from "../types/task";
import { TaskCard } from "./TaskCard";

interface TasksProps {
    tasks: Task[];
    options: Map<string, boolean>;
    setCurrentTask: React.Dispatch<React.SetStateAction<Task | null>>;
    setIsTaskViewActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Tasks = (props: TasksProps) => {
    return (
        <div className="task-board__tasks">
            {props.tasks.map((task, index) => {
                let toRender: boolean = true;

                if (!props.options.get(task.priority)) {
                    toRender = false;
                }

                task.tags.forEach((element) => {
                    if (!props.options.get(element)) {
                        toRender = false;
                    }
                });

                return toRender ? (
                    <TaskCard
                        key={index}
                        task={task}
                        setCurrentTask={props.setCurrentTask}
                        setIsTaskViewActive={props.setIsTaskViewActive}
                    />
                ) : null;
            })}
        </div>
    );
};
