import { TasksList } from "./TasksList";
import { useGlobalStore } from "../stores/globalStore";
import { SortOptions } from "./SortOptions";
import { Tags } from "./Tags";

export const TaskBoard = () => {
    const { isAddTaskActive, isEditActive, isTaskViewActive } =
        useGlobalStore();

    return (
        <div
            className={`task-board ${isAddTaskActive || isEditActive || isTaskViewActive ? "hidden" : ""}`}
        >
            <button
                className="task-board__add-task-button-mobile"
                onClick={() =>
                    useGlobalStore.setState({ isAddTaskActive: true })
                }
            >
                Добавить задачу
            </button>
            <div className="task-board__options">
                <div className="task-board__options__sort container">
                    <SortOptions />
                </div>
                <div className="task-board__options__filter container">
                    <Tags />
                </div>
            </div>
            <div className="task-board__tasks">
                <button
                    className="task-board__add-task-button-desktop"
                    onClick={() =>
                        useGlobalStore.setState({ isAddTaskActive: true })
                    }
                >
                    Добавить задачу
                </button>
                <TasksList />
            </div>
        </div>
    );
};
