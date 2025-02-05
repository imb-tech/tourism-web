import Modal from "@/components/custom/modal"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { RESTAURANTS } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/services/default-requests"
import { useRestaurantColumns } from "../useCols"
import RestaurantCreateForm from "./restaurant-create-form"

export default function Restaurans() {
    const { data, isLoading } = useGet<ListResponse<Restaurant>>(RESTAURANTS)
    const { openModal } = useModal()
    const { setStore, remove } = useStore<Restaurant | undefined>(RESTAURANTS)

    function handleEdit(item: Restaurant) {
        setStore(item)
        openModal()
    }

    return (
        <section>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl">Restarantlar</h2>
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
                loading={isLoading}
                columns={useRestaurantColumns()}
                data={data?.results || []}
                withActions
                onEdit={({ original }) => handleEdit(original)}
            />
            <Modal className="max-w-3xl">
                <RestaurantCreateForm />
            </Modal>
        </section>
    )
}
