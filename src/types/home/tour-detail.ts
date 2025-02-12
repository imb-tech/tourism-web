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

// type EnterenceData = {
//     id: number
//     name: string
//     users: number
//     per_price: number
//     total_price: number
// }

// type EnterenceItem = {
//     id: number
//     day: number
//     data: EnterenceData[]
// }
