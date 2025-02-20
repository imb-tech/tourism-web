import RolesList from "./roles-list"
import UsersList from "./user-list"

export default function AdminPage() {
    return (
        <section className="flex items-start gap-3">
            <div className="w-1/2">
                <UsersList />
            </div>
            <div className="w-1/2">
                <RolesList />
            </div>
        </section>
    )
}
