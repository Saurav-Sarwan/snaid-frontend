"use client"

import type React from "react"
import { useState,useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { SnakeResult } from "@/lib/types"
import { Loader2, Lightbulb, X, Search } from "lucide-react"
import { loadSnakes } from "@/lib/load-snakes"
import { SnakeData } from "@/lib/types"
interface TextIdentificationProps {
  onIdentificationComplete: (
    result: SnakeResult | null
  ) => void

  userLocation: {
    lat: number
    lng: number
  } | null
}

const EXAMPLE_DESCRIPTIONS = [
  {
    title: "Venomous Krait",
    description: "Black and white banded snake, found at night in agricultural fields, very slender body",
  },
  {
    title: "Large Constrictor",
    description: "Large brown snake with diamond patterns, very thick body, found in forests",
  },
  {
    title: "Green Tree Snake",
    description: "Small green snake with smooth scales, slender, found near water and wetlands",
  },
  {
    title: "Hooded Cobra",
    description: "Dark colored snake with distinctive hood display when threatened, medium to large size",
  },
]

export function TextIdentification({
  onIdentificationComplete,
  userLocation,
}: TextIdentificationProps) {
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
    setError("")
  }
  
  const handleIdentify = async () => {

  if (!description.trim()) return

  setLoading(true)
  setError("")

  try {

    const form = new FormData()

    form.append(
      "text",
      description.trim()
    )

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/describe-snake`,
      {
        method: "POST",
        body: form,
      }
    )

    if (!res.ok) {

      const errData = await res
        .json()
        .catch(() => ({}))

      throw new Error(
        errData.detail ||
        `Server error: ${res.status}`
      )
    }

    // Backend response
    const data = await res.json()

    // Load snakes from CSV
    const allSnakes = await loadSnakes()

    // Match backend names with CSV
const matchedSnakes: SnakeData[] =
  data.species_names
    .map((snakeName: string) =>
      allSnakes.find(
        (snake: SnakeData) =>
          snake.Name
            .toLowerCase()
            .trim() ===
          snakeName
            .toLowerCase()
            .trim()
      )
    )
    .filter(
      (
        snake: SnakeData | undefined
      ): snake is SnakeData =>
        Boolean(snake)
    )

    const finalLocation =
      userLocation ||
      JSON.parse(
        localStorage.getItem(
          "userLocation"
        ) || "null"
      )

    // Send matched snakes
    onIdentificationComplete({
      snakes: matchedSnakes,
      userLocation: finalLocation,
    })

  } catch (err) {

    setError(
      err instanceof Error
        ? err.message
        : "Failed to identify snake"
    )

  } finally {

    setLoading(false)

  }
}

  const handleExampleClick = (desc: string) => {
    setDescription(desc)
    setError("")
  }

  const handleClear = () => {
    setDescription("")
    setError("")
  }

  const isValid = description.trim().length > 10

  return (
    <div className="space-y-6">
      {/* Textarea */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-base font-semibold text-foreground">Describe the Snake</label>
          <span className="text-xs text-foreground/40 font-mono">{description.length} chars</span>
        </div>
        <Textarea
          placeholder="Describe the snake you saw — color, size, patterns, behavior, location, distinctive features..."
          value={description}
          onChange={handleDescriptionChange}
          className="min-h-40 resize-none border-primary/30 focus:border-primary font-mono text-sm"
        />
        <p className="text-xs text-foreground/40 mt-2">Minimum 10 characters required</p>
      </div>

      {/* Examples */}
      <Card className="bg-accent/5 border-accent/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-accent" />
            Example Descriptions
          </CardTitle>
          <CardDescription>Click any example to populate the field</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {EXAMPLE_DESCRIPTIONS.map((ex, i) => (
              <button
                key={i}
                onClick={() => handleExampleClick(ex.description)}
                className="text-left p-3 rounded-lg border border-accent/30 hover:bg-accent/10 hover:border-accent/60 transition-all group"
              >
                <p className="font-semibold text-sm text-foreground group-hover:text-accent transition-colors">
                  {ex.title}
                </p>
                <p className="text-xs text-foreground/55 mt-1 line-clamp-2">{ex.description}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-xl">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

            {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={handleIdentify}
          disabled={!isValid || loading}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Identifying...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Identify Snake
            </>
          )}
        </Button>

        {description && (
          <Button onClick={handleClear} variant="outline" size="lg" className="px-4">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Tips */}
      <Card className="bg-muted/40 border-muted">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground/70">
            Tips for Better Identification
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-1.5 text-sm text-foreground/60">
            {[
              "Describe color and any patterns (stripes, bands, spots)",
              "Mention size and body shape (slender, stocky, thick)",
              "Include location and habitat (forest, field, near water)",
              "Note any distinctive features (hood, markings, behavior)",
            ].map((tip, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary font-bold shrink-0">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>


    </div>
  )
}