# Build tools

Use Node.js 20.9 or newer and install dependencies, including development dependencies, with Yarn. Run `npm run build` to generate both languages, merge sitemaps, optimize local images, and verify the bilingual output. `npm run build:zh` and `npm run build:en` also optimize their generated pages.

The image optimizer uses Sharp to generate WebP variants and a small PNG favicon from `source/assets/img/`. It adds responsive image sizes, loading priorities, and intrinsic dimensions to generated HTML. Original assets, article links, remote images, SVGs, animated images, and author-defined `picture`/`srcset` markup remain available unchanged.

Generated variants live in `public/assets/optimized/`; the reusable encoding cache lives in `.cache/image-optimization/`. Both directories are excluded from source control. Source content and encoder settings determine asset hashes, so changing an original creates fresh URLs. The cache can be deleted safely when reclaiming disk space; the next build recreates it.

If generating Hexo output directly, run `npm run optimize:images` afterwards. Run `npm run test:images` for the image pipeline's regression checks. These commands only build local output and do not deploy it.
