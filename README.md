# Bodea

A responsive, multi-page professional services demo built with HTML, CSS, and
vanilla JavaScript. No build step or backend is required.

## Features

- Professional services, accounting, and company information pages.
- Publications with search, topic, industry, and year filters.
- Events, webinars, and article pages.
- Hero carousel, mobile navigation, and expandable content.
- Demo login, registration, and newsletter forms with client-side validation.

Forms are demonstrations only: they do not authenticate users, create accounts,
send messages, or store submissions. Video and some social/app links are
placeholders. Bodea branding and content are for demonstration purposes only.

## Run locally

Open `index.html` in a browser, or serve this directory:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then visit <http://127.0.0.1:8000>. Google Fonts requires internet access; the site
falls back to system fonts when unavailable.

## Project layout

| Path | Purpose |
| --- | --- |
| `index.html` | Homepage |
| `services.html`, `accounting.html` | Service pages |
| `publications.html`, `article.html` | Publications and article detail |
| `events.html`, `webinar.html` | Events and webinar detail |
| `about.html` | Company information |
| `login.html`, `register.html` | Demo account forms |
| `styles.css`, `script.js` | Shared styling and browser interactions |
| `img/` | All website images, logo, favicons, and touch icon |
| `.nojekyll` | Serve the static site without Jekyll processing |

The favicon set includes a scalable SVG, a 16/32/48-pixel ICO, a 64-pixel PNG
fallback, and a 180-pixel Apple touch icon. All pages use relative `img/` paths.

## Publish to GitHub Pages

Repository: <https://github.com/sectrait/Bodea>

Using a GitHub account with write access, publish the files to the repository's
`main` branch. Logs, local environment files, and ZIP archives are excluded by
`.gitignore`.

A repository administrator can then enable deployment:

1. Open **Settings > Pages** in the repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select **main** and **/ (root)**, then click **Save**.
4. Wait for the Pages deployment to complete under **Actions**.
5. Open <https://sectrait.github.io/Bodea/> and check navigation and images.

The URL becomes available only after Pages is enabled and deployment succeeds.
Keep links and asset paths relative so the site works under the `/Bodea/` path.
Subsequent pushes to `main` automatically redeploy the site.

## License

Original source code and documentation are licensed under the
[Apache License 2.0](LICENSE).

Third-party images, fonts, trademarks, and other supplied assets are not
relicensed by this repository and remain subject to their respective rights and
license terms. Permission to host an asset does not necessarily grant permission
to redistribute or reuse it elsewhere.
