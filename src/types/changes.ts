type ChangeDocumentItem = {
    id: number
    tour: number
    condition: number
    status: number
    comment: string
    manager_name: string
}

type ChangeDocumentForm = {
    condition: number
    comment: string
}

type ChangeDocumenContracttForm = ChangeDocumentForm & {
    contract: Blob
}

type ChnagesSetStore = {
    id: number
    condition: number
}
