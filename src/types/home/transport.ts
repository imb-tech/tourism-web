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
