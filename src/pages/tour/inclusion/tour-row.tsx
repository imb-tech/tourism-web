import ExclusionForm from "./exclusion-form"
import InclusionForm from "./inclusion-form"

export default function TourGidRow() {
    return (
        <div className="grid grid-cols-2 pt-4 gap-4">
            <InclusionForm />
            <ExclusionForm />
        </div>
    )
}
