const note = {
  name: "note",
  title: "Note",
  type: "document",
  fields: [
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
