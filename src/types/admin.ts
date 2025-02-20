type RolePermissions = Record<string, boolean>

type Permission = {
    id: number
    name: string
    module_id?: number
    code: string
}

type Role = {
    id: number
    name: string
}

type RoleDetail = {
    id: number
    name: string
    actions: RolePermissions
}

type User = {
    id: number
    first_name: string
    last_name: string
    username: string
    role: number
}
