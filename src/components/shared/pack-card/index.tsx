import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { calcProgress } from "@/lib/calc-progress"
import { Link } from "@tanstack/react-router"
import { Eye } from "lucide-react"
import { memo, useMemo } from "react"
import { getPackStatus } from "./lib"
import PackCardMenu from "./pack-card-menu"
import Progress from "./progress"

type PackCardProps = PackItem & {
    onEdit?: () => void
    onDelete?: () => void
    onSend?: () => void
    onFinish?: () => void
}

function PackCard({
    id,
    client,
    manager,
    country,
    days,
    nights,
    end,
    start,
    tm_status,
    onDelete,
    onEdit,
    onSend,
    onFinish,
}: PackCardProps) {
    const { total, current } = useMemo(
        () => calcProgress(start, end),
        [start, end],
    )

    const { title, color } = getPackStatus(tm_status)

    return (
        <Card className="w-full max-w-sm p-4 shadow-none">
            <CardHeader className="flex flex-row items-center">
                <div className="text-sm text-muted-foreground">#{id}</div>
                {tm_status != null && (
                    <span
                        className={`border-${color} border px-2 text-${color} rounded-md text-xs lowercase`}
                    >
                        {title}
                    </span>
                )}
                <div className="font-medium flex-1 text-end">
                    {country.name}
                </div>
            </CardHeader>
            <CardContent className="space-y-4 p-0">
                <div className="flex flex-col gap-1">
                    <Progress size={total} finished={current} />
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
                        <span>
                            {days} / {nights}
                        </span>
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
                    <PackCardMenu
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onSend={onSend}
                        onFinish={onFinish}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default memo(PackCard)
