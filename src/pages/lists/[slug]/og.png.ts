import type {
  APIContext,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'astro';
import { getCollection } from 'astro:content';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import type { SatoriOptions } from 'satori';

import { og } from '../../../components/og';
import { ogFonts } from '../../../lib/og-fonts';

export const getStaticPaths = (async () => {
  const lists = await getCollection('lists');

  return lists.map((list) => ({
    params: {
      slug: list.id,
    },
    props: {
      ...list,
      date: false,
      tags: false,
    },
  }));
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: ogFonts,
};

const svgBufferToPngBuffer = (svg: string) => {
  const resvg = new Resvg(svg);
  const png = resvg.render();
  return png.asPng();
};

export const GET = async ({ props }: APIContext<Props>) => {
  const svg = await satori(og(props), options);
  const png = svgBufferToPngBuffer(svg);

  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
