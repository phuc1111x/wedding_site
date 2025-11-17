# Deployment Guide for Google Sites

## Build the Project

Run this command to create a single bundled HTML file:

```bash
npm run build
# or
node build.js
```

This creates `dist/wedding-invitation-bundle.html` with all CSS and JS inlined.

## Option 1: GitHub Pages (Recommended)

1. Create a GitHub repository
2. Upload the entire `dist` folder (or just the bundle file)
3. Go to Settings > Pages
4. Set source to "main" branch
5. Your site will be at: `https://yourusername.github.io/repo-name/wedding-invitation-bundle.html`

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
