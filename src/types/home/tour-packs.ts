type TourItem = {
    id: number
    users: number
    leaders: number
    hotel_type: number
}

type PackItem = {
    id: number
    client: string
    manager: {
        id: number
        first_name: string
        last_name: string
    }
    start: string
    end: string
    days: number
    nights: number
    status: number
    country: string
}

type CreatePack = PackItem & {
    manager: number
}
