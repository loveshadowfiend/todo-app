import React, { SetStateAction } from "react";
import { Priorities } from "./Priorities";
import { Tags } from "./Tags";
import { Tasks } from "./Tasks";
import { Task } from "../types/task";

interface TaskBoardProps {
    tasks: Task[];
    isMobile: boolean;
    setIsAddTaskActive: React.Dispatch<SetStateAction<boolean>>;
    toggleOption: (option: string) => void;
    page: number;
    tasksPerPage: number;
    options: Map<string, boolean>;
    setCurrentTask: React.Dispatch<SetStateAction<Task | null>>;
    setIsTaskViewActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskBoard = (props: TaskBoardProps) => {
    return (
        <div className="task-board">
            {props.isMobile && (
                <button
                    className="task-board__add-task-button"
                    onClick={() => props.setIsAddTaskActive(true)}
                >
                    Добавить задачу
                </button>
            )}
            <div className="task-board__options container">
                <Priorities toggleOption={props.toggleOption} />
                <Tags toggleOption={props.toggleOption} />
            </div>
            <div className="task-board__tasks">
                {!props.isMobile && (
                    <button
                        className="task-board__add-task-button"
                        onClick={() => props.setIsAddTaskActive(true)}
                    >
                        Добавить задачу
                    </button>
                )}
                <Tasks
                    key="1"
                    tasks={props.tasks.slice(
                        0,
                        props.page * props.tasksPerPage - 1
                    )}
                    options={props.options}
                    setCurrentTask={props.setCurrentTask}
                    setIsTaskViewActive={props.setIsTaskViewActive}
                />
            </div>
        </div>
    );
};
