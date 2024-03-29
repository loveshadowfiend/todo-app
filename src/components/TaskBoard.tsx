import { TasksList } from "./TasksList";
import { useGlobalStore } from "../stores/globalStore";
import { useEffect, useState } from "react";
import { SortOptions } from "./SortOptions";
import { Tags } from "./Tags";

export const TaskBoard = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const { isAddTaskActive, isEditActive, isTaskViewActive } =
        useGlobalStore();

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
        <div
            className={`task-board ${isAddTaskActive || isEditActive || isTaskViewActive ? "hidden" : ""}`}
        >
            {isMobile && (
                <button
                    className="task-board__add-task-button"
                    onClick={() =>
                        useGlobalStore.setState({ isAddTaskActive: true })
                    }
                >
                    Добавить задачу
                </button>
            )}
            <div className="task-board__options">
                <div className="task-board__options__sort container">
                    <SortOptions />
                </div>
                <div className="task-board__options__filter container">
                    <Tags />
                </div>
            </div>
            <div className="task-board__tasks">
                {!isMobile && (
                    <button
                        className="task-board__add-task-button"
                        onClick={() =>
                            useGlobalStore.setState({ isAddTaskActive: true })
                        }
                    >
                        Добавить задачу
                    </button>
                )}
                <TasksList />
            </div>
        </div>
    );
};
