"use client"

import { SnakeData } from "@/lib/types"
import { useRouter } from "next/navigation"

interface SnakeCardProps {
  snake: SnakeData & {
    matchScore?: number
  }

  hasSelectedFilters: boolean

  setSelectedSnake: React.Dispatch<
    React.SetStateAction<SnakeData | null>
  >

}

export function SnakeCard({
  snake,
  hasSelectedFilters,
  setSelectedSnake,
}: SnakeCardProps) {


    const isVenomous =
  snake["Venomous status"] === "1"
const router = useRouter()

  return (

    <div
      className={`group overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
       isVenomous
          ? "border-red-400 bg-gradient-to-br from-red-50 via-red-100 to-red-200/70"
          : "border-emerald-400 bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200/70"
      }`}
    >

      {/* Image */}
      <div className="relative overflow-hidden">

        <img
          src={snake.Image_url || "/placeholder.jpg"}
          alt={snake.Name}
          className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Match Score */}
        {hasSelectedFilters && snake.matchScore! > 0 && (
          <div className="absolute top-3 left-3">

            <div className="rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">
              {snake.matchScore}{" "}
              {snake.matchScore! > 1 ? "Matches" : "Match"}
            </div>

          </div>
        )}

     
        
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">

        {/* Title */}
        <div>

          <h2
            className={`text-xl font-bold ${
              isVenomous
                ? "text-red-900"
                : "text-green-900"
            }`}
          >
            {snake.Name}
          </h2>

          <p className="text-sm italic text-gray-500">
            {snake.Binomial}
          </p>

        </div>

        {/* Snake Details */}
        <div className="space-y-2 text-sm text-gray-700">

          {/* Habitat */}
          <div className="flex items-start gap-2">

            <span className="font-semibold text-green-800">
              Habitat:
            </span>

            <span>
              {snake.Habitat}
            </span>

          </div>

          {/* Region */}
          <div className="flex items-start gap-2">

            <span className="font-semibold text-green-800">
              Region:
            </span>

            <span>
              {snake.Region}
            </span>

          </div>

          {/* Body Shape */}
          <div className="flex items-start gap-2">

            <span className="font-semibold text-green-800">
              Body:
            </span>

            <span>
              {snake["Body Shape"]}
            </span>

          </div>

        </div>

        {/* Button */}
        <button
         onClick={() =>
        router.push(
            `/snake/${encodeURIComponent(snake.Name)}`
        )
        }
          className={`w-full rounded-xl py-2.5 text-sm font-semibold text-white transition ${
            isVenomous
              ? "bg-red-700 hover:bg-red-800"
              : "bg-emerald-700 hover:bg-emerald-800"
          }`}
        >
          View Details
        </button>

      </div>

    </div>
  )
}