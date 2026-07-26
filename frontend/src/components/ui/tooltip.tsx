import * as React from "react"
import { cn } from "../../lib/utils"

type TooltipProps = {
  content: string
  children: React.ReactElement
  side?: "top" | "bottom" | "left" | "right"
}

function Tooltip({ content, children, side = "top" }: TooltipProps) {
  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }

  return (
    <div className="group relative inline-flex">
      {children}
      <div
        className={cn(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-lg border border-border",
          "opacity-0 transition-opacity group-hover:opacity-100",
          sideClasses[side]
        )}
      >
        {content}
      </div>
    </div>
  )
}

export { Tooltip }
