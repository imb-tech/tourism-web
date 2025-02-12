const packTabOptions = [
    { id: "city", name: "Shahar" },
    { id: "gid", name: "Gid" },
    { id: "hotel", name: "Mehmonxona" },
    { id: "transport1", name: "Transport 1" },
    { id: "transport2", name: "Transport 2" },
    { id: "restoran1", name: "Restoran 1" },
    { id: "restoran2", name: "Restoran 2" },
    { id: "train", name: "Poyezd" },
    { id: "plane", name: "Samolyot" },
    { id: "enterence", name: "Enterence" },
    { id: "other", name: "Boshqa" },
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
