type LogItem = {
    id: number
    instance_pk: string
    model: string
    updates: object
    action: string
    comment: string | null
    created_at: string
    user_name: string
    path: string | null
}
