import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { calcProgress } from "@/lib/calc-progress"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "@tanstack/react-router"
import { Download, Eye } from "lucide-react"
import { memo, useMemo } from "react"
import { getPackStatus, getPackTMStatus } from "./lib"
import PackCardMenu from "./pack-card-menu"
import Progress from "./progress"

type PackCardProps = PackItem & {
    onEdit?: () => void
    onDelete?: () => void
    onSend?: () => void
    onFinish?: () => void
    onUndo?: () => void
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
    status,
    plan_id,
    onDelete,
    onEdit,
    onSend,
    onFinish,
    onUndo,
    tm_comment,
    tm_contract,
}: PackCardProps) {
    const { total, current } = useMemo(
        () => calcProgress(start, end),
        [start, end],
    )
    const { pathname } = useLocation()
    const isCost = useMemo(() => pathname.includes("cost"), [pathname])

    const { title, color } = getPackTMStatus(tm_status || 0)
    const { title: statusTitle, color: statusColor } = getPackStatus(status)

    function handleDownload() {
        if (tm_contract) {
            window.open(tm_contract)
        }
    }

    const isFinish = Number(status) == 40

    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <div className="w-full max-w-sm p-4 shadow-none bg-background rounded-md flex flex-col gap-1">
                        <div className="flex flex-row items-center gap-2">
                            {tm_status != null && (
                                <span
                                    className={`border-${color} border px-1 text-${color} rounded-md text-xs lowercase`}
                                >
                                    {title}
                                </span>
                            )}

                            <span
                                className={`border-${statusColor} border px-1 text-${statusColor} rounded-md text-xs lowercase`}
                            >
                                {statusTitle}
                            </span>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <div className="text-sm text-muted-foreground flex-1 ">
                                #{id}
                            </div>

                            <div className="font-medium text-end">
                                {country.name}
                            </div>
                        </div>
                        <div className="space-y-4 p-0">
                            <div className="flex flex-col gap-1 pb-2">
                                <Progress
                                    size={total}
                                    finished={current}
                                    className={
                                        isFinish ? "bg-secondary"
                                        : Number(tm_status) == -1 ?
                                            "bg-destructive"
                                        :   undefined
                                    }
                                />
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        {start}
                                    </span>
                                    <span className="text-muted-foreground">
                                        {end}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Duration:
                                    </span>
                                    <span>
                                        {days} / {nights}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Client:
                                    </span>
                                    <span>{client}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Manager:
                                    </span>
                                    <span>
                                        {manager?.first_name}{" "}
                                        {manager?.last_name}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    className="flex-1"
                                    to={isCost ? "/cost/$id" : "/packs/$pack"}
                                    params={{
                                        pack: id.toString(),
                                        id:
                                            plan_id ?
                                                plan_id.toString()
                                            :   undefined,
                                    }}
                                >
                                    <Button
                                        className={cn(
                                            "w-full gap-1 font-light",
                                        )}
                                        variant={
                                            isFinish ? "secondary"
                                            : Number(tm_status) == -1 ?
                                                "destructive"
                                            :   "default"
                                        }
                                    >
                                        <Eye size={18} className="font-light" />
                                        Tur paketlar
                                    </Button>
                                </Link>
                                {!!tm_contract && (
                                    <Button
                                        size="icon"
                                        variant={"success-muted"}
                                        onClick={handleDownload}
                                    >
                                        <Download
                                            size={18}
                                            className="font-light"
                                        />
                                    </Button>
                                )}
                                {!isFinish && (
                                    <PackCardMenu
                                        onDelete={onDelete}
                                        onEdit={onEdit}
                                        onSend={onSend}
                                        onFinish={onFinish}
                                        onUndo={onUndo}
                                        status={status}
                                        className={
                                            Number(tm_status) == -1 ?
                                                "bg-destructive text-white border-destructive"
                                            :   ""
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </TooltipTrigger>
                {tm_comment ?
                    <TooltipContent side="bottom" align="center">
                        <p className="max-w-80">Izoh</p>
                        <p className="max-w-80">{tm_comment}</p>
                    </TooltipContent>
                :   ""}
            </Tooltip>
        </TooltipProvider>
    )
}

export default memo(PackCard)
