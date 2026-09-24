/**
 * Portrait used by the "About" section.
 *
 * To add your photo, drop the file into `src/assets/` named `about-photo` with any of
 * these extensions: .jpg .jpeg .png .webp .avif  (e.g. `src/assets/about-photo.webp`).
 * Until a file exists the section falls back to its original centered layout.
 *
 * Tips for the file: portrait orientation (3:4 or 4:5 works best), about 1400–1800px
 * tall, exported as WebP/JPEG (~150–300 KB). Leave some empty space on the LEFT and
 * BOTTOM of the frame — those edges dissolve into the navy background.
 */
const files = import.meta.glob('/src/assets/about-photo.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export const aboutPhoto = {
  src: Object.values(files)[0] as string | undefined,
  alt: 'Portrait of Rodrigo Soares',
  /**
   * CSS `object-position`: which part of the photo stays in frame when it gets cropped
   * (the frame is a tall column on desktop and a wide banner on mobile).
   * "50% 20%" = centered horizontally, biased toward the top so the face stays visible.
   * Face too low? Decrease the second number. Face cut on the sides? Change the first.
   */
  objectPosition: '50% 20%',
}
