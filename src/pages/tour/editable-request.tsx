import { CHANGE } from "@/constants/api-endpoints"
import { usePost } from "@/services/default-requests"
import useTourLoading from "./loading"

export default function useEditableRequest<T>() {
    const { setLoading } = useTourLoading()
    const { mutate } = usePost({
        onSuccess: () => {
            setLoading(false)
        },
        onError: () => {
            setLoading(false)
        },
    })

    function save(values: T, type: string, planId: string | number) {
        setLoading(true)
        mutate(CHANGE + type, {
            ...values,
            plan: Number(planId),
            type,
        })
    }

    return {
        save,
    }
}
