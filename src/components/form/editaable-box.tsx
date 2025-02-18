import formatMoney from "@/lib/format-money"
import { cn } from "@/lib/utils"
import { HTMLAttributes, useMemo, useRef, useState } from "react"
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
    isNumber?: boolean
    editable?: boolean
    fieldKey?: string
}

export default function EditableBox<IForm extends FieldValues>({
    methods,
    name,
    onBlur,
    children,
    dayId,
    isNumber,
    className,
    editable = true,
    fieldKey,
}: IProps<IForm> & HTMLAttributes<HTMLDivElement>) {
    const [isEditing, setIsEditing] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const handleInput = () => {
        if (ref.current) {
            const value = ref.current.textContent as FieldPathValue<
                IForm,
                Path<IForm>
            >
            if (name.includes("price")) {
                methods.setValue(name, value.replace(/\s+/g, ""))
            } else {
                methods.setValue(name, value)
            }
        }
    }

    function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
        setIsEditing(false)
        onBlur?.({
            ...event,
            currentTarget: {
                ...event.currentTarget,
                textContent: (dayId || "").toString(),
            },
        })
    }

    function handleEdit() {
        if (editable) {
            setIsEditing(true)
        }
    }

    const isShow = useMemo(() => {
        if (ref.current) {
            return ref.current.textContent === "" && !editable
        }
    }, [ref.current, editable])

    return (
        <div
            ref={ref}
            className={cn(
                "text-sm outline-none focus:outline-none flex items-center py-2 relative",
                className,
            )}
            contentEditable={isEditing}
            suppressContentEditableWarning
            suppressHydrationWarning
            onInput={handleInput}
            onBlur={handleBlur}
            onClick={handleEdit}
            id={name + fieldKey}
        >
            {isShow ?
                ""
            : isNumber && children ?
                formatMoney((children as number) || 0)
            :   children || "—"}
        </div>
    )
}
