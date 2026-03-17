import { SmoothScroll } from "@/components/ui/smooth-scroll"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { Boxes } from "@/components/boxes"
import { Files } from "@/components/files"
import { Shoutit } from "@/components/shoutit"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-zinc-950">
        <Navbar />
        <Hero />
        <Marquee />
        <Boxes />
        <Files />
        <Shoutit />
        <Footer />
      </main>
    </SmoothScroll>
  )
}

// import ObjectCanvas from "@/components/render/objects"
{/* <ObjectCanvas modelPath="./Objects/Cube.gltf" scale={2.5} />*/}
