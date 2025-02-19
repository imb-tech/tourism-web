import ConfirmCancelModal from "@/components/custom/confirm-modal"
import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import InitialDataBox from "@/components/elements/initial-data-box"
import AddButton from "@/components/shared/add-button"
import PackCard from "@/components/shared/pack-card"
import { CHANGERS, MOVE_REAL, TOUR } from "@/constants/api-endpoints"
import { TOUR_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet, usePost } from "@/services/default-requests"
import { Grid2x2Plus } from "lucide-react"
import { useState } from "react"
import CreatePackForm from "./create-pack-form"

type PacksResponse = {
    total_pages: number
    results: PackItem[]
}

const Packs = () => {
    const { openModal } = useModal()
    const { openModal: openDeleteModal } = useModal("delete")
    const { openModal: openConfirmModal } = useModal("confirm")
    const { openModal: openMoveToRealModal } = useModal("move-to-real")
    const [item, setItem] = useState<PackItem | null>(null)
    const { setStore } = useStore<PackItem | undefined>(TOUR_DATA)
    const { mutateAsync: sendTm } = usePost()

    const { data, isLoading, isError, isSuccess } = useGet<
        PacksResponse | undefined
    >(TOUR)

    function handleDelete(v: PackItem) {
        setItem(v)
        openDeleteModal()
    }

    function handleEdit(v: PackItem) {
        setStore(v)
        openModal()
    }

    function handleSend(v: PackItem) {
        setItem(v)
        openConfirmModal()
    }

    function handleOnFinishSend(v: PackItem) {
        setItem(v)
        openMoveToRealModal()
    }

    async function onConfirmSend() {
        try {
            await sendTm(CHANGERS, { tour: item?.id })
            return Promise.resolve()
        } catch (error) {
            return Promise.reject()
        }
    }

    async function onFinishSend() {
        try {
            await sendTm(MOVE_REAL + `${item?.id}`, {})
            return Promise.resolve()
        } catch (error) {
            return Promise.reject()
        }
    }

    return isSuccess ?
            <section className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-7 gap-4 mt-3">
                <AddButton
                    className="w-full max-w-sm"
                    onClick={openModal}
                    label="Tur qo'shish"
                    icon={Grid2x2Plus}
                />
                {data?.results.map((pack) => (
                    <PackCard
                        key={pack.id}
                        {...pack}
                        onEdit={() => handleEdit(pack)}
                        onDelete={() => handleDelete(pack)}
                        onSend={() => handleSend(pack)}
                        onFinish={() => handleOnFinishSend(pack)}
                    />
                ))}

                <Modal className="max-w-xl" title="Tur qo'shish">
                    <CreatePackForm />
                </Modal>

                <DeleteModal id={item?.id || 0} path={TOUR} />

                <ConfirmCancelModal
                    onSuccessAction={onConfirmSend}
                    refetch
                    refetchKey={TOUR}
                />

                <ConfirmCancelModal
                    onSuccessAction={onFinishSend}
                    refetch
                    refetchKey={TOUR}
                    modalKey="move-to-real"
                />
            </section>
        :   <InitialDataBox isLoading={isLoading} isError={isError} />
}

export default Packs
