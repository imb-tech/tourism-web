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

type PackTMStatus = "-1" | "0" | "1"
type PackStatus = "0" | "10" | "20" | "30" | "40"

type PackItem = {
    id: number
    client: string
    manager: Manager
    start: string
    end: string
    days: number
    nights: number
    status: PackStatus
    country: Country
    tm_status: PackTMStatus
    plan_id: number
    tm_comment?: string
    tm_contract: string | null
}

type CreatePack = PackItem & {
    manager: number
    country: number
}

type PlanItem = {
    id: number
    leaders_count: number | null
    tour: number
    tourists_count: number
    hotel_stars: number
    accepted: boolean
    benefit: number
    country: string
    start: string
    end: string
}

type PlanDetail = {
    editable: boolean
    start: string
}
