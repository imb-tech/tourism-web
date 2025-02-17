import InitialDataBox from "@/components/elements/initial-data-box"
import PackCard from "@/components/shared/pack-card"
import { REAL_COST } from "@/constants/api-endpoints"
import { useGet } from "@/services/default-requests"

const CostHome = () => {
    const { data, isLoading, isError, isSuccess } = useGet<
        PackItem[] | undefined
    >(REAL_COST)

    return isSuccess ?
            <section className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-3">
                {data?.map((pack) => <PackCard key={pack.id} {...pack} />)}
            </section>
        :   <InitialDataBox isLoading={isLoading} isError={isError} />
}

export default CostHome
