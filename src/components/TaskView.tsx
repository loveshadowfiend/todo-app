import { useAppStore } from "../stores/AppStore";

export const TaskView = () => {
    const { currentTask, deleteTask } = useAppStore();

    return (
        <div className="task-view">
            <div className="task-view__buttons">
                <button
                    className="task-view__buttons-back"
                    onClick={() => {
                        useAppStore.setState({ isTaskViewActive: false });
                    }}
                >
                    Назад
                </button>
                <button
                    className="task-view__buttons-edit"
                    onClick={() => {
                        useAppStore.setState({
                            isTaskViewActive: false,
                            isEditActive: true,
                        });
                    }}
                >
                    Редактировать
                </button>
                <button
                    className="task-view__buttons-delete"
                    onClick={() => {
                        deleteTask(currentTask);
                        useAppStore.setState({
                            isTaskViewActive: false,
                        });
                    }}
                >
                    Удалить
                </button>
            </div>

            <div className="task-view__card container">
                <div className="task-view__card__row">
                    <h3>НАЗВАНИЕ ЗАДАЧИ</h3>
                    <p>{currentTask.name}</p>
                </div>

                <div className="task-view__card__row">
                    <h3>ДАТА СОЗДАНИЯ</h3>
                    <p>{currentTask.creationDate.toString()}</p>
                </div>

                <div className="task-view__card__row">
                    <h3>ПРИОРИТЕТ</h3>
                    <p>{currentTask.priority}</p>
                </div>

                <div className="task-view__card__row">
                    <h3>ОТМЕТКИ</h3>
                    <p>{currentTask.tags.join(" ")}</p>
                </div>

                <div className="task-view__card__row">
                    <h3>ОПИСАНИЕ</h3>
                    <p>{currentTask.description}</p>
                </div>
            </div>
        </div>
    );
};
