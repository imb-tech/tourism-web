import FormAction from "@/components/custom/form-action"
import FormCheckbox from "@/components/form/checkbox"
import FormImagePicker from "@/components/form/image-picker"
import FormInput from "@/components/form/input"
import PhoneField from "@/components/form/phone-field"
import { TOURISTS } from "@/constants/api-endpoints"
import { USER_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { usePost } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { useForm } from "react-hook-form"

export default function CreateUserForm() {
    const queryClient = useQueryClient()
    const { store, remove } = useStore<UserItem>(USER_DATA)
    const { id } = useParams({ from: "/_main/packs/$pack/$id" })
    const { closeModal } = useModal()

    function onSuccess() {
        queryClient.removeQueries({
            queryKey: [TOURISTS],
        })
        closeModal()
        remove()
    }

    const { mutate, isPending } = usePost(
        { onSuccess },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    )

    const form = useForm<UserItem>({
        defaultValues: store || {},
    })

    function handleSubmit(vals: UserItem) {
        const formData = new FormData()

        formData.append("full_name", vals.full_name)
        formData.append("passcode", vals.passcode)
        formData.append("phone", vals.phone.replace("+", ""))
        formData.append("plan", id)
        formData.append("is_leader", String(vals.is_leader))
        formData.append("photo", vals.photo)
        console.log(formData)

        mutate(TOURISTS, formData)
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

                <FormInput
                    methods={form}
                    name="passcode"
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
                name="photo"
                label="Rasmni bu yerga tashlang yoki kompyuterdan yuklang"
                labelClassName="border rounded-md w-full py-12 flex flex-col items-center justify-center gap-3"
            />

            <FormAction loading={isPending} />
        </form>
    )
}
