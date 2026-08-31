// lib/load-snakes.ts

import Papa from "papaparse"
import { SnakeData } from "./types"

export async function loadSnakes(): Promise<SnakeData[]> {
  return new Promise(async (resolve, reject) => {
    try {
      // Fetch CSV from public/data
      const response = await fetch("/data/snakes.csv")

      if (!response.ok) {
        throw new Error("Failed to fetch snakes.csv")
      }

      const csvText = await response.text()

      // IMPORTANT:
      // Removed <SnakeData>
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,

        complete: (results: any) => {

          // DEBUG
          

          // Clean + normalize data
          const cleanedData: SnakeData[] = results.data.map((snake: any) => ({
            ...snake,

            // Remove unnecessary spaces
            Name: snake.Name?.trim() || "",
            Binomial: snake.Binomial?.trim() || "",
            Region: snake.Region?.trim() || "",
            Color: snake.Color?.trim() || "",
            Habitat: snake.Habitat?.trim() || "",

            "Body Shape":
              snake["Body Shape"]?.trim() || "",

            "Head Shape":
              snake["Head Shape"]?.trim() || "",

            Scales: snake.Scales?.trim() || "",
            Fangs: snake.Fangs?.trim() || "",

            // IMAGE FIX
            Image_url:
              snake["image_url"]?.trim() ||
              snake["Image_url"]?.trim() ||
              "",

            "Venomous status":
              snake["Venomous status"]?.trim() || "",

            "Recommended Antivenom":
              snake["Recommended Antivenom"]?.trim() || "",

            "About This Snake":
              snake["About This Snake"]?.trim() || "",
          }))

          resolve(cleanedData)
        },

        error: (error: Error) => {
          reject(error)
        },
      })
    } catch (error) {
      reject(error)
    }
  })
}