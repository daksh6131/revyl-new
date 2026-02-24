import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import path from 'path';
import { fileURLToPath } from 'url';

// Collections
import { BlogPosts } from './src/collections/BlogPosts';
import { Changelog } from './src/collections/Changelog';
import { Authors } from './src/collections/Authors';
import { Media } from './src/collections/Media';
import { Tags } from './src/collections/Tags';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: ' | Revyl GTM',
    },
  },

  collections: [BlogPosts, Changelog, Authors, Media, Tags],

  editor: lexicalEditor(),

  // SQLite for D1 compatibility
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./data/payload.db',
    },
  }),

  // R2 for media storage
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.R2_BUCKET || 'revyl-media',
      config: {
        endpoint: process.env.R2_ENDPOINT,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: 'auto',
      },
    }),
  ],

  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },

  secret: process.env.PAYLOAD_SECRET || 'change-me-in-production',
});
