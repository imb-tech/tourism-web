import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { COUNTRIES } from "@/constants/api-endpoints"
import { COUNTRY_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/services/default-requests"
import { ColumnDef } from "@tanstack/react-table"
import { useState } from "react"
import CountryCreateEditForm from "./country-create-edit-form"

const countryColumns: ColumnDef<Country>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Country Name",
    },
]

export default function Countries() {
    const { data: countries, isLoading } = useGet<Country[]>(COUNTRIES)

    const { openModal } = useModal("country")
    const { openModal: openDeleteModal } = useModal("country-delete")

    const [deleteItem, setDeleteItem] = useState<Country["id"] | null>(null)
    const { setStore, store } = useStore(COUNTRY_DATA)

    function handleCountryDelete({ original }: { original: Country }) {
        openDeleteModal()
        setDeleteItem(original.id)
    }

    function handleCountryEdit({ original }: { original: Country }) {
        openModal()
        setStore(original)
    }

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl">Davlatlar</h2>
                <Button onClick={openModal}> Qo'shish </Button>
            </div>
            <DataTable
                columns={countryColumns}
                data={countries ?? []}
                loading={isLoading}
                viewAll
                withActions
                onDelete={handleCountryDelete}
                onEdit={handleCountryEdit}
            />

            <DeleteModal
                path={COUNTRIES}
                id={deleteItem || ""}
                modalKey="country-delete"
            />

            <Modal
                title={store ? "Davlat tahrirlash" : "Davlat qo'shish"}
                className="max-w-xl"
                modalKey="country"
            >
                <CountryCreateEditForm />
            </Modal>
        </>
    )
}
