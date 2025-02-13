import ApproveCard from "./aprrove-card"

type Props = {
    type: "start" | "end"
    data: ChangeDocumentItem[]
}

export default function ChangesDocumentsList({ type, data }: Props) {
    return (
        <div className="bg-background p-3 rounded-md flex flex-col gap-3">
            <p className="text-xl mb-1">
                Tur paket {type == "start" ? "boshlanganini " : "tugaganini "}
                tasdiqlash
            </p>
            {data?.map((el) => <ApproveCard {...el} key={el.id} />)}
        </div>
    )
}
