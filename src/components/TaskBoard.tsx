import { Tasks } from "./Tasks";
import { useAppStore } from "../stores/AppStore";
import { useEffect, useState } from "react";
import { SortDate } from "./SortDate";
import { Priorities } from "./Priorities";
import { Tags } from "./Tags";

// interface TaskBoardProps {
//     tasks: Task[];
//     setIsAddTaskActive: React.Dispatch<SetStateAction<boolean>>;
//     toggleTagOption: (option: string) => void;
//     switchSortOption: (option: string) => void;
//     page: number;
//     tasksPerPage: number;
//     options: Map<string, boolean>;
//     setCurrentTask: React.Dispatch<SetStateAction<Task>>;
//     setIsTaskViewActive: React.Dispatch<React.SetStateAction<boolean>>;
// }

export const TaskBoard = () => {
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
                    onClick={() =>
                        useAppStore.setState({ isAddTaskActive: true })
                    }
                >
                    Добавить задачу
                </button>
            )}
            <div className="task-board__options">
                <div className="task-board__options__sort container">
                    <SortDate />
                </div>
                <div className="task-board__options__filter container">
                    <Priorities />
                    <Tags />
                </div>
            </div>
            <div className="task-board__tasks">
                {!isMobile && (
                    <button
                        className="task-board__add-task-button"
                        onClick={() =>
                            useAppStore.setState({ isAddTaskActive: true })
                        }
                    >
                        Добавить задачу
                    </button>
                )}
                <Tasks />
            </div>
        </>
    );
};
