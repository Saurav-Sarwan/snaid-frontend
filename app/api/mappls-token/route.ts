import { NextResponse } from "next/server"

async function getAccessToken(): Promise<string> {

  const res = await fetch(
    "https://outpost.mappls.com/api/security/oauth/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.MAPPLS_CLIENT_ID!,
        client_secret: process.env.MAPPLS_CLIENT_SECRET!,
      }),
    }
  )

  const data = await res.json()

  if (!data.access_token) {
    throw new Error("No access token")
  }

  return data.access_token
}

export async function GET(request: Request) {

  try {

    const { searchParams } = new URL(request.url)

    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    const type = searchParams.get("type")

    // ------------------------------------
    // STATE DETECTION
    // ------------------------------------
    if (type === "state" && lat && lng) {

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
        {
          headers: {
            "User-Agent": "SNAID"
          },
          cache: "no-store",
        }
      )

      const data = await response.json()

      const state =
        data.address?.state ||
        data.address?.region ||
        ""

      return NextResponse.json({
        state,
      })
    }

    // ------------------------------------
    // HOSPITAL SEARCH
    // ------------------------------------
    const token = await getAccessToken()

    if (lat && lng) {

      const res = await fetch(
        `https://atlas.mappls.com/api/places/nearby/json?keywords=hospital&refLocation=${lat},${lng}&radius=5000&sortBy=dist&page=1&size=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await res.json()

      return NextResponse.json(data)
    }

    return NextResponse.json({
      access_token: token,
    })

  } catch (err) {

    console.error("API error:", err)

    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    )
  }
}