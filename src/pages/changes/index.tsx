import Modal from "@/components/custom/modal"
import InitialDataBox from "@/components/elements/initial-data-box"
import { CHANGES, LOGS } from "@/constants/api-endpoints"
import { useGet } from "@/services/default-requests"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import ChangesDocumentsList from "./changes-documents-list"
import ConfirmChanges from "./confirm-changes"
import ConfirmContractChanges from "./confirm-contarct-changes"
import ChangesTable from "./shanges-table"

const columns: ColumnDef<LogItem>[] = [
    {
        header: "ID",
        accessorKey: "instance_pk",
    },
    {
        header: "Turi",
        accessorKey: "model",
    },
    {
        header: "O'zgartiruvchi",
        accessorKey: "user_name",
    },
    {
        header: "Vaqdi",
        accessorKey: "created_at",
        cell: ({ row }) => {
            return format(new Date(row.original.created_at), "dd/MM/yyyy HH:mm")
        },
    },
    {
        header: "Action",
        accessorKey: "action",
    },

    {
        header: "Izoh",
        accessorKey: "comment",
    },

    {
        header: "Link",
        accessorKey: "path",
        cell: ({ row }) => {
            if (row.original?.path) {
                return (
                    <a
                        href={row.original?.path?.toString()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                    >
                        Link
                    </a>
                )
            }
        },
    },
]

const ChangesMain = () => {
    const { data, isLoading } = useGet<ChangeDocumentItem[]>(CHANGES)
    const { data: logs, isLoading: isLoadingLogs } = useGet<
        ListResponse<LogItem>
    >(LOGS, { params: { page_size: 50 } })

    return (
        <section>
            <div className="grid grid-cols-2 gap-3">
                {isLoading ?
                    <InitialDataBox isLoading={isLoading} />
                :   <ChangesDocumentsList
                        type="start"
                        data={data?.filter((el) => el.status !== 30) ?? []}
                    />
                }
                {isLoading ?
                    <InitialDataBox isLoading={isLoading} />
                :   <ChangesDocumentsList
                        type="end"
                        data={data?.filter((el) => el.status === 30) ?? []}
                    />
                }
            </div>

            <div className="bg-background p-3 rounded-md mt-3 flex flex-col gap-2 ">
                <p className="text-xl">O'zgarishlar</p>
                {isLoadingLogs ?
                    <InitialDataBox isLoading={isLoadingLogs} />
                :   <ChangesTable
                        grid="grid-cols-7"
                        columns={columns}
                        setCellClassName={() => "text-sm"}
                        viewAll
                        loading={false}
                        data={logs?.results || []}
                    />
                }
            </div>

            <Modal title="O'zgarishni tasdiqlang">
                <ConfirmChanges />
            </Modal>

            <Modal title="O'zgarishni tasdiqlang" modalKey="contract">
                <ConfirmContractChanges />
            </Modal>
        </section>
    )
}

export default ChangesMain
