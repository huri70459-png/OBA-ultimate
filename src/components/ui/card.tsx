import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Blueprint ("Customizing shadcn/ui Components: The Card Example"): variant-driven
// semantic styling on top of the Deep Intelligence tokens, with an optional
// interactive hover lift for Bento Grid tiles.

const cardVariants = cva(
  "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border-border",
        primary: "border-primary/40 bg-primary/10 text-foreground",
        secondary: "bg-secondary text-secondary-foreground border-secondary",
        ghost: "bg-transparent text-foreground border-transparent shadow-none",
      },
      interactive: {
        true: "transition-all duration-300 ease-in-out hover:shadow-md hover:border-primary/40",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      interactive: false,
    },
  },
)

const Card = ({
  className,
  variant,
  interactive,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) => {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, interactive }), className)}
      {...props}
    />
  )
}

const CardHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

const CardTitle = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

const CardDescription = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

const CardAction = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

const CardContent = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

const CardFooter = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
