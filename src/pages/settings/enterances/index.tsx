import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import ParamPagination from "@/components/param/pagination"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { ENTERANCES } from "@/constants/api-endpoints"
import { ENTERANCE_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/services/default-requests"
import { useSearch } from "@tanstack/react-router"
import { useState } from "react"
import { useEnteranceColumns } from "../useCols"
import EnteranceCreateEditForm from "./enterance-create-edit-form"

type EnteranceResponse = {
    total_pages: number
    results: Enterance[]
}

export default function Enterances() {
    const { page, page_size } = useSearch({ strict: false })
    const { data: enteance, isLoading } = useGet<EnteranceResponse>(
        ENTERANCES,
        {
            params: { page, page_size },
        },
    )

    const { openModal } = useModal(ENTERANCE_DATA)
    const { openModal: openDeleteModal } = useModal("enterance-delete")

    const [deleteItem, setDeleteItem] = useState<Enterance["id"] | null>(null)
    const { setStore, store, remove } = useStore(ENTERANCE_DATA)

    function handleEnteranceDelete({ original }: { original: Enterance }) {
        openDeleteModal()
        setDeleteItem(original.id)
    }

    function handleEnteranceEdit({ original }: { original: Enterance }) {
        openModal()
        setStore(original)
    }

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl">Entrances</h2>
                <Button
                    onClick={() => {
                        remove()
                        openModal()
                    }}
                >
                    {" "}
                    Add{" "}
                </Button>
            </div>
            <DataTable
                columns={useEnteranceColumns()}
                data={enteance?.results ?? []}
                loading={isLoading}
                viewAll
                withActions
                onDelete={handleEnteranceDelete}
                onEdit={handleEnteranceEdit}
            />
            <ParamPagination totalPages={enteance?.total_pages} />

            <DeleteModal
                path={ENTERANCES}
                id={deleteItem || ""}
                modalKey="enterance-delete"
            />

            <Modal
                title={store ? "Edit place" : "Add place"}
                className="max-w-xl"
                modalKey={ENTERANCE_DATA}
            >
                <EnteranceCreateEditForm />
            </Modal>
        </>
    )
}
