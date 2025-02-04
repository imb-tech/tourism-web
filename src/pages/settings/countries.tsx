import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { useGet } from "@/services/default-requests"
import { ColumnDef } from "@tanstack/react-table"

type City = {
    id: number
    name: string
}

type Country = {
    id: number
    name: string
}

export default function Countries() {
    const { data: countries, isLoading } = useGet<Country[]>("common/countries")
    const { data: cities, isLoading: isCitiesLoading } =
        useGet<City[]>("common/cities")

    const countryColumns: ColumnDef<Country>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "name",
            header: "Country Name",
        },
    ]

    const cityColumns: ColumnDef<City>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "name",
            header: "City Name",
        },
    ]

    return (
        <section className="p-3 flex gap-6">
            <div className="w-1/2">
                <div className="flex justify-end mb-2 mt-2">
                    <h2 className="text-xl font-bold mb-2">Countries List</h2>
                    <Button className="mb-2 ml-auto block">
                        {" "}
                        Add Country{" "}
                    </Button>
                </div>
                <DataTable
                    columns={countryColumns}
                    data={countries ?? []}
                    loading={isLoading}
                    viewAll
                    withActions
                />
            </div>

            <div className="w-1/2">
                <div className="flex justify-end mb-2 mt-2">
                    <h2 className="text-xl font-bold mb-2">Cities List</h2>
                    <Button className="mb-2 ml-auto block"> Add City </Button>
                </div>
                <DataTable
                    columns={cityColumns}
                    data={cities ?? []}
                    loading={isCitiesLoading}
                    viewAll
                    withActions
                />
            </div>
        </section>
    )
}
