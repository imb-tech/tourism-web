import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/cost')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_main/cost"!</div>
}
