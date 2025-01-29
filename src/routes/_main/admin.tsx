import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_main/admin"!</div>
}
