import ParamSelect from "@/components/param/select"

export default function PackDetailFilter() {
    return (
        <div>
            <ParamSelect
                paramName="hotel"
                label="Mehmonxona"
                options={[
                    { id: "all", name: "Mehmonxona" },
                    { id: "uz", name: "O'zbekiston" },
                ]}
            />
        </div>
    )
}
