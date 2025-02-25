type TPermissions = [
    "add_permission",
    "change_permission",
    "delete_user",
    "delete_group",
    "change_group",
    "add_user",
    "change_user",
    "view_permission",
    "view_group",
    "add_group",
    "delete_permission",
]

type Action =
    | "tur_paketlar_faqat_korish"
    | "kassa_bank_korish"
    | "kassa_naqd_korish"
    | "kassa_bank_kirim_chiqim_yaratish"
    | "kassa_naqd_kirim_chiqim_yaratish"
    | "kassa_bank_chiqimni_tasdiqlash"
    | "kassa_naqd_chiqimni_tasdiqlash"
    | "real_xarajatlar_korish"
    | "real_xarajatlar_toliq_nazorat"
    | "ozgarishlar_korish"
    | "ozgarishlar_tasdiqlash_kontrakt_yuklash"
    | "admin_korish"
    | "admin_toliq_nazorat"
    | "sozlamalar_korish"
    | "sozlamalar_toliq_nazorat"
    | "tur_paketlar_toliq_nazorat"
    | "dashboard_korish"

type UserPermissions = Record<Action, boolean>
