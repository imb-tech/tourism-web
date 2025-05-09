import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import ParamPagination from "@/components/param/pagination"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { TRANSPORTS } from "@/constants/api-endpoints"
import { TRANSPORT_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/services/default-requests"
import { useSearch } from "@tanstack/react-router"
import { useState } from "react"
import { useTransportColumns } from "../useCols"
import TransportCreateEdit from "./transport-create-edit"

export default function Transports() {
    const { page, page_size } = useSearch({ strict: false })
    const { data, isLoading } = useGet<ListResponse<Transport>>(TRANSPORTS, {
        params: { page, page_size },
    })

    const { openModal } = useModal()
    const { openModal: openDeleteModal } = useModal("delete")

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
                <h2 className="text-xl">Transports</h2>
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
                columns={useTransportColumns()}
                data={data?.results ?? []}
                loading={isLoading}
                viewAll
                withActions
                onDelete={handleTransportDelete}
                onEdit={handleTransportEdit}
            />
            <ParamPagination totalPages={data?.total_pages} />

            <DeleteModal id={deleteItem ?? 0} path={TRANSPORTS} />

            <Modal
                title={store ? "Add new transport" : "Edit transport"}
                className="max-w-xl"
            >
                <TransportCreateEdit />
            </Modal>
        </>
    )
}
