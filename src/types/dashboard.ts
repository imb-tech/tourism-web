type HomeTableItem = {
    id: number
    tour_id: number
    manager_name: string
    client: string
    start: string
    end: string
    days: number
    tourists_count: number
    status: number
    expected_cost: number
    actual_cost: number
    benefit: number
}

type HomeNestedItem = Record<packTab, number> & {
    cities: number
    id: number
    total: number
}

type DocumentDay = {
    cities: string
}

interface DetailData {
    id: number
    price?: string
    tourists_count?: number
    entrance_id?: number
    restaurant_id?: number
    set_id?: number
    klass?: string
    from_city_id?: number
    to_city_id?: number
    times?: string
    hotel_id?: number
    room_id?: number
    room_name?: string
    count?: number
    size?: number
    driver?: string
    driver_phone?: string
    company_phone?: string
    full_name?: string
    hotel_name?: string
    restaurant_name: string
    phone?: string
    languages?: string[]
    category_id?: number
    desc?: string
    transport_name: string
    from_city_name: string
    to_city_name: string
    entrance_name: string
    tourist_count: number
    category_name: string
}

interface DataItem {
    id: number
    amount: number
    payment_type: number
    dashboard_data: DetailData
}

interface ApiResponse {
    cities: string
    days: number
    entrance: DataItem[]
    dinner: DataItem[]
    plane: DataItem[]
    train: DataItem[]
    hotel: DataItem[]
    trans_out: DataItem[]
    guide: DataItem[]
    lunch: DataItem[]
    other: DataItem[]
    trans_in: DataItem[]
}
