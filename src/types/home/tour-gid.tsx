type TourCityItem = {
    id: number
    day: number
    desc: string
    cities: number[]
}

type TourGidData = {
    id: number
    name: string
    phone: string
    price: number
    langs: string[]
    description: string
}

type TourGidDetailData = {
    id: number
    full_name: string
    field_id: number
    phone: string
    price: number
    payment_type: PaymentType
    desc: string
    languages: string[]
}

type TourGidResponse = {
    id: number
    type: "guide"
    day: number
    field_id: number
    real_cost: number
    expected_cost: number
    payment_type: PaymentType
    detail_data: TourGidDetailData
}

type TourGidItem = {
    id: number
    day: number
    data: TourGidDetailData[] | null
}
