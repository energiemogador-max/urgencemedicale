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
| `logo.png` | Brand lockup — hero, header, footer (`public/images/logo-{420,840}.webp`) |
| `doctor.png` | Homepage hero photo (`public/images/doctor-{640,1000}.webp`). **Stock image**, confirmed by the operator — keep it away from the named-doctor credentials, and do not caption it as a specific person. |
| `ambulance.png` | Liveried vehicle (`public/images/ambulance-{800,1200,1600}.webp`) |
| `hero-reference.png` | The operator's hero mockup. Design reference only — never served. |

The brand palette is sampled from `logo.png` and `hero-reference.png`:
navy `#002454`, deep navy `#00142e`, red `#e20102`.
