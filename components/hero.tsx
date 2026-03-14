"use client"

import React from 'react';
import { motion } from "framer-motion"
import { CubeCanvas } from "./canvas";

export function Hero() {

  const isProd = process.env.NODE_ENV === 'production';
  const prefix = isProd ? '/valeart' : '';

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">

      <div className="flex items-center justify-center">
        <img src={`${prefix}/portrait.svg`} />
      </div>

      {/* Background gradient 
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 pointer-events-none" />
      */}
      {/* Subtle radial glow 
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />
      */}

      <div className="relative z-10 max-w-5xl mx-auto text-center">

        {/*<CubeCanvas />*/}

        {/* Badge */}
        {/*
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

        {/* Subheadline */}
        {/*
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          The modern platform for teams who ship fast. Built for scale, designed for speed. Everything you need to
          build, deploy, and grow.
        </motion.p>
        */}

        {/* CTAs */}
        {/*
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
        </motion.div>
        */}

      </div>
    </section>
  )
}
