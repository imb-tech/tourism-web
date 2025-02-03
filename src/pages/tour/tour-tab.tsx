import ParamAnimatedTabs from "@/components/param/animated-tab"

const options = [
    { id: 1, name: "Shahar" },
    { id: 2, name: "Gid" },
    { id: 3, name: "Mehmonxona" },
    { id: 4, name: "Transport 1" },
    { id: 5, name: "Transport 2" },
    { id: 6, name: "Restoran 1" },
    { id: 7, name: "Restoran 2" },
    { id: 8, name: "Poyezd" },
    { id: 9, name: "Samolyot" },
    { id: 10, name: "Enterence" },
    { id: 11, name: "Boshqa" },
]

export default function TourTab() {
    return (
        <ParamAnimatedTabs
            options={options}
            className="max-w-full w-full grid"
        />
    )
}
