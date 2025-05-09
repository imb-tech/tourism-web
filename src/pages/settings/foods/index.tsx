import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { FOODS } from "@/constants/api-endpoints"
import { FOOD_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/services/default-requests"
import { useSearch } from "@tanstack/react-router"
import { useState } from "react"
import { useFoodColumns } from "../useCols"
import FoodCreateEdit from "./food-create-edit"

export default function Foods() {
    const { search } = useSearch({ strict: false })
    const { data: foods, isLoading } = useGet<Food[]>(FOODS, {
        params: { search },
    })

    const { openModal } = useModal(FOODS)
    const { openModal: openDeleteModal } = useModal("delete")
    const { remove, setStore, store } = useStore<Food>(FOOD_DATA)
    const [deleteItem, setDeleteItem] = useState<Food["id"] | null>(null)

    function handleFoodEdit({ original }: { original: Food }) {
        openModal()
        setStore(original)
    }
    function handleFoodDelete({ original }: { original: Food }) {
        openDeleteModal()
        setDeleteItem(original.id)
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl">Foods</h2>
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
                columns={useFoodColumns()}
                data={foods ?? []}
                loading={isLoading}
                viewAll
                withActions
                onEdit={handleFoodEdit}
                onDelete={handleFoodDelete}
            />

            <Modal
                title={store?.id ? "Taomni o'zgartirish" : "Taom qo'shish"}
                className="max-w-xl"
                modalKey={FOODS}
            >
                <FoodCreateEdit />
            </Modal>

            <DeleteModal path={FOODS} id={deleteItem || ""} />
        </div>
    )
}
