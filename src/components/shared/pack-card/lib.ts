const obj: Record<PackTMStatus, { title: string; color: string }> = {
    "-1": { title: "Cancelled", color: "destructive" },
    "0": { title: "Pending", color: "warning" },
    "1": { title: "Confirmed", color: "success" },
}

const obj2: Record<PackStatus, { title: string; color: string }> = {
    "0": { title: "Not filled", color: "destructive" },
    "10": { title: "Filled", color: "warning" },
    "20": { title: "Contract uploaded", color: "success" },
    "30": { title: "In actual expenses", color: "success" },
    "40": { title: "Tour closed", color: "success" },
}

export function getPackTMStatus(status: PackTMStatus) {
    return obj[status]
}

export function getPackStatus(status: PackStatus) {
    return obj2[status]
}
