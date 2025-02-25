import { useGet } from "@/services/default-requests"

const actions: Action[] = [
    "tur_paketlar_faqat_korish",
    "kassa_bank_korish",
    "kassa_naqd_korish",
    "kassa_bank_kirim_chiqim_yaratish",
    "kassa_naqd_kirim_chiqim_yaratish",
    "kassa_bank_chiqimni_tasdiqlash",
    "kassa_naqd_chiqimni_tasdiqlash",
    "real_xarajatlar_korish",
    "real_xarajatlar_toliq_nazorat",
    "ozgarishlar_korish",
    "ozgarishlar_tasdiqlash_kontrakt_yuklash",
    "admin_korish",
    "admin_toliq_nazorat",
    "sozlamalar_korish",
    "sozlamalar_toliq_nazorat",
    "tur_paketlar_toliq_nazorat",
    "dashboard_korish",
]

export default function usePermissions() {
    const { data } = useGet<UserPermissions & { role_id: number }>(
        "users/auth/permissions",
        {
            options: {
                staleTime: 1000 * 360,
            },
        },
    )

    if (data?.role_id == 1 || data?.role_id == 3) {
        const obj: Partial<Record<Action, boolean>> = {}

        for (const action of actions) {
            obj[action] = true
        }

        return obj
    }

    return data
}
