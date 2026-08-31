"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { HospitalFinder } from "@/components/hospital-finder"

import { SnakeData } from "@/lib/types"
import { loadSnakes } from "@/lib/load-snakes"

import { SnakeDetails } from "@/components/snake-details"

export default function SnakePage() {

  const params = useParams()

  const [snake, setSnake] =
    useState<SnakeData | null>(null)

  const [userLocation, setUserLocation] =
    useState<{
      lat: number
      lng: number
    } | null>(null)

  // Load snake details
  useEffect(() => {

    async function fetchSnake() {

      const snakes = await loadSnakes()

      const foundSnake = snakes.find(
        (snake) =>
          snake.Name.toLowerCase() ===
          decodeURIComponent(
            params.name as string
          ).toLowerCase()
      )

      if (foundSnake) {
        setSnake(foundSnake)
      }
    }

    fetchSnake()

  }, [params.name])

  // Read already-fetched location from localStorage
  useEffect(() => {

    const storedLocation =
      localStorage.getItem("userLocation")

    if (storedLocation) {
      setUserLocation(
        JSON.parse(storedLocation)
      )
    }

  }, [])

  if (!snake) {
    return (
      <div className="py-20 text-center text-lg">
        Loading snake details...
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-[#edf5eb] p-6">

      <div className="mx-auto max-w-7xl space-y-8">

        {/* Snake Details */}
        <SnakeDetails snake={snake} />

        {/* Hospital Finder */}
        {userLocation && (

          <HospitalFinder
            userLocation={userLocation}
          />

        )}

      </div>

    </div>
  )
}