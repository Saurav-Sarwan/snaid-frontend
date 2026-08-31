"use client"

import type React from "react"
import { useState, useRef,useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import type { SnakeResult } from "@/lib/types"
import { Upload, Loader2, X, Camera, ImageIcon } from "lucide-react"

interface ImageIdentificationProps {
  onIdentificationComplete: (
    result: SnakeResult | null
  ) => void

  userLocation: {
    lat: number
    lng: number
  } | null
}
 export function ImageIdentification({
  onIdentificationComplete,
  userLocation,
}: ImageIdentificationProps){
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [isDragging, setIsDragging] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processFile = (f: File) => {
    setFile(f)
    setFileName(f.name)
    setError("")
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(f)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) processFile(f)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const f = e.dataTransfer.files?.[0]
    if (f && f.type.startsWith("image/")) processFile(f)
  }

  const handleIdentify = async () => {
    if (!file) return
    setLoading(true)
    setError("")
    try {
      const form = new FormData()
      form.append("image", file)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/identify-snake`,  {
        method: "POST",
        body: form,
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.detail || `Server error: ${res.status}`)
      }
      const data: SnakeResult = await res.json()
      if (data.error) throw new Error(data.error)
      onIdentificationComplete({
    ...data,
    userLocation,
     })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to identify snake")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setPreview(null)
    setFile(null)
    setFileName("")
    setError("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="space-y-5">
      <div>
        <Label className="text-sm font-semibold mb-3 block text-foreground/80">
          Upload Snake Image
        </Label>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
            className={`relative rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden
              ${isDragging
                ? "border-primary bg-primary/15 scale-[1.01]"
                : preview
                ? "border-primary/30 bg-black/20"
                : "border-white/10 bg-black/20 hover:border-primary/40 hover:bg-black/25 snake-texture"
              }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer block">
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-72 object-contain"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <ImageIcon className="h-3.5 w-3.5" />
                    Click to change
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-border/30 bg-card/80 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-mono truncate max-w-[70%]">
                    {fileName}
                  </span>
                  <span className="text-xs text-primary">Click to change</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-12 px-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <Camera className="h-7 w-7 text-primary/60" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {isDragging ? "Drop it here" : "Upload snake image"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Click to browse or drag &amp; drop
                </p>
                <p className="text-[11px] text-muted-foreground/60 mt-0.5">
                  JPG · PNG · WEBP
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-primary/70 text-xs">
                  <Upload className="h-3.5 w-3.5" />
                  Choose file
                </div>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-destructive/8 border border-destructive/25 rounded-xl">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={handleIdentify}
          disabled={!file || loading}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Identify Snake
            </>
          )}
        </Button>
        {preview && (
          <Button onClick={handleReset} variant="outline" size="lg" className="px-4">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Tips */}
      <Card className="bg-muted/40 border-muted/60">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Tips for Best Results
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {[
              "Use a clear, well-lit photo of the snake",
              "Include the head and body pattern if possible",
              "Avoid blurry or very dark images",
              "A close-up shot gives better accuracy",
            ].map((tip, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary font-bold shrink-0">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}