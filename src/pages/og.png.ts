import type { APIRoute } from 'astro';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import type { SatoriOptions } from 'satori';
import { og } from '../components/og';
import { ogFonts } from '../lib/og-fonts';

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

export const GET: APIRoute = async () => {
  const svg = await satori(
    og({
      data: { title: "welcome to gustav0d's digital garden!" },
      date: false,
      tags: false,
    }),
    options,
  );
  const png = svgBufferToPngBuffer(svg);

  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
