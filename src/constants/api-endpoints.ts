// categories
const USER = "users/"
const COMMON = "common/"
const TOURS = "tours/"
const SERVICES = "services/"
const CHECKOUT = "checkout/"
const COSTS = "tours/costs/"
const PAYMENTS = "payments/"

export const REFRESH_TOKEN = "refresh_token"

//
export const AUTH = USER + "auth"
export const ROLE = USER + "role"
export const PERMISSIONS = USER + "permissions"
export const LOGIN = USER + "auth/login"
export const GET_ME = USER + "getme"

//
export const TOUR = "tours"
export const COUNTRIES = COMMON + "countries"
export const CITIES = COMMON + "cities"
export const LIGHT = USER + "light"
export const PLANS = TOUR + "/plans"
export const PDF_FILE = TOUR + "/plans/pdf-file/"
export const HOTEL_TYPES = COMMON + "hotel_types"
export const CATEGORIES = COMMON + "categories"
export const EXPECTED = PLANS + "/expected"
export const ACCEPT = PLANS + "/accept"
export const CHANGERS = TOURS + "changers"
export const MOVE_REAL = COSTS + "move-real/"

export const TOURISTS = TOURS + "tourists"
export const ENTERANCES = SERVICES + "entrances"
export const TRANSPORTS = SERVICES + "transports"
export const HOTELS = SERVICES + "hotels"
export const FOODS = SERVICES + "foods"
export const RESTAURANTS = SERVICES + "restaurants"
export const DETAIL = TOURS + "details"
export const CHANGE = DETAIL + "/change/"
export const SELECTION = SERVICES + "selection/"
export const CHANGES = TOURS + "changers"

export const DASHBOARD_STATUS = CHECKOUT + "dashboard/status"
export const STATISTICS = CHECKOUT + "dashboard/statistics"
export const DASHBOARD_STATUS_AMOUNTS = CHECKOUT + "dashboard/status-amounts"
export const DASHBOARD_STATUS_DETAIL = CHECKOUT + "dashboard/status-detail"
export const LOGS = COMMON + "logs"

export const REAL_COST = COSTS + "real"
export const REAL_COST_DETAIL = COSTS + "real"
export const UPLOAD_INVOICE = COSTS + "upload-invoice"
export const CREATE_INCOME_OTHER = CHECKOUT + PAYMENTS + "financial-flows"
export const FINANCIAL_CATEGORIES = COMMON + "financial-categories"
export const PAYMENT_REQUESTS = CHECKOUT + PAYMENTS + "tours/"
export const TRANSACTIONS = CHECKOUT + PAYMENTS + "transactions/"
export const CRITERIES = PLANS + "/criteria"
