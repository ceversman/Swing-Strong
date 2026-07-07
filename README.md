# Swing Strong

One-page static website for the `ceversman/Swing-Strong` GitHub repository.

The site was recreated from the Swing Strong Jotform at `https://pci.jotform.com/form/261551537343052` and is ready for GitHub Pages.

## Files

- `index.html` is the main website.
- `styles.css` contains the responsive design.
- `script.js` validates the intake form and redirects to secure checkout.
- `assets/swing-strong-logo.png` is the downloaded Swing Strong logo.
- `thank-you.html` is available if you later replace the checkout redirect with a direct lead form flow.

## GitHub Pages

Repository: `https://github.com/ceversman/Swing-Strong`

1. Upload everything inside this folder to the repository root.
2. Commit the files to the `main` branch.
3. In GitHub, go to Settings, Pages.
4. Set Source to `Deploy from a branch`.
5. Choose `main` and `/root`, then save.

After GitHub Pages finishes deploying, the site should be available at:

`https://ceversman.github.io/Swing-Strong/`

## Git Commands

From a local clone of `https://github.com/ceversman/Swing-Strong`:

```bash
git add .
git commit -m "Add Swing Strong website"
git push origin main
```

## Payment Setup

The current checkout handoff in `script.js` points to the original secure Jotform payment URL:

```js
checkoutUrl: "https://pci.jotform.com/form/261551537343052"
```

To use Stripe directly, create a Stripe Payment Link for the `$79.99` Golf Performance Assessment and replace that value with the Stripe URL.

For a production contact workflow, set `leadEndpoint` in `script.js` to a backend, Netlify Function, Formspree endpoint, or another form handler. GitHub Pages alone cannot securely process payments or store private submissions.
