"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useDeviceOrientation } from '@/hooks/use-mobile'
import { ScrollHint, FadedDot } from "./ui/render"
import { GridFull } from "./ui/grid"
import { useNavStore } from '@/hooks/use-nav-store'
import { prefix } from '@/lib/utils'

export function Hero() {

  const { isMobile, orientation } = useDeviceOrientation();
  const isLandscape = orientation === 'landscape';

  const portraits = ["portrait0.png", "portrait1.png", "portrait2.png", "portrait3.png", "portrait4.png" ];
  const [selectedPortrait, setSelectedPortrait] = useState(portraits[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * portraits.length);
    setSelectedPortrait(portraits[randomIndex]);
  }, []);

  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const portraitY = useTransform(scrollYProgress, [0, 1], ["0px", "1400px"])
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  const { isOpen, toggle, close } = useNavStore()

  return (
    <section ref={targetRef} className="relative w-full mx-auto">

      {/* Spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />
      {/* Gradient */}
      <div className="max-h bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 pt-16">

        {/* Portrait Images */}
        <motion.div 
          style={{ y: portraitY, opacity: portraitOpacity }}
          className={`flex justify-center ${isOpen ? 'pt-90' : 'pt-1'}`}
        >
          <img src={`${prefix}/${selectedPortrait}`} className={"w-[256px]"} />
        </motion.div>

        {/* FadedDot 
        <FadedDot className="h-140" text="" />
        */}

        {/* Scroll Hint 
        <ScrollHint />
        */}

        {/* Boxes 
        <Boxes />
        */}

        {/* Grid */}
        <div className="max-w-6xl mx-auto">
          <GridFull title="Hi, I’m Valea" text="a passionate artist from the heart of Germany. For over 40 years, my love for the digital world has burned as brightly as ever; this fascination is the daily fuel for my creativity. There is a unique magic in watching an idea mature over many months, pushing through countless hurdles and moments of frustration, until it finally comes to life and takes its very first breath of movement on the screen." />
          <GridFull title="Hi, I’m Valea" text="a passionate artist from the heart of Germany. For over 40 years, my love for the digital world has burned as brightly as ever; this fascination is the daily fuel for my creativity. There is a unique magic in watching an idea mature over many months, pushing through countless hurdles and moments of frustration, until it finally comes to life and takes its very first breath of movement on the screen." />
          <GridFull title="Hi, I’m Valea" text="a passionate artist from the heart of Germany. For over 40 years, my love for the digital world has burned as brightly as ever; this fascination is the daily fuel for my creativity. There is a unique magic in watching an idea mature over many months, pushing through countless hurdles and moments of frustration, until it finally comes to life and takes its very first breath of movement on the screen." />
          <GridFull title="Hi, I’m Valea" text="a passionate artist from the heart of Germany. For over 40 years, my love for the digital world has burned as brightly as ever; this fascination is the daily fuel for my creativity. There is a unique magic in watching an idea mature over many months, pushing through countless hurdles and moments of frustration, until it finally comes to life and takes its very first breath of movement on the screen." />
          <GridFull title="Hi, I’m Valea" text="a passionate artist from the heart of Germany. For over 40 years, my love for the digital world has burned as brightly as ever; this fascination is the daily fuel for my creativity. There is a unique magic in watching an idea mature over many months, pushing through countless hurdles and moments of frustration, until it finally comes to life and takes its very first breath of movement on the screen." />
          <GridFull title="Hi, I’m Valea" text="a passionate artist from the heart of Germany. For over 40 years, my love for the digital world has burned as brightly as ever; this fascination is the daily fuel for my creativity. There is a unique magic in watching an idea mature over many months, pushing through countless hurdles and moments of frustration, until it finally comes to life and takes its very first breath of movement on the screen." />
        </div>
      
      </div>
    </section>
  )
}
