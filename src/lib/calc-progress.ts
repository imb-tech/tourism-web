export function calcProgress(startDate: string, endDate: string) {
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()
    const now = new Date().getTime()

    const total = (end - start) / (1000 * 60 * 60 * 24)
    const current = Math.floor((now - start) / (1000 * 60 * 60 * 24))

    return {
        total,
        current,
    }
}
