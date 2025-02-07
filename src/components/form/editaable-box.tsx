import { cn } from "@/lib/utils"
import { HTMLAttributes, useRef, useState } from "react"
import {
    FieldPathValue,
    FieldValues,
    Path,
    UseFormReturn,
} from "react-hook-form"

type IProps<IForm extends FieldValues> = {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    dayId: number
}

export default function EditableBox<IForm extends FieldValues>({
    methods,
    name,
    onBlur,
    children,
    dayId,
}: IProps<IForm> & HTMLAttributes<HTMLDivElement>) {
    const [isEditing, setIsEditing] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const handleInput = () => {
        if (ref.current) {
            methods.setValue(
                name,
                ref.current.textContent as FieldPathValue<IForm, Path<IForm>>,
            )
        }
    }

    function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
        setIsEditing(false)
        onBlur?.({
            ...event,
            currentTarget: {
                ...event.currentTarget,
                textContent: dayId.toString(),
            },
        })
    }

    return (
        <div
            ref={ref}
            className={cn("flex-[0.4] text-sm outline-none focus:outline-none")}
            contentEditable={isEditing}
            suppressContentEditableWarning
            suppressHydrationWarning
            onInput={handleInput}
            onBlur={handleBlur}
            onDoubleClick={() => setIsEditing(true)}
        >
            {children || "-"}
        </div>
    )
}
