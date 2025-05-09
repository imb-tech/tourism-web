import ParamSelect from "@/components/param/select"
import { COUNTRIES, LIGHT } from "@/constants/api-endpoints"
import { useGet } from "@/services/default-requests"

const PackFilters = () => {
    const { data: managers } = useGet<Manager[]>(LIGHT)
    const { data: countries } = useGet<Country[]>(COUNTRIES)

    return (
        <div className="flex items-center gap-2">
            <ParamSelect
                paramName="manager"
                label="Manager"
                options={
                    managers?.map((m) => ({
                        id: m.id,
                        name: `${m.first_name} ${m.last_name}`,
                    })) ?? []
                }
            />
            <ParamSelect
                paramName="country"
                label="Country"
                options={countries ?? []}
            />
        </div>
    )
}

export default PackFilters
