import BackBtn from "@/components/custom/back-btn"
import DownloadAsExcel from "@/components/custom/download-as-excel"
import { useParams } from "@tanstack/react-router"
import DocumentTab from "./document-tab"
import HomeBalance from "./home-balance"
import HomeStat from "./home-stat"

const HomeDocument = () => {
    const { plan } = useParams({ from: "/_main/document/$plan/$day" })
    return (
        <section>
            <div className="grid grid-cols-3 gap-3">
                <HomeStat type="cash" />
                <HomeStat type="bank" />
                <HomeBalance />
            </div>

            <div className="bg-background p-3 rounded-md mt-3 flex flex-col gap-2">
                <div className="flex items-center">
                    <BackBtn to={`/?cash_id=${plan}`} />
                    <p className="flex-1">Kassa</p>
                    <DownloadAsExcel url="" name="test" />
                </div>
                <DocumentTab />
            </div>
        </section>
    )
}

export default HomeDocument
