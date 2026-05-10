import { config, fields, collection } from '@keystatic/core';

// This allows you to use the local file system during development, 
// but switches to GitHub mode when deployed to Vercel.
const isLocal = process.env.NODE_ENV === 'development';

export default config({
  storage: isLocal
    ? { kind: 'local' }
    : {
        kind: 'github',
        // TODO: Update this to your actual GitHub username and repo name once you upload it!
        repo: 'YOUR_USERNAME/soapbizzz',
      },
  collections: {
    products: collection({
      label: 'Products',
      slugField: 'title',
      path: 'src/content/products/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        price: fields.text({ label: 'Price' }),
        color: fields.text({ label: 'Color' }),
        scent: fields.text({ label: 'Scent' }),
        desc: fields.text({ label: 'Description', multiline: true }),
      },
    }),
    bundles: collection({
      label: 'Bundles',
      slugField: 'name',
      path: 'src/content/bundles/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        tagline: fields.text({ label: 'Tagline' }),
        price: fields.text({ label: 'Price' }),
        saving: fields.text({ label: 'Saving' }),
        badge: fields.text({ label: 'Badge' }),
        bars: fields.array(
          fields.object({
            title: fields.text({ label: 'Title' }),
            color: fields.text({ label: 'Color' }),
            scent: fields.text({ label: 'Scent' }),
          }),
          { label: 'Bars', itemLabel: props => props.fields.title.value }
        ),
      },
    }),
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        date: fields.date({ label: 'Date' }),
        category: fields.text({ label: 'Category' }),
        readTime: fields.text({ label: 'Read Time' }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
        }),
      },
    }),
  },
});
