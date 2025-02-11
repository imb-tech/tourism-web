type OtherData = {
    id: number
    category_id: number
    category: number
    desc: string
    price: number
    day: number
    field_id: number
    expected_cost: number
    payment_type: PaymentType
}

type OtherTableItem = {
    id: number
    day: number
    data: OtherData[]
}

type OtherItem = {
    id: number
    day: number
    expected_cost: number
    payment_type: PaymentType
    detail_data: OtherData[]
}
