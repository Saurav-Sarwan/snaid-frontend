"use client"

import { useState ,useEffect} from "react"
import { ImageIdentification } from "./image-identification"
import { TextIdentification } from "./text-identification"
import VisualIdentification from "./visual-identification"
import { ResultsDisplay } from "./results-display"
import type { SnakeResult } from "@/lib/types"
import { AlertTriangle, Zap, Moon, Sun, Dna } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { TextResultsDisplay } from "./text-results-display"
function ThemeToggle() {
  const { theme, setTheme } = useTheme()

 

  

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed top-4 right-4 z-50 rounded-full w-9 h-9 bg-background/80 hover:bg-muted border border-border backdrop-blur shadow-sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}

export function HomePage() {
  const [result, setResult] = useState<SnakeResult | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [activeTab, setActiveTab] = useState<"image" | "text" | "visual">("image")
 const [userLocation, setUserLocation] =
  useState<{
    lat: number
    lng: number
  } | null>(null)

useEffect(() => {

  if (!navigator.geolocation) return

  navigator.geolocation.getCurrentPosition(
    (position) => {

      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }

      setUserLocation(location)

      localStorage.setItem(
        "userLocation",
        JSON.stringify(location)
      )

    },
    (error) => {
      console.error(error)
    }
  )

}, [])

  const handleIdentificationComplete = (r: SnakeResult | null) => {
    setResult(r)
    setShowResults(true)
  }

  const handleReset = () => {
    setResult(null)
    setShowResults(false)
  }

if (showResults && result) {

  // TEXT IDENTIFICATION FLOW
  if (result.snakes) {
    return (
      <>
        <ThemeToggle />

        <div className="mesh-bg min-h-screen p-6">

          <button
            onClick={handleReset}
            className="mb-6 rounded-xl bg-red-500 px-4 py-2 text-white"
          >
            Back
          </button>

          <TextResultsDisplay
            snakes={result.snakes}
          />

        </div>
      </>
    )
  }

  // OLD IMAGE IDENTIFICATION FLOW
  return (
    <>
      <ThemeToggle />
      <ResultsDisplay
        result={result}
        onReset={handleReset}
      />
    </>
  )
}

  return (
    <div className="mesh-bg min-h-screen">
      <ThemeToggle />

      <div className="w-full max-w-[88%] xl:max-w-5xl mx-auto px-4 py-10 md:py-14">

        {/* ── Header ── */}
        <div className="text-center mb-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 mb-5">
            <Zap className="h-3 w-3 text-primary" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary">
              AI-Powered Detection
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-sm">
              <Dna className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-5xl font-black tracking-tight">
              <span className="text-primary">SNA</span>
              <span className="text-foreground">ID</span>
            </h1>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            Identify any snake by photo or description — instant venom status,
            habitat data, and critical antivenom info.
          </p>
        </div>

        {/* ── Main Card ── */}
        <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden animate-fade-up-2 mb-4">
          {/* Top accent line */}
          <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

          <div className="px-6 pt-5 pb-4 border-b border-border">
            <h2 className="text-base font-bold text-foreground">Identify a Snake</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Upload a photo or describe what you saw</p>
          </div>

          <div className="px-6 pt-5">
            {/* Tab switcher */}
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-muted mb-6">
              {(["image", "text","visual"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200
                    ${activeTab === tab
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                        {
                        tab === "image"
                          ? "By Image"
                          : tab === "text"
                          ? "By Description"
                          : "By Visual"
                        }
                </button>
              ))}
            </div>

                  {activeTab === "image" && (
                    <ImageIdentification
                      onIdentificationComplete={handleIdentificationComplete}
                      userLocation={userLocation}
                    />
                  )}

                  {activeTab === "text" && (
                    <TextIdentification
                      onIdentificationComplete={handleIdentificationComplete}
                      userLocation={userLocation}
                    />
                  )}

                  {activeTab === "visual" && (
                    <VisualIdentification  
                    userLocation={userLocation}
                    />
                  )}
          </div>

          <div className="h-6" />
        </div>

        {/* ── Safety Card ── */}
        <div className="bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-200 dark:border-red-900/40 overflow-hidden animate-fade-up-3 mb-8 shadow-sm">
          <div className="px-5 py-4 border-b border-red-200 dark:border-red-900/30 flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-sm font-bold text-red-700 dark:text-red-400">Safety Information</span>
          </div>
          <div className="px-5 py-4">
            <ul className="space-y-2.5">
              {[
                "If bitten by a snake, seek immediate medical attention",
                "Keep the bitten area immobilized and below heart level",
                "Do not attempt to catch or kill the snake",
                "This tool is educational and does not replace professional medical advice",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-red-700/80 dark:text-red-300/80">
                  <span className="text-red-500 shrink-0 font-bold">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground/60 pb-4">
          Educational resource for snake identification and safety awareness
        </p>
      </div>
    </div>
  )
}