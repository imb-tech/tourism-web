import Modal from "@/components/custom/modal"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { RESTAURANTS } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/use-modal"
import { useGet } from "@/services/default-requests"
import { useRestaurantColumns } from "../useCols"
import RestaurantCreateForm from "./restaurant-create-form"

export default function Restaurans() {
    const { data, isLoading } = useGet<ListResponse<Restaurant>>(RESTAURANTS)
    const { openModal } = useModal()

    return (
        <div>
            <Button onClick={openModal}>Add</Button>
            <DataTable
                loading={isLoading}
                columns={useRestaurantColumns()}
                data={data?.results || []}
            />
            <Modal className="max-w-3xl">
                <RestaurantCreateForm />
            </Modal>
        </div>
    )
}
