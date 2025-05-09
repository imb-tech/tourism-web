import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { FINANCIAL_CATEGORIES } from "@/constants/api-endpoints"
import { CATEGORY_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/services/default-requests"
import { useState } from "react"
import { useCategoryColumns } from "../useCols"
import CategoryCreateEdit from "./category-create-edit"

export default function FinancialCategories() {
    const { data: categories, isLoading: isCategoriesLoading } =
        useGet<FinancialCategory[]>(FINANCIAL_CATEGORIES)

    const { openModal: openCategoryModal } = useModal(FINANCIAL_CATEGORIES)
    const { openModal: openCategoryDeleteModal } = useModal(
        "financial-category-delete",
    )

    const [deleteItem, setDeleteItem] = useState<
        FinancialCategory["id"] | null
    >(null)

    const { setStore, store, remove } =
        useStore<FinancialCategory>(CATEGORY_DATA)

    function handleCategoryDelete({
        original,
    }: {
        original: FinancialCategory
    }) {
        openCategoryDeleteModal()
        setDeleteItem(original.id)
    }

    function handleCategoryEdit({ original }: { original: FinancialCategory }) {
        openCategoryModal()
        setStore(original)
    }

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl">Financial Categories</h2>
                <Button
                    onClick={() => {
                        remove()
                        openCategoryModal()
                    }}
                >
                    Add
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

            <DeleteModal
                path={FINANCIAL_CATEGORIES}
                id={deleteItem || ""}
                modalKey="financial-category-delete"
            />

            <Modal
                title={
                    store?.id ?
                        "Financial kategoryni o'zgartirish"
                    :   "Financial kategoriya qo'shish"
                }
                className="max-w-xl"
                modalKey={FINANCIAL_CATEGORIES}
            >
                <CategoryCreateEdit />
            </Modal>
        </>
    )
}
