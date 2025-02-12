type TrainDetailData = {
    id: number
    day: number
    field_id: number
    expected_cost: number
    payment_type: PaymentType
    tourists_count: number
    price: string
    type: PaymentType
    from_city_id: number
    to_city_id: number
    date: null | string
    dep: number
    des: number
    times: string
    klass: string | null
}

type TrainItem = {
    id: number
    day: number
    expected_cost: number
    payment_type: PaymentType
    detail_data: TrainDetailData
}

type TrainTableItem = {
    id: number
    day: number
    data: TrainDetailData[]
}

type TrainClass = {
    klass: string
    free_sets: number
    price: number
}

type TrainTime = {
    times: string
    klasses: TrainClass[]
}
