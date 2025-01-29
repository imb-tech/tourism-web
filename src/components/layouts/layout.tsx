import { cn } from "@/lib/utils"

type Props = { children: React.ReactNode; className?: string }

export default function Layout({ children, className }: Props) {
    return <main className={cn(`p-4`, className)}>{children}</main>
}
