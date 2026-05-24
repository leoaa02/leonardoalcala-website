/*
  Script: generate-note-slugs.js
  Usage:
    - Set environment variables:
      NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
    - Run: node sanity/scripts/generate-note-slugs.js

  This will fetch notes without a slug and patch them with a slug generated from the content.
*/

const sanityClientModule = require('@sanity/client')
const createClient = sanityClientModule.createClient || sanityClientModule.default

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing env variables. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_API_TOKEN (or SANITY_AUTH_TOKEN/NEXT_PUBLIC_SANITY_API_TOKEN)')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-11',
  useCdn: false,
})

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^[-]+|[-]+$/g, '')
    .slice(0, 200)
}

async function run() {
  const notes = await client.fetch(`*[_type == "note" && !defined(slug)]{_id, content}`)
  console.log('Found', notes.length, 'notes without slug')

  for (const note of notes) {
    const base = (note.content || 'note').slice(0, 120)
    const slug = slugify(base)
    try {
      await client.patch(note._id).set({ slug: { _type: 'slug', current: slug } }).commit({ visibility: 'async' })
      console.log('Patched', note._id, '=>', slug)
    } catch (err) {
      console.error('Failed to patch', note._id, err)
    }
  }

  console.log('Done')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
