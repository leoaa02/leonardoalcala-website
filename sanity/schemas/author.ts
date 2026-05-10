const author = {
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "bio",
      title: "Bio",
      type: "blockContent",
    },
    {
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "interests",
      title: "Interests",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "careerGoals",
      title: "Career Goals",
      type: "text",
      rows: 4,
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
}

export default author
