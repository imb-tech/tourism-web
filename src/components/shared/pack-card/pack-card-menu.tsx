import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    CheckCheck,
    EllipsisVertical,
    Pencil,
    Send,
    Trash,
    Undo2,
} from "lucide-react"
import { memo, useRef } from "react"

type Props = {
    onDelete?: () => void
    onEdit?: () => void
    onSend?: () => void
    onFinish?: () => void
    onUndo?: () => void
    status: string
    className?: string
}

function PackCardMenu({
    onDelete,
    onEdit,
    onSend,
    onFinish,
    onUndo,
    status,
    className,
}: Props) {
    const ref = useRef<HTMLDivElement>(null)

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="primary-muted"
                    className={className}
                    size={"icon"}
                >
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                ref={ref}
                className="w-56"
                align="end"
                side="top"
            >
                <DropdownMenuGroup>
                    {status == "20" && (
                        <DropdownMenuItem
                            className="text-success"
                            onClick={onFinish}
                        >
                            <CheckCheck />
                            Finish
                        </DropdownMenuItem>
                    )}
                    {Number(status) !== 20 && (
                        <DropdownMenuItem
                            className="text-primary"
                            onClick={onSend}
                        >
                            <Send />
                            Send to TM
                        </DropdownMenuItem>
                    )}
                    {Number(status) < 20 && (
                        <DropdownMenuItem
                            className="text-primary"
                            onClick={onEdit}
                        >
                            <Pencil />
                            Edit
                        </DropdownMenuItem>
                    )}
                    {(status == "30" || status == "20") && (
                        <DropdownMenuItem
                            className="text-destructive"
                            onClick={onUndo}
                        >
                            <Undo2 />
                            Reject
                        </DropdownMenuItem>
                    )}

                    <DropdownMenuItem
                        className="text-destructive"
                        onClick={onDelete}
                    >
                        <Trash />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default memo(PackCardMenu)
