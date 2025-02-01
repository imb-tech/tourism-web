export const formatPhone = (value: string) => {
    if (!value) return value

    const phoneNumber = value.replace("+998", "").replace(/[^\d]/g, "")
    const phoneNumberLength = phoneNumber.length

    if (phoneNumberLength <= 2) return `${phoneNumber}`
    if (phoneNumberLength <= 5)
        return `${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2)}`
    if (phoneNumberLength <= 7)
        return `${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 5)}-${phoneNumber.slice(5)}`
    if (phoneNumberLength <= 9)
        return `${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 5)}-${phoneNumber.slice(5, 7)}-${phoneNumber.slice(7)}`

    // Agar uzunlik 9 dan katta bo'lsa
    const formattedPart = `${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 5)}-${phoneNumber.slice(5, 7)}-${phoneNumber.slice(7, 9)}`
    // const remainingPart = phoneNumber.slice(9);

    return `+998 ${formattedPart}`
}
