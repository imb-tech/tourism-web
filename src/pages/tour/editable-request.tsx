import { CHANGE, CRITERIES, DETAIL } from "@/constants/api-endpoints"
import { useDelete, usePost } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { useParams, useSearch } from "@tanstack/react-router"
import { useState } from "react"
import useTourLoading from "./loading"

export default function useEditableRequest<T>() {
    const { setLoading } = useTourLoading()
    const queryClient = useQueryClient()
    const { id: planid } = useParams({ from: "/_main/packs/$pack/tour/$id" })
    const { type } = useSearch({
        from: "/_main/packs/$pack/tour/$id",
    })
    const [creating, setCreating] = useState(false)

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
        setCreating(false)
        queryClient.refetchQueries({
            queryKey: type === "criteria" ? [CRITERIES] : [type],
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
        if (type === "criteria") {
            mutate(CRITERIES + `/${rowId}`)
        } else {
            mutate(DETAIL + `/clear/${rowId}`)
        }
    }

    function duplicate(day: number | string) {
        setCreating(true)
        if (type === "criteria") {
            post(CRITERIES, {
                plan: planid,
                text: "",
                type: day,
            })
            return
        }
        post(DETAIL + `/add`, {
            plan: planid,
            day,
            type,
        })
        queryClient.removeQueries({
            queryKey: [DETAIL + `/${type}/${planid}`],
        })
    }

    return {
        save,
        clear,
        duplicate,
        creating,
    }
}
