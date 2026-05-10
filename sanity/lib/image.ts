import { createImageUrlBuilder } from "@sanity/image-url"
import { client, isSanityConfigured } from "./client"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

const builder = isSanityConfigured 
  ? createImageUrlBuilder(client) 
  : null

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    // Return a placeholder builder that returns empty strings
    return {
      width: () => ({ height: () => ({ url: () => "" }) }),
      url: () => "",
    }
  }
  return builder.image(source)
}
