const isDateInRange = (
    date: string,
    startDate: string,
    endDate: string,
): boolean => {
    const targetDate = new Date(date)
    const start = new Date(startDate)
    const end = new Date(endDate)
    return targetDate >= start && targetDate <= end
}

// Berilgan sanaga mos mehmonxonalarni filterlash
const filterHotelsByDate = (hotels: Hotel[], date: string | null): Hotel[] => {
    if (!date) {
        return []
    }
    return hotels
        .map((hotel) => {
            const filteredRooms = hotel.rooms
                .map((room) => {
                    const filteredSeasons = room.seasons.filter((season) =>
                        isDateInRange(date, season.start_date, season.end_date),
                    )

                    return filteredSeasons.length > 0 ?
                            { ...room, seasons: filteredSeasons }
                        :   null
                })
                .filter((room): room is Room => room !== null)

            return filteredRooms.length > 0 ?
                    { ...hotel, rooms: filteredRooms }
                :   null
        })
        .filter((hotel): hotel is Hotel => hotel !== null)
}

export default filterHotelsByDate
