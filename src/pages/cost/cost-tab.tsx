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
    { id: "city", name: "City", content: <CityList /> },
    { id: "guide", name: "Guide", content: <GuideList /> },
    { id: "hotel", name: "Hotel", content: <HotelList /> },
    { id: "trans_in", name: "Trans in ", content: <TransInList /> },
    { id: "trans_out", name: "Trans out ", content: <TransInList /> },
    { id: "dinner", name: "Dinne", content: <DinnerList /> },
    { id: "lunch", name: "Lunch", content: <DinnerList /> },
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
