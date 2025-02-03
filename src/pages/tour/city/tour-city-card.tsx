export default function TourCityCard({ day, city, desciption }: TourCityItem) {
    return (
        <div className="w-full flex items-center bg-background rounded-sm px-3 py-1">
            <p className="flex-[0.3] text-primary">Day {day}</p>
            <p className="flex-[0.3]">{city}</p>
            <p className="flex-[0.4]">{desciption}</p>
        </div>
    )
}
