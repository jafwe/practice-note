import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface FadeInProps {
  children?: ReactNode
  className?: string
}

// Example: While In View + Fade In

export function FadeIn({ children, className, ...props }: FadeInProps) {
  return (
    <motion.div
      initial={'hidden'}
      whileInView={'visible'}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      variants={{
        visible: { opacity: 1, translateY: 0 },
        hidden: { opacity: 0, translateY: 50 }
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
