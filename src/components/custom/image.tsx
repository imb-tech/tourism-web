import placeHolderImg from "@/assets/images/placeholder.avif"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function Image({
    fill,
    isZoomed,
    imgClassName,
    wrapperClassName,
    src,
    ...props
}: thisProps & React.ImgHTMLAttributes<HTMLImageElement>) {
    const [loading, setLoading] = useState(true)
    return (
        <div className={cn("relative w-max h-max", wrapperClassName)}>
            {fill ?
                <div
                    className={`w-[${props.width}px] h-[${props.height}px] relative overflow-hidden`}
                    style={{ width: props.width, height: props.height }}
                >
                    <img
                        loading="lazy"
                        alt={"image"}
                        onLoad={() => setLoading(false)}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null // prevents looping
                            currentTarget.src = placeHolderImg
                        }}
                        className={cn(
                            `object-contain duration-300 ease-in-out group-hover:opacity-75 w-full h-full
                            ${
                                loading ?
                                    "scale-110 blur-2xl grayscale-0"
                                :   "scale-100 blur-0 grayscale-0"
                            }`,
                            isZoomed &&
                                "hover:scale-125 duration-300 [transition-timing-function:cubic-bezier(0.33,1,0.68,1)]",
                            imgClassName,
                        )}
                        src={src || placeHolderImg}
                        {...props}
                    />
                </div>
            :   <img
                    loading="lazy"
                    alt={"image"}
                    onLoad={() => setLoading(false)}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null // prevents looping
                        currentTarget.src = placeHolderImg
                    }}
                    className={cn(
                        `object-contain duration-700 ease-in-out group-hover:opacity-75 
                        ${
                            loading ?
                                "scale-110 blur-2xl grayscale-0"
                            :   "scale-100 blur-0 grayscale-0"
                        }`,
                        isZoomed &&
                            "hover:scale-125 duration-300 [transition-timing-function:cubic-bezier(0.33,1,0.68,1)]",
                        imgClassName,
                    )}
                    src={src || placeHolderImg}
                    {...props}
                />
            }
        </div>
    )
}

interface thisProps {
    fill?: boolean
    isZoomed?: boolean
    imgClassName?: string
    wrapperClassName?: string
}
