"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { ArrowPathIcon } from "@heroicons/react/24/solid"

interface SketchfabEmbedProps {
  modelId: string
}

const SketchfabEmbed: React.FC<SketchfabEmbedProps> = ({ modelId }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [api, setApi] = useState<any>(null)
  const [isModelRotating, setIsModelRotating] = useState(false)

  useEffect(() => {
    let client: any

    const initializeViewer = () => {
      client = new (window as any).Sketchfab(iframeRef.current)
      client.init(modelId, {
        success: (apiClient: any) => {
          setApi(apiClient)
          apiClient.start()
          apiClient.addEventListener("viewerready", () => {
            console.log("Viewer is ready")
          })
        },
        error: () => {
          console.log("Viewer error")
        },
      })
    }

    if (!(window as any).Sketchfab) {
      const script = document.createElement("script")
      script.src = "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js"
      script.onload = initializeViewer
      document.body.appendChild(script)
    } else {
      initializeViewer()
    }

    return () => {
      if (client) {
        client.destroy()
      }
    }
  }, [modelId])

  const getEmbedUrl = () => {
    return `https://sketchfab.com/models/${modelId}/embed?ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_watermark_link=0&autostart=1`
  }

  const toggleModelRotation = () => {
    if (api) {
      if (isModelRotating) {
        api.stopAnimations()
      } else {
        api.addAnimation({
          name: "rotation",
          duration: 10,
          loop: true,
          keyframes: [{ rotation: [0, 0, 0] }, { rotation: [0, Math.PI * 2, 0] }],
        })
      }
      setIsModelRotating(!isModelRotating)
    }
  }

  return (
    <div className="w-full h-screen bg-transparent relative">
      {/* Encabezado superpuesto */}
      <div className="absolute top-0 left-0 w-full p-7 bg-black text-white text-center z-10 bck">
      </div>
                    {/* gooter superpuesto */}

      <div className="absolute bottom-0 left-0 w-full p-5 bg-black text-white text-center z-10 bck">
      </div>
      
      {/* Iframe de Sketchfab */}
      <iframe
        ref={iframeRef}
        title="Sketchfab Model"
        className="w-full h-full"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src={getEmbedUrl()}
      />
      
    </div>
  )
}

export default SketchfabEmbed
