import { SmoothScroll } from "@/components/smooth-scroll"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"

// import ObjectCanvas from "@/components/render/objects"

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-zinc-950">
        <Navbar />
        {/* <ObjectCanvas modelPath="./Objects/Cube.gltf" scale={2.5} /> */}
        <Hero />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
