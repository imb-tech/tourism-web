import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { CITIES } from "@/constants/api-endpoints"
import { CITY_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/services/default-requests"
import { ColumnDef } from "@tanstack/react-table"
import { useState } from "react"
import CityCreateEditForm from "./city-create-edit"

const cityColumns: ColumnDef<City>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "City Name",
    },
]

export default function Cities() {
    const { data: cities, isLoading: isCitiesLoading } = useGet<City[]>(CITIES)

    const { openModal: openCityModal } = useModal("city")
    const { openModal: openDeleteModal } = useModal("city-delete")

    const [deleteItem, setDeleteItem] = useState<City["id"] | null>(null)

    const { setStore: setCityStore, store: cityStore } = useStore(CITY_DATA)

    function handleCityDelete({ original }: { original: City }) {
        openDeleteModal()
        setDeleteItem(original.id)
    }

    function handleCityEdit({ original }: { original: City }) {
        openCityModal()
        setCityStore(original)
    }

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl">Shaharlar</h2>
                <Button onClick={openCityModal}> Qo'shish </Button>
            </div>
            <DataTable
                columns={cityColumns}
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
                title={cityStore ? "Shahar tahrirlash" : "Shahar qo'shish"}
                className="max-w-xl"
                modalKey="city"
            >
                <CityCreateEditForm />
            </Modal>
        </>
    )
}
