"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { prefix, textRevealVariants } from '@/lib/utils'
import { ScrollHint, FadedDot } from "./ui/render"
import { GridFull } from "./ui/grid"
import { useNavStore } from '@/hooks/use-nav-store'
import { Portrait } from '@/components/portrait'
import { CanvasLoader } from "@/components/helpers/loader";

const avatars = [
  "/tech/maya.png",
  "/tech/unreal.png",
  "/tech/photoshop.png",
  "/tech/c++.png",
  "/tech/python.png",
  "/tech/java.png",
]

export function Hero() {

  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToTop = window.scrollY === 0;
      setIsAtTop(scrolledToTop);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const portraits = ["portrait0.png", "portrait1.png", "portrait2.png", "portrait3.png", "portrait4.png" ];
  const blinking = ["portrait7.png", "portrait8.png", "portrait9.png" ];
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

  const portraitY = useTransform(scrollYProgress, [0, 1], ["0px", "300px"])
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={targetRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 pointer-events-none" />

      {/* Subtle radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />

      {/* Portrait Images */}
      <motion.div 
        style={{ y: portraitY, opacity: portraitOpacity }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <Suspense fallback={<CanvasLoader />}>

          {/*
          <img src={`${prefix}/${selectedPortrait}`} className={"w-[256px]"} />
          */}

          {isAtTop ?
          <Portrait />
           : 
          <img
            src={`${prefix}/portrait/${selectedPortrait}`}
            className="w-[256px]"
          />
          }
        </Suspense>
      </motion.div>


      {/* Portrait Images Blinking 
      <Portrait
      className=""
      fps={24}
      images={blinking}
      />
      */}

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow" />
          <span className="text-sm text-zinc-400">Now in Public Beta</span>
        </motion.div>
        */}

        {/* Headline with text mask animation */}
        <h1
          className="text-5xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6"
          style={{ fontFamily: "var(--font-cal-sans), sans-serif" }}
        >
          <span className="block overflow-hidden">
            <motion.span className="block" variants={textRevealVariants} initial="hidden" animate="visible" custom={0}>
              Hi, ich bin
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-zinc-500"
              variants={textRevealVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              Valea
            </motion.span>
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Ich bin eine leidenschaftliche Künstlerin aus dem Herzen Deutschlands. Seit über 40 Jahren brennt meine Liebe zur digitalen Welt so hell wie eh und je.
        </motion.p>

        {/* CTAs 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button
            size="lg"
            className="shimmer-btn bg-white text-zinc-950 hover:bg-zinc-200 rounded-full px-8 h-12 text-base font-medium shadow-lg shadow-white/10"
          >
            Start Building
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 h-12 text-base font-medium border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white hover:border-zinc-700 bg-transparent"
          >
            View Demo
          </Button>
        </motion.div>
        */}

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center -space-x-3">
            {avatars.map((avatar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="relative"
              >
                <img
                  src={avatar || "/placeholder.svg"}
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-zinc-950 object-cover"
                />
              </motion.div>
            ))}
          </div>
          {/*
          <p className="text-sm text-zinc-500">
            Trusted by <span className="text-zinc-300 font-medium">2,000+</span> teams worldwide
          </p>
          */}
        </motion.div>
      </div>
      {/*{isAtTop && <ScrollHint />}*/}
    </section>
  )
}
