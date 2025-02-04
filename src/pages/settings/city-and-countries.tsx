import Cities from "./cities"
import Countries from "./countries"

export default function CityAndCountries() {
    return (
        <section className="flex gap-6 items-start">
            <div className="w-1/2">
                <Countries />
            </div>
            <div className="w-1/2">
                <Cities />
            </div>
        </section>
    )
}
