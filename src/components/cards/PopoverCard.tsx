import React, { SetStateAction } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover";
import { popoverPropsType } from '../../types/propsTypes';

function PopoverCard(props:popoverPropsType) {
    const { open, setOpen, triggerComponent, triggerContent,triggerContentStyle,triggerContentSide } = props;

    const handleOpen = () => {
        setOpen(prev => !prev)
    }
    return (
        <Popover open={open}>
            <PopoverTrigger onClick={handleOpen} >
                {
                    triggerComponent ?
                        triggerComponent
                        :
                        "open"
                }
            </PopoverTrigger>
            <PopoverContent side={triggerContentSide || "bottom"} className={triggerContentStyle || ""}>
                {
                    triggerContent ?
                        triggerContent
                        :
                        "Content"
                }
            </PopoverContent>
        </Popover>
    )
}

export default PopoverCard;