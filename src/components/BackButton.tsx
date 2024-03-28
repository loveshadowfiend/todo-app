import { useGlobalStore } from "../stores/globalStore";

export const BackButton = () => {
    return (
        <button
            className="task-view__buttons-back"
            onClick={() => {
                useGlobalStore.setState({
                    isTaskViewActive: false,
                    isEditActive: false,
                    isAddTaskActive: false,
                });
            }}
        >
            Назад
        </button>
    );
};
