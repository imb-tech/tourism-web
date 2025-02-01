import FormAction from "@/components/custom/form-action"
import FormCheckbox from "@/components/form/checkbox"
import FormImagePicker from "@/components/form/image-picker"
import FormInput from "@/components/form/input"
import FormNumberInput from "@/components/form/number-input"
import PhoneField from "@/components/form/phone-field"
import { USER_DATA } from "@/constants/localstorage-keys"
import { useStore } from "@/hooks/use-store"
import { useForm } from "react-hook-form"

export default function CreateUserForm() {
    const { store } = useStore<UserItem>(USER_DATA)

    const form = useForm<UserItem>({
        defaultValues: store || {},
    })

    function handleSubmit(vals: UserItem) {
        console.log(vals)
    }

    return (
        <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4 mt-3"
        >
            <div className="flex gap-3 w-full">
                <FormInput
                    methods={form}
                    name="full_name"
                    label="To’liq ismi"
                    wrapperClassName={"w-full"}
                />

                <FormNumberInput
                    methods={form}
                    name="passpord_serial"
                    label="Passport"
                    wrapperClassName={"w-full"}
                />
            </div>

            <PhoneField
                methods={form}
                name="phone"
                label="Telefon"
                placeholder="Telefon raqam"
            />

            <FormCheckbox methods={form} name="is_leader" label="Tour Leader" />

            <FormImagePicker
                className={"w-full rounded-md"}
                methods={form}
                name="image"
                label="Rasmni bu yerga tashlang yoki kompyuterdan yuklang"
                labelClassName="border rounded-md w-full py-12 flex flex-col items-center justify-center gap-3"
            />

            <FormAction />
        </form>
    )
}
