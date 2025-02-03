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
