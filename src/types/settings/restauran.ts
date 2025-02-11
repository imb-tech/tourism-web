type RestaurantSet = {
    id: number | null
    name: string
    price: number
    foods: number[]
}

type Restaurant = {
    id: number
    name: string
    city: City
    sets: RestaurantSet[]
    deleted_sets: number[]
}

type RestaurantByCityResponse = Record<number, Restaurant[]>
