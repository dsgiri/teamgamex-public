import {defineField, defineType} from 'sanity'

export const videoPost = defineType({
  name: 'videoPost',
  title: 'Team Game Post',
  type: 'document',
  fields: [
    defineField({
      name: 'postId',
      title: 'Post ID',
      type: 'slug',
      description: 'Click "Generate" to create a unique ID based on the title.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Game or Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Game Summary (SEO)',
      type: 'text', // Simple multi-line text box
      description: 'A brief overview for search engines and the homepage grid.',
      validation: (Rule) => Rule.max(160).warning('Keep it under 160 characters for best SEO.'),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Source Video URL',
      type: 'url',
      description: 'The link to the TikTok, Reel, or YT Short.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'postSource',
      title: 'Post Source',
      type: 'string',
      options: {
        list: [
          {title: 'Instagram', value: 'instagram'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'Twitter (X)', value: 'twitter'},
          {title: 'LinkedIn', value: 'linkedin'},
          {title: 'YouTube', value: 'youtube'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'playerBenefit',
      title: 'Why should you buy this?',
      type: 'text',
      description: 'Explain the value (e.g., boosts morale, great for remote teams).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shopLink',
      title: 'Online Shop Link',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Team Building', value: 'team-building'},
          {title: 'Senior Leaving', value: 'senior-leaving'},
          {title: 'Icebreakers', value: 'icebreakers'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})