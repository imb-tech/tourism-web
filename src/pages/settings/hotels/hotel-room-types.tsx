import FormDatePicker from "@/components/form/date-picker"
import FormNumberInput from "@/components/form/number-input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Dispatch, SetStateAction } from "react"
import { useFieldArray, UseFormReturn } from "react-hook-form"

type Props = {
    methods: UseFormReturn<HotelCreate>
    roomIndex: number
    setDeletedSeasons?: Dispatch<SetStateAction<number[]>>
}

export default function HotelRoomTypes({
    methods,
    roomIndex,
    setDeletedSeasons,
}: Props) {
    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: `rooms.${roomIndex}.seasons`,
        keyName: "key",
    })

    function handleDelete(id: number | null, index: number) {
        remove(index)
        if (id) {
            setDeletedSeasons?.((c) => [...c, id])
        }
    }

    return (
        <div className="mt-2 flex flex-col items-start gap-2 col-span-full">
            {fields.map((field, i) => (
                <div className="w-full grid grid-cols-4 gap-2" key={field.key}>
                    <FormDatePicker
                        methods={methods}
                        name={`rooms.${roomIndex}.seasons.${i}.start_date`}
                        placeholder="Dan"
                        format="yyyy-MM-dd"
                    />
                    <FormDatePicker
                        methods={methods}
                        name={`rooms.${roomIndex}.seasons.${i}.end_date`}
                        format="yyyy-MM-dd"
                        placeholder="Gacha"
                    />
                    <FormNumberInput
                        methods={methods}
                        name={`rooms.${roomIndex}.seasons.${i}.price`}
                        placeholder="Xona narxi"
                        required
                    />
                    <Button
                        size={"icon"}
                        variant={"destructive-muted"}
                        onClick={() => handleDelete(field.id, i)}
                    >
                        <Trash2 />
                    </Button>
                </div>
            ))}
            <Button
                onClick={() =>
                    append({
                        id: null,
                        start_date: "",
                        end_date: "",
                        price: 0,
                    })
                }
                className="col-span-full"
            >
                Narx qo'shish
            </Button>
        </div>
    )
}
