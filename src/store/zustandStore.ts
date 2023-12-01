import {create} from "zustand";
import { task, useTasksType } from "../types/tasks";


let getTasksFromLocalStorage:Array<task>|[] = JSON.parse(localStorage.getItem("user_tasks")||"[]")
if(getTasksFromLocalStorage.length === 0){
    getTasksFromLocalStorage = [{"id":"2959cf51-0a97-46b5-ac8e-35132db89846","taskName":"Anime List (ReactJS)","taskDescription":"normal","priorityLevel":"low","status":"in_progress"},{"id":"8bd98694-2211-4056-aba3-1e4abbaa4c89","taskName":"BUDGET (Expense Tracker (MERN))","taskDescription":"fix loader","priorityLevel":"high","status":"in_progress"},{"id":"3abe4f79-78e0-4575-ba4b-efd1443d073b","taskName":"BUDGET (Expense Tracker (MERN))","taskDescription":"fix loader","priorityLevel":"high","status":"in_progress"},{"id":"ce825c3e-2a8b-44bf-9ea5-7b549045772b","taskName":"Anime List (ReactJS)","taskDescription":"fix loader","priorityLevel":"medium","status":"in_progress"},{"id":"ff5d363c-761a-48ff-9de5-1aea943c7e02","taskName":"Anime List (ReactJS)","taskDescription":"fix ui bug","priorityLevel":"medium","status":"completed"},{"id":"0b1a123a-6f1c-42dd-8c76-61354b126a31","taskName":"Anime List (ReactJS)","taskDescription":"random text generator please try to do it ","priorityLevel":"low","status":"completed"},{"id":"535117eb-ae65-4e5c-aae8-02526f09ca53","taskName":"BUDGET (Expense Tracker (MERN))","taskDescription":"any","priorityLevel":"low","status":"in_progress"}]
    localStorage.setItem("user_tasks",JSON.stringify(getTasksFromLocalStorage))
}

export const useTasks = create<useTasksType>((set)=>({
    tasks : getTasksFromLocalStorage,
    setTasks : (tasks)=>set({tasks}),
}));