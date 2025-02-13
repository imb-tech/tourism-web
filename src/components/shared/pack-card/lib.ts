const obj: Record<PackStatus, string> = {
    "-1": "Bekor qilingan",
    "0": "Kutilmoqda",
    "1": "Tasdiqlangan",
}

export function getPackStatus(status: PackStatus) {
    return obj[status]
}
