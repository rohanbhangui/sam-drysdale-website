URL: https://samdrysdalemusic.com/

# Sam Drysdale

This is a [Next.js](https://nextjs.org) app, deployed on [Netlify](https://netlify.com)
via `@netlify/plugin-nextjs` (see `netlify.toml`).

## Getting Started

```bash
yarn install
echo "BANDSINTOWN_APP_ID=" > .env.local   # paste the key, see Environment below
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Environment

One variable, required for tour dates:

| Variable | Where to get it |
| --- | --- |
| `BANDSINTOWN_APP_ID` | Bandsintown for Artists → Settings → General → **Get API Key** |

The key is self-serve and scoped to a single artist, which is all this site
needs. (The partnership program at `API@bandsintown.com` is for multi-artist
/ catalogue-scale access, not us.)

**Local:** put it in `.env.local` — gitignored, never committed.

**Production:** set it in Netlify under Site configuration → Environment
variables, with **All scopes**. It is needed both at build time (`/` and
`/live` are prerendered with real dates) and at runtime (the hourly ISR
revalidation re-runs the fetch inside a function). Setting it for builds only
looks fine for an hour, then silently degrades to the empty state.

> **Do not tick "Contains secret values" in Netlify.** Bandsintown echoes the
> app id back into every ticket URL they return, so it appears in the rendered
> HTML by design (~16 times across the two pages). Netlify's secrets scanner
> would find it in the build output and fail the deploy. Keeping it out of the
> repo is still right — it allows rotation without a code change — but it is
> not a credential in the password sense.

Without the variable the site still builds; `/live` and the home Live section
render their "no dates announced" state and log an error. There is
deliberately no invented-data fallback.

## Available Scripts

- `yarn dev` — runs the app in development mode.
- `yarn build` — builds the app for production.
- `yarn start` — runs the production build locally.
- `yarn lint` — lints the codebase.
