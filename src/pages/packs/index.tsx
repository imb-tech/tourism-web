import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import AddButton from "@/components/shared/add-button"
import PackCard from "@/components/shared/pack-card"
import { TOUR } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/use-modal"
import { useGet } from "@/services/default-requests"
import { Grid2x2Plus } from "lucide-react"
import CreatePackForm from "./create-pack-form"

type PacksResponse = {
    total_pages: number
    results: PackItem[]
}

const Packs = () => {
    const { openModal } = useModal()

    const { data } = useGet<PacksResponse | undefined>(TOUR)

    return (
        <section className="grid grid-cols-4 gap-3">
            <AddButton
                onClick={openModal}
                label="Tur qo'shish"
                icon={Grid2x2Plus}
            />
            {data?.results.map((pack) => (
                <PackCard
                    key={pack.id}
                    {...pack}
                    onEdit={() => console.log("Edit clicked")}
                    onDelete={() => console.log("Delete clicked")}
                />
            ))}

            <Modal className="max-w-xl" title="Tur qo'shish">
                <CreatePackForm />
            </Modal>

            <DeleteModal id={1} path={TOUR} />
        </section>
    )
}

export default Packs
