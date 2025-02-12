type PlanListItemdetail = {
    id: number
    day: number
    expected_cost: number
    payment_type: null | PaymentType
    klass: string
    tourists_count: number
    price: number
    to_city: number
    from_city: number
    to_city_id: number
    from_city_id: number
    from_time: string
    to_time: string
    field_id: number
}

type PlanListItem = {
    id: number
    day: number
    expected_cost: number
    payment_type: null | PaymentType
    detail_data: PlanListItemdetail
}

type PlanTableItem = {
    id: number
    day: number
    data: PlanListItemdetail[]
}
