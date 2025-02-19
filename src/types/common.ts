type GetMe = {
    id: number
    first_name: string
    last_name: string
    permissions: Partial<TPermissions>
}

type ListResponse<T> = {
    total_pages: number
    count: number
    results: T[]
}

type UserName = {
    id: number
    first_name: string
    last_name: string
}
