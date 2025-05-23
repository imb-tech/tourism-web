import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { RESTAURANTS } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/services/default-requests"
import { useState } from "react"
import { useRestaurantColumns } from "../useCols"
import RestaurantCreateForm from "./restaurant-create-form"

export default function Restaurans() {
    const { data, isLoading } = useGet<ListResponse<Restaurant>>(RESTAURANTS)
    const { openModal } = useModal()
    const { setStore, remove } = useStore<Restaurant | undefined>(RESTAURANTS)
    const { openModal: openDeleteModal } = useModal("delete")
    const [deleteItem, setDeleteItem] = useState<Restaurant["id"] | null>(null)

    function handleEdit(item: Restaurant) {
        setStore(item)
        openModal()
    }

    function handleDelete(id: number) {
        setDeleteItem(id)
        openDeleteModal()
    }

    return (
        <section>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl">Restaurants</h2>
                <Button
                    onClick={() => {
                        remove()
                        openModal()
                    }}
                >
                    Add
                </Button>
            </div>
            <DataTable
                loading={isLoading}
                columns={useRestaurantColumns()}
                data={data?.results || []}
                withActions
                onEdit={({ original }) => handleEdit(original)}
                onDelete={({ original }) => handleDelete(original.id)}
            />
            <Modal className="max-w-5xl">
                <RestaurantCreateForm />
            </Modal>
            <DeleteModal
                modalKey="delete"
                path={RESTAURANTS}
                id={deleteItem || ""}
            />
        </section>
    )
}
