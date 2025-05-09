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
                        name: "Country and cities",
                        content: <CityAndCountries />,
                    },
                    {
                        id: "hotels",
                        name: "Hotels",
                        content: <Hotels />,
                    },
                    {
                        id: "entrances",
                        name: "Entrances",
                        content: <Enterances />,
                    },
                    {
                        id: "transports",
                        name: "Transports",
                        content: <Transports />,
                    },
                    {
                        id: "foods",
                        name: "Foods",
                        content: <Foods />,
                    },
                    {
                        id: "restaurants",
                        name: "Restaurants",
                        content: <Restaurans />,
                    },
                    {
                        id: "categories",
                        name: "Categories",
                        content: <FinancialCategoriesAndCategories />,
                    },
                ]}
                cleanOthers
            />
        </main>
    )
}
