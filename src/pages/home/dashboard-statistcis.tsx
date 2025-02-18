import InitialDtaBox from "@/components/elements/initial-data-box"
import { STATISTICS } from "@/constants/api-endpoints"
import { useGet } from "@/services/default-requests"
import HomeBalance from "./home-balance"
import HomeStat from "./home-stat"

const Statistics = () => {
    const { data: statisticsData, isLoading } =
        useGet<DashboardStatistics>(STATISTICS)
    console.log(statisticsData)

    return (
        <section>
            {isLoading ?
                <InitialDtaBox isLoading />
            :   <div className="grid grid-cols-3 gap-3">
                    <HomeStat
                        type="cash"
                        balance={statisticsData?.cash.balance ?? 0}
                        expense={statisticsData?.cash.expense ?? 0}
                        income={statisticsData?.cash.income ?? 0}
                    />
                    <HomeStat
                        type="bank"
                        balance={statisticsData?.bank.balance ?? 0}
                        expense={statisticsData?.bank.expense ?? 0}
                        income={statisticsData?.bank.income ?? 0}
                    />
                    <HomeBalance />
                </div>
            }
        </section>
    )
}

export default Statistics
