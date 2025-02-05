import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { ENTERANCES } from "@/constants/api-endpoints"
import { ENTERANCE_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/services/default-requests"
import { useState } from "react"
import { useEnteranceColumns } from "../useCols"
import EnteranceCreateEditForm from "./enterance-create-edit-form"

type EnteranceResponse = {
    total_pages: number
    results: Enterance[]
}

export default function Enterances() {
    const { data: enteance, isLoading } = useGet<EnteranceResponse>(ENTERANCES)

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
                <h2 className="text-xl">Joylar</h2>
                <Button
                    onClick={() => {
                        remove()
                        openModal()
                    }}
                >
                    {" "}
                    Qo'shish{" "}
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

            <DeleteModal
                path={ENTERANCES}
                id={deleteItem || ""}
                modalKey="enterance-delete"
            />

            <Modal
                title={store ? "Joy tahrirlash" : "Joy qo'shish"}
                className="max-w-xl"
                modalKey={ENTERANCE_DATA}
            >
                <EnteranceCreateEditForm />
            </Modal>
        </>
    )
}
