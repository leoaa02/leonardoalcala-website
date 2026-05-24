const note = {
  name: "note",
  title: "Note",
  type: "document",
  fields: [
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "content",
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^[-]+|[-]+$/g, "")
            .slice(0, 200),
      },
    },
    {
      name: "content",
      title: "Content",
      type: "text",
      rows: 6,
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: { type: "tag" } }],
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      content: "content",
      publishedAt: "publishedAt",
    },
    prepare(selection: { content: string; publishedAt: string }) {
      const { content, publishedAt } = selection
      return {
        title: content.substring(0, 50) + (content.length > 50 ? "..." : ""),
        subtitle: new Date(publishedAt).toLocaleDateString(),
      }
    },
  },
}

export default note
