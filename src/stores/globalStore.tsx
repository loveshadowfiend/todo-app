import { Task } from "../types/task";
import { create } from "zustand";
import { defaultTaskState } from "../constants/defaultTaskState";
import { defaultTagOptions } from "../constants/defaultTagOptions";
import { defaultSortOptions } from "../constants/defaultSortOptions";
import { v4 as uuidv4 } from "uuid";

export interface globalState {
    tasks: Task[];
    currentTask: Task;
    sortOptions: Map<string, boolean>;
    tagOptions: Map<string, boolean>;
    isAddTaskActive: boolean;
    isTaskViewActive: boolean;
    isEditActive: boolean;
    isLoading: boolean;
    page: number;

    addTask: (task: Task) => void;
    deleteTask: (deletedTask: Task) => void;
    editTask: (editedTask: Task) => void;
    switchSortOption: (option: string) => void;
    toggleTagOption: (option: string) => void;
}

export const useGlobalStore = create<globalState>((set, get) => ({
    tasks: [],
    currentTask: defaultTaskState,
    sortOptions: defaultSortOptions,
    tagOptions: defaultTagOptions,
    isAddTaskActive: false,
    isTaskViewActive: false,
    isEditActive: false,
    isLoading: false,
    page: 1,

    addTask: (task: Task) =>
        set((state) => ({
            tasks: [
                ...state.tasks,
                {
                    ...task,
                    id: uuidv4(),
                    creationDate: new Date().toLocaleString(),
                },
            ],
            isAddTaskActive: false,
        })),

    deleteTask: (deletedTask: Task) => {
        const updatedTasks = get().tasks.filter((task) => {
            return task.id != deletedTask.id;
        });

        set({ tasks: updatedTasks });
    },

    editTask: (editedTask: Task) => {
        const updatedTasks = get().tasks.map((task) => {
            return task.id == editedTask.id ? editedTask : task;
        });

        set({ tasks: updatedTasks });
    },

    switchSortOption: (option: string) => {
        const updatedSortOption = new Map(get().sortOptions);

        updatedSortOption.forEach((_, key) => {
            key == option
                ? updatedSortOption.set(key, true)
                : updatedSortOption.set(key, false);
        });

        set({ sortOptions: updatedSortOption });
    },

    toggleTagOption: (option: string) => {
        const updatedTagOption = new Map(get().tagOptions);
        const value = get().tagOptions.get(option);

        updatedTagOption.set(option, !value);

        set({ tagOptions: updatedTagOption });
    },
}));
