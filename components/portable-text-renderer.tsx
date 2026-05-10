"use client"

import { PortableText, type PortableTextComponents } from "@portabletext/react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import type { PortableTextBlock } from "@portabletext/types"
import { urlFor } from "@/sanity/lib/image"

interface CodeBlock {
  _type: "code"
  language?: string
  code: string
  filename?: string
}

interface ImageBlock {
  _type: "image"
  asset: {
    _ref: string
  }
  alt?: string
  caption?: string
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 id={generateSlug(children)} className="scroll-mt-24">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 id={generateSlug(children)} className="scroll-mt-24">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 id={generateSlug(children)} className="scroll-mt-24">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 id={generateSlug(children)} className="scroll-mt-24">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-2 hover:text-primary/80"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
  },
  types: {
    image: ({ value }: { value: ImageBlock }) => (
      <figure className="my-8">
        <img
          src={urlFor(value).width(1200).url()}
          alt={value.alt || ""}
          className="rounded-lg"
        />
        {value.caption && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    code: ({ value }: { value: CodeBlock }) => (
      <div className="my-6 overflow-hidden rounded-lg">
        {value.filename && (
          <div className="bg-muted px-4 py-2 text-sm text-muted-foreground">
            {value.filename}
          </div>
        )}
        <SyntaxHighlighter
          language={value.language || "typescript"}
          style={oneDark}
          customStyle={{
            margin: 0,
            borderRadius: value.filename ? "0 0 0.5rem 0.5rem" : "0.5rem",
          }}
        >
          {value.code}
        </SyntaxHighlighter>
      </div>
    ),
  },
}

function generateSlug(children: React.ReactNode): string {
  if (!children) return ""
  const text = Array.isArray(children) ? children.join("") : String(children)
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

interface PortableTextRendererProps {
  value: PortableTextBlock[]
}

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return (
    <div className="prose">
      <PortableText value={value} components={components} />
    </div>
  )
}
