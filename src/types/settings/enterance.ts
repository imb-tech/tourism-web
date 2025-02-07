type Enterance = {
    id: number
    name: string
    price: number
    city: City
    image: string | null
}

type CreaateEnterance = Enterance & {
    city: number
    image: Blob | string | null
}
