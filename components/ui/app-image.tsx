"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"
import { Image as ImageIcon } from "lucide-react"

interface AppImageProps extends Omit<ImageProps, "src" | "width" | "height"> {
  src: string | null | undefined
  fallbackClassName?: string
  // Allow explicit width/height if needed, but prefer className sizing
  width?: number
  height?: number
}

export function AppImage({ src, alt, className, fallbackClassName, width, height, ...props }: AppImageProps) {
  const [error, setError] = useState(false)
  const [imgSrc, setImgSrc] = useState<string | null>(src || null)

  useEffect(() => {
    setImgSrc(src || null)
    setError(false)
  }, [src])

  const hasFixedDimensions = width && height

  if (!imgSrc || error) {
    return (
      <div
        className={`bg-slate-100 flex items-center justify-center overflow-hidden ${className} ${fallbackClassName || ""}`}
        aria-label={alt || "Image placeholder"}
        style={hasFixedDimensions ? { width, height } : undefined}
      >
        <div className="flex flex-col items-center gap-2 text-slate-300">
          <ImageIcon size={32} />
        </div>
      </div>
    )
  }

  // If fixed dimensions are provided, use them directly with NextImage
  if (hasFixedDimensions) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className}`}
        onError={() => setError(true)}
        unoptimized={true} // Safe default for dynamic URLs
        {...props}
      />
    )
  }

  // Otherwise, default to 'fill' strategy which relies on parent container sizing (via className)
  // This requires the wrapper to have 'relative' and dimensions.
  // The 'className' passed in likely contains the dimensions (w-full h-96 etc).
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className="object-cover" // Ensure it covers the container
        onError={() => setError(true)}
        unoptimized={true} // Safe default for dynamic URLs
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
      />
    </div>
  )
}
