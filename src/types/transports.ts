type TransportImage = {
    id: number
    image: string
}

type Transport = {
    id: number
    name: string
    size: number
    price: number
    images: TransportImage[]
}
