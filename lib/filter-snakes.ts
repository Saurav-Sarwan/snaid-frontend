import { SnakeData } from "./types"

interface FilterParams {
  snakes: SnakeData[]

  userState: string

  selectedColor: string
  selectedHabitat: string
  selectedBodyShape: string
  selectedHeadShape: string
}
const normalizeBodyShape = (
  value?: string
) => {

  const normalized =
    value?.toLowerCase().trim() || ""

  if (
  
  normalized.includes("slender") ||
  normalized.includes("slim") ||
  normalized.includes("lean") ||
  normalized.includes("thin")
)
{
    return "slender"
  }

  if (
    normalized.includes("compact") ||
    normalized.includes("short") ||
    normalized.includes("stubby")
  ) {
    return "compact"
  }

  if (
    normalized.includes("elongated") ||
    normalized.includes("lengthy")
  ) {
    return "elongated"
  }

  if (
    normalized.includes("threadlike") ||
    normalized.includes("whiplike") ||
    normalized.includes("needlelike") ||
    normalized.includes("hairlike")
  ) {
    return "threadlike"
  }

  if (
    normalized.includes("robust") ||
    normalized.includes("stout") ||
    normalized.includes("bulky") ||
    normalized.includes("massive") ||
    normalized.includes("heavy")
  ) {
    return "robust"
  }

  if (
    normalized.includes("flexible")
  ) {
    return "flexible"
  }

  if (
    normalized.includes("cylindrical")
  ) {
    return "cylindrical"
  }

  if (
    normalized.includes("flattened") ||
    normalized.includes("compressed")
  ) {
    return "flattened"
  }

  if (
    normalized.includes("streamlined") ||
    normalized.includes("aquatic")
  ) {
    return "streamlined"
  }

  return normalized
}
export function filterSnakes({
  snakes,
  userState,
  selectedColor,
  selectedHabitat,
  selectedBodyShape,
  selectedHeadShape,
}: FilterParams) {

  // Normalize helper
  const normalize = (value?: string) =>
    value?.toLowerCase().trim() || ""

  // Check if user selected any filters
  const hasSelectedFilters =
    selectedColor ||
    selectedHabitat ||
    selectedBodyShape ||
    selectedHeadShape

  // -----------------------------
  // Region Filtering
  // -----------------------------
  const regionFilteredSnakes = snakes.filter((snake) => {

    // No location yet
    if (!userState) return true

    // No region data
    if (!snake.Region) return false

    const snakeRegions = snake.Region
      .split(";")
      .map((region) => normalize(region))

    return snakeRegions.includes(
      normalize(userState)
    )
  })

  // -----------------------------
  // Score Matching
  // -----------------------------
  const scoredSnakes = regionFilteredSnakes.map((snake) => {

    let matchScore = 0

    // Color Match (Highest Weight)
if (selectedColor) {

  const snakeColors = snake.Color
    ?.split(/[;,]/) // support ; and ,
    .map((c) => normalize(c))

  if (
    snakeColors?.includes(normalize(selectedColor))
  ) {
    matchScore += 4
  }
}
    // Habitat Match
    // Habitat Match
if (selectedHabitat) {

  const snakeHabitats =
    snake.Habitat
      ?.split(/[;,]/)
      .map((habitat) =>

        normalize(

          habitat
            .replace(
              /([a-z])([A-Z])/g,
              "$1 $2"
            )
            .trim()

        )

      )

  if (
    snakeHabitats?.includes(
      normalize(selectedHabitat)
    )
  ) {
    matchScore += 3
  }
}

    // Body Shape Match
    if (
      selectedBodyShape &&
      normalizeBodyShape(
  snake["Body Shape"]
) ===
normalizeBodyShape(
  selectedBodyShape
)
    ) {
      matchScore += 2
    }

    // Head Shape Match
    if (
      selectedHeadShape &&
      normalize(snake["Head Shape"]) === normalize(selectedHeadShape)
    ) {
      matchScore += 1
    }

    return {
      ...snake,
      matchScore,
    }
  })

  // -----------------------------
  // Sort by Match Score
  // -----------------------------
  const sortedSnakes = [...scoredSnakes].sort(
    (a, b) => {

      // Higher score first
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore
      }

      // Stable alphabetical fallback
      return a.Name.localeCompare(b.Name)
    }
  )

  // -----------------------------
  // If filters selected:
  // hide 0-score snakes
  // -----------------------------
  if (hasSelectedFilters) {
    return sortedSnakes.filter(
      (snake) => snake.matchScore > 0
    )
  }

  // Otherwise show all
  return sortedSnakes
}