import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import InitialDataBox from "@/components/elements/initial-data-box"
import AddButton from "@/components/shared/add-button"
import TourCard from "@/components/shared/pack-card/tour-card"
import { PLANS } from "@/constants/api-endpoints"
import { PLAN_BENEFIT, TOUR_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/services/default-requests"
import { useParams, useSearch } from "@tanstack/react-router"
import { Grid2x2PlusIcon } from "lucide-react"
import CreateTourForm from "./create-tour-form"
import PackBenefitForm from "./pack-benefit-form"
import PackDetailHeader from "./pack-detail-header"

export default function PackDetail() {
    const { openModal } = useModal(TOUR_DATA)

    const { store, remove } = useStore<PlanItem>(TOUR_DATA)
    const { pack: tour_id } = useParams({ from: "/_main/packs/$pack/" })
    const { search } = useSearch({ from: "/_main/packs/$pack/" })

    const { data, isLoading } = useGet<PlanItem[] | undefined>(PLANS, {
        params: { tour_id, search: search },
    })

    function handleAdd() {
        remove()
        openModal()
    }

    return (
        <div className="p-3">
            <PackDetailHeader title="Plans" backUrl="/packs" />

            {isLoading ?
                <InitialDataBox isLoading />
            :   <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 mt-3">
                    <AddButton
                        className="w-full max-w-sm"
                        onClick={handleAdd}
                        label="Add plan"
                        icon={Grid2x2PlusIcon}
                    />
                    {data?.map((pack) => <TourCard key={pack.id} {...pack} />)}
                </div>
            }

            <Modal
                className="max-w-xl"
                title={store ? "Edit plan" : "Add plan"}
                modalKey={TOUR_DATA}
            >
                <CreateTourForm />
            </Modal>

            <Modal
                className="max-w-xl font-bold"
                title="Revenue percent"
                modalKey={PLAN_BENEFIT}
            >
                <PackBenefitForm />
            </Modal>

            <DeleteModal id={store?.id || 0} path={PLANS} />
        </div>
    )
}
