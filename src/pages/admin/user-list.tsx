import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { USERS } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/services/default-requests"
import { ColumnDef, Row } from "@tanstack/react-table"
import { useMemo, useState } from "react"
import UserCreateForm from "./user-create-form"

const useCols = () => {
    return useMemo<ColumnDef<User>[]>(
        () => [
            {
                header: "Xodim ismi",
                accessorKey: "first_name",
            },
            {
                header: "Familya",
                accessorKey: "last_name",
            },
            {
                header: "Username",
                accessorKey: "username",
            },
            {
                header: "Rol",
                accessorKey: "role",
            },
        ],
        [],
    )
}

export default function UsersList() {
    const { openModal } = useModal("delete-user")
    const { openModal: openEdit } = useModal()
    const { setStore, remove, store } = useStore<User>("user-data")

    const { data } = useGet<ListResponse<User>>(USERS)

    const [item, setItem] = useState<User | null>(null)

    function handleDelete({ original }: Row<User>) {
        setItem(original)
        openModal()
    }

    function handleEdit({ original }: Row<User>) {
        setStore(original)
        openEdit()
    }

    function handleCreate() {
        remove()
        openEdit()
    }

    return (
        <div className="bg-background rounded-md p-3">
            <DataTable
                className="bg-background"
                wrapperClassName="mb-3"
                columns={useCols()}
                setCellClassName={() => "text-sm"}
                viewAll
                loading={false}
                data={data?.results ?? []}
                withActions
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Button size={"sm"} onClick={handleCreate}>
                Qo'shish
            </Button>

            <DeleteModal
                modalKey="delete-user"
                path={USERS}
                id={item?.id || -1}
            />

            <Modal
                title={
                    store?.id ?
                        "Xodim ma'lumotlarini tahrirlash"
                    :   "Xodim qo'shish"
                }
            >
                <UserCreateForm />
            </Modal>
        </div>
    )
}
