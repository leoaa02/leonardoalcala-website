"use client"

import dynamic from "next/dynamic"

const StudioComponent = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  {
    ssr: false,
  }
)

import config from "@/sanity.config"

export default function StudioPage() {
  return <StudioComponent config={config} />
}

