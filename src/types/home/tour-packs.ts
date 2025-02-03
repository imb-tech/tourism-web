type Manager = {
    id: number
    first_name: string
    last_name: string
}

type TourItem = {
    id: number
    users: number
    leaders: number
    hotel_type: number
}

type PackItem = {
    id: number
    client: string
    manager: Manager
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

type PlanItem = {
    id: number
    leaders_count: number
    tourists_count: number
    hotel_stars: number
    accepted: boolean
}
