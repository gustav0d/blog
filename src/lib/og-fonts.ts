import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { SatoriOptions } from 'satori';

const fontFile = (...segments: string[]) =>
  readFileSync(path.join(process.cwd(), 'public', 'fonts', ...segments));

export const ogFonts: SatoriOptions['fonts'] = [
  {
    name: 'Instrument Sans',
    data: fontFile('Instrument-Sans', 'InstrumentSans-Regular.ttf'),
    weight: 400,
    style: 'normal',
  },
  {
    name: 'Spectral',
    data: fontFile('Spectral', 'Spectral-Regular.ttf'),
    weight: 400,
    style: 'normal',
  },
  {
    name: 'Spectral',
    data: fontFile('Spectral', 'Spectral-SemiBold.ttf'),
    weight: 600,
    style: 'normal',
  },
];
