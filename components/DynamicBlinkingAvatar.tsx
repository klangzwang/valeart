"use client";

import React, { useState, useEffect, useRef } from 'react';

const IMG_BASE_PATH = '/portrait/';
const blinkSequence = [
  'portrait7.png', // Index 0: Standard (wird dynamisch ersetzt)
  'portrait8.png', // Index 1: Halb geschlossen
  'portrait9.png', // Index 2: Ganz geschlossen
];
const expressionVariations = [
  'portrait7.png', // Der Standard-Ausdruck
  'portrait1.png', // Ein leichtes Lächeln
  'portrait2.png', // Erstaunter Blick
  'portrait3.png', // Ein subtiles Zwinkern
];

const CHANGE_CHANCE = 0.6; // 60% Chance auf Änderung

function DynamicBlinkingAvatar() {
  // blinkState: 0 = offen, 1 = halb zu, 2 = ganz zu
  const [blinkState, setBlinkState] = useState(0);
  const [currentExpression, setCurrentExpression] = useState(expressionVariations[0]);
  
  // Ref für den Pool der noch nicht gezeigten Bilder (verhindert Dopplungen)
  const unusedPool = useRef<string[]>([...expressionVariations]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Hilfsfunktion: Wählt ein Bild, das nicht dem aktuellen entspricht und noch nicht im Pool war
  const getNextUniqueExpression = (current: string) => {
    // 1. Filtere das aktuelle Bild aus dem Pool, falls es drin ist
    let available = unusedPool.current.filter(img => img !== current);

    // 2. Wenn der Pool leer ist, fülle ihn neu (ohne das aktuelle Bild)
    if (available.length === 0) {
      available = expressionVariations.filter(img => img !== current);
    }

    // 3. Zufälliges Bild aus den verfügbaren wählen
    const randomIndex = Math.floor(Math.random() * available.length);
    const nextImg = available[randomIndex];

    // 4. Den Pool für die nächsten Runden aktualisieren (das gewählte Bild entfernen)
    unusedPool.current = available.filter(img => img !== nextImg);
    
    return nextImg;
  };

  useEffect(() => {
    // Vorladen aller Bilder beim ersten Start (Pre-Caching)
    const allImages = [...blinkSequence.slice(1), ...expressionVariations];
    allImages.forEach((file) => {
      const img = new Image();
      img.src = `${IMG_BASE_PATH}${file}`;
    });

    const animate = () => {
      // Schritt 1: Augen halb zu
      setBlinkState(1);

      timeoutRef.current = setTimeout(() => {
        // Schritt 2: Augen ganz zu
        setBlinkState(2);

        // --- HIER: Ausdruck im Hintergrund wechseln ---
        // Während die Augen zu sind, wählen wir ein neues, einzigartiges Bild
        setCurrentExpression(prev => getNextUniqueExpression(prev));

        timeoutRef.current = setTimeout(() => {
          // Schritt 3: Augen wieder halb auf
          setBlinkState(1);

          timeoutRef.current = setTimeout(() => {
            // Schritt 4: Augen wieder ganz offen
            setBlinkState(0);

            // Zufällige Pause bis zum nächsten Blinzeln (3 bis 6 Sekunden)
            const nextPause = Math.random() * 3000 + 3000;
            timeoutRef.current = setTimeout(animate, nextPause);
          }, 50); // Dauer halb offen
        }, 90);   // Dauer ganz geschlossen (Zeitfenster für den Bildwechsel)
      }, 50);     // Dauer halb geschlossen
    };

    // Erster Start-Timer
    timeoutRef.current = setTimeout(animate, 2000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Bestimme den finalen Bildpfad für das Rendering
  const displayImage = blinkState === 0 
    ? `${IMG_BASE_PATH}${currentExpression}` 
    : `${IMG_BASE_PATH}${blinkSequence[blinkState]}`;

  return (
  <div>
    <img
      src={displayImage}
      className="w-[256px]"
    />
  </div>
  );
};

export { DynamicBlinkingAvatar };