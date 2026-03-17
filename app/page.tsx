import { SmoothScroll } from "@/components/ui/smooth-scroll"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <Hero />
      <Footer />
    </SmoothScroll>
  )
}

// import ObjectCanvas from "@/components/render/objects"
{/* <ObjectCanvas modelPath="./Objects/Cube.gltf" scale={2.5} /> */}
