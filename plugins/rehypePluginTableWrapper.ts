import type { Root } from 'hast';
import { visit } from 'unist-util-visit';
import { h } from 'hastscript';

function removeFieldFromTree(node: unknown, fieldToRemove: string) {
  if (Array.isArray(node)) {
    node.forEach((child) => removeFieldFromTree(child, fieldToRemove));
  } else if (node !== null && typeof node === 'object') {
    const record = node as Record<string, unknown>;
    delete record[fieldToRemove];
    for (const key in record) {
      if (Object.prototype.hasOwnProperty.call(record, key)) {
        removeFieldFromTree(record[key], fieldToRemove);
      }
    }
  }
}

export function rehypePluginTableWrapper() {
  return function (tree: Root) {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'table' || !parent || index === undefined) {
        return;
      }

      const tableNode = structuredClone(node);
      removeFieldFromTree(tableNode, 'position');

      const wrapper = h('div', { className: 'table-wrapper' }, [tableNode]);
      parent.children.splice(index, 1, wrapper);
    });
  };
}
