// import { downloadExcel } from "@/lib/download-excel"
// import { onError } from "@/lib/onError"
// import { useGet } from "@/services/default-requests"
// import { Download } from "lucide-react"
// import { Button } from "../ui/button"

// const DownloadAsExcel = ({ url, name }: { url: string; name: string }) => {
//     const { refetch, isFetching } = useGet(url, {
//         options: { enabled: false },
//         config: { responseType: "blob" },
//     })

//     const trigger = async () => {
//         const { data, isSuccess, isError, error } = await refetch()
//         if (isSuccess) {
//             downloadExcel({ data, name })
//         }
//         if (isError) {
//             onError(error)
//         }
//     }

//     return (
//         <Button
//             variant="outline"
//             icon={<Download width={16} />}
//             loading={isFetching}
//             onClick={trigger}
//         >
//             Yuklab olish
//         </Button>
//     )
// }

// export default DownloadAsExcel

const DownloadAsExcel = (_: { url: string; name: string }) => {
    return <></>
}

export default DownloadAsExcel
