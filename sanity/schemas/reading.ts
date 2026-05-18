const reading = {
  name: "reading",
  title: "Reading",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    },
    {
      name: "href",
      title: "URL",
      type: "url",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "external",
      title: "External link",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      media: "coverImage",
    },
    prepare(selection: { title: string; author?: string }) {
      const { title, author } = selection
      return {
        title,
        subtitle: author ? `by ${author}` : "Reading item",
      }
    },
  },
}

export default reading
