import { PAGE_KEY, SEARCH_KEY, SEARCH_WITH_ENTER_KEY } from "@/constants/common"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { useEffect, useRef } from "react"
import { Input, InputProps } from "../ui/input"

type ParamInputProps = {
    searchKey?: string
    searchWithEnterKey?: string
    pageKey?: string
} & InputProps

export default function ParamInput({
    searchKey = SEARCH_KEY,
    searchWithEnterKey = SEARCH_WITH_ENTER_KEY,
    pageKey = PAGE_KEY,
    ...props
}: ParamInputProps) {
    const navigate = useNavigate()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = useSearch({ strict: false })
    const inputRef = useRef<HTMLInputElement>(null)
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const searchVal = inputRef.current?.value
            navigate({
                search: {
                    ...params,
                    [searchWithEnterKey]: searchVal || undefined,
                    [pageKey]: undefined,
                },
            })
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current)
        }
        debounceTimeoutRef.current = setTimeout(() => {
            navigate({
                search: {
                    ...params,
                    [searchKey]: val || undefined,
                    [pageKey]: undefined,
                },
            })
        }, 500)
    }

    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current)
            }
        }
    }, [])

    return (
        <>
            <Input
                defaultValue={params[searchKey]}
                placeholder={"Qidiruv..."}
                type="search"
                ref={inputRef}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                {...props}
            />
        </>
    )
}
