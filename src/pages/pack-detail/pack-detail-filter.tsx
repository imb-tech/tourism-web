import ParamSelect from "@/components/param/select"

export default function PackDetailFilter() {
    return (
        <div>
            <ParamSelect
                paramName="hotel"
                label="Hotel"
                options={[
                    { id: "all", name: "Hotel" },
                    { id: "uz", name: "O'zbekiston" },
                ]}
            />
        </div>
    )
}
