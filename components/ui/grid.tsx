"use client"

import * as React from 'react'
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Palette } from "lucide-react"
import { cn } from '@/lib/utils'

interface GridFullProps extends React.ComponentProps<'div'> {
  title?: string;
  text?: string;
}
function GridFull({ className, title, text, ...props }: GridFullProps) {

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div data-slot="gridfull" className={cn('pb-4', className)}
        {...props}
    >
      <motion.div
      className="md:col-span-2 group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
                <Palette className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-zinc-400 text-sm">
              {text}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export { GridFull }