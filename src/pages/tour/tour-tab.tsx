import ParamAnimatedTabs from "@/components/param/animated-tab"
import useTourLoading from "./loading"

const options: { id: packTab; name: string }[] = [
    { id: "city", name: "City" },
    { id: "guide", name: "Guide" },
    { id: "hotel", name: "Hotel" },
    { id: "trans_in", name: "Trans in" },
    { id: "trans_out", name: "Trans out" },
    { id: "dinner", name: "Dinner" },
    { id: "lunch", name: "Lunch" },
    { id: "train", name: "Train" },
    { id: "plane", name: "Plane" },
    { id: "entrance", name: "Enterence" },
    { id: "other", name: "Other" },
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
