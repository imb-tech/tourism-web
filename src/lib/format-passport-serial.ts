export const formatPassportSerial = (value: string) => {
    if (!value) return value

    const formattedPart = value.toString().toUpperCase()

    return formattedPart
}
