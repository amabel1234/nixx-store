import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const filePath = resolve('artifacts/toko-wa/index.html');
const closingScript = ['</scr', 'ipt>'].join('');
const scriptTag = ['<scr', 'ipt type="module" src="/src/main.tsx">', closingScript].join('');
const html = [
  '<!DOCTYPE html>',
  '<html lang="id">',
  '  <head>',
  '    <meta charset="UTF-8" />',
  '    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />',
  '    <title>Nixx store</title>',
  '    <meta name="description" content="Nixx store — belanja praktis, pesan langsung lewat WhatsApp." />',
  '    <meta name="robots" content="index, follow" />',
  '    <meta property="og:title" content="Nixx store" />',
  '    <meta property="og:description" content="Nixx store — belanja praktis, pesan langsung lewat WhatsApp." />',
  '    <meta property="og:type" content="website" />',
  '    <meta name="twitter:card" content="summary_large_image" />',
  '    <meta name="twitter:title" content="Nixx store" />',
  '    <meta name="twitter:description" content="Nixx store — belanja praktis, pesan langsung lewat WhatsApp." />',
  '    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
  '  </head>',
  '  <body>',
  '    <div id="root"></div>',
  `    ${scriptTag}`,
  '  </body>',
  '</html>',
  '',
].join('\n');

await mkdir(dirname(filePath), { recursive: true });
await writeFile(filePath, html);