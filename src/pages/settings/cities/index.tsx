import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { CITIES } from "@/constants/api-endpoints"
import { CITY_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/services/default-requests"
import { useState } from "react"
import { useCityColumns } from "../useCols"
import CityCreateEditForm from "./city-create-edit"

export default function Cities() {
    const { data: cities, isLoading: isCitiesLoading } = useGet<City[]>(CITIES)

    const { openModal: openCityModal } = useModal("city")
    const { openModal: openDeleteModal } = useModal("city-delete")

    const [deleteItem, setDeleteItem] = useState<City["id"] | null>(null)

    const { setStore, store, remove } = useStore<City>(CITY_DATA)

    function handleCityDelete({ original }: { original: City }) {
        openDeleteModal()
        setDeleteItem(original.id)
    }

    function handleCityEdit({ original }: { original: City }) {
        openCityModal()
        setStore(original)
    }

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl">Shaharlar</h2>
                <Button
                    onClick={() => {
                        remove()
                        openCityModal()
                    }}
                >
                    {" "}
                    Qo'shish{" "}
                </Button>
            </div>
            <DataTable
                columns={useCityColumns()}
                data={cities ?? []}
                loading={isCitiesLoading}
                viewAll
                withActions
                onDelete={handleCityDelete}
                onEdit={handleCityEdit}
            />

            <DeleteModal
                path={CITIES}
                id={deleteItem || ""}
                modalKey="city-delete"
            />

            <Modal
                title={store?.id ? "Shahar tahrirlash" : "Shahar qo'shish"}
                className="max-w-xl"
                modalKey="city"
            >
                <CityCreateEditForm />
            </Modal>
        </>
    )
}
