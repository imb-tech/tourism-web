import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/changes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_main/changes"!</div>
}
