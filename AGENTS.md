## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Facebook share image

Every page uses `public/og-default.jpg` (1200×630) as its Facebook/social share image. It is a separate file from the home page hero image, so changing the hero (`hero` import in `src/pages/index.astro`) does not change what shows when the link is shared. Whenever the main home page image changes, check with the user whether the share image should be updated to match. After deploying a new share image, re-scrape the site in Facebook's Sharing Debugger (https://developers.facebook.com/tools/debug/) to clear the old preview.
