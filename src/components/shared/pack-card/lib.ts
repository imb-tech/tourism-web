const obj: Record<PackTMStatus, { title: string; color: string }> = {
    "-1": { title: "Bekor qilingan", color: "destructive" },
    "0": { title: "Kutilmoqda", color: "warning" },
    "1": { title: "Tasdiqlangan", color: "success" },
}

const obj2: Record<PackStatus, { title: string; color: string }> = {
    "0": { title: "To'ldirilmagan", color: "destructive" },
    "10": { title: "To'ldirilgan", color: "warning" },
    "20": { title: "Kontrakt yuklangan", color: "success" },
    "30": { title: "Real xarajatlarda", color: "success" },
    "40": { title: "Tur yopilgan", color: "success" },
}

export function getPackTMStatus(status: PackTMStatus) {
    return obj[status]
}

export function getPackStatus(status: PackStatus) {
    return obj2[status]
}
