import { describe, expect, test } from 'bun:test';
import { createHash } from 'node:crypto';
import { verifyMedia } from './prepare-vercel-media.mjs';

describe('Vercel media integrity', () => {
  const bytes = Buffer.from('original-video-bytes');
  const pointer = { size: 20, original_filename: 'hero.mp4' };
  const checksum = createHash('sha256').update(bytes).digest('hex');
  test('preserves every original byte', () => {
    expect(verifyMedia(bytes, pointer, checksum)).toBe(checksum);
  });
  test('rejects a truncated video', () => {
    expect(() => verifyMedia(bytes.subarray(0, 10), pointer, checksum)).toThrow('Incomplete media');
  });
  test('rejects a same-size corrupted video', () => {
    expect(() => verifyMedia(Buffer.alloc(20), pointer, checksum)).toThrow('checksum mismatch');
  });
});