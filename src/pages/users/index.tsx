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
import CreateUserForm from "./create-user-form"

type UsersResponse = {
    total_pages: number
    results: UserItem[]
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
                <PackDetailHeader
                    title="Turistlar"
                    backUrl={`/packs/${pack}`}
                />
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <AddButton
                        label="Turist qo'shish"
                        icon={UserRoundPlus}
                        onClick={handleAdd}
                    />
                    {data?.results?.map((user) => (
                        <UserCard key={user.id} {...user} />
                    ))}
                </div>

                <DeleteModal path={TOURISTS} id={store?.id || ""} />

                <Modal title="Turist qo'shish" className="max-w-xl">
                    <CreateUserForm />
                </Modal>
            </section>
        :   <InitialDataBox isLoading={isLoading} isError={isError} />
}
