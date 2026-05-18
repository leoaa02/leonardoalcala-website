import type { PortableTextBlock } from "@portabletext/types"

export interface SanityImage {
  _type: "image"
  asset: {
    _ref: string
    _type: "reference"
  }
  alt?: string
  caption?: string
}

export interface Slug {
  _type: "slug"
  current: string
}

export interface Author {
  _id: string
  name: string
  image?: SanityImage
  bio?: PortableTextBlock[]
  skills?: string[]
  interests?: string[]
  careerGoals?: string
}

export interface Category {
  _id: string
  title: string
  slug: Slug
  description?: string
}

export interface Tag {
  _id: string
  title: string
  slug: Slug
}

export interface Post {
  _id: string
  title: string
  slug: Slug
  excerpt?: string
  mainImage?: SanityImage
  body?: PortableTextBlock[]
  publishedAt: string
  readingTime?: number
  categories?: Category[]
  tags?: Tag[]
  author?: Author
  featured?: boolean
  seoTitle?: string
  seoDescription?: string
  relatedPosts?: Post[]
}

export interface Project {
  _id: string
  title: string
  slug: Slug
  description?: string
  mainImage?: SanityImage
  technologies?: string[]
  projectUrl?: string
  githubUrl?: string
  featured?: boolean
  order?: number
}

export interface Note {
  _id: string
  content: string
  publishedAt: string
  featured?: boolean
  tags?: Tag[]
}

export interface Reading {
  _id: string
  title: string
  author?: string
  description?: string
  href: string
  external?: boolean
  coverImage?: SanityImage
  featured?: boolean
}

export interface NowPage {
  _id: string
  title: string
  subtitle?: string
  updatedAt?: string
  content?: PortableTextBlock[]
}
