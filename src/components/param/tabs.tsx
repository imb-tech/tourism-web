/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { useEffect } from "react"
import { ClassNameValue } from "tailwind-merge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

interface ParamTabsProps {
    options: {
        id: string | number
        name: string | number
        content?: React.ReactNode
        className?: ClassNameValue
    }[]
    paramName?: string
    disabled?: boolean
    onAdd?: () => void
    clearOthers?: boolean
    returnValue?: "name" | "id"
    onValueChange?: (val: string | number) => void
    header?: React.ReactNode
    listClassName?: ClassNameValue
}

export default function ParamTabs({
    options,
    paramName = "tab",
    disabled = false,
    onAdd,
    clearOthers = false,
    returnValue = "id",
    onValueChange,
    header,
    listClassName,
}: ParamTabsProps) {
    const navigate = useNavigate()
    const search: any = useSearch({ from: "__root__" }) as Record<
        string,
        string | undefined
    >
    const currentTab = search[paramName]

    const handleTabChange = (tab: string) => {
        const val = isNaN(+tab) ? tab : +tab
        onValueChange?.(tab)
        if (tab === "add") {
            onAdd?.()
        } else {
            if (disabled || tab === currentTab) return
            clearOthers ?
                navigate({ search: { [paramName]: val } as any })
            :   navigate({ search: { ...search, [paramName]: val } as any })
        }
    }

    useEffect(() => {
        if (currentTab === undefined) {
            navigate({
                search: { [paramName]: options?.[0]?.[returnValue] } as any,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Tabs
            value={currentTab?.toString()}
            onValueChange={handleTabChange}
            className="overflow-auto"
        >
            <div
                className={cn(
                    "flex items-center w-max overflow-auto",
                    listClassName,
                )}
            >
                <TabsList className="flex items-center justify-between overflow-hidden">
                    {options.map((t, i) => (
                        <TabsTrigger
                            key={i}
                            data-index={t?.[returnValue]}
                            value={t.id.toString()}
                        >
                            {t.name}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {header}
            </div>
            {options.map((option) => (
                <TabsContent
                    key={option?.[returnValue]}
                    value={option?.[returnValue]?.toString()}
                >
                    {option.content}
                </TabsContent>
            ))}
        </Tabs>
    )
}
