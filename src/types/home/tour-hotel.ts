type HotelDetailData = {
    id: number
    hotel_id: number
    room_id: number
    count: number
    payment_type: PaymentType
    price: number
    field_id: number
    expected_cost: number
}

type HotelItemResponse = {
    id: number
    day: number
    field_id: number
    payment_type: PaymentType
    detail_data: HotelDetailData
}

type HotelItem = {
    id: number
    day: number
    hotels: HotelByCityItem[]
    data: HotelDetailData[]
}

type RoomItem = {
    id: number
    name: string
    price: number
}

type HotelByCityItem = {
    id: number
    name: string
    rooms_dict: RoomItem[]
}

type HotelByCityResponse = Record<number, HotelByCityItem[]>
