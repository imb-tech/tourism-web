export const formatPassportSerial = (value: string) => {
    if (!value) return value

    const formattedPart = `${value.slice(0, 2)} ${value.slice(2)}`

    return formattedPart
}
