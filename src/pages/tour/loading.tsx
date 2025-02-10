import { useStore } from "@/hooks/use-store"

export default function useTourLoading() {
    const { store, setStore } = useStore<boolean | undefined>("tour-loading")
    return { loading: store, setLoading: setStore }
}
