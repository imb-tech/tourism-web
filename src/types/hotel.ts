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
}
