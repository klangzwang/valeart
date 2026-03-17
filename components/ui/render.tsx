"use client"

import * as React from 'react'
import { motion } from "framer-motion"
import { cn } from '@/lib/utils'

function ScrollHint({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="scrollhint" className={cn('', className)}
      {...props}
    >
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </div>
  );
}

interface FadedDotProps extends React.ComponentProps<'div'> {
  text?: string;
}
function FadedDot({ className, text, ...props }: FadedDotProps) {
  return (
    <div className="max-w mx-auto flex items-start">

      <div className="flex flex-col justify-center items-center mt-5">
        <div className="w-3 h-3 rounded-full bg-secondary" />
        <div data-slot="fadeddot" className={cn('w-1 gray-gradient', className)}
          {...props}
        />
      </div>

      <h1 className="text-white font-black text-[24px] ml-2 mt-5">
        {text}
      </h1>

    </div>
  );
}

export { ScrollHint, FadedDot }