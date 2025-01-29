import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/packs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_main/packs"!</div>
}
