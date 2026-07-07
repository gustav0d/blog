import type { Element, Root, Text } from 'hast';
import { visit } from 'unist-util-visit';
import { modifyChildren } from 'unist-util-modify-children';
import slugify from 'slugify';

const modifyHeading = (url: string) =>
  modifyChildren((node) => {
    if (node.type !== 'text') {
      return;
    }

    const text = (node as Text).value;
    const element = node as unknown as Element;

    delete element.position;
    element.type = 'element';
    element.tagName = 'a';
    element.properties = {
      class: 'heading-link',
      href: url,
    };
    element.children = [
      {
        type: 'text',
        value: text,
      },
    ];
  });

export function rehypePluginLinkHeading() {
  return function (tree: Root) {
    visit(tree, 'element', (node) => {
      const headingElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      if (headingElements.includes(node.tagName)) {
        const title = node.children
          .map((child) => ('value' in child ? child.value : ''))
          .join('');
        const slug = slugify(title, {
          lower: true,
          replacement: '-',
          strict: true,
        });
        modifyHeading(`#${slug}`)(node);
      }
    });
  };
}
