type HotelRoom = {
    id: number | null
    name: string
    price: number
}

type HotelImage = {
    id: number | null
    image: Blob | string
}

type Hotel = {
    id: number | null
    name: string
    star: number
    city: City
    images: HotelImage[]
    rooms: HotelRoom[]
}

type HotelCreate = Omit<Hotel, "id"> & {
    city: number
    rooms: Room[]
}

type RoomTime = {
    id: number | null
    start_date: string
    end_date: string
    price: number
}

type Room = {
    id: number | null
    name: string
    seasons: RoomTime[]
}
