export function generateCostItem(
    items: ICostItem[] | undefined,
): CostGeneratedItem[] {
    if (!items) return []

    const resultMap = new Map<number, CostGeneratedItem>()

    for (const item of items) {
        const detailData: CostDetailData = {
            ...item,
            ...item.costs_data,
            // id:
            costs_data: undefined,
        }

        if (resultMap.has(item.day)) {
            resultMap.get(item.day)!.data.push(detailData)
        } else {
            resultMap.set(item.day, {
                id: item.id,
                day: item.day,
                data: [detailData],
            })
        }
    }

    return Array.from(resultMap.values())
}
