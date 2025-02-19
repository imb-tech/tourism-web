import ConfirmCancelModal from "@/components/custom/confirm-modal"
import InitialDataBox from "@/components/elements/initial-data-box"
import PackCard from "@/components/shared/pack-card"
import { CHANGERS, REAL_COST } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/use-modal"
import { useGet, usePost } from "@/services/default-requests"
import { useState } from "react"

const CostHome = () => {
    const { data, isLoading, isError, isSuccess } = useGet<
        PackItem[] | undefined
    >(REAL_COST)
    const [item, setItem] = useState<PackItem | null>(null)
    const { openModal: openConfirmModal } = useModal("confirm")
    const { mutateAsync: sendTm } = usePost()

    function handleSend(v: PackItem) {
        setItem(v)
        openConfirmModal()
    }

    async function onConfirmSend() {
        try {
            await sendTm(CHANGERS, { tour: item?.id })
            return Promise.resolve()
        } catch (error) {
            return Promise.reject()
        }
    }

    return isSuccess ?
            <section className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-3">
                {data?.map((pack) => (
                    <PackCard
                        key={pack.id}
                        {...pack}
                        onSend={() => handleSend(pack)}
                    />
                ))}

                <ConfirmCancelModal
                    onSuccessAction={onConfirmSend}
                    refetch
                    refetchKey={REAL_COST}
                />
            </section>
        :   <InitialDataBox isLoading={isLoading} isError={isError} />
}

export default CostHome
