import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import { ChevronLeft } from "lucide-react"

type Props = {
    title?: string
    backUrl?: string
}

const PackDetailHeader = ({ title = "Pack Detail", backUrl }: Props) => {
    return (
        <div className="flex items-center gap-3 py-1">
            <Link to={backUrl || "/"}>
                <Button size={"icon"} variant={"outline"}>
                    <ChevronLeft />
                </Button>
            </Link>
            <p className="text-3xl">{title}</p>
        </div>
    )
}

export default PackDetailHeader
