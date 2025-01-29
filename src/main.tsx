import { Suspense } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

import { QueryClientProvider } from "@tanstack/react-query"
import App from "./app"
import { Toaster } from "./components/ui/sonner"
import Spinner from "./components/ui/spinner"
import { queryClient } from "./lib/query-client"
import { MainProvider } from "./providers/main-provider"
import { setupAxiosInterceptors } from "./services/axios-instance"

// Setup axios interceptors with queryClient
setupAxiosInterceptors(queryClient)

// Render the app
const rootElement = document.getElementById("app")!
if (!rootElement.innerHTML) {
    const root = createRoot(rootElement)
    root.render(
        // <StrictMode>
        <Suspense fallback={<Spinner />}>
            <QueryClientProvider client={queryClient}>
                <MainProvider>
                    <App />
                </MainProvider>
                <Toaster />
            </QueryClientProvider>
        </Suspense>,
        // </StrictMode>,
    )
}
