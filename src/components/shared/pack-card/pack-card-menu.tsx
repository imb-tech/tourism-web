import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CheckCheck, EllipsisVertical, Pencil, Trash } from "lucide-react"

export function PackCardMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="primary-muted" size={"icon"}>
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" side="top">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="text-success">
                        <CheckCheck />
                        Yakunlash
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-primary">
                        <Pencil />
                        Tahrirlash
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                        <Trash />
                        O'chirish
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
