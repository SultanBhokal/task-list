import { SetStateAction } from "react"
import { task } from "./tasks"

export type popoverPropsType = {
    open: boolean,
    setOpen: React.Dispatch<SetStateAction<boolean>>,
    triggerComponent?: React.ReactNode | string,
    triggerContent?: React.ReactNode | string,
    triggerContentStyle?:string,
    triggerContentSide?:"left" | "bottom" | "right" | "top"
}
export type taskFormTypes = {
    handleSubmitForm: (e: React.FormEvent<HTMLFormElement>, data: task,id?:string) => void,
    edit?:boolean,
    editId?:string,
    titleValue?:string,
    descriptionValue?:string,
    priorityValue?:"low" | "medium" | "high"
}

export type formEventType = React.FormEvent<HTMLFormElement>
