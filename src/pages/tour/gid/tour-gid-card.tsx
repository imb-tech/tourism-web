export default function TourGidCard({ day, data }: TourGidItem) {
    return (
        <div className="w-full flex items-center bg-background rounded-sm px-3 py-1">
            <p className="flex-[0.2] text-primary">Day {day}</p>
            <div className="flex-[0.8] flex flex-col">
                {data?.map((el) => (
                    <div className="flex items-center" key={el.id}>
                        <p className="flex-[0.3]">{el?.name}</p>
                        <p className="flex-[0.3]">{el?.phone}</p>
                        <p className="flex-[0.4]">{el?.langs.join(", ")}</p>
                        <p className="flex-[0.4]">{el?.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
