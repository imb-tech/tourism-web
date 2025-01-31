import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"
import { Progress } from "./progress"

interface PackCardProps {
    id: string
    destination: string
    startDate: string
    endDate: string
    duration: string
    client: string
    manager: string
    onEdit?: () => void
    onDelete?: () => void
}

export default function PackCard({
    id,
    destination,
    startDate,
    endDate,
    duration,
    client,
    manager,
    onEdit,
    onDelete,
}: PackCardProps) {
    return (
        <Card className="w-full max-w-sm p-4 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="text-sm text-muted-foreground">#{id}</div>
                <div className="font-medium">{destination}</div>
            </CardHeader>
            <Progress/>
            <CardContent className="space-y-4 p-0">
                <div className="flex justify-between text-sm">
                    <span>{startDate}</span>
                    <span>{endDate}</span>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Davomiyligi:
                        </span>
                        <span>{duration}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Mijoz:</span>
                        <span>{client}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Menejer:</span>
                        <span>{manager}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button className="flex-1">Tur paketlar</Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0"
                        onClick={onEdit}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 text-destructive"
                        onClick={onDelete}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
