import { createHash } from 'node:crypto';
import { mkdtemp, readFile, readdir, mkdir, copyFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const origin = 'https://yesen.website';

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? files(target) : [target];
  }))).flat();
}

export function verifyMedia(bytes, pointer, checksum) {
  if (bytes.length !== pointer.size) throw new Error(`Incomplete media: ${pointer.original_filename}`);
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  if (checksum && sha256 !== checksum) throw new Error(`Media checksum mismatch: ${pointer.original_filename}`);
  return sha256;
}

export async function prepareMedia(outputRoot = root) {
  const sources = await files(path.join(root, 'src'));
  const code = (await Promise.all(sources.filter(file => /\.(tsx?|css)$/.test(file)).map(file => readFile(file, 'utf8')))).join('\n');
  const pointers = sources.filter(file => file.endsWith('.asset.json') && code.includes(path.basename(file)));
  const inventory = JSON.parse(await readFile(path.join(root, 'scripts/vercel-media-checksums.json'), 'utf8'));
  const checksums = new Map(inventory.map(row => [row.file, row.sha256]));
  const staging = await mkdtemp(path.join(tmpdir(), 'yesen-media-'));
  let index = 0;
  let videos = 0;
  try {
    await Promise.all(Array.from({ length: 5 }, async () => {
      while (index < pointers.length) {
        const file = pointers[index++];
        const pointer = JSON.parse(await readFile(file, 'utf8'));
        if (!pointer.url.startsWith('/__l5e/assets-v1/') || pointer.url.includes('..')) {
          throw new Error(`Invalid asset path: ${path.basename(file)}`);
        }
        const relative = `public${pointer.url}`;
        const target = path.join(outputRoot, relative);
        const expectedHash = checksums.get(relative);
        let bytes;
        try {
          const existing = await readFile(target);
          verifyMedia(existing, pointer, expectedHash);
          bytes = existing;
        } catch {
          for (let attempt = 0; attempt < 3; attempt++) {
            try {
              const response = await fetch(new URL(pointer.url, origin), { signal: AbortSignal.timeout(120000) });
              if (!response.ok) throw new Error(`Media download returned ${response.status}`);
              bytes = Buffer.from(await response.arrayBuffer());
              verifyMedia(bytes, pointer, expectedHash);
              break;
            } catch (error) {
              if (attempt === 2) throw error;
            }
          }
          if (!bytes) throw new Error(`Missing media: ${pointer.original_filename}`);
          const temporary = path.join(staging, pointer.asset_id);
          await writeFile(temporary, bytes);
          await mkdir(path.dirname(target), { recursive: true });
          await copyFile(temporary, target);
        }
        if (pointer.content_type?.startsWith('video/') || /\.(mp4|webm|mov)$/i.test(pointer.original_filename)) videos++;
        console.log(`Verified ${pointer.original_filename} (${bytes.length} bytes)`);
      }
    }));
    console.log(`Vercel media ready: ${pointers.length} assets, ${videos} complete videos. No video re-encoding.`);
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const outputArgument = process.argv.find(argument => argument.startsWith('--output-root='));
  await prepareMedia(outputArgument ? path.resolve(outputArgument.slice('--output-root='.length)) : root);
}