import DownloadAsExcel from "@/components/custom/download-as-excel"
import Modal from "@/components/custom/modal"
import InitialDataBox from "@/components/elements/initial-data-box"
import ParamAnimatedTabs from "@/components/param/animated-tab"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/use-modal"
import { useGet } from "@/services/default-requests"
import { useSearch } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "date-fns"
import { Plus } from "lucide-react"
import ChangesTable from "../changes/shanges-table"
import ApproveBankForm from "./approve-bank-form"
import BankRequest from "./bank-request"
import IncomeCreateForm from "./income-create-form"

const columns: ColumnDef<LogItem>[] = [
    {
        header: "ID",
        accessorKey: "instance_pk",
    },
    {
        header: "Tur paket",
        accessorKey: "model",
    },
    {
        header: "Turi",
        accessorKey: "comment",
    },
    {
        header: "Summa",
        accessorKey: "user_name",
    },
    {
        header: "Sana",
        accessorKey: "created_at",
        cell: ({ row }) => {
            return formatDate(
                new Date(row.original.created_at),
                "dd/MM/yyyy HH:mm",
            )
        },
    },
    {
        header: "Check rasmi",
        accessorKey: "action",
    },
]

export default function BankHome() {
    const { type } = useSearch({ from: "/_main/bank" })

    const { data, isLoading } = useGet<BankRequest[]>(
        "checkout/payments/tours/" + (type ?? "bank"),
    )

    const { openModal: income } = useModal("create-income")

    return (
        <section className="flex flex-col">
            <ParamAnimatedTabs
                paramName="type"
                options={[
                    {
                        id: "bank",
                        name: "Bank",
                    },
                    {
                        id: "cash",
                        name: "Naqd",
                    },
                ]}
            />
            <InitialDataBox isLoading={isLoading} />
            {data?.length ?
                <div className="bg-background p-3 rounded-md">
                    <p className="text-xl mb-3">Chiqimlarni tasdiqlash</p>
                    <ul className="flex flex-col gap-2">
                        {data?.map((el) => (
                            <li key={el.uuid}>
                                <BankRequest {...el} />
                            </li>
                        ))}
                    </ul>

                    <Modal modalKey="approve" title="Chiqim qo’shish">
                        <ApproveBankForm />
                    </Modal>
                </div>
            :   ""}

            <div className="bg-background p-3 rounded-md mb-3">
                <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold flex-1">Kirimlar</p>
                    <DownloadAsExcel url="" name="file" />
                    <Button size={"sm"} onClick={income}>
                        <Plus size={16} />
                        Kirim qo'shish
                    </Button>
                </div>
                <ChangesTable
                    grid="grid-cols-6"
                    columns={columns}
                    setCellClassName={() => "text-sm"}
                    viewAll
                    loading={false}
                    data={[]}
                />
            </div>

            <div className="bg-background p-3 rounded-md mb-3">
                <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold flex-1">Chiqimlar</p>
                    <DownloadAsExcel url="" name="file" />
                    <Button size={"sm"}>
                        <Plus size={16} />
                        Chiqim qo'shish
                    </Button>
                </div>
                <ChangesTable
                    grid="grid-cols-6"
                    columns={columns}
                    setCellClassName={() => "text-sm"}
                    viewAll
                    loading={false}
                    data={[]}
                />
            </div>

            <Modal
                modalKey="create-income"
                className="max-w-xl p-3"
                title="Kirim qo'shish"
            >
                <IncomeCreateForm />
            </Modal>
        </section>
    )
}
