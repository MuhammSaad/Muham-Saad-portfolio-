"use client";

import { useEffect, useState } from "react";

export default function Model360Viewer({
  frames,
  alt,
}: {
  frames: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (frames.length <= 1) return;

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % frames.length);
    }, 110);

    return () => window.clearInterval(interval);
  }, [frames.length]);

  if (frames.length === 0) {
    return null;
  }

  return (
    <div className="relative h-full w-full bg-bg">
      <img src={frames[index]} alt={alt} className="h-full w-full object-cover" />
      <div className="font-mono-eng pointer-events-none absolute bottom-3 right-3 rounded-full bg-bg/70 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-cyan backdrop-blur">
        360 view
      </div>
    </div>
  );
}