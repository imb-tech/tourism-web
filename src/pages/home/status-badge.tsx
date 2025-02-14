export const statusColors: Record<
    string,
    {
        color: string
        label: string
    }
> = {
    "10": {
        color: "#AF52DE",
        label: "Tur tasdiqlandi",
    },
    "20": {
        color: "#AF52DE",
        label: "Jarayonda",
    },
    "40": {
        color: "#34C759",
        label: "Yakunlangani tasdiqlandi",
    },
    "30": {
        color: "#FF9500",
        label: "Yakunlandi",
    },
}

export const BadgeStatus = ({ status }: { status: string }) => {
    return (
        <span style={{ color: statusColors[status].color }}>
            {statusColors[status].label}
        </span>
    )
}
