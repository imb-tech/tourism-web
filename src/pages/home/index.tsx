import HomeBalance from "./home-balance"
import HomeStat from "./home-stat"
import HomeTable from "./home-table"
import { useHomeColumn } from "./useCols"

const data: HomeTableItem[] = [
    {
        id: 1,
        manager: "Ahmad",
        client: "Jesica",
        from_date: "18-02-2025",
        to_date: "18-02-2025",
        tourists_count: 12,
        status: 10,
        expected_cost: 55000,
        actual_cost: 43000,
        income_present: 75,
        income: 67000,
    },
    {
        id: 2,
        manager: "Doniyor",
        client: "Doniyor",
        from_date: "18-02-2025",
        to_date: "18-02-2025",
        tourists_count: 12,
        status: 10,
        expected_cost: 55000,
        actual_cost: 43000,
        income_present: 75,
        income: 67000,
    },
]

const HomeMain = () => {
    return (
        <section>
            <div className="grid grid-cols-3 gap-3">
                <HomeStat type="cash" />
                <HomeStat type="bank" />
                <HomeBalance />
            </div>

            <div className="bg-background p-3 rounded-md mt-3 flex flex-col gap-2">
                <p>Kassa</p>
                <HomeTable
                    enableColumnVisibility
                    grid="grid-cols-10"
                    columns={useHomeColumn()}
                    setCellClassName={() => "text-sm font-light"}
                    viewAll
                    loading={false}
                    data={data}
                    subTableClassName={`h-[${(data?.length + 1) * 3}rem]`}
                />
            </div>
        </section>
    )
}

export default HomeMain
