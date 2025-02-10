type TransportListItemdetail = {
    id: number
    day: number
    expected_cost: number
    payment_type: null | PaymentType
    size: number
    price: number
    driver: number
    driver_phone: string
    company_phone: string
    to_city: number
    from_city: number
    to_city_id: number
    from_city_id: number
    from_time: string
    to_time: string
    transport: number
    transport_id: number
    field_id: number
}

type TransportListItem = {
    id: number
    day: number
    expected_cost: number
    payment_type: null | PaymentType
    detail_data: TransportListItemdetail
}

type TransportTableItem = {
    id: number
    day: number
    data: TransportListItemdetail[]
}
