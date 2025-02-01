import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import AddButton from "@/components/shared/add-button"
import UserCard from "@/components/shared/user-card"
import { useModal } from "@/hooks/use-modal"
import { useParams } from "@tanstack/react-router"
import { UserRoundPlus } from "lucide-react"
import PackDetailHeader from "../pack-detail/pack-detail-header"
import CreateUserForm from "./create-user-form"

export default function Users() {
    const { pack } = useParams({ from: "/_main/packs/$pack/$id" })
    const { openModal } = useModal()

    return (
        <section className="p-2">
            <PackDetailHeader title="Turistlar" backUrl={`/packs/${pack}`} />
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                <AddButton
                    label="Turist qo'shish"
                    icon={UserRoundPlus}
                    onClick={openModal}
                />
                <UserCard
                    id="1234"
                    full_name="Alisher Xaydarov"
                    phone="998931231177"
                    image="https://s3-alpha-sig.figma.com/img/b36b/91e5/765577b2a6865e02c589fe3c9b620772?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nfBgksw7rb-2ly64anXB0vEB9XiP55di5vI~sd8SytvGIEIeJAOuVLxK-GAfmjcSYH2ios6~FqoAnhMYZxZWrAT1CYgbu3nO2LbEFyz7RjxCwoQs2XogppJuqoG2S95MW0qb3qhc08-gN4xFO7YvEazsv2Ky8iG-IVKsAtUBYtdxNACX41BpjeZeqoTET7Kb31EhGbWlT4UxMMutTfqhqqECXWhUpNG6iOSfARjBDuT2mh6UqWulB5WHbb2qFgtSGbNZxqVEbVGTpRg38nMEUEjqpsZ1O43BdV2Vf6ElNtThC07urKNe7ruxczj3QxBPZ2fPhoukr-FD32zFYvvoig__"
                    passpord_serial="AD0180697"
                />
                <UserCard
                    id="1234"
                    full_name="Alisher Xaydarov"
                    phone="998931231177"
                    image="https://s3-alpha-sig.figma.com/img/b36b/91e5/765577b2a6865e02c589fe3c9b620772?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nfBgksw7rb-2ly64anXB0vEB9XiP55di5vI~sd8SytvGIEIeJAOuVLxK-GAfmjcSYH2ios6~FqoAnhMYZxZWrAT1CYgbu3nO2LbEFyz7RjxCwoQs2XogppJuqoG2S95MW0qb3qhc08-gN4xFO7YvEazsv2Ky8iG-IVKsAtUBYtdxNACX41BpjeZeqoTET7Kb31EhGbWlT4UxMMutTfqhqqECXWhUpNG6iOSfARjBDuT2mh6UqWulB5WHbb2qFgtSGbNZxqVEbVGTpRg38nMEUEjqpsZ1O43BdV2Vf6ElNtThC07urKNe7ruxczj3QxBPZ2fPhoukr-FD32zFYvvoig__"
                    passpord_serial="AD0180697"
                />
                <UserCard
                    id="1234"
                    full_name="Alisher Xaydarov"
                    phone="998931231177"
                    image="https://s3-alpha-sig.figma.com/img/b36b/91e5/765577b2a6865e02c589fe3c9b620772?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nfBgksw7rb-2ly64anXB0vEB9XiP55di5vI~sd8SytvGIEIeJAOuVLxK-GAfmjcSYH2ios6~FqoAnhMYZxZWrAT1CYgbu3nO2LbEFyz7RjxCwoQs2XogppJuqoG2S95MW0qb3qhc08-gN4xFO7YvEazsv2Ky8iG-IVKsAtUBYtdxNACX41BpjeZeqoTET7Kb31EhGbWlT4UxMMutTfqhqqECXWhUpNG6iOSfARjBDuT2mh6UqWulB5WHbb2qFgtSGbNZxqVEbVGTpRg38nMEUEjqpsZ1O43BdV2Vf6ElNtThC07urKNe7ruxczj3QxBPZ2fPhoukr-FD32zFYvvoig__"
                    passpord_serial="AD0180697"
                />
                <UserCard
                    id="1234"
                    full_name="Alisher Xaydarov"
                    phone="998931231177"
                    image="https://s3-alpha-sig.figma.com/img/b36b/91e5/765577b2a6865e02c589fe3c9b620772?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nfBgksw7rb-2ly64anXB0vEB9XiP55di5vI~sd8SytvGIEIeJAOuVLxK-GAfmjcSYH2ios6~FqoAnhMYZxZWrAT1CYgbu3nO2LbEFyz7RjxCwoQs2XogppJuqoG2S95MW0qb3qhc08-gN4xFO7YvEazsv2Ky8iG-IVKsAtUBYtdxNACX41BpjeZeqoTET7Kb31EhGbWlT4UxMMutTfqhqqECXWhUpNG6iOSfARjBDuT2mh6UqWulB5WHbb2qFgtSGbNZxqVEbVGTpRg38nMEUEjqpsZ1O43BdV2Vf6ElNtThC07urKNe7ruxczj3QxBPZ2fPhoukr-FD32zFYvvoig__"
                    passpord_serial="AD0180697"
                />
            </div>

            <DeleteModal path="" id={1} />

            <Modal title="Turist qo'shish" className="max-w-xl">
                <CreateUserForm />
            </Modal>
        </section>
    )
}
