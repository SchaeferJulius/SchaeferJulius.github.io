"use client"

import { useState, useEffect } from "react"

interface LocationTagProps {
  city?: string
  country?: string
  timezone?: string
  theme?: 'dark' | 'light'
}

export function LocationTag({ 
  city = "San Francisco", 
  country = "USA", 
  timezone = "PST",
  theme = "dark" 
}: LocationTagProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex items-center gap-2 sm:gap-3 rounded-full border px-3 sm:px-4 py-2 transition-all duration-500 ease-out hover:shadow-xl backdrop-blur-md active:scale-95 shrink-0
        ${theme === 'dark' 
          ? 'bg-zinc-900/50 border-white/5 hover:border-white/10 text-zinc-400 shadow-black/40' 
          : 'bg-white border-black/5 hover:border-black/10 text-zinc-500 shadow-sm'}`}
    >
      {/* Live pulse indicator */}
      <div className="relative flex items-center justify-center shrink-0">
        <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500" />
        </span>
      </div>

      {/* Location text */}
      <div className="flex items-center gap-2 overflow-hidden relative h-5 min-w-[45px] sm:min-w-[100px] lg:min-w-[140px]">
        <span
          className="text-xs sm:text-sm font-medium transition-all duration-500 absolute inset-0 flex items-center whitespace-nowrap"
          style={{
            transform: isHovered ? "translateY(-100%)" : "translateY(0)",
            opacity: isHovered ? 0 : 1,
          }}
        >
          <span className="hidden sm:inline">{city}, </span>{country}
        </span>

        <span
          className="text-xs sm:text-sm font-medium transition-all duration-500 absolute inset-0 flex items-center whitespace-nowrap"
          style={{
            transform: isHovered ? "translateY(0)" : "translateY(100%)",
            opacity: isHovered ? 1 : 0,
          }}
        >
          {currentTime} <span className="hidden sm:inline">{timezone}</span>
        </span>
      </div>

      {/* Arrow indicator */}
      <svg
        className="h-3 w-3 transition-all duration-300"
        style={{
          transform: isHovered ? "translateX(2px) rotate(-45deg)" : "translateX(0) rotate(0)",
          opacity: isHovered ? 1 : 0.5,
        }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
    </button>
  )
}
