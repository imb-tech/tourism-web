import {
    Clock4,
    DollarSign,
    HandCoins,
    LayoutDashboard,
    Plane,
    Settings,
    UserCog,
} from "lucide-react"

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import usePermissions from "@/hooks/use-permissions"
import { Link } from "@tanstack/react-router"

export function NavMain() {
    const { setOpenMobile } = useSidebar()
    const permissions = usePermissions()

    const links = [
        {
            to: "/",
            icon: <LayoutDashboard />,
            title: "Home",
            enabled: permissions?.dashboard_korish,
        },
        {
            to: "/packs",
            icon: <Plane />,
            title: "Tur paketlar",
            enabled: permissions?.tur_paketlar_faqat_korish,
        },
        {
            to: "/bank",
            icon: <DollarSign />,
            title: "Kassa",
            enabled:
                permissions?.kassa_bank_korish ||
                permissions?.kassa_naqd_korish,
        },
        {
            to: "/cost",
            icon: <HandCoins />,
            title: "Real xarajat",
            enabled: permissions?.real_xarajatlar_korish,
        },
        {
            to: "/changes",
            icon: <Clock4 />,
            title: "O'zgarishlar",
            enabled: permissions?.ozgarishlar_korish,
        },
        {
            to: "/admin",
            icon: <UserCog />,
            title: "Admin",
            enabled: permissions?.admin_korish,
        },
        {
            to: "/settings",
            icon: <Settings />,
            title: "Sozlamalar",
            enabled: permissions?.sozlamalar_korish,
        },
    ].filter((link) => link.enabled) // Faqat ruxsat berilganlarni qoldiramiz

    return (
        <SidebarGroup>
            <SidebarMenu>
                <Link
                    to="/"
                    className="rounded-lg mb-8"
                    onClick={() => {
                        setOpenMobile(false)
                    }}
                >
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-3xl text-primary font-extrabold gap-0">
                            T<span>ravel</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </Link>
                {links.map(
                    ({ enabled, title, ...item }) =>
                        enabled && (
                            <Link
                                {...item}
                                key={item.to}
                                activeProps={{
                                    className:
                                        "[&_button]:bg-primary hover:[&_button]:bg-primary hover:[&_button]:text-primary-foreground [&_button]:text-white text-primary-foreground",
                                }}
                                className="rounded-lg"
                                onClick={() => {
                                    setOpenMobile(false)
                                }}
                            >
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        tooltip={title}
                                        className="text-black/60"
                                    >
                                        {item.icon}
                                        <span>{title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </Link>
                        ),
                )}
            </SidebarMenu>
        </SidebarGroup>
    )
}
