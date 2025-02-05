import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { CATEGORIES } from "@/constants/api-endpoints"
import { CATEGORY_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/services/default-requests"
import { useState } from "react"
import { useCategoryColumns } from "../useCols"
import CategoryCreateEdit from "./category-create-edit"

export default function Categories() {
    const { data: categories, isLoading: isCategoriesLoading } =
        useGet<Category[]>(CATEGORIES)

    const { openModal: openCategoryModal } = useModal(CATEGORIES)
    const { openModal: openCategoryDeleteModal } = useModal()

    const [deleteItem, setDeleteItem] = useState<Category["id"] | null>(null)

    const { setStore, store, remove } = useStore<Category>(CATEGORY_DATA)

    function handleCategoryDelete({ original }: { original: Category }) {
        openCategoryDeleteModal()
        setDeleteItem(original.id)
    }

    function handleCategoryEdit({ original }: { original: Category }) {
        openCategoryModal()
        setStore(original)
    }

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl">Kategoriyalar</h2>
                <Button
                    onClick={() => {
                        remove()
                        openCategoryModal()
                    }}
                >
                    Qo'shish
                </Button>
            </div>
            <DataTable
                columns={useCategoryColumns()}
                data={categories ?? []}
                loading={isCategoriesLoading}
                viewAll
                withActions
                onDelete={handleCategoryDelete}
                onEdit={handleCategoryEdit}
            />

            <DeleteModal path={CATEGORIES} id={deleteItem || ""} />

            <Modal
                title={
                    store?.id ?
                        "Kategoryni o'zgartirish"
                    :   "Kategoriya qo'shish"
                }
                className="max-w-xl"
                modalKey={CATEGORIES}
            >
                <CategoryCreateEdit />
            </Modal>
        </>
    )
}
