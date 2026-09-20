# Image derivatives

These images are **generated** from source photos in `../` (the repo's
originals) by `npm run images`. Regenerate after changing the sources:

```bash
npm run images
```

## Swapping imagery

Replace any file here with your own photo (keep the filename), or edit
`scripts/process-images.ts` and regenerate. Recommended sources:

| File             | Used in                    | Ideal subject                                  |
| ---------------- | -------------------------- | ---------------------------------------------- |
| `hero.jpg`       | Hero (right side)          | Young African developer at a laptop            |
| `hero-mobile.jpg`| Hero on narrow screens     | Same photo, taller crop                        |
| `about.jpg`      | About section              | Portrait of Victor                             |
| `drives.jpg`     | "What drives me" backdrop  | Atmospheric African landscape / city           |
| `og.png`         | Social sharing card        | Auto-generated monogram card                   |

The site also uses project images that already live in `public/`
(`vecai.png`, `chemichemi.jpeg`, `forum.jpeg`, `micro-template.jpeg`,
`push-swap.jpeg`) and the two Canon originals (`IMG_3834.JPG`,
`IMG_3835.JPG`).

Originals are never modified — derivatives are regenerated from them.
