import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
import type { RemarkPlugin } from '@astrojs/markdown-remark';

export const remarkPluginReadingTime: RemarkPlugin = () => (tree, file) => {
  const textOnPage = toString(tree);
  const readingTime = getReadingTime(textOnPage);
  file.data.astro!.frontmatter!.readingTime = readingTime;
};
