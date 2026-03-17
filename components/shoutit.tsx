"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";

type Shout = Database['public']['Tables']['shoutbox']['Row'];

function Shoutit() {

    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const [shouts, setShouts] = useState<Shout[]>([]);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    // 1. Funktion zum Laden der Daten
    const fetchShouts = async () => {
        const { data, error } = await supabase
        .from('shoutbox')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50); // Performance-Optimierung

        if (data) setShouts(data);
        if (error) console.error("Error fetching shouts:", error.message);
    };

    useEffect(() => {
        fetchShouts();

        // 2. Realtime Subscription einrichten
        const channel = supabase
        .channel('schema-db-changes')
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'shoutbox' },
            (payload) => {
            setShouts((prev) => [payload.new as Shout, ...prev]);
            }
        )
        .subscribe();

        return () => {
        supabase.removeChannel(channel);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !username.trim() || loading) return;

        setLoading(true);
        const { error } = await supabase
        .from('shoutbox')
        .insert([{ 
            message: message.trim(),
            username: username.trim() 
        }]);

        if (error) {
        // Hier fangen wir die SQL-Exception ab
        if (error.code === 'P0001') { // P0001 ist der Code für RAISE EXCEPTION
            alert(error.message); 
        } else {
            console.error("Datenbankfehler:", error.message);
        }
        } else {
        setMessage('');
        }
        setLoading(false);
    };

    return (
        <section id="shoutbox" className="py-24 px-4">
            <div className="max-w-100 mx-auto">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
                >
                <h2
                    className="text-3xl sm:text-4xl font-bold text-white mb-4"
                    style={{ fontFamily: "var(--font-instrument-sans)" }}
                >
                    Shoutbox
                </h2>
                <p className="text-zinc-400 max-w-2xl mx-auto">
                    Hinterlasst mir doch eine Art Gaestebucheintrag.
                </p>
                </motion.div>

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-1 gap-6"
                >
                    <motion.div
                        key="NONE"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 1.3 * 0.1 }}
                        className="relative p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] bg-zinc-900/50 border-zinc-800 hover:border-zinc-600"
                        >

                        {/* 
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-zinc-950 text-xs font-medium rounded-full">
                            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">

                            </div>
                        </div>
                        */}

                        <div className="text-foreground h-32 w-full min-w-0 rounded-md border bg-gray-600 px-3 py-1 text-base shadow-xs">
                            {shouts.map((shout) => (
                            <div key={shout.id} className="border-l-4 border-b-cyan-500 p-3 bg-cyan-100 rounded-r-md shadow-sm">
                                <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-blue-700 text-sm">{shout.username}</span>
                                <span className="text-[11px] text-gray-900">
                                    {new Date(shout.created_at).toLocaleString()}
                                </span>
                                </div>
                                <p className="text-gray-700 break-words">{shout.message}</p>
                            </div>
                            ))}
                        </div>

                        <div className="mb-6">

                            <p className="text-zinc-400 text-sm py-4">Keine Angst, es ist ganz einfach. Ohne anmelden, ohne Email. Name rein, Nachricht tippen, fertig!</p>
                            <form onSubmit={handleSubmit} className="space-y-3 mb-8">
                                <Input
                                    type="text"
                                    placeholder="Dein Name"
                                    className="bg-white text-black"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />

                                <Input
                                    type="text"
                                    placeholder="Deine Nachricht..."
                                    className="flex flex-grow bg-white text-black gap-2"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />

                                <Button
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full rounded-full bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
                                >
                                    {loading ? '...' : 'Senden'}
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export { Shoutit }