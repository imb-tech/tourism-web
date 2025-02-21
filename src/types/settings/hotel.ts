type HotelRoom = {
    id: number | null
    name: string
    price: number
}

type HotelImage = {
    id: number | null
    image: Blob | string
}

type HotelCreate = Hotel & {
    city: number
    rooms: Room[]
}

type Season = {
    id: number | null
    price: number
    start_date: string
    end_date: string
}

type Room = {
    id: number | null
    name: string
    seasons: Season[]
}

type Hotel = {
    id: number | null
    name: string
    star: number
    city: City
    images: HotelImage[]
    rooms: Room[]
}
