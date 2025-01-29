import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/bank')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_main/bank"!</div>
}
