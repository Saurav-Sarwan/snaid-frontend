"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import type { SnakeResult } from "@/lib/types"
import { AlertCircle, ArrowLeft, Shield, Zap, MapPin, Microscope, Activity, Dna } from "lucide-react"
import { HospitalFinder } from "./hospital-finder"

interface ResultsDisplayProps {
  result: SnakeResult
  onReset: () => void
}

export function ResultsDisplay({ result, onReset }: ResultsDisplayProps) {
  const [barWidth, setBarWidth] = useState(0)

  const venomStatus =
  result["Venomous status"] || result.venom_status

const isVenomous = venomStatus === "Venomous"

const isDangerous =
  result["Danger Level"] === "High" ||
  venomStatus === "Venomous"

const confidenceValue =
  result["Identification Confidence"] || result.confidence || "0%"

const confidence = parseFloat(
  confidenceValue.replace("%", "")
)
  const hasAntivenom =
    result["Recommended Antivenom"] &&
    result["Recommended Antivenom"] !== "None" &&
    result["Recommended Antivenom"] !== "Not Available" &&
    result["Recommended Antivenom"] !== "Not applicable"

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(Math.min(confidence, 100)), 150)
    return () => clearTimeout(t)
  }, [confidence])

  const confidenceGradient =
    confidence >= 80 ? "from-emerald-500 to-green-400"
    : confidence >= 60 ? "from-yellow-500 to-amber-400"
    : "from-red-500 to-orange-400"

  return (
    <div className="mesh-bg min-h-screen">
      <div className="w-full max-w-[88%] xl:max-w-5xl mx-auto px-4 py-10">

        <Button
          variant="ghost"
          onClick={onReset}
          className="mb-6 gap-2 pl-0 text-foreground/70 hover:text-foreground hover:bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Identification
        </Button>

        {/* ── Species Card ── */}
        <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden mb-4 animate-fade-up">
          {/* Top bar */}
          <div className={`h-1.5 w-full ${isDangerous
            ? "bg-gradient-to-r from-red-500 via-orange-400 to-red-500"
            : "bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500"
          }`} />

          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-md bg-primary/15 border border-primary/20 flex items-center justify-center">
                    <Dna className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
                    Identified Species
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold italic text-primary leading-tight">
                  {result["Predicted Species"] || result.species}
                </h1>
              </div>
              <span className={`shrink-0 mt-1 text-xs px-4 py-1.5 rounded-full font-bold border
                ${isVenomous
                  ? "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 border-red-300 dark:border-red-500/40"
                  : "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40"
                }`}>
                {result["Venomous status"] || result.venom_status}
              </span>
            </div>

            {/* Confidence */}
            <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 mb-6 animate-fade-up-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                    Identification Confidence
                  </span>
                </div>
                <span className="text-2xl font-black font-mono tabular-nums text-blue-700 dark:text-blue-300">
                  {result["Identification Confidence"] || result.confidence}
                </span>
              </div>
              <div className="w-full bg-blue-200 dark:bg-blue-900/60 rounded-full h-3 overflow-hidden">
                <div
                  className={`bg-gradient-to-r ${confidenceGradient} h-3 rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
              <div className="flex justify-between mt-1 px-0.5">
                {[0, 25, 50, 75, 100].map(v => (
                  <span key={v} className="text-[10px] text-blue-400/70 font-mono">{v}%</span>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="mb-5 animate-fade-up-2">
              <div className="flex items-center gap-2 mb-2.5">
                <Microscope className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-foreground">About This Species</span>
              </div>
              <p className="text-sm text-foreground/70 dark:text-foreground/65 leading-relaxed">
                {result["About This Snake"] || result.about}
              </p>
            </div>

            {/* Habitat */}
            <div className="bg-muted/60 dark:bg-muted/30 border border-border rounded-xl p-4 animate-fade-up-3">
              <div className="flex items-center gap-2 mb-1.5">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Habitat &amp; Distribution
                </span>
              </div>
              <p className="text-sm text-foreground/70">{result["Habitat & Distribution"] || result.habitat}</p>
            </div>
          </div>
        </div>

        {/* ── Medical Card ── */}
        <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden mb-4 animate-fade-up-2">
          <div className={`h-1.5 w-full ${isDangerous
            ? "bg-gradient-to-r from-red-500 via-orange-400 to-red-500"
            : "bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500"
          }`} />

          <div className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <AlertCircle className={`h-4 w-4 ${isDangerous ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`} />
              <span className={`text-base font-bold ${isDangerous ? "text-red-700 dark:text-red-400" : "text-emerald-700 dark:text-emerald-400"}`}>
                Danger Level &amp; Medical Information
              </span>
            </div>

            {/* Danger badge */}
            <div className="flex items-center gap-3 mb-5">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm border
                ${isDangerous
                  ? "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 border-red-300 dark:border-red-500/40 animate-danger-pulse"
                  : "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40"
                }`}>
               {isVenomous ? "HIGH RISK" : "LOW RISK"}
              </span>
              {isDangerous && (
                <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                  Seek medical attention immediately if bitten
                </span>
              )}
            </div>

            {/* Antivenom */}
            <div className={`rounded-xl p-5 mb-5 border
              ${hasAntivenom
                ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/50"
                : "bg-muted/50 border-border"
              }`}>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                  ${hasAntivenom
                    ? "bg-emerald-200 dark:bg-emerald-500/30"
                    : "bg-muted"
                  }`}>
                  <Shield className={`h-4 w-4 ${hasAntivenom ? "text-emerald-700 dark:text-emerald-400" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">
                    Recommended Antivenom
                  </p>
                  <p className={`text-sm font-bold leading-snug
                    ${hasAntivenom
                      ? "text-emerald-800 dark:text-emerald-300"
                      : "text-muted-foreground"
                    }`}>
                    {result["Recommended Antivenom"] || result.antivenom}
                  </p>
                  {hasAntivenom && (
                    <p className="text-xs text-emerald-600/80 dark:text-emerald-400/60 mt-1">
                      Inform emergency staff of this species name
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Emergency steps */}
            <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 rounded-xl p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-red-700 dark:text-red-400">
                  If Bitten — Emergency Response
                </span>
              </div>
              <ol className="space-y-2">
                {[
                  "Call emergency services immediately",
                  "Keep the bitten area immobilized and below heart level",
                  "Remove jewelry or tight clothing near the bite",
                  "Do not catch, kill, or handle the snake",
                  "Do not apply tourniquets, ice, or cut the wound",
                  `Tell medical staff: species is "${result["Predicted Species"]}"`,
                  "Antivenom may be required — every second counts",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-red-800 dark:text-red-300/90 text-sm">
                    <span className="font-black text-red-500 dark:text-red-400 shrink-0 font-mono">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Prevention */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-xl p-5">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 block mb-3">
                Prevention &amp; Safety
              </span>
              <ul className="space-y-2">
                {[
                  "Wear boots and long pants in snake-prone areas",
                  "Watch where you step and place your hands",
                  "Avoid handling snakes unless trained",
                  "Be extra cautious during warm months",
                ].map((tip, i) => (
                  <li key={i} className="flex gap-2 text-amber-800 dark:text-amber-300/80 text-sm">
                    <span className="font-bold shrink-0">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Hospital Finder Card ── */}
        <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden mb-4 animate-fade-up-3">
          <div className="h-1.5 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          <div className="p-6">
            <HospitalFinder 
            userLocation={result.userLocation ?? null}
            />
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground/50 mb-6">
          For educational purposes only. Always consult healthcare professionals in emergencies.
        </p>

        <div className="flex justify-center pb-8">
          <Button
            onClick={onReset}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-sm"
            size="lg"
          >
            <ArrowLeft className="h-4 w-4" />
            Identify Another Snake
          </Button>
        </div>
      </div>
    </div>
  )
}
