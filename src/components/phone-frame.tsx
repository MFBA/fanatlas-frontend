/**
 * The app renders inside a 430x932 device shell on anything wider than a phone,
 * and full-bleed on a real phone. No painted status bar or virtual keyboard:
 * on a device the real ones draw over the layout.
 */
export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh justify-center bg-ink-0 sm:items-center sm:bg-[#1A1920] sm:p-8">
      <div className="relative flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-ink-0 sm:h-[932px] sm:rounded-[44px] sm:border sm:border-line-strong sm:shadow-2">
        {children}
      </div>
    </div>
  );
}
