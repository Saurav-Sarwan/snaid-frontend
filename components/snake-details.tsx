"use client"

import { SnakeData } from "@/lib/types"

interface SnakeDetailsProps {
  snake: SnakeData
}

export function SnakeDetails({
  snake,
}: SnakeDetailsProps) {

  const isVenomous =
    snake["Venomous status"] === "1"

  return (

    <div className="mx-auto max-w-7xl space-y-8">

      {/* Hero Section */}
      <div
        className={`overflow-hidden rounded-3xl shadow-xl ${
          isVenomous
            ? "bg-gradient-to-br from-red-50 via-red-100 to-red-200"
            : "bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200"
        }`}
      >

        <div className="grid gap-8 p-8 lg:grid-cols-2">

          {/* Image */}
          <div>

            <img
              src={snake.Image_url || "/placeholder.jpg"}
              alt={snake.Name}
              className="h-[450px] w-full rounded-3xl object-cover shadow-lg"
            />

          </div>

          {/* Main Info */}
          <div className="flex flex-col justify-center space-y-6">

            {/* Status */}
            <div
              className={`inline-flex w-fit rounded-full px-5 py-2 text-sm font-bold ${
                isVenomous
                  ? "bg-red-700 text-white"
                  : "bg-emerald-700 text-white"
              }`}
            >
              {isVenomous
                ? "Venomous Snake"
                : "Non-Venomous Snake"}
            </div>

            {/* Name */}
            <div>

              <h1
                className={`text-5xl font-black ${
                  isVenomous
                    ? "text-red-900"
                    : "text-emerald-900"
                }`}
              >
                {snake.Name}
              </h1>

              <p className="mt-2 text-xl italic text-gray-600">
                {snake.Binomial}
              </p>

            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <DetailItem
                label="Habitat"
                value={snake.Habitat}
              />

              <DetailItem
                label="Region"
                value={snake.Region}
              />

              <DetailItem
                label="Body Shape"
                value={snake["Body Shape"]}
              />

              <DetailItem
                label="Head Shape"
                value={snake["Head Shape"]}
              />

              <DetailItem
                label="Scales"
                value={snake.Scales}
              />

              <DetailItem
                label="Fangs"
                value={snake.Fangs}
              />

            </div>

          </div>

        </div>

      </div>

      {/* About */}
      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <h2 className="mb-5 text-2xl font-bold text-gray-900">
          About This Snake
        </h2>

        <p className="text-base leading-8 text-gray-700">
          {snake["About This Snake"]}
        </p>

      </div>

      {/* Medical Information */}
      <div
        className={`rounded-3xl p-8 shadow-lg ${
          isVenomous
            ? "bg-red-50"
            : "bg-emerald-50"
        }`}
      >

        <h2
          className={`mb-6 text-2xl font-bold ${
            isVenomous
              ? "text-red-900"
              : "text-emerald-900"
          }`}
        >
          Medical Information
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">

          <DetailItem
            label="Venom Status"
            value={
              isVenomous
                ? "Venomous"
                : "Non-Venomous"
            }
          />

          <DetailItem
            label="Recommended Antivenom"
            value={
              snake["Recommended Antivenom"] ||
              "Not Required"
            }
          />

        </div>

      </div>

    </div>
  )
}

function DetailItem({
  label,
  value,
}: {
  label: string
  value: string
}) {

  return (

    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
        {label}
      </div>

      <div className="mt-2 text-sm font-medium leading-6 text-gray-800">
        {value || "Unknown"}
      </div>

    </div>
  )
}