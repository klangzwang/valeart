"use client"

import React from "react"
import { ShoutBox } from "@/components/shoutbox"

export function Boxes() {

  return (
    <section className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 gap-4">
        <ShoutBox className="group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300 overflow-hidden" />
      </div>
    </section>
  )
}
