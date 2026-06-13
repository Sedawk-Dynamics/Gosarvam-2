"use client";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const INDIA: [number, number] = [78.9629, 20.5937];

const DESTINATIONS: Array<{ name: string; coordinates: [number, number] }> = [
  { name: "United States",   coordinates: [-95.7129, 37.0902] },
  { name: "United Kingdom",  coordinates: [-3.436,   55.3781] },
  { name: "Germany",         coordinates: [10.4515,  51.1657] },
  { name: "UAE",             coordinates: [53.8478,  23.4241] },
  { name: "Japan",           coordinates: [138.2529, 36.2048] },
  { name: "South Korea",     coordinates: [127.7669, 35.9078] },
  { name: "Australia",       coordinates: [133.7751, -25.2744] },
  { name: "Singapore",       coordinates: [103.8198,  1.3521] },
  { name: "Canada",          coordinates: [-96.0,    60.0]    },
  { name: "France",          coordinates: [2.2137,   46.2276] },
  { name: "Netherlands",     coordinates: [5.2913,   52.1326] },
  { name: "Russia",          coordinates: [105.3188, 61.524]  },
];

export default function WorldMap() {
  return (
    <ComposableMap
      width={800}
      height={400}
      projectionConfig={{ scale: 140, center: [20, 12] }}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              style={{
                fill: "var(--geo-fill)",
                stroke: "var(--geo-stroke)",
                strokeWidth: 0.5,
                outline: "none",
              }}
            />
          ))
        }
      </Geographies>

      {DESTINATIONS.map((dest, i) => (
        <Line
          key={dest.name}
          from={INDIA}
          to={dest.coordinates}
          stroke="#c9a063"
          strokeWidth={1}
          strokeOpacity={0.55}
          strokeLinecap="round"
          style={{
            strokeDasharray: 2000,
            strokeDashoffset: 2000,
            animation: `arcDraw 2s ease-out ${i * 0.12}s forwards`,
          }}
        />
      ))}

      {DESTINATIONS.map((dest) => (
        <Marker key={dest.name} coordinates={dest.coordinates}>
          <circle r={3.5} fill="#c9a063" fillOpacity={0.9} />
          <circle r={7} fill="none" stroke="#c9a063" strokeWidth={0.5} strokeOpacity={0.3} />
        </Marker>
      ))}

      <Marker coordinates={INDIA}>
        <circle r={14} fill="#c9a063" fillOpacity={0.12} style={{ transformOrigin: "center", animation: "worldMapPing 2.4s ease-out infinite" }} />
        <circle r={6}  fill="#c9a063" fillOpacity={0.35} />
        <circle r={3.5} fill="#c9a063" />
      </Marker>
    </ComposableMap>
  );
}
