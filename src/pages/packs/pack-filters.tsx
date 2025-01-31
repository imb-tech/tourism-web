import ParamSelect from "@/components/param/select"

const PackFilters = () => {
    return (
        <div className="flex items-center gap-2">
            <ParamSelect
                paramName="manager"
                label="Manager"
                options={[
                    { id: "all", name: "Manager" },
                    { id: "me", name: "Men" },
                ]}
            />
            <ParamSelect
                paramName="country"
                label="Davlat"
                options={[
                    { id: "all", name: "Davlat" },
                    { id: "uz", name: "O'zbekiston" },
                ]}
            />
        </div>
    )
}

export default PackFilters
