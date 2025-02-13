import InitialDataBox from "@/components/elements/initial-data-box"
import { CHANGES } from "@/constants/api-endpoints"
import { useGet } from "@/services/default-requests"
import { ColumnDef } from "@tanstack/react-table"
import ChangesDocumentsList from "./changes-documents-list"
import ChangesTable from "./shanges-table"

const ChangesMain = () => {
    const columns: ColumnDef<{ id: number; name: string; age: number }>[] = [
        {
            header: "ID",
            accessorKey: "id",
        },
        {
            header: "Ism",
            accessorKey: "name",
        },
        {
            header: "Yosh",
            accessorKey: "age",
        },
    ]

    const { data, isLoading } = useGet<ChangeDocumentItem[]>(CHANGES)

    return (
        <section>
            <div className="grid grid-cols-2 gap-3">
                {isLoading ?
                    <InitialDataBox isLoading={isLoading} />
                :   <ChangesDocumentsList type="start" data={data ?? []} />}
                {isLoading ?
                    <InitialDataBox isLoading={isLoading} />
                :   <ChangesDocumentsList type="end" data={[]} />}
            </div>

            <div className="bg-background p-3 rounded-md mt-3 flex flex-col gap-2">
                <p>O'zgarishlar</p>
                <ChangesTable
                    grid="grid-cols-3"
                    columns={columns}
                    setCellClassName={() => "text-sm"}
                    viewAll
                    loading={false}
                    data={[
                        {
                            id: 1,
                            name: "Doniyor",
                            age: 21,
                        },
                        {
                            id: 2,
                            name: "Ahmadjo",
                            age: 20,
                        },
                    ]}
                />
            </div>
        </section>
    )
}

export default ChangesMain
