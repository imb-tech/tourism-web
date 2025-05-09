import DeleteModal from "@/components/custom/delete-modal"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { ROLES } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/use-modal"
import { useGet } from "@/services/default-requests"
import { useNavigate } from "@tanstack/react-router"
import { ColumnDef, Row } from "@tanstack/react-table"
import { useMemo, useState } from "react"

const useCols = () => {
    return useMemo<ColumnDef<Role>[]>(
        () => [
            {
                header: "Role name",
                accessorKey: "name",
            },
        ],
        [],
    )
}

export default function RolesList() {
    const { openModal } = useModal("delete")
    const { data } = useGet<Role[]>(ROLES)
    const navigate = useNavigate()

    const [item, setItem] = useState<Role | null>(null)

    function handleDelete({ original }: Row<Role>) {
        setItem(original)
        openModal()
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
                data={data ?? []}
                withActions
                onEdit={({ original }) =>
                    navigate({
                        to: "/admin/roles/$id",
                        params: {
                            id: original.id.toString(),
                        },
                    })
                }
                onDelete={handleDelete}
            />

            <Button
                size={"sm"}
                onClick={() =>
                    navigate({
                        to: "/admin/roles/create",
                    })
                }
            >
                Add
            </Button>

            <DeleteModal path={ROLES} id={item?.id || -1} />
        </div>
    )
}
