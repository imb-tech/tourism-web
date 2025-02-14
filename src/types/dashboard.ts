type HomeTableItem = {
    id: number
    tour_id: number
    manager_name: string
    client: string
    start: string
    end: string
    days: number
    tourists_count: number
    status: number
    expected_cost: number
    actual_cost: number
    benefit: number
}

type HomeNestedItem = Record<packTab, number> & {
    cities: number
    id: number
    total: number
}
