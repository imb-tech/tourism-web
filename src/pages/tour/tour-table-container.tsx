import InitialDataBox from "@/components/elements/initial-data-box"

type Props = {
    children: React.ReactNode
    loading?: boolean
}
export default function TourTableContainer({ children, loading }: Props) {
    if (loading) {
        return <InitialDataBox isLoading />
    } else {
        return (
            <div className="p-3 bg-secondary rounded-sm flex flex-col gap-3">
                {children}
            </div>
        )
    }
}
