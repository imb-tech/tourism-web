type PlanCity = {
    id: number
    day: number
    desc: string
    cities: number[]
}

type PlanBenifit = {
    benifit: number
}

type CashType = 0
type BankType = 1

type PaymentType = CashType | BankType

type PaymentTypeItem = {
    cash?: CashType
    bank?: BankType
}
