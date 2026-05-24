import { groq } from "next-sanity"

// Posts
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readingTime,
    "categories": categories[]->{ _id, title, slug },
    "tags": tags[]->{ _id, title, slug },
    "author": author->{ name, image }
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    body,
    publishedAt,
    readingTime,
    seoTitle,
    seoDescription,
    "categories": categories[]->{ _id, title, slug },
    "tags": tags[]->{ _id, title, slug },
    "author": author->{ name, image, bio },
    "relatedPosts": *[_type == "post" && slug.current != $slug && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc)[0...3] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt
    }
  }
`

export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readingTime,
    "categories": categories[]->{ _id, title, slug }
  }
`

// Projects
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    technologies,
    projectUrl,
    githubUrl,
    featured
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc)[0...4] {
    _id,
    title,
    slug,
    description,
    mainImage,
    technologies,
    projectUrl,
    githubUrl
  }
`

// Notes
export const notesQuery = groq`
  *[_type == "note"] | order(publishedAt desc) {
    _id,
    slug,
    content,
    publishedAt,
    featured,
    "tags": tags[]->{ _id, title, slug }
  }
`

export const noteByIdQuery = groq`
  *[_type == "note" && _id == $id][0] {
    _id,
    slug,
    content,
    publishedAt,
    featured,
    "tags": tags[]->{ _id, title, slug }
  }
`

export const noteBySlugQuery = groq`
  *[_type == "note" && slug.current == $slug][0] {
    _id,
    slug,
    content,
    publishedAt,
    featured,
    "tags": tags[]->{ _id, title, slug }
  }
`

// Reading
export const readingQuery = groq`
  *[_type == "reading"] | order(publishedAt desc) {
    _id,
    title,
    author,
    description,
    href,
    external,
    coverImage,
    featured
  }
`

export const nowPageQuery = groq`
  *[_type == "nowPage"] | order(updatedAt desc)[0] {
    _id,
    title,
    subtitle,
    updatedAt,
    content
  }
`

// Categories & Tags
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`

export const tagsQuery = groq`
  *[_type == "tag"] | order(title asc) {
    _id,
    title,
    slug
  }
`

// Author
export const authorQuery = groq`
  *[_type == "author"][0] {
    _id,
    name,
    image,
    bio,
    skills,
    interests,
    careerGoals
  }
`
