# Deployment Guide for GitHub Pages

## Your Repository
- **Remote**: https://github.com/phuc1111x/wedding_site.git
- **Live URL**: https://phuc1111x.github.io/wedding_site/

## Step 1: Build the Project

```bash
node build.js
```

This creates the `dist` folder with:
- `wedding-invitation-bundle.html` (main file with inlined CSS/JS)
- `assets/` folder (all images and audio)

## Step 2: Deploy to GitHub Pages

### Option A: Deploy only dist folder (Recommended)

1. **Create gh-pages branch from dist folder:**
```bash
git add dist -f
git commit -m "Add dist folder for deployment"
git subtree push --prefix dist origin gh-pages
```

2. **Enable GitHub Pages:**
   - Go to https://github.com/phuc1111x/wedding_site/settings/pages
   - Source: Select "Deploy from a branch"
   - Branch: Select "gh-pages" and "/ (root)"
   - Click Save

3. **Your site will be at:**
   - https://phuc1111x.github.io/wedding_site/wedding-invitation-bundle.html

### Option B: Deploy entire project

1. **Push all files to main:**
```bash
git add .
git commit -m "Update wedding site"
git push origin main
```

2. **Enable GitHub Pages:**
   - Go to https://github.com/phuc1111x/wedding_site/settings/pages
   - Source: Select "Deploy from a branch"
   - Branch: Select "main" and "/dist"
   - Click Save

3. **Your site will be at:**
   - https://phuc1111x.github.io/wedding_site/wedding-invitation-bundle.html

## Step 3: Update After Changes

After making changes, rebuild and redeploy:

```bash
# Rebuild
node build.js

# If using Option A (gh-pages branch):
git add dist -f
git commit -m "Update dist"
git subtree push --prefix dist origin gh-pages

# If using Option B (main branch):
git add .
git commit -m "Update site"
git push origin main
```

## Option 2: Netlify (Easy)

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist` folder
3. Get your URL instantly

## Option 3: Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your project
3. Deploy with one click

## Embedding in Google Sites

Once your site is hosted:

1. Open your Google Site
2. Click "Insert" > "Embed"
3. Choose "By URL"
4. Paste your hosted URL
5. Click "Insert"

### Or use Embed Code:

```html
<iframe
  src="YOUR_HOSTED_URL_HERE"
  width="100%"
  height="800"
  frameborder="0"
  allowfullscreen>
</iframe>
```

## Important Notes

- **Images**: Make sure your image paths in the bundle are correct or use absolute URLs
- **Audio**: The music file needs to be hosted alongside or use an absolute URL
- **HTTPS**: Google Sites requires HTTPS URLs for embedding

## Updating Images

Edit `styles.css` before building to use hosted image URLs:

```css
.hero-image-left {
    background-image: url('https://your-host.com/assets/herosection_broom.JPG');
}
```

Or host images on:
- Google Drive (make shareable)
- Imgur
- Any image hosting service
