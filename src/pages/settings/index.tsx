import ParamAnimatedTabs from "@/components/param/animated-tab"
import Categories from "./categories"
import CityAndCountries from "./city-and-countries"
import Enterances from "./enterances"
import Foods from "./foods"
import Hotels from "./hotels"
import Transports from "./transports"

export default function Settings() {
    return (
        <main className="bg-background p-3 rounded-sm">
            <ParamAnimatedTabs
                options={[
                    {
                        id: "settings",
                        name: "Davlat va shaharlar",
                        content: <CityAndCountries />,
                    },
                    {
                        id: "hotels",
                        name: "Mehmonxonalar",
                        content: <Hotels />,
                    },
                    {
                        id: "enterances",
                        name: "Joylar",
                        content: <Enterances />,
                    },
                    {
                        id: "transports",
                        name: "Transportlar",
                        content: <Transports />,
                    },
                    {
                        id: "foods",
                        name: "Taomlar",
                        content: <Foods />,
                    },
                    {
                        id: "categories",
                        name: "Kategoriyalar",
                        content: <Categories />,
                    },
                ]}
            />
        </main>
    )
}
