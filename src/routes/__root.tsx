import {
    Link,
    Outlet,
    ScrollRestoration,
    createRootRouteWithContext,
} from "@tanstack/react-router"
// import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MainContextType } from "@/providers/main-provider"
import { ModalProvider } from "@/providers/modal-provider"
import type { QueryClient } from "@tanstack/react-query"

export const Route = createRootRouteWithContext<
    { queryClient: QueryClient } & Partial<MainContextType>
>()({
    component: Root,
    notFoundComponent: () => {
        return (
            <main className="grid place-items-center h-screen w-full bg-primary-foreground">
                <div className="shadow rounded-md p-4 flex flex-col gap-2">
                    <Link to="/">
                        <Button>Back to home page</Button>
                    </Link>
                    <Badge
                        variant={"destructive"}
                        className="text-center justify-center"
                    >
                        Not found
                    </Badge>
                    <Link to="/login">
                        <Button>Back to login page</Button>
                    </Link>
                </div>
            </main>
        )
    },
})

function Root() {
    return (
        <>
            <ModalProvider>
                <ScrollRestoration getKey={(location) => location.pathname} />
                <Outlet />
            </ModalProvider>
            {/* <TanStackRouterDevtools /> */}
        </>
    )
}
