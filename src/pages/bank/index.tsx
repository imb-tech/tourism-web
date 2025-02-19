import DownloadAsExcel from "@/components/custom/download-as-excel"
import Modal from "@/components/custom/modal"
import InitialDataBox from "@/components/elements/initial-data-box"
import ParamAnimatedTabs from "@/components/param/animated-tab"
import ParamPagination from "@/components/param/pagination"
import { Button } from "@/components/ui/button"
import { PAYMENT_REQUESTS, TRANSACTIONS } from "@/constants/api-endpoints"
import {
    DEFAULT_PAGE_SIZE,
    EXPENCE_TYPE,
    INCOME_TYPE,
} from "@/constants/common"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import formatMoney from "@/lib/format-money"
import { useGet } from "@/services/default-requests"
import { useSearch } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { Plus } from "lucide-react"
import { useMemo } from "react"
import ChangesTable from "../changes/shanges-table"
import ApproveBankForm from "./approve-bank-form"
import BankRequest from "./bank-request"
import IncomeCreateForm from "./income-create-form"

const columns: ColumnDef<Transaction>[] = [
    {
        header: "Summa",
        accessorKey: "amount",
        cell({ row }) {
            return formatMoney(row.original.amount)
        },
    },
    {
        header: "Turi",
        accessorKey: "through",
    },
    {
        header: "Izoh",
        accessorKey: "comment",
    },
    {
        header: "Tasdiqlovchi",
        accessorKey: "executor_name",
    },
]

function getParams(type: number, page?: number, page_size?: number) {
    return {
        params: {
            type,
            page_size: page_size ?? DEFAULT_PAGE_SIZE,
            page: page ?? 1,
        },
    }
}

export default function BankHome() {
    const {
        type,
        income_page,
        expense_page,
        income_page_size,
        expense_page_size,
    } = useSearch({ from: "/_main/bank" })

    const { setStore, store } = useStore<number>("modal-type")

    const { data, isLoading } = useGet<BankRequest[]>(
        PAYMENT_REQUESTS + (type ?? "bank"),
    )

    const urlTransactions = useMemo(
        () => TRANSACTIONS + (type || "bank"),
        [type],
    )

    const { data: incomes, isLoading: isLoadingIncomes } = useGet<
        ListResponse<Transaction>
    >(urlTransactions, getParams(INCOME_TYPE, income_page, income_page_size))

    const { data: expenses, isLoading: isLoadingExpenses } = useGet<
        ListResponse<Transaction>
    >(urlTransactions, getParams(EXPENCE_TYPE, expense_page, expense_page_size))

    const { openModal } = useModal("create-income")

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
                <div className="bg-background p-3 rounded-md mb-3">
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
                    <Button
                        size={"sm"}
                        onClick={() => {
                            openModal()
                            setStore(INCOME_TYPE)
                        }}
                    >
                        <Plus size={16} />
                        Kirim qo'shish
                    </Button>
                </div>
                <ChangesTable
                    grid="grid-cols-4"
                    columns={columns}
                    setCellClassName={() => "text-sm"}
                    viewAll
                    loading={isLoadingIncomes}
                    data={incomes?.results ?? []}
                />
                <ParamPagination
                    paramName="income_page"
                    pageSizeParamName="income_page_size"
                    totalPages={incomes?.total_pages}
                />
            </div>

            <div className="bg-background p-3 rounded-md mb-3">
                <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold flex-1">Chiqimlar</p>
                    <DownloadAsExcel url="" name="file" />
                    <Button
                        size={"sm"}
                        onClick={() => {
                            openModal()
                            setStore(EXPENCE_TYPE)
                        }}
                    >
                        <Plus size={16} />
                        Chiqim qo'shish
                    </Button>
                </div>
                <ChangesTable
                    grid="grid-cols-4"
                    columns={columns}
                    setCellClassName={() => "text-sm"}
                    viewAll
                    loading={isLoadingExpenses}
                    data={expenses?.results ?? []}
                />
                <ParamPagination
                    paramName="expense_page"
                    pageSizeParamName="expense_page_size"
                    totalPages={expenses?.total_pages}
                />
            </div>

            <Modal
                modalKey="create-income"
                className="max-w-xl p-3"
                title={`${store === INCOME_TYPE ? "Kirim" : "Chiqim"} qo'shish`}
            >
                <IncomeCreateForm />
            </Modal>
        </section>
    )
}
