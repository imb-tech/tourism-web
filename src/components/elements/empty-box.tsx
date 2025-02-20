"use client"

import React, { memo } from "react"

interface EmptyBoxProps {
    message?: string
    count?: number
}

const EmptyBox: React.FC<EmptyBoxProps> = ({
    message = "Ma'lumot topilmadi",
    count,
}) => {
    return Number(count) < 1 ?
            <div className="p-20 flex items-center justify-center bg-background col-span-full rounded-sm">
                <p>{message}</p>
            </div>
        :   ""
}

export default memo(EmptyBox)
