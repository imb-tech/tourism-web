import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { LOGIN } from "@/constants/api-endpoints"
import { setAccessToken, setRefreshToken } from "@/lib/set-token"
import { usePost } from "@/services/default-requests"
import { createFileRoute } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const Route = createFileRoute("/login")({
    component: Login,
})

type Form = {
    username: string
    password: string
}

function Login() {
    const { error, mutate, isError, isPending } = usePost({
        onSuccess: (data) => {
            const access = data?.access
            const refresh = data?.refresh

            if (access) {
                setAccessToken(access)
                toast.success("Successfully")
            }
            if (refresh) {
                setRefreshToken(refresh)
            }
            window.location.replace("/")
        },
    })
    const methods = useForm<Form>({})

    const onSubmit = methods.handleSubmit((vals) => {
        mutate(LOGIN, vals)
    })

    return (
        <form
            onSubmit={onSubmit}
            className="max-w-md m-auto h-screen p-4 rounded-sm flex justify-center flex-col gap-4"
        >
            <FormInput
                methods={methods}
                name="username"
                label="Login"
                required
                autoComplete="on"
            />
            <FormInput
                methods={methods}
                name="password"
                type="password"
                label="Parol"
                required
                autoComplete="on"
            />
            <Button type="submit" loading={isPending}>
                Kirish
            </Button>

            {isError && (
                <p className="text-destructive text-center">
                    {error?.response?.data?.detail}
                </p>
            )}
        </form>
    )
}
