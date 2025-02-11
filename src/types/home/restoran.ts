type RestoranDetailData = {
    id: number
    day: number
    field_id: number
    restaurant: number
    tourists_count: number
    expected_cost: number
    set: number
    set_id: number
    payment_type: PaymentType
    price: number
    restaurant_id: number
}

type RestoranItem = {
    id: number
    day: number
    payment_type: PaymentType
    detail_data: RestoranDetailData
}

type RestoranTableItem = {
    id: number
    day: number
    data: RestoranDetailData[]
}
