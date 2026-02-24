import type { CollectionConfig } from 'payload';

export const Changelog: CollectionConfig = {
  slug: 'changelog',
  admin: {
    useAsTitle: 'version',
    defaultColumns: ['version', 'title', 'publishedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'version',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: {
        description: 'Brief summary for the changelog list',
      },
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        description: 'Detailed release notes',
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'New Features',
      fields: [
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        {
          name: 'prUrl',
          type: 'text',
          label: 'PR URL',
        },
      ],
    },
    {
      name: 'improvements',
      type: 'array',
      label: 'Improvements',
      fields: [
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        {
          name: 'prUrl',
          type: 'text',
          label: 'PR URL',
        },
      ],
    },
    {
      name: 'fixes',
      type: 'array',
      label: 'Bug Fixes',
      fields: [
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        {
          name: 'prUrl',
          type: 'text',
          label: 'PR URL',
        },
      ],
    },
    {
      name: 'breaking',
      type: 'array',
      label: 'Breaking Changes',
      fields: [
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        {
          name: 'migration',
          type: 'textarea',
          label: 'Migration Guide',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
