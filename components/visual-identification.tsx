"use client"

import { useEffect, useState } from "react"
import { SnakeGallery } from "./snake-gallery"
import { SnakeDetails } from "./snake-details"

import { loadSnakes } from "@/lib/load-snakes"
import { SnakeData } from "@/lib/types"
import { filterSnakes } from "@/lib/filter-snakes"

import { FeatureFilters } from "./feature-filters"
interface VisualIdentificationProps {
  userLocation: {
    lat: number
    lng: number
  } | null
}

function getDisplayLabel(color: string) {

  const normalized =
    color.toLowerCase()

  if (normalized.includes("green"))
    return "Green"

  if (normalized.includes("black"))
    return "Black"

  if (normalized.includes("brown"))
    return "Brown"

  if (normalized.includes("gray"))
    return "Gray"

  if (normalized.includes("grey"))
    return "Gray"

  if (normalized.includes("red"))
    return "Red"

  if (normalized.includes("yellow"))
    return "Yellow"

  if (normalized.includes("olive"))
    return "Olive"

  if (normalized.includes("orange"))
    return "Orange"

  if (normalized.includes("purple"))
    return "Purple"

  if (normalized.includes("gold"))
    return "Golden"

  if (normalized.includes("bronze"))
    return "Bronze"

  if (normalized.includes("cream"))
    return "Cream"

  if (normalized.includes("silver"))
    return "Silver"

  return color
}
export default function VisualIdentification({
  userLocation,
}: VisualIdentificationProps) {

  // Snake Database
  const [snakes, setSnakes] = useState<SnakeData[]>([])

  // Loading + Error
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // User Location
  const [userState, setUserState] = useState("")
 

  // Filters
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedHabitat, setSelectedHabitat] = useState("")
  const [selectedBodyShape, setSelectedBodyShape] = useState("")
  const [selectedHeadShape, setSelectedHeadShape] = useState("")

  // Pagination
  const [visibleCount, setVisibleCount] = useState(5)

  const [selectedSnake, setSelectedSnake] =
  useState<SnakeData | null>(null)

  // Load CSV
  useEffect(() => {

    async function fetchSnakes() {

      try {

        const data = await loadSnakes()
        setSnakes(data)

      } catch (err) {

        console.error(err)
        setError("Failed to load snake database")

      } finally {

        setLoading(false)

      }
    }

    fetchSnakes()

  }, [])



  // Reset Pagination on Filter Change
  useEffect(() => {

    setVisibleCount(5)

  }, [
    selectedColor,
    selectedHabitat,
    selectedBodyShape,
    selectedHeadShape,
  ])

  useEffect(() => {

  async function fetchUserState() {

    if (!userLocation) return

    try {

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLocation.lat}&lon=${userLocation.lng}`
      )

      const data = await response.json()

      

      const detectedState =
        data.address?.state ||
        data.address?.region ||
        ""

      setUserState(detectedState)

    } catch (error) {

      console.error(
        "Failed to fetch user state:",
        error
      )

    }
  }

  fetchUserState()

}, [userLocation])

  // Has Filters
  const hasSelectedFilters =
    selectedColor ||
    selectedHabitat ||
    selectedBodyShape ||
    selectedHeadShape

  // Filter + Rank Snakes
  const finalSnakes = filterSnakes({
    snakes,
    userState,
    selectedColor,
    selectedHabitat,
    selectedBodyShape,
    selectedHeadShape,
  })

  // Unique Options
 const uniqueColors = Array.from(
  new Map(

    snakes
      .filter((snake) => snake.Color)
      .map((snake) => {

        const original =
          snake.Color.trim()

        const display =
          getDisplayLabel(original)

        return [
          display,
          display,
        ]

      })

  ).values()
).sort()
const formatHabitatLabel = (
  value: string
) => {

  return value
    .replace(
      /([a-z])([A-Z])/g,
      "$1 $2"
    )
    .replace(/_/g, " ")
    .trim()
}
const uniqueHabitats = Array.from(
  new Set(

    snakes.flatMap((snake) =>

      snake.Habitat
        ?.split(/[;,]/)
        .map((habitat) =>
          formatHabitatLabel(
            habitat.trim()
          )
        ) || []

    )

  )
).sort()


const normalizeBodyShape = (
  value: string
) => {

  const normalized =
    value.toLowerCase().trim()

  if (
    normalized.includes("slender") ||
    normalized.includes("slim") ||
    normalized.includes("lean") ||
    normalized.includes("thin")
  ) {
    return "Slender"
  }

  if (
    normalized.includes("compact") ||
    normalized.includes("short") ||
    normalized.includes("stubby")
  ) {
    return "Compact"
  }

  if (
    normalized.includes("elongated") ||
    normalized.includes("lengthy")
  ) {
    return "Elongated"
  }

  if (
    normalized.includes("threadlike") ||
    normalized.includes("whiplike") ||
    normalized.includes("needlelike") ||
    normalized.includes("hairlike")
  ) {
    return "Threadlike"
  }

  if (
    normalized.includes("robust") ||
    normalized.includes("stout") ||
    normalized.includes("bulky") ||
    normalized.includes("massive") ||
    normalized.includes("heavy")
  ) {
    return "Robust"
  }

  if (
    normalized.includes("flexible")
  ) {
    return "Flexible"
  }

  if (
    normalized.includes("cylindrical")
  ) {
    return "Cylindrical"
  }

  if (
    normalized.includes("flattened") ||
    normalized.includes("compressed")
  ) {
    return "Flattened"
  }

  if (
    normalized.includes("streamlined") ||
    normalized.includes("aquatic")
  ) {
    return "Streamlined"
  }

  return value.trim()
}

const uniqueBodyShapes = Array.from(
  new Set(

    snakes.map((snake) =>
      normalizeBodyShape(
        snake["Body Shape"] || ""
      )
    )

  )
)
.sort()
.filter(Boolean)


const uniqueHeadShapes = Array.from(
  new Set(
    snakes
      .map((snake) =>
        snake["Head Shape"]?.trim()
      )
      .filter(Boolean)
  )
).sort()
  // Loading UI
  if (loading ) {
    return (
      <div className="py-20 text-center text-lg font-medium text-green-800">
        Loading snake database...
      </div>
    )
  }

  // Error UI
  if (error) {
    return (
      <div className="py-20 text-center text-red-600">
        {error}
      </div>
    )
  }

  return (

    <div className="space-y-8">

      {/* Header */}
      <div className="space-y-2">

        <h2 className="text-3xl font-bold text-green-900">
          Visual Snake Identification
        </h2>

        <p className="text-sm text-gray-500">
          Select visible snake features to narrow down the most probable species.
        </p>

        {userState && (
          <div className="text-sm font-medium text-emerald-700">
            Showing snakes commonly found in {userState}
          </div>
        )}

        <div className="text-sm font-semibold text-green-700">
          {finalSnakes.length} probable snakes found
        </div>

      </div>

      {/* Filters */}
      <FeatureFilters
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}

        selectedHabitat={selectedHabitat}
        setSelectedHabitat={setSelectedHabitat}

        selectedBodyShape={selectedBodyShape}
        setSelectedBodyShape={setSelectedBodyShape}

        selectedHeadShape={selectedHeadShape}
        setSelectedHeadShape={setSelectedHeadShape}

        uniqueColors={uniqueColors}
        uniqueHabitats={uniqueHabitats}
        uniqueBodyShapes={uniqueBodyShapes}
        uniqueHeadShapes={uniqueHeadShapes}
      />

      {/* Snake Gallery */}
        <SnakeGallery
        snakes={finalSnakes}
        visibleCount={visibleCount}
        setVisibleCount={setVisibleCount}
        hasSelectedFilters={!!hasSelectedFilters}
        setSelectedSnake={setSelectedSnake}
        />

        
       

    </div>
  )
}