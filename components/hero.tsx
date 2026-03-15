"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { prefix } from '@/lib/utils';
import { AArrowDown } from "lucide-react"
import Typewriter from "typewriter-effect";
import { useIsMobile } from '@/hooks/use-mobile'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function TagShuffler() {

  const tags = [
    "2D/3D", "Design", "Coding", "Scripts", "Audio", 
    "Unreal Engine", "Autodesk Maya", "Modelling", "Gaming", 
    "Blender", "C++", "Java", "Python", "Batch", 
    "Photoshop", "Ableton", "Rendering", "Game Design", 
    "Texturing", "Modding", "Level Design", "Character Animation",
    "UI/UX", "Logicals"
  ];

  const shuffledTags = [...tags].sort(() => Math.random() - 0.5);

  return (
    <div className={`absolute inset-0 top-30 max-w-7xl mx-auto flex flex-row items-start gap-5`}>
      <div className="mt-2 text-white-100" style={{ fontFamily: "var(--font-montserrat)" }}>
        <Typewriter
          options={{
            strings: shuffledTags,
            autoStart: true,
            loop: true,
            delay: 75,
            deleteSpeed: 50,
            pauseFor: 2000,
          }}
        />
      </div>
    </div>
  );
}

function AboutBox() {

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="gap-4"
        >
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
          >
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
                <AArrowDown className="w-5 h-5 text-zinc-200" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Hi, I’m Valea</h3>
              <div className="text-zinc-400 text-sm">
                <div className="mt-4 text-secondary text-[17px] max-w-3xl leading-7.5 whitespace-pre-line">
                  a passionate artist from the heart of Germany. For over 40 years, my love for the digital world has burned as brightly as ever; this fascination is the daily fuel for my creativity. There is a unique magic in watching an idea mature over many months, pushing through countless hurdles and moments of frustration, until it finally comes to life and takes its very first breath of movement on the screen.
                </div>
              </div>
            </div>
          </div>

          <TagShuffler />
          {/*
          <div className="grid grid-cols-4 gap-4">
            {[
              { metric: "CPU", value: 72 },
              { metric: "Memory", value: 85 },
              { metric: "Network", value: 64 },
              { metric: "Storage", value: 91 },
            ].map(({ metric, value }) => (
              <div key={metric} className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{value}%</div>
                <div className="text-xs text-zinc-500">{metric}</div>
              </div>
            ))}
          </div>
          */}
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export function HeroMobile({ portrait }: { portrait: string }) {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const portraitY = useTransform(scrollYProgress, [0, 1], ["0px", "400px"])
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <section 
      ref={targetRef} 
      className="relative min-h-[150vh] flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 pointer-events-none" />
      <div className="absolute left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-zinc-600/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        style={{ y: portraitY, opacity: portraitOpacity }}
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
      >
        <img src={`${prefix}/${portrait}`} className={"scale-50 -translate-y-25"} alt="Portrait" />
      </motion.div>

      <div className="relative z-10 mt-50">
        <AboutBox />
      </div>
      
      <div className="relative z-10 w-full mt-20">
      </div>
      
    </section>
  )
}

export function HeroDesktop({ portrait }: { portrait: string }) {

  return (
    <>
    </>
  )

  {/*
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute pointer-events-none">
        <img src={`${prefix}/portrait.svg`} className={isMobile ? "scale-40" : "scale-50 translate-x-1/2"} alt="Portrait" />
      </div>

      <div className="absolute pointer-events-none">
        <AboutBox />
      </div>

    </section>
  )

  return (
    <section className="flex items-center justify-center">
      <div className="absolute pointer-events-none">
        <img src={`${prefix}/${portrait}`} className="scale-50 translate-y-75" alt="Portrait" />
      </div>      
    </section>
  )
  */}
}

export function Hero() {
  const isMobile = useIsMobile()
  const portraits = ["portrait0.png", "portrait1.png", "portrait2.png", "portrait3.png", "portrait4.png" ];
  const [selectedPortrait, setSelectedPortrait] = useState(portraits[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * portraits.length);
    setSelectedPortrait(portraits[randomIndex]);
  }, []);

  return isMobile 
    ? <HeroMobile portrait={selectedPortrait} /> 
    : <HeroDesktop portrait={selectedPortrait} />;
}
