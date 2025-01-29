import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { ReactNode } from "react"
import { ClassNameValue } from "tailwind-merge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"

export default function ParamDialog({
    content,
    trigger,
    label,
    paramName = "dialog",
    className,
}: thisProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const search: any = useSearch({ from: "__root__" })
    const navigate = useNavigate()

    return (
        <Dialog
            open={!!search[paramName]}
            onOpenChange={() =>
                navigate({
                    search: {
                        ...search,
                        [paramName]: undefined,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any,
                })
            }
        >
            {!!trigger && <DialogTrigger>{trigger}</DialogTrigger>}
            <DialogContent className={`${className}`}>
                <DialogHeader>
                    <DialogTitle>{label}</DialogTitle>
                    <VisuallyHidden>
                        <DialogDescription>{label}</DialogDescription>
                    </VisuallyHidden>
                </DialogHeader>
                {content}
            </DialogContent>
        </Dialog>
    )
}

interface thisProps {
    content: ReactNode
    trigger?: ReactNode
    paramName?: string
    label: string
    className?: ClassNameValue
}
