type BankRequest = {
    uuid: string
    sender_id: number
    tour_id: number
    amount: string
    type: string
    condition: string
    status: number
}

type InvoiceCreate = {
    category: number
    amount: number
    comment: string
    file: File
    checkout_type: string
    is_initial_income: boolean
    tour: number
}

type FinancialCategory = {
    id: number
    name: string
}

type Transaction = {
    uuid: string
    amount: string
    comment: string
    executor: string
    through: "FinancialFlow" | "TourExpense" | "TourIncome"
    instance_pk: "2"
    type: 1
    condition: 1
    checkout_id: 1
}
