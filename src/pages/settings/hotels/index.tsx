import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import InitialDataBox from "@/components/elements/initial-data-box"
import ParamPagination from "@/components/param/pagination"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { HOTELS } from "@/constants/api-endpoints"
import { HOTEL_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import axiosInstance from "@/services/axios-instance"
import { useGet } from "@/services/default-requests"
import { useSearch } from "@tanstack/react-router"
import { useState } from "react"
import { useHotelColumns } from "../useCols"
import HotelCreateForm from "./hotel-create-form"

export default function Hotels() {
    const { page, page_size } = useSearch({ strict: false })
    const { data, isLoading } = useGet<ListResponse<Hotel>>(HOTELS, {
        params: { page, page_size },
    })

    const { openModal } = useModal()
    const { openModal: openDeleteModal } = useModal("delete")

    const [deleteItem, setDeleteItem] = useState<Hotel["id"] | null>(null)
    const { setStore, store, remove } = useStore<Hotel | undefined>(HOTEL_DATA)
    const [loading, setLoading] = useState(false)

    async function getHotelById(id: number | null) {
        setLoading(true)
        openModal()
        const resp = await axiosInstance.get(HOTELS + `/${id}/`)
        setStore(resp.data)
        setLoading(false)
    }

    function handleHotelDelete({ original }: { original: Hotel }) {
        openDeleteModal()
        setDeleteItem(original.id)
    }

    const handleHotelEdit = ({ original }: { original: Hotel }) => {
        getHotelById(original.id)
        if (store?.id !== original.id) {
            setStore(original)
        }
    }

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl">Hotels</h2>
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
                columns={useHotelColumns()}
                data={data?.results ?? []}
                loading={isLoading}
                viewAll
                withActions
                onDelete={handleHotelDelete}
                onEdit={handleHotelEdit}
            />

            <ParamPagination totalPages={data?.total_pages} />

            <DeleteModal path={HOTELS} id={deleteItem || ""} />

            <Modal
                title={store ? "Edit Hotel" : "Add Hotel"}
                className="max-w-4xl"
            >
                {
                    !loading ?
                        <HotelCreateForm />
                        // <HotelNewCreateForm />
                    :   <InitialDataBox isLoading />
                }
            </Modal>
        </>
    )
}
