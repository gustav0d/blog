import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import fs from 'fs/promises';
import graymatter from 'gray-matter';
import path from 'path';

import { rehypePluginLinkHeading } from './plugins/rehypePluginLinkHeading';
import { rehypePluginTableWrapper } from './plugins/rehypePluginTableWrapper';
import { remarkPluginReadingTime } from './plugins/remarkPluginReadingTime';
import { SITE } from './src/config';

const BLOG_DIR = './src/content/blog';

const getBlogRoutesRedirect = async () => {
  const blogRoutesOldSlug = await fs.readdir(BLOG_DIR);
  const blogRoutes = blogRoutesOldSlug
    .map((post) => {
      const frontmatter = graymatter.read(path.join(BLOG_DIR, post));
      return {
        ...frontmatter,
        slug: frontmatter.data.slug,
      };
    })
    .map(({ slug }) => [`/${slug}`, `/blog/${slug}`]);

  return Object.fromEntries(blogRoutes);
};

const disableSitemap = ['/blog/hidden'];

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    sitemap({
      filter: (page) => {
        try {
          const url = new URL(page);
          const shouldAdd = disableSitemap.every(
            (path) => !url.pathname.startsWith(path),
          );
          return shouldAdd;
        } catch (err) {
          return false;
        }
      },
    }),
  ],
  output: 'static',
  markdown: {
    syntaxHighlight: false,
    processor: unified({
      remarkPlugins: [remarkMath, remarkPluginReadingTime],
      rehypePlugins: [
        rehypeKatex,
        [
          rehypePrettyCode,
          {
            theme: 'github-light',
            keepBackground: false,
          },
        ],
        rehypePluginLinkHeading,
        rehypePluginTableWrapper,
      ],
    }),
  },
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
  redirects: {
    ...(await getBlogRoutesRedirect()),
  },
});
