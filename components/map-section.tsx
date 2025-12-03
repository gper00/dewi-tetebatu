"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

interface MapSectionProps {
  latitude?: number
  longitude?: number
  zoom?: number
}

export default function MapSection({ latitude = -8.4667, longitude = 116.3333, zoom = 13 }: MapSectionProps) {
  const [showCustomization, setShowCustomization] = useState(false)
  const [coords, setCoords] = useState({ lat: latitude, lng: longitude, zoom })

  return (
    <div className="space-y-4">
      {/* Map Embed */}
      <div className="rounded-lg overflow-hidden shadow-md h-96 w-full">
        <iframe
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.05},${coords.lat - 0.05},${coords.lng + 0.05},${coords.lat + 0.05}&layer=mapnik&marker=${coords.lat},${coords.lng}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Customization Tips */}
      <button
        onClick={() => setShowCustomization(!showCustomization)}
        className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-2"
      >
        <MapPin size={16} />
        Customize Koordinat Map
      </button>

      {showCustomization && (
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <p className="text-sm text-slate-700 mb-3 font-semibold">Koordinat Tetebatu saat ini:</p>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <label className="block text-slate-600 mb-1">Latitude:</label>
              <input
                type="number"
                step="0.0001"
                value={coords.lat}
                onChange={(e) => setCoords({ ...coords, lat: Number.parseFloat(e.target.value) })}
                className="w-full px-2 py-1 border border-slate-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Longitude:</label>
              <input
                type="number"
                step="0.0001"
                value={coords.lng}
                onChange={(e) => setCoords({ ...coords, lng: Number.parseFloat(e.target.value) })}
                className="w-full px-2 py-1 border border-slate-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Zoom:</label>
              <input
                type="number"
                min="1"
                max="18"
                value={coords.zoom}
                onChange={(e) => setCoords({ ...coords, zoom: Number.parseInt(e.target.value) })}
                className="w-full px-2 py-1 border border-slate-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            💡 Tip: Gunakan Google Maps untuk menemukan koordinat lokasi yang tepat
          </p>
        </div>
      )}
    </div>
  )
}
