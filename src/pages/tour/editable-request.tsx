import { CHANGE } from "@/constants/api-endpoints"
import { usePost } from "@/services/default-requests"
import useTourLoading from "./loading"

export default function useEditableRequest<T>() {
    const { setLoading } = useTourLoading()
    const { mutateAsync } = usePost({
        onSuccess: () => {
            setLoading(false)
        },
        onError: () => {
            setLoading(false)
        },
    })

    async function save(values: T, type: string, planId: string | number) {
        setLoading(true)
        try {
            const resp = await mutateAsync(CHANGE + type, {
                ...values,
                plan: Number(planId),
                type,
            })
            setLoading(false)
            return resp
        } catch (error) {
            setLoading(false)
        }
    }

    return {
        save,
    }
}
