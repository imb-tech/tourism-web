import ParamSelect from "@/components/param/select"

export default function ChangesFilter() {
    return (
        <div className="flex gap-2">
            <ParamSelect
                options={[{ id: 1, name: "Oylik" }]}
                paramName="month"
            />
            <ParamSelect
                options={[{ id: 1, name: "Umumiy" }]}
                paramName="month"
            />
        </div>
    )
}
