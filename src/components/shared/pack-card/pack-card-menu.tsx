import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocation } from "@tanstack/react-router"
import {
    CheckCheck,
    EllipsisVertical,
    Pencil,
    Send,
    Trash,
    Undo2,
} from "lucide-react"
import { memo, useMemo, useRef } from "react"

type Props = {
    onDelete?: () => void
    onEdit?: () => void
    onSend?: () => void
    onFinish?: () => void
    onUndo?: () => void
    status: string
}

function PackCardMenu({
    onDelete,
    onEdit,
    onSend,
    onFinish,
    onUndo,
    status,
}: Props) {
    const ref = useRef<HTMLDivElement>(null)
    const { pathname } = useLocation()
    const isCost = useMemo(() => pathname.includes("cost"), [pathname])

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="primary-muted" size={"icon"}>
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                ref={ref}
                className="w-56"
                align="end"
                side="top"
            >
                {!isCost ?
                    <DropdownMenuGroup>
                        {status != "30" && (
                            <DropdownMenuItem
                                className="text-success"
                                onClick={onFinish}
                            >
                                <CheckCheck />
                                Yakunlash
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                            className="text-primary"
                            onClick={onSend}
                        >
                            <Send />
                            TM ga yuborish
                        </DropdownMenuItem>
                        {status != "30" && (
                            <DropdownMenuItem
                                className="text-primary"
                                onClick={onEdit}
                            >
                                <Pencil />
                                Tahrirlash
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                            className="text-destructive"
                            onClick={onDelete}
                        >
                            <Trash />
                            O'chirish
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                :   <DropdownMenuGroup>
                        <DropdownMenuItem
                            className="text-primary"
                            onClick={onSend}
                        >
                            <Send />
                            TM ga yuborish
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="text-destructive"
                            onClick={onUndo}
                        >
                            <Undo2 />
                            Qaytarish
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default memo(PackCardMenu)
