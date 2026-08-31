"use client"
import { useState } from "react"
const displayColorMap: Record<string, string> = {
  red: "bg-red-500",
  green: "bg-green-500",
  brown: "bg-amber-700",
  olive: "bg-lime-700",
  black: "bg-black",
  yellow: "bg-yellow-400",
  gray: "bg-gray-400",
  grey: "bg-gray-400",
  silver: "bg-gray-300",
  orange: "bg-orange-500",
  golden: "bg-yellow-500",
  bronze: "bg-amber-600",
  cream: "bg-yellow-100",
  tan: "bg-yellow-700",
  sandy: "bg-yellow-600",
  pink: "bg-pink-400",
  purple: "bg-purple-500",
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
  lime: "bg-lime-500",
  crimson: "bg-red-700",
  coral: "bg-rose-400",
}
function getBodyShapeIcon(
  shape: string
) {

  const value =
    shape.toLowerCase()

  if (
    value.includes("slender")
  ) return "🪱"

  if (
    value.includes("robust")
  ) return "🐍"

  if (
    value.includes("threadlike")
  ) return "🧵"

  if (
    value.includes("elongated")
  ) return "📏"

  if (
    value.includes("compact")
  ) return "📦"

  if (
    value.includes("flattened")
  ) return "🪵"

  if (
    value.includes("streamlined")
  ) return "🌊"

  if (
    value.includes("cylindrical")
  ) return "🥖"

  if (
    value.includes("flexible")
  ) return "➰"

  return "📍"
}
function getColorClass(color: string) {

  const normalized =
    color.toLowerCase()

  for (const key in displayColorMap) {

    if (normalized.includes(key)) {
      return displayColorMap[key]
    }
  }

  return "bg-gray-300"
}

function getHabitatIcon(
  habitat: string
) {

  const value =
    habitat.toLowerCase()

  if (
    value.includes("forest")
  ) return "🌲"

  if (
    value.includes("wetland") ||
    value.includes("swamp") ||
    value.includes("marsh")
  ) return "🌊"

  if (
    value.includes("desert")
  ) return "🏜️"

  if (
    value.includes("grass")
  ) return "🌾"

  if (
    value.includes("mountain") ||
    value.includes("hill")
  ) return "⛰️"

  if (
    value.includes("river") ||
    value.includes("stream") ||
    value.includes("lake")
  ) return "💧"

  if (
    value.includes("coast") ||
    value.includes("reef") ||
    value.includes("sea")
  ) return "🌊"

  if (
    value.includes("bamboo")
  ) return "🎋"

  if (
    value.includes("tree") ||
    value.includes("canopy")
  ) return "🌳"

  return "📍"
}
function getDisplayLabel(color: string) {

  const normalized =
    color.toLowerCase()

  if (normalized.includes("brown"))
    return "Brown"

  if (normalized.includes("green"))
    return "Green"

  if (normalized.includes("black"))
    return "Black"

  if (normalized.includes("gray"))
    return "Gray"

  if (normalized.includes("grey"))
    return "Gray"

  if (normalized.includes("olive"))
    return "Olive"

  if (normalized.includes("yellow"))
    return "Yellow"

  if (normalized.includes("red"))
    return "Red"

  if (normalized.includes("orange"))
    return "Orange"

  if (normalized.includes("gold"))
    return "Golden"

  if (normalized.includes("bronze"))
    return "Bronze"

  if (normalized.includes("purple"))
    return "Purple"

  if (normalized.includes("pink"))
    return "Pink"

  return color
}


function normalizeColor(color: string) {

  const normalized =
    color.toLowerCase()

  if (normalized.includes("brown"))
    return "Brown"

  if (normalized.includes("green"))
    return "Green"

  if (normalized.includes("black"))
    return "Black"

  if (normalized.includes("gray"))
    return "Gray"

  if (normalized.includes("grey"))
    return "Gray"

  if (normalized.includes("olive"))
    return "Olive"

  if (normalized.includes("yellow"))
    return "Yellow"

  if (normalized.includes("red"))
    return "Red"

  if (normalized.includes("orange"))
    return "Orange"

  if (normalized.includes("gold"))
    return "Golden"

  if (normalized.includes("bronze"))
    return "Bronze"

  if (normalized.includes("purple"))
    return "Purple"

  if (normalized.includes("pink"))
    return "Pink"

  return "Other"
}
function getHeadShapeIcon(
  shape: string
) {

  const value =
    shape.toLowerCase()

  // Cobra-like
  if (
    value.includes("hooded")
  ) return "🐍"

  // Viper-like
  if (
    value.includes("triangular") ||
    value.includes("angular")
  ) return "🔻"

  // Rounded/Oval
  if (
    value.includes("rounded") ||
    value.includes("oval")
  ) return "🟢"

  // Narrow / pointed
  if (
    value.includes("narrow") ||
    value.includes("pointed") ||
    value.includes("tapered")
  ) return "🗡️"

  // Flattened
  if (
    value.includes("flattened")
  ) return "🪨"

  // Long snout
  if (
    value.includes("elongated") ||
    value.includes("long")
  ) return "📏"

  // Blunt
  if (
    value.includes("blunt")
  ) return "🟫"

  // Horned
  if (
    value.includes("horn")
  ) return "🦏"

  // Leaf shaped
  if (
    value.includes("leaf")
  ) return "🍃"

  // Beaked
  if (
    value.includes("beaked")
  ) return "🦅"

  // Broad headed
  if (
    value.includes("broad")
  ) return "⬛"

  return "🐾"
}
interface FeatureFiltersProps {
  selectedColor: string
  setSelectedColor: (value: string) => void

  selectedHabitat: string
  setSelectedHabitat: (value: string) => void

  selectedBodyShape: string
  setSelectedBodyShape: (value: string) => void

  selectedHeadShape: string
  setSelectedHeadShape: (value: string) => void

  uniqueColors: string[]
  uniqueHabitats: string[]
  uniqueBodyShapes: string[]
  uniqueHeadShapes: string[]
}

export function FeatureFilters({
  selectedColor,
  setSelectedColor,

  selectedHabitat,
  setSelectedHabitat,

  selectedBodyShape,
  setSelectedBodyShape,

  selectedHeadShape,
  setSelectedHeadShape,

  uniqueColors,
  uniqueHabitats,
  uniqueBodyShapes,
  uniqueHeadShapes,
}: FeatureFiltersProps) {

  const [showColorDropdown, setShowColorDropdown] =
  useState(false)
 const [showHabitatDropdown, setShowHabitatDropdown] =
  useState(false)
  const resetFilters = () => {
    setSelectedColor("")
    setSelectedHabitat("")
    setSelectedBodyShape("")
    setSelectedHeadShape("")
  }

  return (
    <div className="space-y-5">

      {/* Heading */}
      <div className="flex items-center justify-between">

        <div>
          <h3 className="text-lg font-semibold text-green-900">
            Visual Filters
          </h3>

          <p className="text-sm text-gray-500">
            Select visible snake characteristics
          </p>
        </div>

        <button
          onClick={resetFilters}
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
        >
          Reset Filters
        </button>

      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">


{/* Color Dropdown */}
<div className="relative">

  <label className="mb-2 block text-sm font-medium text-green-900">
    Color
  </label>

  <button
    type="button"
    onClick={() =>
      setShowColorDropdown(
        !showColorDropdown
      )
    }
    className="flex h-11 w-full items-center justify-between rounded-xl border border-green-200 bg-white px-4 text-left text-sm shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
  >

 <div className="flex items-center gap-3">

  {selectedColor ? (

    <span
      className={`h-4 w-4 rounded-full ${getColorClass(
        selectedColor
      )}`}
    />

  ) : (

    <span>
      🎨
    </span>

  )}

  <span>
    {selectedColor || "All Colors"}
  </span>

</div>

    <span>⌄</span>

  </button>

  {showColorDropdown && (

    <div className="absolute z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-green-200 bg-white p-2 shadow-xl">

      <button
        type="button"
        onClick={() => {
          setSelectedColor("")
          setShowColorDropdown(false)
        }}
        className="mb-1 w-full rounded-xl px-3 py-2 text-left hover:bg-green-50"
      >
        <span>🎨</span>
       <span> All Colors</span>
      </button>

      {uniqueColors.map((color) => (

        <button
          key={color}
          type="button"
          onClick={() => {
            setSelectedColor(color)
            setShowColorDropdown(false)
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 hover:bg-green-50"
        >

          <span
            className={`h-4 w-4 rounded-full ${getColorClass(
              color
            )}`}
          />

          <span>
            {getDisplayLabel(color)}
          </span>

        </button>

      ))}

    </div>

  )}

</div>

        {/* Habitat */}
<div className="relative">

  <label className="mb-2 block text-sm font-medium text-green-900">
    Habitat
  </label>

  <button
    type="button"
    onClick={() =>
      setShowHabitatDropdown(
        !showHabitatDropdown
      )
    }
    className="flex h-11 w-full items-center justify-between rounded-xl border border-green-200 bg-white px-4 text-left text-sm shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
  >

    <div className="flex items-center gap-3">

      <span>
        {selectedHabitat
          ? getHabitatIcon(
              selectedHabitat
            )
          : "🌍"}
      </span>

      <span>
        {selectedHabitat ||
          "All Habitats"}
      </span>

    </div>

    <span>⌄</span>

  </button>

  {showHabitatDropdown && (

    <div className="absolute z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-green-200 bg-white p-2 shadow-xl">

      <button
        type="button"
        onClick={() => {
          setSelectedHabitat("")
          setShowHabitatDropdown(false)
        }}
        className="mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-green-50"
      >
        <span>🌍</span>
        <span>All Habitats</span>
      </button>

      {uniqueHabitats.map((habitat) => (

        <button
          key={habitat}
          type="button"
          onClick={() => {
            setSelectedHabitat(
              habitat
            )
            setShowHabitatDropdown(false)
          }}
          className="flex h-11 w-full items-center justify-between rounded-xl border border-green-200 bg-white px-4 text-left text-sm shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
        >

          <span>
            {getHabitatIcon(
              habitat
            )}
          </span>

          <span>
            {habitat}
          </span>

        </button>

      ))}

    </div>

  )}

</div>

        {/* Body Shape */}
        <div className="space-y-2">

          <label className="text-sm font-medium text-green-900">
            Body Shape
          </label>

          <select
            value={selectedBodyShape}
            onChange={(e) => setSelectedBodyShape(e.target.value)}
            className="h-11 w-full rounded-xl border border-green-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          >
           <option value="">
  🐍 All Body Shapes
</option>

{uniqueBodyShapes.map((shape) => (
  <option
    key={shape}
    value={shape}
  >
    {getBodyShapeIcon(shape)} {shape}
  </option>
))}
          </select>

        </div>

        {/* Head Shape */}
        <div className="space-y-2">

          <label className="text-sm font-medium text-green-900">
            Head Shape
          </label>

          <select
            value={selectedHeadShape}
            onChange={(e) => setSelectedHeadShape(e.target.value)}
            className="h-11 w-full rounded-xl border border-green-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          >
<option value="">
  🐍 All Head Shapes
</option>

{uniqueHeadShapes.map((shape) => (
  <option
    key={shape}
    value={shape}
  >
    {getHeadShapeIcon(shape)} {shape}
  </option>
))}
          </select>

        </div>

      </div>

    </div>
  )
}