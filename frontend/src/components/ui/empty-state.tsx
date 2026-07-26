import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

type EmptyStateProps = {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}

function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex flex-col items-center justify-center text-center py-20 px-6 rounded-2xl border-2 border-dashed border-border",
        className
      )}
    >
      <div className="w-20 h-20 rounded-2xl bg-background flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-8">{description}</p>
      {action}
    </motion.div>
  )
}

export { EmptyState }
