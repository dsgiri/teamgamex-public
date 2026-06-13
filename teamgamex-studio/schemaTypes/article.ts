import { defineField, defineType } from 'sanity'

/**
 * Editorial Schema: The Journal & Help Center
 * Separated from VideoPosts to maintain a clean Data Dictionary.
 */
export const article = defineType({
  name: 'article',
  title: 'Blog & Help Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Journal (Blog)', value: 'blog' },
          { title: 'Help Center (Support)', value: 'help' },
        ],
        layout: 'radio'
      },
      initialValue: 'blog',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Editorial Category',
      type: 'string',
      options: {
        list: [
          { title: 'Management', value: 'management' },
          { title: 'Compliance', value: 'compliance' },
          { title: 'Engagement', value: 'engagement' },
          { title: 'Technical Support', value: 'support' },
        ],
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Summary',
      description: 'Used for SEO and list previews.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: 'Article Body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      media: 'mainImage',
    },
  },
})