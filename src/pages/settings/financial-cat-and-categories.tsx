import Categories from "./categories"
import FinancialCategories from "./financial-categories"

export default function FinancialCategoriesAndCategories() {
    return (
        <section className="flex gap-6 items-start">
            <div className="w-1/2">
                <FinancialCategories />
            </div>
            <div className="w-1/2">
                <Categories />
            </div>
        </section>
    )
}
