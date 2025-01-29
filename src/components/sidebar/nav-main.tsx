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
import { Link, linkOptions } from "@tanstack/react-router"

export function NavMain() {
    const { setOpenMobile } = useSidebar()
    const links = [
        linkOptions({
            to: "/",
            icon: <LayoutDashboard />,
            enabled: true,
            title: "Home",
        }),
        linkOptions({
            to: "/packs",
            icon: <Plane />,
            enabled: true,
            title: "Tur paketlar",
        }),
        linkOptions({
            to: "/bank",
            icon: <DollarSign />,
            enabled: true,
            title: "Kassa",
        }),
        linkOptions({
            to: "/cost",
            icon: <HandCoins />,
            enabled: true,
            title: "Real xarajat",
        }),
        linkOptions({
            to: "/changes",
            icon: <Clock4 />,
            enabled: true,
            title: "O'zgarishlar",
        }),
        linkOptions({
            to: "/admin",
            icon: <UserCog />,
            enabled: true,
            title: "Admin",
        }),
        linkOptions({
            to: "/settings",
            icon: <Settings />,
            enabled: true,
            title: "Sozlamalar",
        }),
    ]

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
