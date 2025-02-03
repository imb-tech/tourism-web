import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import AddButton from "@/components/shared/add-button"
import TourCard from "@/components/shared/pack-card/tour-card"
import { TOUR_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/services/default-requests"
import { Grid2x2PlusIcon } from "lucide-react"
import CreateTourForm from "./create-tour-form"
import PackDetailHeader from "./pack-detail-header"

export default function PackDetail() {
    const { openModal } = useModal(TOUR_DATA)
    const { store, remove } = useStore(TOUR_DATA)
    const { data } = useGet<PlanItem[]>("tours/plans", {
        params: { tour_id: 1 },
    })

    console.log(data)

    function handleAdd() {
        remove()
        openModal()
    }

    return (
        <div className="p-3">
            <PackDetailHeader title="Tariflar" backUrl="/packs" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                <AddButton
                    onClick={handleAdd}
                    label="Tarif qo'shish"
                    icon={Grid2x2PlusIcon}
                />
                {data?.map((pack) => <TourCard key={pack.id} {...pack} />)}
            </div>

            <Modal
                className="max-w-xl"
                title={store ? "Tarifni o'zgartirish" : "Tarif qo'shish"}
                modalKey={TOUR_DATA}
            >
                <CreateTourForm />
            </Modal>

            <DeleteModal id={1} path="" />
        </div>
    )
}
