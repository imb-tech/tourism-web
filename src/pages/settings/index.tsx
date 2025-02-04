import Cities from "./cities/index"
import Countries from "./countries/index"

export default function Settings() {
    return (
        <section className="p-3 flex gap-6 items-start">
            <div className="w-1/2 p-3 bg-background rounded-sm">
                <Countries />
            </div>
            <div className="w-1/2  p-3 bg-background rounded-sm">
                <Cities />
            </div>
        </section>
    )
}
