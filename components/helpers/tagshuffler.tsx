"use client"

import React from "react";
import Typewriter from "typewriter-effect";

export function TagShuffler() {

  const tags = [
    "2D/3D", "Design", "Coding", "Scripts", "Audio", 
    "Unreal Engine", "Autodesk Maya", "Modelling", "Gaming", 
    "Blender", "C++", "Java", "Python", "Batch", 
    "Photoshop", "Ableton", "Rendering", "Game Design", 
    "Texturing", "Modding", "Level Design", "Character Animation",
    "UI/UX", "Logicals"
  ];

  const shuffledTags = [...tags].sort(() => Math.random() - 0.5);
  return (
    <div className="">
      <Typewriter
        options={{
          strings: shuffledTags,
          autoStart: true,
          loop: true,
          delay: 75,
          deleteSpeed: 50,
        }}
      />
    </div>
  );
};
