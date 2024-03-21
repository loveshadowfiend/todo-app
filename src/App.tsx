import { useEffect, useState } from "react";
import { Task } from "./types/task";
import { v4 as uuidv4 } from "uuid";
import { TaskAddForm } from "./components/TaskAddForm";
import { TaskView } from "./components/TaskView";
import { TaskEditForm } from "./components/TaskEditForm";
import { useUpdateEffect } from "react-use";
import { TaskBoard } from "./components/TaskBoard";
import { defaultTaskState } from "./constants/defaultTaskState";
import { defaultTagOptions } from "./constants/defaultTagOptions";
import { defaultSortOptions } from "./constants/defaultSortOptions";

const App = () => {
    // states
    const [tasks, setTasks] = useState<Task[]>([]);
    const [tasksReversed, setTasksReversed] = useState<Task[]>([]);
    const [sortOptions, setSortOptions] =
        useState<Map<string, boolean>>(defaultSortOptions);
    const [tagOptions, setTagOptions] =
        useState<Map<string, boolean>>(defaultTagOptions);
    const [currentTask, setCurrentTask] = useState<Task>(defaultTaskState);
    const [isAddTaskActive, setIsAddTaskActive] = useState<boolean>(false);
    const [isTaskViewActive, setIsTaskViewActive] = useState<boolean>(false);
    const [isEditActive, setIsEditActive] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // constants
    const tasksPerPage: number = 15;

    // effects
    useEffect(() => {
        // load tasks from local storage
        const localStorageDataTasks: string =
            localStorage.getItem("tasks") ?? "";

        if (localStorageDataTasks.length > 0) {
            const localStorageDataTasksParsed = JSON.parse(
                localStorageDataTasks
            );

            setTasks(localStorageDataTasksParsed);
            setTasksReversed(localStorageDataTasksParsed.reverse());
        }

        // infinite scroll
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!loading) return;

        setPage((prevPage) => prevPage + 1);
        setLoading(false);
    }, [loading]);

    useUpdateEffect(() => {
        setTasksReversed(tasks.reverse());
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

        if (scrolledToBottom && !loading) {
            setLoading(true);
        }
    };

    const addTask = (task: Task) => {
        setTasks([
            ...tasks,
            {
                ...task,
                id: uuidv4().toString(),
            },
        ]);

        setIsAddTaskActive(false);
    };

    // helper functions
    const editTask = (updatedTask: Task) => {
        const updatedTasks = tasks.map((task) => {
            return task.id == updatedTask.id ? updatedTask : task;
        });

        setTasks(updatedTasks);
        setCurrentTask(updatedTask);

        setIsEditActive(false);
        setIsTaskViewActive(true);
    };

    const toggleTagOption = (option: string) => {
        const updatedTagOptions = new Map(tagOptions);
        const value = tagOptions.get(option);

        updatedTagOptions.set(option, !value);

        setTagOptions(updatedTagOptions);
    };

    const deleteTask = (deletedTask: Task) => {
        const updatedTasks = tasks.filter((task) => {
            return task.id != deletedTask.id;
        });

        setTasks(updatedTasks);
        setCurrentTask(defaultTaskState);
        setIsTaskViewActive(false);
    };

    // render
    return (
        <div className="App">
            <div
                className={`task-board ${isAddTaskActive || isEditActive || isTaskViewActive ? "hidden" : ""}`}
            >
                <TaskBoard
                    tasks={tasks}
                    setIsAddTaskActive={setIsAddTaskActive}
                    toggleTagOption={toggleTagOption}
                    page={page}
                    tasksPerPage={tasksPerPage}
                    options={tagOptions}
                    setCurrentTask={setCurrentTask}
                    setIsTaskViewActive={setIsTaskViewActive}
                    switchSortOption={function (option: string): void {
                        throw new Error("Function not implemented.");
                    }}
                />
            </div>

            {isAddTaskActive && (
                <TaskAddForm
                    addTask={addTask}
                    setIsAddActive={setIsAddTaskActive}
                />
            )}

            {isTaskViewActive && (
                <TaskView
                    task={currentTask ?? defaultTaskState}
                    deleteTask={deleteTask}
                    setIsTaskViewActive={setIsTaskViewActive}
                    setIsEditActive={setIsEditActive}
                />
            )}

            {isEditActive && (
                <TaskEditForm
                    task={currentTask ?? defaultTaskState}
                    editTask={editTask}
                    setIsEditActive={setIsEditActive}
                />
            )}
        </div>
    );
};

export default App;
