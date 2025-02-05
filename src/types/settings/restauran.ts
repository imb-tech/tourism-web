type RestaurantSet = {
    id: number | null
    name: string
    price: number
    foods: number[]
}

type Restaurant = {
    name: string
    city: number
    sets: RestaurantSet[]
    deleted_sets: number[]
}
