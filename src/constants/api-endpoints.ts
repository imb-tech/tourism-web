// categories
const USER = "users/"
const COMMON = "common/"
const TOURS = "tours/"
const SERVICES = "services/"

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
export const HOTEL_TYPES = COMMON + "hotel_types"
export const CATEGORIES = COMMON + "categories"
export const EXPECTED = PLANS + "/expected"
export const ACCEPT = PLANS + "/accept"

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
