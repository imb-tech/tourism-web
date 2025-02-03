type TourCityItem = {
    id: number
    day: number
    city: string
    desciption: string
}

type TourGidData = {
    id: number
    name: string
    phone: string
    price: number
    langs: string[]
    description: string
}

type TourGidItem = {
    id: number
    day: number
    data: TourGidData[]
}

type TourHotelData = {
    id: number
    name: string
    type: string
    rooms: number
    per_price: number
    total_price: number
}

type TourHotelItem = {
    id: number
    day: number
    data: TourHotelData[]
}

type TourTransport1Data = {
    id: number
    name: string
    size: number
    price: number
    driver: string
    driver_phone: string
    company: string
}

type TourTransport2Data = TourTransport1Data & {
    from_city: string
    to_city: string
    from_time: string
    to_time: string
}

type TourTransport1Item = {
    id: number
    day: number
    data: TourTransport1Data[]
}

type TourTransport2Item = {
    id: number
    day: number
    data: TourTransport2Data[]
}

type Restaurant1Data = {
    id: number
    name: string
    users: number
    per_price: number
    total_price: number
}

type Restaurant1Item = {
    id: number
    day: number
    data: Restaurant1Data[]
}

type TrainData = {
    id: number
    from_city: string
    to_city: string
    from_time: string
    to_time: string
    class: string
    users: number
    price: number
    total_price: number
}

type TrainItem = {
    id: number
    day: number
    data: TrainData[]
}

type EnterenceData = {
    id: number
    name: string
    users: number
    per_price: number
    total_price: number
}

type EnterenceItem = {
    id: number
    day: number
    data: EnterenceData[]
}

type OtherData = {
    id: number
    category: string
    description: string
    price: number
}

type OtherItem = {
    id: number
    day: number
    data: OtherData[]
}
