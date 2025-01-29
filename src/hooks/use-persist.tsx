import { useQuery, useQueryClient } from "@tanstack/react-query"

export function usePersist<T = unknown>(
    key: string,
    initialValue?: T | undefined,
) {
    const queryClient = useQueryClient()

    const setStore = (data: T) => {
        queryClient.setQueryData(["persist" + key], data)
        localStorage.setItem("persist" + key, JSON.stringify(data))
    }

    const { data: store } = useQuery<T>({
        queryKey: ["persist" + key],
        queryFn: () => {
            const data = localStorage.getItem("persist" + key)
            return data ? JSON.parse(data) : null
        },
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchIntervalInBackground: false,
    })

    const remove = () => {
        localStorage.removeItem("persist" + key)
        queryClient.removeQueries({ queryKey: ["persist" + key] })
    }

    return { store: store ?? initialValue, setStore, remove }
}
