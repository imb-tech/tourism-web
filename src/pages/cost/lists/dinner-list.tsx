import CustomTable from "@/components/custom/table"
import InitialDataBox from "@/components/elements/initial-data-box"
import FileInput from "@/components/form/file-input"
import FormNumberInput from "@/components/form/number-input"
import { REAL_COST_DETAIL } from "@/constants/api-endpoints"
import formatMoney from "@/lib/format-money"
import { paymentTypes } from "@/lib/payment-types"
import { cn } from "@/lib/utils"
import CustomTableCol from "@/pages/tour/custome-table-col"
import { useGet } from "@/services/default-requests"
import { useParams, useSearch } from "@tanstack/react-router"
import { useMemo } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import CostTableHeader from "../cost-table-header"
import { generateCostItem } from "./lib"
import useUpload from "./useUpload"

function CostItem({ day, data }: CostGeneratedItem) {
    const form = useForm<CostFormState>({
        defaultValues: {
            [`day_${day}`]:
                data?.map((el) => ({
                    real_cost: Number(el.real_cost),
                    invoice: el.invoice,
                })) || [],
        },
    })

    const { fields } = useFieldArray({
        control: form.control,
        name: `day_${day}`,
        keyName: "key",
    })

    const { save } = useUpload<CostFormState>(form, day)

    return (
        <CustomTable grid="grid-cols-8" className="py-2">
            <div className="flex flex-col justify-center">
                <p className="text-primary">Day {day}</p>
            </div>
            <form className="flex flex-col col-span-7 gap-1">
                {fields?.map((col, i) => (
                    <div
                        className={cn(
                            "grid grid-cols-7 gap-2 py-2",
                            i > 0 ? "border-t border-secondary" : "",
                        )}
                        key={col.key}
                    >
                        <CustomTableCol>
                            {data[i].restaurant_name}
                        </CustomTableCol>
                        <CustomTableCol>
                            {data[i].tourists_count}
                        </CustomTableCol>
                        <CustomTableCol>
                            {formatMoney(data[i].price)}
                        </CustomTableCol>
                        <CustomTableCol>
                            <FormNumberInput
                                methods={form}
                                placeholder="Real xarajat"
                                className="border-none shadow-none text-xs"
                                name={`day_${day}.${i}.real_cost`}
                                onBlur={() => save(i, data[i].id)}
                            />
                        </CustomTableCol>
                        <CustomTableCol>
                            {formatMoney(data[i].expected_cost)}
                        </CustomTableCol>
                        <CustomTableCol className="pr-4">
                            <FileInput
                                name={`day_${day}.${i}.invoice`}
                                handleChange={(f) => {
                                    form.setValue(`day_${day}.${i}.invoice`, f)
                                    save(i, data[i].id)
                                }}
                                ischecked={form.watch(
                                    `day_${day}.${i}.invoice`,
                                )}
                            />
                        </CustomTableCol>
                        <CustomTableCol>
                            {
                                paymentTypes?.find(
                                    (el) => el.value == data[i].payment_type,
                                )?.name
                            }
                        </CustomTableCol>
                    </div>
                ))}
            </form>
        </CustomTable>
    )
}

export function DinnerList() {
    const { type } = useSearch({ from: "/_main/cost/$id" })
    const { id } = useParams({ from: "/_main/cost/$id" })

    const { data, isLoading } = useGet<ICostItem[]>(
        REAL_COST_DETAIL + `/${type}/${id}`,
    )

    const list = useMemo(() => generateCostItem(data), [data])

    return (
        <div className="bg-secondary p-3 flex flex-col gap-2 rounded-md">
            <CostTableHeader
                grid="grid-cols-8"
                columns={[
                    "Kun",
                    "Nomi",
                    "Turistlar",
                    "Individual narxi",
                    "Real xarajat",
                    "Jami",
                    "Chek",
                    "To'lov turi",
                ]}
            />
            <InitialDataBox isLoading={isLoading} />
            {list?.map((item) => <CostItem key={item.day} {...item} />)}
        </div>
    )
}
