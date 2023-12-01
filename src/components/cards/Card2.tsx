import { useState } from "react";
import { task } from "../../types/tasks"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faCheckDouble, faTrash } from "@fortawesome/free-solid-svg-icons";
import PopoverCard from "./PopoverCard";
import TaskForm from "../forms/TaskForm";
import { formEventType } from "@/types/propsTypes";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Checkbox } from "../ui/checkbox";

type props = {
    id: string,
    title: string,
    description?: string,
    priorityLevel: "low" | "medium" | "high",
    handleEdit: (e: formEventType, data: task, id?: string,) => void
    handleDelete: (id: string) => void,
    bgGradient?: string,
    status?: "in_progress" | "completed",
    handleStatus?: (id: string, status: "in_progress" | "completed") => void
}

function Card2(props: props) {
    const { title, description, priorityLevel, handleDelete, handleEdit, id, bgGradient, status, handleStatus } = props;
    const [openEdit, setEdit] = useState<boolean>(false)
    const [showHover, setShowHover] = useState<boolean>(false);
    const [statusChecked, setStatusChecked] = useState<boolean>(status === "completed" ? true : false);

    const bg = bgGradient || "bg-gradient-to-r from-rose-400 to-red-500"
    let priorityClassName = "";
    if (priorityLevel === "high") {
        priorityClassName += " bg-red-800 text-white"
    }
    if (priorityLevel === "medium") {
        priorityClassName += "bg-orange-500 text-white"
    }
    if (priorityLevel == "low") {
        priorityClassName += "bg-green-500 text-white"
    }

    const handleMouseEnter = () => {
        setShowHover(true)
    }

    const handleMouseLeave = () => {
        if (!openEdit) {
            setShowHover(false)
        }
    }

    const handleEditForm = (e: formEventType, data: task, id?: string) => {
        handleEdit(e, data, id);
        setEdit(false);
        setShowHover(false);
    }

    const handleDeleteDialoge = () => {
        handleDelete(id)
        setShowHover(false)
    }

    const handleDeleteCancle = () => {
        setShowHover(false)
    }

    const handleStatusChecked = () => {
        if (statusChecked) {
            handleStatus && handleStatus(id, "in_progress");
        }
        else {
            handleStatus && handleStatus(id, "completed");
        }
        setStatusChecked(prev => !prev)
    }

    return (
        <div className={`${bg} bg-opacity-70 rounded-3xl h-32 w-full cursor-pointer relative transition-transform hover:scale-105 overflow-scroll flex flex-col justify-center`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className=" z-50 absolute right-5 top-0" onMouseEnter={handleMouseLeave} onMouseLeave={handleMouseEnter}>
                <Checkbox className=" cursor-alias border border-white" checked={statusChecked} onClick={handleStatusChecked} />
            </span>

            {
                statusChecked &&
                <>
                    <section className=" absolute left-0 top-0 h-full w-full bg-green-300 rounded-3xl flex items-center justify-center bg-opacity-40 text-blue-700">
                        <FontAwesomeIcon icon={faCheckDouble} size="2xl" />
                    </section>
                </>
            }
            {
                showHover
                &&
                <>
                    <section className=" absolute h-full w-full bg-slate-500 left-0 top-0 rounded-3xl bg-opacity-70 flex items-center justify-around">
                        <PopoverCard open={openEdit} setOpen={setEdit} triggerComponent={<FontAwesomeIcon icon={faEdit} className=" text-sky-700 transition-transform hover:scale-90" size="xl" />}
                            triggerContent={<TaskForm handleSubmitForm={handleEditForm} titleValue={title} descriptionValue={description} priorityValue={priorityLevel} edit={true} editId={id} />}
                        />
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <FontAwesomeIcon icon={faTrash} size="xl" className=" text-red-800 transition-transform hover:scale-90" />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the task
                                        and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={handleDeleteCancle}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDeleteDialoge}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </section>
                </>
            }
            <section>
                <h3 className=" font-bold text-zinc-900 pt-2 ps-2">Title : {title}</h3>
            </section>
            <section className=" flex text-zinc-900 gap-2">
                <span>
                    Description :
                </span>
                <span>
                    {description}
                </span>
            </section>
            <section className=" flex gap-2">
                <span className=" text-zinc-900">
                    Priority :
                </span>
                <span className={priorityClassName + " my-1 px-2 rounded-2xl text-gray-600 font-bold"}>
                    {priorityLevel}
                </span>
            </section>
            <span className=" self-center">
                {
                    status === "in_progress" ?
                        "In Progress"
                        :
                        "Completed"
                }
            </span>
        </div>
    )
}

export default Card2