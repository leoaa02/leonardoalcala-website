import { createClient, type SanityClient } from "next-sanity"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

// Create a placeholder client if Sanity is not configured
export const client: SanityClient = projectId 
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: process.env.NODE_ENV === "production",
    })
  : {
      fetch: async () => null,
      config: () => ({ projectId: "", dataset: "" }),
    } as unknown as SanityClient

export const isSanityConfigured = Boolean(projectId)
