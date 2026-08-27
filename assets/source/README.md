# Source images

Full-resolution originals. These are **not** served to visitors — the site
only ships the derived WebP files in `public/images/`.

Kept in the repo so the web-sized versions can be regenerated (different
sizes, different quality) without hunting for the original.

## Regenerating

```bash
node -e "
const sharp = require('sharp');
(async () => {
  for (const w of [800, 1200, 1600]) {
    await sharp('assets/source/ambulance.png')
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile('public/images/ambulance-' + w + '.webp');
  }
})();
"
```

| File | Used by |
| --- | --- |
| `ambulance.png` | Homepage hero (`public/images/ambulance-{800,1200,1600}.webp`) |
