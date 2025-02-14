import { useNavigate } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"
import { Button } from "../ui/button"

type Props = {
    className?: string
    to?: string | undefined
}

export default function BackBtn({ className = "", to }: Props) {
    const navigate = useNavigate()

    const clickHandler = () => {
        if (to) {
            navigate({ to })
        } else window.history.back()
    }

    return (
        <Button
            className={className}
            onClick={clickHandler}
            variant={"ghost"}
            size={"sm"}
        >
            <ArrowLeft size={16} />
        </Button>
    )
}
