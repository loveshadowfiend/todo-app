import React, { SetStateAction, useEffect, useState } from "react";
import { Priorities } from "./Priorities";
import { Tags } from "./Tags";
import { Tasks } from "./Tasks";
import { Task } from "../types/task";
import { SortDate } from "./SortDate";

interface TaskBoardProps {
    tasks: Task[];
    setIsAddTaskActive: React.Dispatch<SetStateAction<boolean>>;
    toggleTagOption: (option: string) => void;
    switchSortOption: (option: string) => void;
    page: number;
    tasksPerPage: number;
    options: Map<string, boolean>;
    setCurrentTask: React.Dispatch<SetStateAction<Task>>;
    setIsTaskViewActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskBoard = (props: TaskBoardProps) => {
    const [width, setWidth] = useState<number>(window.innerWidth);

    const isMobile = width < 768;

    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    };

    return (
        <>
            {isMobile && (
                <button
                    className="task-board__add-task-button"
                    onClick={() => props.setIsAddTaskActive(true)}
                >
                    Добавить задачу
                </button>
            )}
            <div className="task-board__options">
                <div className="task-board__options__sort container">
                    <SortDate switchSortOption={props.switchSortOption} />
                </div>
                <div className="task-board__options__filter container">
                    <Priorities toggleOption={props.toggleTagOption} />
                    <Tags toggleOption={props.toggleTagOption} />
                </div>
            </div>
            <div className="task-board__tasks">
                {!isMobile && (
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
        </>
    );
};
