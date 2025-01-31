import Modal from "@/components/custom/modal"
import AddButton from "@/components/shared/add-button"
import PackCard from "@/components/shared/pack-card"
import { useModal } from "@/hooks/use-modal"
import { Grid2x2Plus } from "lucide-react"
import CreatePackForm from "./create-pack-form"

const Packs = () => {
    const { openModal } = useModal()

    return (
        <section className="grid grid-cols-4 gap-3">
            <AddButton
                onClick={openModal}
                label="Tur qo'shish"
                icon={Grid2x2Plus}
            />
            <PackCard
                id="1234"
                destination="Xitoy"
                startDate="20.12.24"
                endDate="27.12.24"
                duration="8/7"
                client="Jesica"
                manager="Xudoyor Ahmedov"
                onEdit={() => console.log("Edit clicked")}
                onDelete={() => console.log("Delete clicked")}
            />
            <PackCard
                id="1234"
                destination="Xitoy"
                startDate="20.12.24"
                endDate="27.12.24"
                duration="8/7"
                client="Jesica"
                manager="Xudoyor Ahmedov"
                onEdit={() => console.log("Edit clicked")}
                onDelete={() => console.log("Delete clicked")}
            />
            <PackCard
                id="1234"
                destination="Xitoy"
                startDate="20.12.24"
                endDate="27.12.24"
                duration="8/7"
                client="Jesica"
                manager="Xudoyor Ahmedov"
                onEdit={() => console.log("Edit clicked")}
                onDelete={() => console.log("Delete clicked")}
            />
            <PackCard
                id="1234"
                destination="Xitoy"
                startDate="20.12.24"
                endDate="27.12.24"
                duration="8/7"
                client="Jesica"
                manager="Xudoyor Ahmedov"
                onEdit={() => console.log("Edit clicked")}
                onDelete={() => console.log("Delete clicked")}
            />

            <Modal className="max-w-xl" title="Tur qo'shish">
                <CreatePackForm />
            </Modal>
        </section>
    )
}

export default Packs
