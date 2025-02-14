const obj: Record<PackStatus, { title: string; color: string }> = {
    "-1": { title: "Bekor qilingan", color: "destructive" },
    "0": { title: "Kutilmoqda", color: "warning" },
    "1": { title: "Tasdiqlangan", color: "success" },
}

export function getPackStatus(status: PackStatus) {
    return obj[status]
}
