import { GET_ME } from "@/constants/api-endpoints"
import { useGet, UseGetArgs } from "./default-requests"

export const useMe = (args?: UseGetArgs) => {
    const { data } = useGet<GetMe>(GET_ME, {
        ...args,
        options: {
            refetchOnMount: false,
        },
    })
    return data
}
