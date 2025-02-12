import { CHANGE, DETAIL } from "@/constants/api-endpoints"
import { useDelete, usePost } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { useParams, useSearch } from "@tanstack/react-router"
import useTourLoading from "./loading"

export default function useEditableRequest<T>() {
    const { setLoading } = useTourLoading()
    const queryClient = useQueryClient()
    const { id: planid } = useParams({ from: "/_main/packs/$pack/tour/$id" })
    const { type } = useSearch({
        from: "/_main/packs/$pack/tour/$id",
    })

    const { mutateAsync } = usePost({
        onSuccess: () => {
            setLoading(false)
        },
        onError: () => {
            setLoading(false)
        },
    })

    function onSuccess() {
        setLoading(false)
        queryClient.refetchQueries({
            queryKey: [type],
        })
    }

    function onError() {
        setLoading(false)
    }

    const { mutate } = useDelete({ onSuccess, onError })
    const { mutate: post } = usePost({ onSuccess, onError })

    async function save(values: T) {
        setLoading(true)
        try {
            const resp = await mutateAsync(CHANGE + type, {
                ...values,
                plan: Number(planid),
                type,
            })
            setLoading(false)
            return resp
        } catch (error) {
            setLoading(false)
        }
    }

    function clear(rowId: number) {
        mutate(DETAIL + `/clear/${rowId}`)
    }

    function duplicate(day: number) {
        post(DETAIL + `/add`, {
            plan: planid,
            day,
            type,
        })
        queryClient.removeQueries({
            queryKey: [DETAIL + `/guide/${planid}`],
        })
    }

    return {
        save,
        clear,
        duplicate,
    }
}
