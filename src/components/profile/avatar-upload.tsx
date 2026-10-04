'use client';

import { Camera } from 'lucide-react';
import { useRef, useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { AVATAR_TYPES, readAvatarFile } from '@/lib/avatar-file';
import { useFan } from '@/components/profile/profile-store';

/**
 * The fan's avatar on Profile, which is the one place a picture can be set.
 * The whole disc is the control, with a 20px camera badge as the affordance,
 * and `Remove` only appears once there is something to remove.
 */
export function AvatarUpload({ name }: { name: string }) {
  const { fan, setPhoto } = useFan();
  const photo = fan.photo;
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError(null);

    const result = await readAvatarFile(file);
    if (result.ok) setPhoto(result.dataUrl);
    else setError(result.error);

    setBusy(false);
    // Clear the input so picking the same file twice still fires a change.
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="block rounded-full"
          aria-label={photo ? 'Change your profile picture' : 'Add a profile picture'}
        >
          <Avatar name={name} src={photo} size={56} />
        </button>

        <span
          className="pointer-events-none absolute -bottom-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full border-2 border-ink-0 bg-violet-600 text-white"
          aria-hidden
        >
          <Camera size={10} strokeWidth={2} />
        </span>

        <input
          ref={inputRef}
          type="file"
          accept={AVATAR_TYPES.join(',')}
          className="hidden"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </div>

      {photo && !error && (
        <button
          type="button"
          onClick={() => setPhoto(null)}
          className="text-label text-fg-faint"
        >
          Remove
        </button>
      )}

      {error && <span className="micro text-live">{error}</span>}
    </div>
  );
}
