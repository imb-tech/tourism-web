import { CHANGE } from "@/constants/api-endpoints"
import { usePost } from "@/services/default-requests"

export default function useEditableRequest<T>() {
    const { mutate } = usePost({
        onSuccess: () => {
            document.body.style.cursor = "default"
        },
    })

    function save(values: T, type: string, planId: string | number) {
        document.body.style.cursor = "wait"
        mutate(CHANGE + type, {
            ...values,
            plan: Number(planId),
        })
    }

    return {
        save,
    }
}
