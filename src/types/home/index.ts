const packTabOptions = [
    { id: "city", name: "City" },
    { id: "gid", name: "Guide" },
    { id: "hotel", name: "Hotel" },
    { id: "transport1", name: "Transport 1" },
    { id: "transport2", name: "Transport 2" },
    { id: "restoran1", name: "Restoran 1" },
    { id: "restoran2", name: "Restoran 2" },
    { id: "train", name: "Poyezd" },
    { id: "plane", name: "Samolyot" },
    { id: "enterence", name: "Enterence" },
    { id: "other", name: "Other" },
]

type packTab =
    | "city"
    | "guide"
    | "hotel"
    | "trans_in"
    | "trans_out"
    | "dinner"
    | "lunch"
    | "train"
    | "plane"
    | "entrance"
    | "other"
    | "criteria"
