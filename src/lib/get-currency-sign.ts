import { currency_types } from "@/constants/currency"

export function getCurrencySign(currency: CurrencyType | undefined) {
    return currency_types.find((c) => c.id === currency)?.code ?? ""
}
