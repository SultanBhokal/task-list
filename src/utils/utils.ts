import { task } from "../types/tasks";
import { v4 } from "uuid";

export function getUniqueId() {
    return v4();
}

export const gradients = [
    'bg-gradient-to-tr from-blue-200 via-cyan-400 to-blue-200',
    'bg-gradient-to-br from-teal-100 to-indigo-600',
    'bg-gradient-to-r from-violet-500 to-purple-500',
    'bg-gradient-to-r from-cyan-500 to-blue-500',
    'bg-gradient-to-r from-cyan-400 to-teal-600',
    'bg-gradient-to-r from-emerald-400 to-green-600',
    'bg-gradient-to-r from-rose-400 to-red-600',
    'bg-gradient-to-r from-violet-400 to-purple-600',
    'bg-gradient-to-r from-fuchsia-400 to-pink-600',
    'bg-gradient-to-r from-indigo-400 to-purple-600',
    'bg-gradient-to-r from-blue-400 to-teal-600',
    'bg-gradient-to-r from-yellow-400 to-orange-600',
    'bg-gradient-to-r from-lime-400 to-green-600',
    'bg-gradient-to-r from-red-400 to-pink-600',
    'bg-gradient-to-r from-cool-gray-400 to-warm-gray-600',
    'bg-gradient-to-r from-orange-400 to-red-600',
    'bg-gradient-to-r from-green-400 to-teal-600',
    'bg-gradient-to-r from-blue-400 to-indigo-600',
    'bg-gradient-to-r from-yellow-400 to-amber-600',
];

export const sortByPriorityAndStatus = (tasks: Array<task>) => {
    const sortedTasks = tasks.slice().sort((a, b) => {

        const priorityComparison = priorityToNumber(a.priorityLevel) - priorityToNumber(b.priorityLevel);
        if (priorityComparison !== 0) {
            return priorityComparison;
        }

        // If priority levels are the same, then sort by status
        return statusToNumber(a.status) - statusToNumber(b.status);
    });

    return sortedTasks;
};

export const sortByPriority = (tasks: Array<task>,sortType:"asc"|"desc") => {

    const sortedTasks = tasks.slice().sort((a, b) => {
        if(sortType === "desc" ){
            return priorityToNumberDesc(a.priorityLevel) - priorityToNumberDesc(b.priorityLevel);
        }
        return priorityToNumber(a.priorityLevel) - priorityToNumber(b.priorityLevel);
    })
    return sortedTasks;
}

export const sortByStatus = (tasks: Array<task>,sortType:"asc"|"desc") => {
    return tasks.slice().sort((a, b) => {
        if(sortType === "desc"){
            return statusToNumberDesc(a.status) - statusToNumberDesc(b.status);
        }
        return statusToNumber(a.status) - statusToNumber(b.status);
    })
}

const priorityToNumber = (priority: "low" | "medium" | "high" | "") => {
    switch (priority) {
        case 'low':
            return 0;
        case 'medium':
            return 1;
        case 'high':
            return 2;
        default:
            return 0;
    }
};

const statusToNumber = (status: "in_progress" | "completed" | "") => {
    switch (status) {
        case 'in_progress':
            return 0;
        case 'completed':
            return 1;
        default:
            return 0;
    }
};

const priorityToNumberDesc = (priority: "low" | "medium" | "high" | "") => {
    switch (priority) {
        case 'low':
            return 2;
        case 'medium':
            return 1;
        case 'high':
            return 0;
        default:
            return 0;
    }
};

const statusToNumberDesc = (status: "in_progress" | "completed" | "") => {
    switch (status) {
        case 'in_progress':
            return 1;
        case 'completed':
            return 0;
        default:
            return 0;
    }
};