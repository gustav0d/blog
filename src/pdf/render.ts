import { createElement, type ReactElement } from 'react';
import { getEntry } from 'astro:content';
import { Font, renderToBuffer, type DocumentProps } from '@react-pdf/renderer';
import { SITE } from '../config';
import { labels, type Locale } from './labels';
import { Resume } from './Resume';

// Default hyphenation splits Portuguese mid-stem ("desenvolvimen-to").
Font.registerHyphenationCallback((word) => [word]);

const siteLabel = new URL(SITE.website).hostname.replace(/^www\./, '');

export async function renderResume(locale: Locale): Promise<Response> {
  const cv = await getEntry('cv', locale);
  if (!cv) throw new Error(`Missing CV content for locale "${locale}"`);

  // createElement, not JSX, so this stays a .ts file — Astro endpoints are .js/.ts.
  // renderToBuffer wants the root Document's props; Resume renders that Document.
  const document = createElement(Resume, {
    cv: cv.data,
    locale,
    siteUrl: SITE.website,
    siteLabel,
  }) as unknown as ReactElement<DocumentProps>;

  const buffer = await renderToBuffer(document);

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${labels[locale].filename}"`,
    },
  });
}
