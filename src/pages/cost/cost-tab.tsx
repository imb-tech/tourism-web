import ParamAnimatedTabs from "@/components/param/animated-tab"
import { ReactNode } from "react"
import { CityList } from "./lists/city-list"
import { DinnerList } from "./lists/dinner-list"
import { EntranceList } from "./lists/entrance-list"
import { GuideList } from "./lists/guide-list"
import { HotelList } from "./lists/hotel-list"
import { OtherList } from "./lists/other-list"
import { PlaneList } from "./lists/plane-list"
import { TrainList } from "./lists/train-list"
import { TransInList } from "./lists/transin-list"

const options: { id: packTab; name: string; content?: ReactNode }[] = [
    { id: "city", name: "Shahar", content: <CityList /> },
    { id: "guide", name: "Gid", content: <GuideList /> },
    { id: "hotel", name: "Mehmonxona", content: <HotelList /> },
    { id: "trans_in", name: "Transport 1", content: <TransInList /> },
    { id: "trans_out", name: "Transport 2", content: <TransInList /> },
    { id: "dinner", name: "Restoran 1", content: <DinnerList /> },
    { id: "lunch", name: "Restoran 2", content: <DinnerList /> },
    { id: "train", name: "Poyezd", content: <TrainList /> },
    { id: "plane", name: "Samolyot", content: <PlaneList /> },
    { id: "entrance", name: "Enterence", content: <EntranceList /> },
    { id: "other", name: "Boshqa", content: <OtherList /> },
]

export default function CostTab() {
    return (
        <ParamAnimatedTabs
            options={options}
            paramName="type"
            className="max-w-full w-full grid"
        />
    )
}
