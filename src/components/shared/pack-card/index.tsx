import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Eye } from "lucide-react"
import { PackCardMenu } from "./pack-card-menu"
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
}: PackCardProps) {
    return (
        <Card className="w-full max-w-sm p-4 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="text-sm text-muted-foreground">#{id}</div>
                <div className="font-medium">{destination}</div>
            </CardHeader>
            <CardContent className="space-y-4 p-0">
                <div className="flex flex-col gap-1">
                    <Progress size={4} finished={1} />
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                            {startDate}
                        </span>
                        <span className="text-muted-foreground">{endDate}</span>
                    </div>
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
                    <Button className="flex-1 gap-1 font-light">
                        <Eye size={18} className="font-light" />
                        Tur paketlar
                    </Button>
                    <PackCardMenu />
                </div>
            </CardContent>
        </Card>
    )
}
