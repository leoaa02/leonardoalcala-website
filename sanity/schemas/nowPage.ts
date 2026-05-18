const nowPage = {
  name: "nowPage",
  title: "Now Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    },
    {
      name: "updatedAt",
      title: "Updated at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "content",
      title: "Content",
      type: "blockContent",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
  },
}

export default nowPage
