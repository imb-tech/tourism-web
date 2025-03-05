import ParamAnimatedTabs from "@/components/param/animated-tab"
import CityAndCountries from "./city-and-countries"
import Enterances from "./enterances"
import FinancialCategoriesAndCategories from "./financial-cat-and-categories"
import Foods from "./foods"
import Hotels from "./hotels"
import Restaurans from "./restaurans"
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
                        id: "entrances",
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
                        id: "restaurants",
                        name: "Restoranlar",
                        content: <Restaurans />,
                    },
                    {
                        id: "categories",
                        name: "Kategoriyalar",
                        content: <FinancialCategoriesAndCategories />,
                    },
                ]}
                cleanOthers
            />
        </main>
    )
}
