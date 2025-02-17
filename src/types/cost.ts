type CostDetailData = {
    id: number
    day: number
    expected_cost: number
    real_cost: number
    invoice: Blob | null
    price?: string
    payment_type: PaymentType
    tourists_count?: number
    costs_data: undefined

    desc: string
    full_name: string
    phone: string
    languages: string[]
    hotel_name: string
    room_name: string
    count: number
    transport_name: string
    size: number
    driver: string
    driver_phone: string
    company_phone: string
    restaurant_name: string
    from_city_name: string
    to_city_name: string
    times: string
    klass: string
    entrance_name: string
    tourist_count: number
    category_name: string
}

type ICostItem = {
    id: number
    day: number
    expected_cost: number
    real_cost: number
    invoice: Blob | null
    payment_type: PaymentType
    costs_data: CostDetailData
}

type CostGeneratedItem = {
    id: number
    day: number
    data: CostDetailData[]
}

type CostForm = {
    real_cost: number
    invoice: Blob | null
}

type CostFormState = Record<string, CostForm[]>
