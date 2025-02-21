import ParamAnimatedTabs from "@/components/param/animated-tab"
import useTourLoading from "./loading"

const options: { id: packTab; name: string }[] = [
    { id: "city", name: "Shahar" },
    { id: "guide", name: "Gid" },
    { id: "hotel", name: "Mehmonxona" },
    { id: "trans_in", name: "Trans in" },
    { id: "trans_out", name: "Trans out" },
    { id: "dinner", name: "Dinner" },
    { id: "lunch", name: "Lunch" },
    { id: "train", name: "Poyezd" },
    { id: "plane", name: "Samolyot" },
    { id: "entrance", name: "Enterence" },
    { id: "other", name: "Boshqa" },
    { id: "criteria", name: "Inclusion & Exclusion" },
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
