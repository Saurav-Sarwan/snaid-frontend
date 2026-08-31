"use client"

import { SnakeCard } from "./snake-card"
import { SnakeData } from "@/lib/types"

interface SnakeGalleryProps {

  snakes: (SnakeData & {
    matchScore?: number
  })[]

  visibleCount: number

  setVisibleCount: React.Dispatch<
    React.SetStateAction<number>
  >

  hasSelectedFilters: boolean

  setSelectedSnake: React.Dispatch<
    React.SetStateAction<SnakeData | null>
  >
}

export function SnakeGallery({
  snakes,
  visibleCount,
  setVisibleCount,
  hasSelectedFilters,
  setSelectedSnake,
}: SnakeGalleryProps) {

  return (

    <div className="space-y-6">

      {/* Empty State */}
      {snakes.length === 0 && (

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">

          <h3 className="text-lg font-bold text-amber-800">
            No Exact Match Found
          </h3>

          <p className="mt-2 text-sm text-amber-700">
            Selected features did not match any snake exactly.
            Try adjusting filters or explore nearby probable species.
          </p>

        </div>
      )}

      {/* Snake Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

        {snakes
          .slice(0, visibleCount)
          .map((snake, index) => (

            <SnakeCard
              key={index}
              snake={snake}
              hasSelectedFilters={hasSelectedFilters}
              setSelectedSnake={setSelectedSnake}
            />

          ))}

      </div>

      {/* Load More */}
      {visibleCount < snakes.length && (

        <div className="flex justify-center pt-4">

          <button
            onClick={() =>
              setVisibleCount((prev) => prev + 5)
            }
            className="rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-800 hover:shadow-lg"
          >
            Load More Snakes
          </button>

        </div>
      )}

    </div>
  )
}