"use client";

import Image from "next/image";
import { useState } from "react";
import { asset } from "@/lib/asset";

/** Photo variants are optimized before the static export; CMS uploads still work. */
export function ProductImage({ src, alt, priority = false, sizes = "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" }: { src: string; alt: string; priority?: boolean; sizes?: string }) {
  const [failedSrc, setFailedSrc] = useState("");
  const localPhoto = src.startsWith("/images/photos/") && src.endsWith(".webp");
  if (failedSrc === src) return <div className="photo-fallback" role="img" aria-label={alt}><span>Foto indisponível</span></div>;
  if (localPhoto) return (
    <picture>
      <source type="image/webp" srcSet={[480, 800, 1400].map((width) => `${asset(src.replace(".webp", `-${width}.webp`))} ${width}w`).join(", ")} sizes={sizes} />
      {/* Static hosting has no image optimization server. */}
      <img src={asset(src)} alt={alt} width={1400} height={1050} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" onError={() => setFailedSrc(src)} />
    </picture>
  );
  return <Image src={asset(src)} alt={alt} width={800} height={600} sizes={sizes} loading={priority ? "eager" : "lazy"} onError={() => setFailedSrc(src)} />;
}
