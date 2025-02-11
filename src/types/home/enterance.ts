type EnteranceListItemdetail = {
    id: number
    day: number
    expected_cost: number
    payment_type: null | PaymentType
    entrance_id: number
    entrance: number
    price: number
    tourist_count: number
    field_id: number
}

type EnteranceListItem = {
    id: number
    day: number
    expected_cost: number
    payment_type: null | PaymentType
    detail_data: EnteranceListItemdetail
}

type EnteranceTableItem = {
    id: number
    day: number
    data: EnteranceListItemdetail[]
}
