import * as React from "react"

import { cn } from "@/lib/utils"
import Spinner from "./spinner"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    isLoading?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, isLoading, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "relative rounded-lg bg-card text-card-foreground shadow p-4",
                className,
            )}
            {...props}
        >
            {isLoading && (
                <div className="w-full h-full absolute top-0 left-0 rounded-lg flex items-center justify-center z-10 bg-black/80">
                    <Spinner />
                </div>
            )}
            {children}
        </div>
    ),
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex items-center justify-between flex-wrap gap-x-4 gap-y-2 mb-3",
            className,
        )}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "text-lg md:text-xl font-semibold leading-none tracking-tight flex-1",
            className,
        )}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex items-center justify-between flex-wrap gap-x-4 gap-y-2",
            className,
        )}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
