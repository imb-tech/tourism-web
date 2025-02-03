import ParamAnimatedTabs from "@/components/param/animated-tab"

const options = [
    { id: "city", name: "Shahar" },
    { id: "gid", name: "Gid" },
    { id: "hotel", name: "Mehmonxona" },
    { id: "transport1", name: "Transport 1" },
    { id: "transport2", name: "Transport 2" },
    { id: "restoran1", name: "Restoran 1" },
    { id: "restoran2", name: "Restoran 2" },
    { id: "train", name: "Poyezd" },
    { id: "plane", name: "Samolyot" },
    { id: "enterence", name: "Enterence" },
    { id: "other", name: "Boshqa" },
]

export default function TourTab() {
    return (
        <ParamAnimatedTabs
            options={options}
            paramName="type"
            className="max-w-full w-full grid"
        />
    )
}
