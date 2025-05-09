import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { COUNTRIES } from "@/constants/api-endpoints"
import { COUNTRY_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/services/default-requests"
import { useState } from "react"
import { useCountryColumns } from "../useCols"
import CountryCreateEditForm from "./country-create-edit-form"

export default function Countries() {
    const { data: countries, isLoading } = useGet<Country[]>(COUNTRIES)

    const { openModal } = useModal("country")
    const { openModal: openDeleteModal } = useModal("country-delete")

    const [deleteItem, setDeleteItem] = useState<Country["id"] | null>(null)
    const { setStore, store, remove } = useStore(COUNTRY_DATA)

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
                <h2 className="text-xl">Countries</h2>
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
                columns={useCountryColumns()}
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
                title={store ? "Edit country info" : "Add country"}
                className="max-w-xl"
                modalKey="country"
            >
                <CountryCreateEditForm />
            </Modal>
        </>
    )
}
