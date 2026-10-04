/**
 * Turns a picked file into something small enough to live in localStorage.
 *
 * There is no backend in this build, so an uploaded picture has to persist on
 * the device. A raw 4MB phone photo as base64 is ~5.5MB and blows the 5MB
 * localStorage quota on its own, so the file is centre-cropped to a square and
 * re-encoded at 256px, which lands around 20-40KB.
 */

export const AVATAR_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const MAX_BYTES = 10 * 1024 * 1024;
const EDGE = 256;

export type AvatarFileResult = { ok: true; dataUrl: string } | { ok: false; error: string };

export async function readAvatarFile(file: File): Promise<AvatarFileResult> {
  if (!AVATAR_TYPES.includes(file.type)) {
    return { ok: false, error: 'Use a PNG, JPEG or WebP image.' };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: 'That image is over 10MB. Pick a smaller one.' };
  }

  try {
    const bitmap = await createImageBitmap(file);
    const edge = Math.min(bitmap.width, bitmap.height);
    const canvas = document.createElement('canvas');
    canvas.width = EDGE;
    canvas.height = EDGE;

    const context = canvas.getContext('2d');
    if (!context) return { ok: false, error: 'This browser could not read that image.' };

    context.drawImage(
      bitmap,
      (bitmap.width - edge) / 2,
      (bitmap.height - edge) / 2,
      edge,
      edge,
      0,
      0,
      EDGE,
      EDGE,
    );
    bitmap.close();

    return { ok: true, dataUrl: canvas.toDataURL('image/jpeg', 0.85) };
  } catch {
    return { ok: false, error: 'That image could not be read. Try another one.' };
  }
}
