"use client"

import { useRef, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Shout = Database['public']['Tables']['shoutbox']['Row'];

function ShoutBox({ className, ...props }: React.ComponentProps<'div'>) {
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
    <div className={cn('w-full max-w-md mx-auto', className)} {...props}>
      <form onSubmit={handleSubmit} className="space-y-3 mb-8">
        <Input
          type="text"
          placeholder="Dein Name"
          className="bg-white text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Deine Nachricht..."
            className="flex-grow bg-white text-black"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {loading ? '...' : 'Senden'}
          </Button>
        </div>
      </form>
    
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {shouts.map((shout) => (
          <div key={shout.id} className="border-l-4 border-green-500 p-3 bg-gray-50 rounded-r-md shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-blue-700 text-sm">{shout.username}</span>
              <span className="text-[10px] text-gray-400">
                {new Date(shout.created_at).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-700 break-words">{shout.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { ShoutBox }