type Manager = {
    id: number
    first_name: string
    last_name: string
}

type TourItem = {
    id: number
    tour: number
    tourists_count: number
    leaders_count: number
    hotel_stars: number
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
    country: Country
}

type CreatePack = PackItem & {
    manager: number
    country: number
}

type PlanItem = {
    id: number
    leaders_count: number
    tour: number
    tourists_count: number
    hotel_stars: number
    accepted: boolean
    benefit: number
}
