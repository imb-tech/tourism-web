import FormAction from "@/components/custom/form-action"
import FormInput from "@/components/form/input"
import SelectField from "@/components/form/select-field"
import { ROLES, USERS } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet, usePatch, usePost } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export default function UserCreateForm() {
    const { data: roles } = useGet<Role[]>(ROLES)
    const { store, remove } = useStore<User>("user-data")
    const { closeModal } = useModal()
    const queryClient = useQueryClient()

    function onSuccess() {
        closeModal()
        remove()
        queryClient.removeQueries({
            queryKey: [USERS],
        })
    }

    const { mutate, isPending } = usePost({ onSuccess })
    const { mutate: patch, isPending: isPatching } = usePatch({ onSuccess })

    const form = useForm<User>({
        defaultValues: store,
    })

    function handleSubmit(values: User) {
        if (values.password == "" || !values.password) {
            delete values.password
        }
        if (store?.id) {
            patch(USERS + `/${store?.id}`, values)
        } else {
            mutate(USERS, values)
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
        >
            <FormInput
                methods={form}
                name="first_name"
                required
                label="Firstname"
            />

            <FormInput methods={form} name="last_name" label="Familiya" />

            <FormInput methods={form} name="username" label="Username" />

            <FormInput methods={form} name="password" label="Password" />

            <SelectField
                label="Rol"
                methods={form}
                name="role"
                options={roles}
                required
            />

            <FormAction loading={isPending || isPatching} />
        </form>
    )
}
