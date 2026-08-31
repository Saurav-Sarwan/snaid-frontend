"use client"

import { useState } from "react"

import { SnakeGallery } from "./snake-gallery"

import { SnakeData } from "@/lib/types"

interface TextResultsDisplayProps {
  snakes: SnakeData[]
}

export function TextResultsDisplay({
  snakes,
}: TextResultsDisplayProps) {

  const [visibleCount, setVisibleCount] =
    useState(6)

  return (

    <div className="space-y-8">

      <SnakeGallery
        snakes={snakes}
        visibleCount={visibleCount}
        setVisibleCount={setVisibleCount}
        hasSelectedFilters={false}
        setSelectedSnake={() => {}}
      />

    </div>
  )
}