import type { APIRoute } from "astro"
import { createJevSearchHandler } from "@/lib/jev-search-server"
import documents from "@/lib/jev-search-index.json"

// Build src/lib/jev-search-index.json with `npx tsx scripts/jev-search-index.ts`
// or hand createJevSearchHandler any SearchDocument[]. TYPESAFE_API_KEY (or OPENJEV_API_KEY with JEV_PROVIDER=openjev) must be set.
export const prerender = false

const handler = createJevSearchHandler({ documents })

export const GET: APIRoute = ({ request }) => handler(request)
export const POST: APIRoute = ({ request }) => handler(request)
