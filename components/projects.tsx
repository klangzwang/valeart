import { motion } from "framer-motion";
import { GalleryThumbnailsIcon } from "lucide-react"

export function Projects() {
    return (
        <div className="flex flex-col gap-6">
            <p className="text-zinc-400 text-sm">
                Projects
            </p>

            <motion.div
                className="md:col-span-2 group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
            >
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <div className="p-2 rounded-lg bg-zinc-800 w-fit mb-4">
                            <GalleryThumbnailsIcon className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Unreal 5.6 - ObserverGame</h3>
                        <p className="text-zinc-400 text-sm">
                            Mein derzeit grösstes Projekt in UE5, ist das First Person Extraction Game OBSERVER. Mittlerweile sehr weit fortgeschritten.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}