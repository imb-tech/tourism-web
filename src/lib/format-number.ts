import {
    InputAttributes,
    NumericFormatProps,
    numericFormatter,
} from "react-number-format"

// export function formatNumber(num: unknown = 0) {
//     const n = Number(num)
//     if (typeof n === "number" && !Number.isNaN(n)) {
//         return n.toLocaleString("fr-FR")
//     } else return ""
// }

export function formatNumber(
    val: unknown,
    {
        isShowZero,
        ...props
    }: NumericFormatProps<InputAttributes> & {
        isShowZero?: boolean
    } = {},
) {
    const num = Number(val)
    const numStr = String(num)
    return (
        num ?
            numericFormatter(numStr, {
                thousandSeparator: " ",
                ...props,
            })
        : isShowZero ? 0
        : ""
    )
}
