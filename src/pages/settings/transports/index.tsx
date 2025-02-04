import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { TRANSPORTS } from "@/constants/api-endpoints"
import { TRANSPORT_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/services/default-requests"
import { useState } from "react"
import { useTransportColumns } from "../useCols"
import TransportCreateEdit from "./transport-create-edit"

export default function Transports() {
    const { data, isLoading } = useGet<ListResponse<Transport>>(TRANSPORTS)

    const { openModal } = useModal()
    const { openModal: openDeleteModal } = useModal()

    const [deleteItem, setDeleteItem] = useState<Transport["id"] | null>(null)
    const { setStore, store, remove } = useStore(TRANSPORT_DATA)

    function handleTransportDelete({ original }: { original: Transport }) {
        openDeleteModal()
        setDeleteItem(original.id)
    }

    function handleTransportEdit({ original }: { original: Transport }) {
        openModal()
        setStore(original)
    }

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl">Transportlar</h2>
                <Button
                    onClick={() => {
                        remove()
                        openModal()
                    }}
                >
                    Qo'shish
                </Button>
            </div>
            <DataTable
                columns={useTransportColumns()}
                data={data?.results ?? []}
                loading={isLoading}
                viewAll
                withActions
                onDelete={handleTransportDelete}
                onEdit={handleTransportEdit}
            />

            <DeleteModal id={deleteItem ?? 0} path={TRANSPORTS} />

            <Modal
                title={
                    store ? "Transportni o'zgartirish" : "Transport qo'shish"
                }
                className="max-w-xl"
            >
                <TransportCreateEdit />
            </Modal>
        </>
    )
}
