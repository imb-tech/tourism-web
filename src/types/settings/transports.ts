type TransportImage = {
    id: number | null | undefined
    image: Blob | string | undefined
}

type Transport = {
    id: number
    name: string
    size: number
    price: number
    images: TransportImage[]
}
