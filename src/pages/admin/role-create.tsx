import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ACTIONS, MODULES, ROLES } from "@/constants/api-endpoints"
import { useGet, usePatch, usePost } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

type Props = {
    id?: number
}

const RoleCreate = ({ id }: Props) => {
    const { data: parentItems } = useGet<Permission[]>(MODULES)
    const { data: childItems } = useGet<Permission[]>(ACTIONS)

    const { data: roleData } = useGet<RoleDetail>(ROLES + `/${id}`, {
        options: {
            enabled: !!id,
            refetchOnMount: true,
        },
    })

    const queryClient = useQueryClient()

    function onSuccess() {
        queryClient.refetchQueries({
            queryKey: [ROLES],
        })
        navigate({
            to: "/admin",
        })
    }

    const { mutate, isPending } = usePost({ onSuccess })
    const { mutate: patch, isPending: isPatching } = usePatch({ onSuccess })

    const navigate = useNavigate()

    const form = useForm<Role>()

    const [selectedPermissions, setSelectedPermissions] =
        useState<RolePermissions>({})

    const handleCheckboxChange = (
        permission: Permission,
        isChecked: boolean,
    ) => {
        setSelectedPermissions((prev) => {
            const updatedPermissions = { ...prev, [permission.code]: isChecked }

            if (!permission.module_id) {
                delete updatedPermissions[permission.code]
                childItems?.forEach((child) => {
                    if (child.module_id === permission.id) {
                        updatedPermissions[child.code] = isChecked
                    }
                })
            }

            return updatedPermissions
        })
    }

    function handleSave() {
        const roles = []
        for (const [roleKey, roleValue] of Object.entries(
            selectedPermissions,
        )) {
            if (roleValue) {
                roles.push(childItems?.find((el) => el.code == roleKey)?.id)
            }
        }

        return roles
    }

    function checkSelected(parentId: number): boolean {
        const childrens = childItems?.filter(
            (child) => child.module_id === parentId,
        )

        if (!childrens?.length) {
            return false
        }

        return childrens.every((el) => selectedPermissions[el.code])
    }

    const handleSubmit = ({ name }: Role) => {
        const data = {
            name,
            actions: handleSave(),
        }
        if (id) {
            patch(ROLES + `/${id}`, data)
        } else mutate(ROLES, data)
    }

    useEffect(() => {
        if (roleData) {
            form.setValue("name", roleData.name)
            setSelectedPermissions(roleData.actions)
        }
    }, [roleData])

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormInput
                label="Role name"
                methods={form}
                name="name"
                wrapperClassName="mb-4"
            />
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {parentItems?.map((parent) => (
                    <div
                        key={parent.id}
                        className="bg-background p-3 rounded-md"
                    >
                        <label className="flex items-center gap-2 cursor-pointer">
                            <Checkbox
                                checked={checkSelected(parent.id)}
                                onCheckedChange={(v: boolean) =>
                                    handleCheckboxChange(parent, v)
                                }
                            />
                            <span className="text-lg font-semibold">
                                {parent.name}
                            </span>
                        </label>
                        <ul className="pl-4 mt-2">
                            {childItems
                                ?.filter(
                                    (child) => child.module_id === parent.id,
                                )
                                .map((child) => (
                                    <li key={child.id}>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <Checkbox
                                                checked={
                                                    !!selectedPermissions[
                                                        child.code
                                                    ]
                                                }
                                                onCheckedChange={(v: boolean) =>
                                                    handleCheckboxChange(
                                                        child,
                                                        v,
                                                    )
                                                }
                                            />
                                            <span>{child.name}</span>
                                        </label>
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="flex gap-3">
                <Button
                    className="mt-3"
                    onClick={() => navigate({ to: "/admin" })}
                    variant={"outline"}
                    disabled={isPending || isPatching}
                >
                    Orqaga
                </Button>
                <Button
                    className="mt-3"
                    type="submit"
                    loading={isPending || isPatching}
                >
                    Saqlash
                </Button>
            </div>
        </form>
    )
}

export default RoleCreate
