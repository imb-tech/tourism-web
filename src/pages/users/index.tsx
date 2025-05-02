import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import InitialDataBox from "@/components/elements/initial-data-box"
import AddButton from "@/components/shared/add-button"
import UserCard from "@/components/shared/user-card"
import { TOURISTS } from "@/constants/api-endpoints"
import { USER_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/services/default-requests"
import { useParams } from "@tanstack/react-router"
import { UserRoundPlus } from "lucide-react"
import PackDetailHeader from "../pack-detail/pack-detail-header"
import CreateEditUserForm from "./user-create-edit-form"

type UsersResponse = {
    total_pages: number
    results: UserItemProps[]
}

export default function Users() {
    const { pack, id } = useParams({ from: "/_main/packs/$pack/$id" })
    const { openModal } = useModal()
    const { store, remove } = useStore<UserItem>(USER_DATA)

    const { data, isSuccess, isLoading, isError } = useGet<UsersResponse>(
        TOURISTS,
        {
            params: { plan_id: id },
        },
    )

    function handleAdd() {
        remove()
        openModal()
    }

    return isSuccess ?
            <section className="p-3">
                <PackDetailHeader title="Tourists" backUrl={`/packs/${pack}`} />
                <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-3">
                    <AddButton
                        className="w-full max-w-sm"
                        label="Turist qo'shish"
                        icon={UserRoundPlus}
                        onClick={handleAdd}
                    />
                    {data?.results?.map((user) => (
                        <UserCard key={user.id} {...user} />
                    ))}
                </div>

                <DeleteModal path={TOURISTS} id={store?.id || ""} />

                <Modal
                    title={
                        store?.id ? "Turistni tahrirlash" : "Turist qo'shish"
                    }
                    className="max-w-xl"
                >
                    <CreateEditUserForm />
                </Modal>
            </section>
        :   <InitialDataBox isLoading={isLoading} isError={isError} />
}
