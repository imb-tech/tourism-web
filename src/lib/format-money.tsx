import { ClassNameValue } from "tailwind-merge"

export default function formatMoney(
    amount?: number | string,
    className?: ClassNameValue,
    suffix?: string,
) {
    const [integerPart, decimalPart] =
        amount ? amount.toString().split(".") : ""
    const newIntegerPart = integerPart?.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    if (amount) {
        if (decimalPart && +decimalPart > 0) {
            return (
                <span className={`${className} text-nowrap`}>
                    {newIntegerPart}.{decimalPart} {suffix ? " " + suffix : ""}
                </span>
            )
        } else {
            return (
                <span className={`${className} text-nowrap`}>
                    {newIntegerPart} {suffix ? " " + suffix : ""}
                </span>
            )
        }
    } else {
        return (
            <span className={`${className} text-nowrap`}>
                0 {suffix ? " " + suffix : ""}
            </span>
        )
    }
}

export function formatMoneyFn(amount?: number): string {
    const [integerPart, decimalPart] =
        amount ? amount.toString().split(".") : ""
    const newIntegerPart = integerPart?.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    if (amount) {
        if (decimalPart && +decimalPart > 0) {
            return `${newIntegerPart}.${decimalPart}`
        } else {
            return newIntegerPart
        }
    } else {
        return "0"
    }
}
