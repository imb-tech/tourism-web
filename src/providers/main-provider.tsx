import { createContext, FC, ReactNode, useContext, useState } from "react"

type State = {
    permissions: Partial<TPermissions>
}

const useMain = () => {
    const [state, setState] = useState<State>({
        permissions: [],
    })

    return { ...state, setState }
}

export type MainContextType = ReturnType<typeof useMain>

// Create the context
const MainContext = createContext<MainContextType | undefined>(undefined)

export const MainProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const value = useMain()

    return <MainContext.Provider value={value}>{children}</MainContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMainContext = () => {
    const context = useContext(MainContext)
    if (!context) {
        throw new Error("useModalContext must be used within a ModalProvider")
    }
    return context
}
