"use client"

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ImageProps } from 'next/image';

interface PortraitProps extends React.ComponentProps<'div'> {
  fps?: number;
  images?: string[];
}
function Portrait({ className, images = [], fps = 24, ...props }: PortraitProps) {

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length < 3) {
    return;
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const animateBlink = () => {
      // 1. Augen halb schließen
      setCurrentIndex(1);
      
      timeout = setTimeout(() => {
        // 2. Augen ganz schließen
        setCurrentIndex(2);
        
        timeout = setTimeout(() => {
          // 3. Augen wieder halb öffnen
          setCurrentIndex(1);
          
          timeout = setTimeout(() => {
            // 4. Zurück zum Ausgangszustand
            setCurrentIndex(0);
            
            // Zufällige Pause bis zum nächsten Blinzeln (3-6 Sekunden)
            const nextBlink = Math.random() * 3000 + 3000;
            timeout = setTimeout(animateBlink, nextBlink);
          }, 40); // Zeit halb offen beim Aufschlag
        }, 80);   // Zeit komplett geschlossen
      }, 40);     // Zeit halb offen beim Zuschlag
    };

    // Erster Start der Animation
    timeout = setTimeout(animateBlink, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
  <div>
    <img
      src={images[currentIndex]}
      className="w-[256px]"
    />
  </div>
  );

{/* 
    <div className="relative w-[400px] h-[600px] overflow-hidden rounded-lg shadow-xl">

      <div className="hidden">
        {images.map((src) => <img key={src} src={src} alt="preload" />)}
      </div>
      
      <img
        src={images[currentIndex]}
        className="w-[256px]"
        className="w-full h-full object-cover transition-opacity duration-0"
      />
    </div>
*/}
}

export { Portrait }