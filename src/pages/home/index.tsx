import DownloadAsExcel from "@/components/custom/download-as-excel"
import { DASHBOARD_STATUS, STATUS_EXCEL } from "@/constants/api-endpoints"
import { useGet } from "@/services/default-requests"
import Statistics from "./dashboard-statistcis"
import HomeTable from "./home-table"
import { useHomeColumn } from "./useCols"

const HomeMain = () => {
    const { data: statsData } =
        useGet<ListResponse<HomeTableItem>>(DASHBOARD_STATUS)

    return (
        <section>
            <Statistics />

            <div className="bg-background p-3 rounded-md mt-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <p>Tur paketlar</p>
                    <DownloadAsExcel url={STATUS_EXCEL} name="test" />
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
