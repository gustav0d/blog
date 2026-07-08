import getReadingTime from 'reading-time';
import type { RemarkPlugin } from '@astrojs/markdown-remark';

const toString = (node: any): string =>
  node.value ?? node.children?.map(toString).join('') ?? '';

export const remarkPluginReadingTime: RemarkPlugin = () => (tree, file) => {
  const frontmatter = file.data.astro?.frontmatter;
  if (frontmatter) {
    frontmatter.readingTime = getReadingTime(toString(tree));
  }
};
