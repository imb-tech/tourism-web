import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ACCEPT, PDF_FILE, PLANS } from "@/constants/api-endpoints"
import { PLAN_BENEFIT, TOUR_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"
import { baseURL } from "@/services/axios-instance"
import { usePost } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "@tanstack/react-router"
import {
    ArrowRight,
    Copy,
    DollarSign,
    Download,
    Pencil,
    Trash2,
    UsersRound,
} from "lucide-react"
import { memo } from "react"
import Progress from "./progress"

function TourCard(props: PlanItem) {
    const {
        id,
        leaders_count,
        tourists_count,
        hotel_stars,
        accepted,
        benefit,
    } = props
    const { setStore } = useStore<PlanItem>(TOUR_DATA)
    const queryClient = useQueryClient()
    const { openModal: openBenefitModal } = useModal(PLAN_BENEFIT)

    const { pack } = useParams({ from: "/_main/packs/$pack/" })

    const { mutate, isPending } = usePost({
        onSuccess() {
            queryClient.refetchQueries({
                queryKey: [PLANS],
            })
        },
    })

    const { mutate: select } = usePost({
        onSuccess() {
            queryClient.refetchQueries({
                queryKey: [PLANS],
            })
        },
    })

    const { openModal: openDeleteModal } = useModal("delete")
    const { openModal } = useModal(TOUR_DATA)

    const navigate = useNavigate()

    function handleEdit() {
        setStore(props)
        openModal()
    }

    function handleDelete() {
        setStore(props)
        openDeleteModal()
    }

    function handleBenefit() {
        setStore(props)
        openBenefitModal()
    }

    function handleUsers() {
        navigate({ to: `/packs/${pack}/${id}` })
    }

    function handleDetails() {
        navigate({ to: `/packs/${pack}/tour/${id}` })
    }

    function handleDublicate() {
        mutate(PLANS, props)
    }

    function handleSelect() {
        select(ACCEPT + `/${id}/${pack}`, null)
    }

    function handleDownload() {
        window.open(`${baseURL}/${PDF_FILE}${id}`)
    }

    return (
        <Card
            className={cn(
                "w-full max-w-sm p-4 shadow-none cursor-pointer",
                accepted && "border border-primary",
            )}
            onDoubleClick={handleSelect}
        >
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="text-sm text-muted-foreground">#{id}</div>
                <div className="font-medium">{"Xitoy"}</div>
            </CardHeader>
            <CardContent className="space-y-4 p-0">
                <Progress size={4} finished={1} />
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Turistlar:
                        </span>
                        <span>
                            {tourists_count} + {leaders_count}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Mexmonxona:
                        </span>
                        <div className="flex items-center gap-1">
                            <span>{hotel_stars}</span>
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 10 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5.86447 0.755313L6.74447 2.51531C6.86447 2.76031 7.18447 2.99531 7.45447 3.04031L9.04947 3.30531C10.0695 3.47531 10.3095 4.21531 9.57447 4.94531L8.33447 6.18531C8.12447 6.39531 8.00947 6.80031 8.07447 7.09031L8.42947 8.62531C8.70947 9.84031 8.06447 10.3103 6.98947 9.67531L5.49447 8.79031C5.22447 8.63031 4.77947 8.63031 4.50447 8.79031L3.00947 9.67531C1.93947 10.3103 1.28947 9.83531 1.56947 8.62531L1.92447 7.09031C1.98947 6.80031 1.87447 6.39531 1.66447 6.18531L0.424466 4.94531C-0.305534 4.21531 -0.0705336 3.47531 0.949466 3.30531L2.54447 3.04031C2.80947 2.99531 3.12947 2.76031 3.24947 2.51531L4.12947 0.755313C4.60947 -0.199687 5.38947 -0.199687 5.86447 0.755313Z"
                                    fill="#FFCC00"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Daromad:</span>
                        <span>{benefit} %</span>
                    </div>
                </div>
                <div className="flex justify-between gap-1">
                    <Button
                        size="icon"
                        variant={"destructive-muted"}
                        className="h-10 w-10 rounded-lg"
                        onClick={handleDelete}
                    >
                        <Trash2 size={18} className="font-light" />
                    </Button>
                    <Button
                        size="icon"
                        variant={"warning-muted"}
                        className="h-10 w-10 rounded-lg"
                        onClick={handleBenefit}
                    >
                        <DollarSign size={18} className="font-light" />
                    </Button>
                    <Button
                        size="icon"
                        variant={"primary-muted"}
                        className="h-10 w-10 rounded-lg"
                        onClick={handleDownload}
                    >
                        <Download size={18} className="font-light" />
                    </Button>
                    <Button
                        size="icon"
                        variant={"primary-muted"}
                        className="h-10 w-10 rounded-lg"
                        onClick={handleDublicate}
                        loading={isPending}
                    >
                        <Copy size={18} className="font-light" />
                    </Button>
                    <Button
                        size="icon"
                        variant={"primary-muted"}
                        className="h-10 w-10 rounded-lg"
                        onClick={handleUsers}
                    >
                        <UsersRound size={18} className="font-light" />
                    </Button>
                    <Button
                        size="icon"
                        variant={"primary-muted"}
                        className="h-10 w-10 rounded-lg"
                        onClick={handleEdit}
                    >
                        <Pencil size={18} className="font-light" />
                    </Button>
                    <Button
                        size="icon"
                        variant={"default"}
                        className="h-10 w-10 rounded-lg"
                        onClick={handleDetails}
                    >
                        <ArrowRight size={18} className="font-light" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default memo(
    TourCard,
    (prev, next) => prev.id === next.id && prev.accepted === next.accepted,
)
