"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"
import { CardTitle } from "../ui/card"

type Props = {
    links: HeaderCrumbLink[]
}

export function HeaderCrumb({ links }: Props) {
    return (
        <Breadcrumb>
            <BreadcrumbList className="h-9 flex-nowrap">
                {links.length > 1 &&
                    links.slice(0, -1).map((item, index) => (
                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink
                                asChild
                                className="max-w-20 truncate"
                            >
                                <Link href={item.to}>{item.label}</Link>
                            </BreadcrumbLink>
                            <BreadcrumbSeparator />
                        </BreadcrumbItem>
                    ))}

                {links.length > 1 && (
                    <BreadcrumbItem>
                        <BreadcrumbPage
                            className={cn(
                                "max-w-20 truncate md:max-w-none font-medium",
                            )}
                        >
                            {links.at(-1)?.label}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                )}
                {links.length === 1 && (
                    <CardTitle className="text-foreground text-xl md:text-2xl">
                        {links.at(-1)?.label}
                    </CardTitle>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
