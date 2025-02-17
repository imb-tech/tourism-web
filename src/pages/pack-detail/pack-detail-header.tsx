import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import { ChevronLeft, Loader2 } from "lucide-react"
import useTourLoading from "../tour/loading"

type Props = {
    title?: string
    backUrl?: string
}

const PackDetailHeader = ({ title = "Pack Detail", backUrl }: Props) => {
    const { loading } = useTourLoading()

    return (
        <div className="flex items-center gap-3 py-1">
            <Link to={backUrl || "/"}>
                <Button size={"icon"} variant={"outline"}>
                    <ChevronLeft />
                </Button>
            </Link>
            <p className="text-2xl">{title}</p>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        </div>
    )
}

export default PackDetailHeader
