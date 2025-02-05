type Enterance = {
    id: number
    name: string
    price: number
    city: City
}

type CreaateEnterance = Enterance & {
    city: number
}
