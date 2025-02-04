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

type City = {
    id: number
    name: string
}

type Country = {
    id: number
    name: string
}

export default function Countries() {
    const { data: countries, isLoading } = useGet<Country[]>("common/countries")
    const { data: cities, isLoading: isCitiesLoading } =
        useGet<City[]>("common/cities")

    const { openModal } = useModal("country")
    const { openModal: openDeleteModal } = useModal("delete")

    const [deleteItem, setDeleteItem] = useState<Country["id"] | null>(null)

    const { setStore } = useStore(COUNTRY_DATA)

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

    function handleCountryDelete({ original }: { original: Country }) {
        openDeleteModal()
        setDeleteItem(original.id)
    }

    function handleCountryEdit({ original }: { original: Country }) {
        openModal()
        setStore(original)
    }

    return (
        <section className="p-3 flex gap-6 items-start">
            <div className="w-1/2 p-3 bg-background rounded-sm">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl">Countries List</h2>
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
            </div>

            <div className="w-1/2  p-3 bg-background rounded-sm">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl">Cities List</h2>
                    <Button> Add City </Button>
                </div>
                <DataTable
                    columns={cityColumns}
                    data={cities ?? []}
                    loading={isCitiesLoading}
                    viewAll
                    withActions
                />
            </div>

            <DeleteModal id={deleteItem ?? ""} path={COUNTRIES} />

            <Modal
                title="Davlat qo'shish"
                className="max-w-xl"
                modalKey="country"
            >
                <CountryCreateEditForm />
            </Modal>
        </section>
    )
}
