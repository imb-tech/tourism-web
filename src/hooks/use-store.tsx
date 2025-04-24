import { useQuery, useQueryClient } from "@tanstack/react-query"

export function useStore<T>(key: string) {
    const PREFIX = "local-"
    const queryClient = useQueryClient()

    const setStore = (data: T) => {
        queryClient.setQueryData([PREFIX + key], data)
    }
    const { data: store } = useQuery<T>({
        queryKey: [PREFIX + key],
        queryFn: () => {
            // eslint-disable-next-line
            const data = queryClient.getQueryData([PREFIX + key]) as any
            return data ? data : null // `null` ni qaytarish
        },
        staleTime: Infinity, // reload qilganda o‘zgarmaydi
        gcTime: Infinity, // cheksiz saqlanishi
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    const remove = () => {
        queryClient.removeQueries({ queryKey: [PREFIX + key] })
    }

    return { store, setStore, remove }
}
