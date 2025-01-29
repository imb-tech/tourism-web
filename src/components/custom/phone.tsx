import {
    usePhoneInput,
    type UsePhoneInputConfig,
} from "react-international-phone"
import { ClassNameValue } from "tailwind-merge"

export default function Phone({
    className,
    ...props
}: {
    className?: ClassNameValue
} & UsePhoneInputConfig) {
    const { phone, inputValue } = usePhoneInput({
        ...props,
    })

    return (
        <a
            onClick={(e) => e.stopPropagation()}
            href={`tel:${phone}`}
            className={`text-blue-400 ${className}`}
        >
            {inputValue}
        </a>
    )
}
