import { useEffect } from "react";
import { Task } from "./types/task";
import { TaskAddForm } from "./components/TaskAddForm";
import { TaskView } from "./components/TaskView";
import { TaskEditForm } from "./components/TaskEditForm";
import { useUpdateEffect } from "react-use";
import { TaskBoard } from "./components/TaskBoard";
import { useAppStore } from "./stores/AppStore";

const App = () => {
    // states
    const {
        tasks,
        isAddTaskActive,
        isTaskViewActive,
        isEditActive,
        isLoading,
        page,
    } = useAppStore();

    // effects
    useEffect(() => {
        // load tasks from local storage
        const localStorageDataTasks: string =
            localStorage.getItem("tasks") ?? "";

        if (localStorageDataTasks.length > 0) {
            const localStorageDataTasksParsed: Task[] = JSON.parse(
                localStorageDataTasks
            );

            useAppStore.setState({ tasks: localStorageDataTasksParsed });
        }

        // infinite scroll
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!isLoading) return;

        useAppStore.setState({ page: page + 1, isLoading: false });
    }, [isLoading]);

    useUpdateEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // handlers
    const handleScroll = () => {
        const scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;

        const scrollHeight =
            (document.documentElement &&
                document.documentElement.scrollHeight) ||
            document.body.scrollHeight;

        const clientHeight =
            document.documentElement.clientHeight || window.innerHeight;

        const scrolledToBottom =
            Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom && !isLoading) {
            useAppStore.setState({ isLoading: true });
        }
    };

    // render
    return (
        <div className="App">
            <div
                className={`task-board ${isAddTaskActive || isEditActive || isTaskViewActive ? "hidden" : ""}`}
            >
                <TaskBoard />
            </div>

            {isAddTaskActive && <TaskAddForm />}

            {isTaskViewActive && <TaskView />}

            {isEditActive && <TaskEditForm />}
        </div>
    );
};

export default App;
