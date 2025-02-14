import DownloadAsExcel from "@/components/custom/download-as-excel"
import { DASHBOARD_STATUS } from "@/constants/api-endpoints"
import { useGet } from "@/services/default-requests"
import HomeBalance from "./home-balance"
import HomeStat from "./home-stat"
import HomeTable from "./home-table"
import { useHomeColumn } from "./useCols"

const HomeMain = () => {
    const { data: statsData } =
        useGet<ListResponse<HomeTableItem>>(DASHBOARD_STATUS)

    return (
        <section>
            <div className="grid grid-cols-3 gap-3">
                <HomeStat type="cash" />
                <HomeStat type="bank" />
                <HomeBalance />
            </div>

            <div className="bg-background p-3 rounded-md mt-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <p>Kassa</p>
                    <DownloadAsExcel url="" name="test" />
                </div>
                <HomeTable
                    enableColumnVisibility
                    grid="grid-cols-10"
                    columns={useHomeColumn()}
                    setCellClassName={() => "text-sm font-light"}
                    viewAll
                    loading={false}
                    data={statsData?.results || []}
                />
            </div>
        </section>
    )
}

export default HomeMain
