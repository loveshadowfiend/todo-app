import { useEffect, useState } from "react";
import { Task } from "./types/task";
import { v4 as uuidv4 } from "uuid";
import { TaskAddForm } from "./components/TaskAddForm";
import { TaskView } from "./components/TaskView";
import { TaskEditForm } from "./components/TaskEditForm";
import { useUpdateEffect } from "react-use";
import { TaskBoard } from "./components/TaskBoard";

const defaultTaskState: Task = {
    id: "not set",
    name: "not set",
    creationDate: new Date().toLocaleString(),
    priority: "low",
    tags: ["research"],
    description: "if you see this - something went wrong :/",
};

const App = () => {
    // states
    const [tasks, setTasks] = useState<Task[]>([]);
    const [options, setOptions] = useState<Map<string, boolean>>(
        new Map<string, boolean>([
            ["sortDateAsc", true],
            ["sortDateDesc", false],

            ["low", true],
            ["normal", true],
            ["high", true],

            ["research", true],
            ["development", true],
            ["design", true],
        ])
    );
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [isAddTaskActive, setIsAddTaskActive] = useState<boolean>(false);
    const [isTaskViewActive, setIsTaskViewActive] = useState<boolean>(false);
    const [isEditActive, setIsEditActive] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [width, setWidth] = useState<number>(window.innerWidth);

    // constants
    const tasksPerPage = 15;
    const isMobile = width <= 768;

    // effects
    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    useEffect(() => {
        // load tasks from local storage
        const localStorageData: string = localStorage.getItem("tasks") ?? "";

        if (localStorageData.length > 0) {
            setTasks(JSON.parse(localStorageData));
        }

        // infinite scroll
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!loading) return;

        console.log("loading");

        setPage((prevPage) => prevPage + 1);
        setLoading(false);
    }, [loading]);

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

        if (scrolledToBottom && !loading) {
            setLoading(true);
        }
    };

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
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

    const toggleOption = (option: string) => {
        const updatedOptions = new Map(options);
        const value: boolean = options.get(option) ?? false;

        updatedOptions.set(option, !value);

        setOptions(updatedOptions);
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
        <>
            {!isAddTaskActive && !isEditActive && !isTaskViewActive && (
                <TaskBoard
                    tasks={tasks}
                    isMobile={isMobile}
                    setIsAddTaskActive={setIsAddTaskActive}
                    toggleOption={toggleOption}
                    page={page}
                    tasksPerPage={tasksPerPage}
                    options={options}
                    setCurrentTask={setCurrentTask}
                    setIsTaskViewActive={setIsTaskViewActive}
                />
            )}

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
        </>
    );
};

export default App;
