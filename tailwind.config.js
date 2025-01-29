/** @type {import('tailwindcss').Config} */
import fluid, { extract, fontSize, screens } from "fluid-tailwind"
import tailwindcssAnimate from "tailwindcss-animate"

export const darkMode = ["class"]
export const content = {
    files: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    extract,
}
export const theme = {
    extend: {
        borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
        },
        colors: {
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            card: {
                DEFAULT: "hsl(var(--card))",
                foreground: "hsl(var(--card-foreground))",
            },
            popover: {
                DEFAULT: "hsl(var(--popover))",
                foreground: "hsl(var(--popover-foreground))",
            },
            primary: {
                DEFAULT: "hsl(var(--primary))",
                foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
                DEFAULT: "hsl(var(--secondary))",
                foreground: "hsl(var(--secondary-foreground))",
            },
            muted: {
                DEFAULT: "hsl(var(--muted))",
                foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
                DEFAULT: "hsl(var(--accent))",
                foreground: "hsl(var(--accent-foreground))",
            },
            destructive: {
                DEFAULT: "hsl(var(--destructive))",
                foreground: "hsl(var(--destructive-foreground))",
            },
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            chart: {
                1: "hsl(var(--chart-1))",
                2: "hsl(var(--chart-2))",
                3: "hsl(var(--chart-3))",
                4: "hsl(var(--chart-4))",
                5: "hsl(var(--chart-5))",
            },
            success: {
                DEFAULT: "hsl(var(--success))",
                foreground: "hsl(var(--success-foreground))",
            },
            warning: {
                DEFAULT: "hsl(var(--warning))",
                foreground: "hsl(var(--warning-foreground))",
            },
            info: {
                DEFAULT: "hsl(var(--info))",
                foreground: "hsl(var(--info-foreground))",
            },

            sidebar: {
                DEFAULT: "hsl(var(--sidebar-background))",
                foreground: "hsl(var(--sidebar-foreground))",
                primary: "hsl(var(--sidebar-primary))",
                "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
                accent: "hsl(var(--sidebar-accent))",
                "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
                border: "hsl(var(--sidebar-border))",
                ring: "hsl(var(--sidebar-ring))",
            },
        },
        screens: {
            xs: "30rem",
            ...screens,
        },
        fontSize,
        keyframes: {
            "accordion-down": {
                from: {
                    height: "0",
                },
                to: {
                    height: "var(--radix-accordion-content-height)",
                },
            },
            "accordion-up": {
                from: {
                    height: "var(--radix-accordion-content-height)",
                },
                to: {
                    height: "0",
                },
            },
        },
        animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
        },
        transitionTimingFunction: {
            "out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        },
    },
}
export const plugins = [
    tailwindcssAnimate,
    fluid,
    function ({ addUtilities }) {
        addUtilities({
            ".no-spinner": {
                "&::-webkit-outer-spin-button": {
                    "-webkit-appearance": "none",
                    margin: "0",
                },
                "&::-webkit-inner-spin-button": {
                    "-webkit-appearance": "none",
                    margin: "0",
                },
                '&[type="number"]': {
                    "-moz-appearance": "textfield",
                },
            },
        })
    },
]
