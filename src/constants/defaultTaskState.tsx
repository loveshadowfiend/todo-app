import { Task } from "../types/task";

export const defaultTaskState: Task = {
    id: "not set",
    name: "not set",
    creationDate: new Date().toLocaleString(),
    priority: "low",
    tags: ["research"],
    description: "if you see this - something went wrong :/",
};
