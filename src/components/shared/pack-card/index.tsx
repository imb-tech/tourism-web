import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Link } from "@tanstack/react-router"
import { Eye } from "lucide-react"
import { memo } from "react"
import PackCardMenu from "./pack-card-menu"
import Progress from "./progress"

type PackCardProps = PackItem & {
    onEdit?: () => void
    onDelete?: () => void
}

function PackCard({
    id,
    client,
    manager,
    country,
    days,
    end,
    start,
}: PackCardProps) {
    return (
        <Card className="w-full max-w-sm p-4 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="text-sm text-muted-foreground">#{id}</div>
                <div className="font-medium">{country}</div>
            </CardHeader>
            <CardContent className="space-y-4 p-0">
                <div className="flex flex-col gap-1">
                    <Progress size={4} finished={1} />
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{start}</span>
                        <span className="text-muted-foreground">{end}</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Davomiyligi:
                        </span>
                        <span>{days}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Mijoz:</span>
                        <span>{client}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Menejer:</span>
                        <span>
                            {manager?.first_name} {manager?.last_name}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link
                        className="flex-1"
                        to="/packs/$pack"
                        params={{ pack: id.toString() }}
                    >
                        <Button className="w-full gap-1 font-light">
                            <Eye size={18} className="font-light" />
                            Tur paketlar
                        </Button>
                    </Link>
                    <PackCardMenu />
                </div>
            </CardContent>
        </Card>
    )
}

export default memo(PackCard, (prev, next) => prev.id === next.id)
