import * as React from "react"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MultiSelectProps {
    label: string | React.ReactNode
    values?: (string | number | boolean)[]
    setValues?: React.Dispatch<
        React.SetStateAction<(string | number | boolean)[]>
    >
    returnValue?: "name" | "id"
    options: {
        name: string | number | boolean
        id: string | number | boolean
        fnc?: (e: unknown) => void
    }[]
}

export default function MultiSelect({
    label,
    values,
    setValues,
    returnValue = "id",
    options,
}: MultiSelectProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{label}</DropdownMenuTrigger>
            <DropdownMenuContent>
                {options?.map((s, i) => (
                    <DropdownMenuCheckboxItem
                        key={i}
                        checked={
                            typeof s[returnValue] === "boolean" ?
                                s[returnValue]
                            :   values?.includes(s[returnValue])
                        }
                        onClick={(e) => {
                            e.preventDefault()
                            setValues?.(
                                values?.includes(s[returnValue]) ?
                                    values.filter((v) => v !== s[returnValue])
                                :   (values || []).concat(s[returnValue]),
                            )
                            s.fnc?.({ target: { value: s[returnValue] } })
                        }}
                    >
                        {s.name}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
