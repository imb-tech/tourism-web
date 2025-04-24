import BackBtn from "@/components/custom/back-btn"
import DownloadAsExcel from "@/components/custom/download-as-excel"
import { STATUS_EXCEL } from "@/constants/api-endpoints"
import { baseURL } from "@/services/axios-instance"
import { useParams } from "@tanstack/react-router"
import Statistics from "./dashboard-statistcis"
import DocumentTab from "./document-tab"

const HomeDocument = () => {
    const { plan } = useParams({ from: "/_main/document/$plan/$day" })
    console.log(baseURL + STATUS_EXCEL)

    return (
        <section>
            <Statistics />

            <div className="bg-background p-3 rounded-md mt-3 flex flex-col gap-2">
                <div className="flex items-center">
                    <BackBtn to={`/?cash_id=${plan}`} />
                    <p className="flex-1">Tur paketlar</p>
                    <DownloadAsExcel url={baseURL + STATUS_EXCEL} name="test" />
                </div>
                <DocumentTab />
            </div>
        </section>
    )
}

export default HomeDocument
