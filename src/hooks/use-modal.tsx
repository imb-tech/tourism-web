import { useModalContext } from "@/providers/modal-provider"

export const useModal = (key = "default") => {
    const { modals, openModal, closeModal } = useModalContext()

    return {
        isOpen: modals["modal" + key],
        openModal: () => openModal("modal" + key),
        closeModal: () => closeModal("modal" + key),
    }
}
