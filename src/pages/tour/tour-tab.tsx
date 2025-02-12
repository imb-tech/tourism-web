import ParamAnimatedTabs from "@/components/param/animated-tab"
import useTourLoading from "./loading"

const options: { id: packTab; name: string }[] = [
    { id: "city", name: "Shahar" },
    { id: "guide", name: "Gid" },
    { id: "hotel", name: "Mehmonxona" },
    { id: "trans_in", name: "Transport 1" },
    { id: "trans_out", name: "Transport 2" },
    { id: "dinner", name: "Restoran 1" },
    { id: "lunch", name: "Restoran 2" },
    { id: "train", name: "Poyezd" },
    { id: "plane", name: "Samolyot" },
    { id: "entrance", name: "Enterence" },
    { id: "other", name: "Boshqa" },
]

export default function TourTab() {
    const { loading } = useTourLoading()

    return (
        <ParamAnimatedTabs
            disabled={loading}
            options={options}
            paramName="type"
            className="max-w-full w-full grid"
        />
    )
}
