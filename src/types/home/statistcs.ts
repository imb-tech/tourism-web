type BalanceType = {
    balance: number
    expense: number
    expected_expense?: number
    income?: number
}

type DashboardStatistics = {
    bank: BalanceType
    cash: BalanceType
    balance: BalanceType
}
